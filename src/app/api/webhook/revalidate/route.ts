import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/webhook";
import { invalidateProductCache, invalidateCollectionCache } from "@/lib/cache";
import { logInfo, logError } from "@/lib/logging";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-webhook-signature");

    if (!signature) {
      return NextResponse.json(
        { success: false, error: "Missing signature" },
        { status: 401 }
      );
    }

    // Verify signature
    const isValid = await verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      logError("Invalid webhook signature", undefined, { signature });
      return NextResponse.json(
        { success: false, error: "Invalid signature" },
        { status: 401 }
      );
    }

    // Parse payload
    const payload = JSON.parse(rawBody);
    const { event, data } = payload;

    logInfo("Webhook received", { event, productId: data?.product_id });

    // Handle cache invalidation
    switch (event) {
      case "product.updated":
      case "product.published":
        if (data?.product_id) {
          await invalidateProductCache(data.product_id);
        }
        break;

      case "collection.updated":
        if (data?.slug) {
          await invalidateCollectionCache(data.slug);
        }
        break;

      case "cache.clear_all":
        // Full cache invalidation (rare)
        // Note: implement invalidateAllCaches if needed
        break;
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    logError("Webhook processing failed", err instanceof Error ? err : undefined);
    return NextResponse.json(
      { success: false, error: "Processing failed" },
      { status: 500 }
    );
  }
}
