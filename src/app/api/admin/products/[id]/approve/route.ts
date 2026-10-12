import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { products, product_audit_logs } from "@/lib/db/schema";
import { withAuth, withSecurityHeaders, withCORS } from "@/lib/api/middleware";
import { successResponse, errorResponse } from "@/lib/api/handler";
import { z } from "zod";

export const dynamic = "force-dynamic";

const approvalSchema = z.object({
  action: z.enum(["approve", "reject"]),
  review_notes: z.string().max(1000).optional(),
});

// Handle CORS preflight
export async function OPTIONS(_req: NextRequest) {
  const response = new NextResponse(null, { status: 204 });
  return withSecurityHeaders(withCORS(response));
}

// POST /api/admin/products/[id]/approve - Approve/reject product
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    return withAuth(req, async (req, userId) => {
      const { id } = await params;
      const productId = parseInt(id);
      if (isNaN(productId)) {
        let response = errorResponse("Invalid product ID", "BAD_REQUEST", 400);
        return withSecurityHeaders(withCORS(response));
      }

      // Get existing product
      const existing = await db
        .select()
        .from(products)
        .where(eq(products.id, productId))
        .limit(1)
        .then((rows) => rows[0]);

      if (!existing) {
        let response = errorResponse("Product not found", "NOT_FOUND", 404);
        return withSecurityHeaders(withCORS(response));
      }

      // Validate request
      const body = await req.json();
      const validated = approvalSchema.parse(body);

      if (validated.action === "approve") {
        // Publish product
        const [updated] = await db
          .update(products)
          .set({
            status: "published",
            reviewed_by: userId,
            reviewed_at: new Date(),
            review_notes: validated.review_notes,
            published_at: new Date(),
            updated_at: new Date(),
          })
          .where(eq(products.id, productId))
          .returning();

        // Log audit
        await db.insert(product_audit_logs).values({
          product_id: productId,
          user_id: userId,
          action: "published",
          reason: validated.review_notes || "Product approved",
          created_at: new Date(),
        });

        let response = successResponse({
          product: updated,
          message: "Product published",
        });
        return withSecurityHeaders(withCORS(response));
      } else {
        // Reject product
        const [updated] = await db
          .update(products)
          .set({
            status: "draft",
            review_notes: validated.review_notes,
            updated_at: new Date(),
          })
          .where(eq(products.id, productId))
          .returning();

        // Log audit
        await db.insert(product_audit_logs).values({
          product_id: productId,
          user_id: userId,
          action: "rejected",
          reason: validated.review_notes || "Product rejected",
          created_at: new Date(),
        });

        let response = successResponse({
          product: updated,
          message: "Product rejected",
        });
        return withSecurityHeaders(withCORS(response));
      }
    });
  } catch (err) {
    console.error("Failed to review product:", err);
    let response = errorResponse("Failed to review product", "INTERNAL_ERROR", 500);
    return withSecurityHeaders(withCORS(response));
  }
}
