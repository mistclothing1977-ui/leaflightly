import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { newsletter_signups } from "@/lib/db/schema";
import { emailSchema } from "@/lib/validate";
import { newsletterSignupRateLimit } from "@/lib/rateLimit";
import { successResponse, errorResponse } from "@/lib/api/handler";
import { withCORS, withSecurityHeaders } from "@/lib/api/middleware";
import { sendConfirmationEmail } from "@/lib/email-confirmation";

export const dynamic = "force-dynamic";

// Handle CORS preflight
export async function OPTIONS(_req: NextRequest) {
  const response = new NextResponse(null, { status: 204 });
  return withSecurityHeaders(withCORS(response));
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit by IP
    let ip = "unknown";
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) {
      ip = forwarded.split(",")[0].trim();
    } else {
      ip = req.headers.get("x-real-ip") || req.headers.get("cf-connecting-ip") || "unknown";
    }

    const rateLimit = await newsletterSignupRateLimit.limit(ip);

    if (!rateLimit.success) {
      let response = errorResponse(
        "Too many signup attempts. Please try again later.",
        "RATE_LIMIT",
        429
      );
      return withSecurityHeaders(withCORS(response));
    }

    // Validate input with 5KB body limit check
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 5 * 1024) {
      let response = errorResponse("Request body too large", "PAYLOAD_TOO_LARGE", 413);
      return withSecurityHeaders(withCORS(response));
    }

    const body = await req.json();
    const validated = emailSchema.parse(body);

    // Check if already subscribed
    const existing = await db
      .select()
      .from(newsletter_signups)
      .where(eq(newsletter_signups.email, validated.email))
      .limit(1)
      .then((rows) => rows[0]);

    if (existing) {
      if (existing.status === "active") {
        let response = errorResponse("Already subscribed", "ALREADY_SUBSCRIBED", 400);
        return withSecurityHeaders(withCORS(response));
      }
      // Reactivate unsubscribed
      await db
        .update(newsletter_signups)
        .set({
          status: "pending",
          subscribed_at: new Date(),
        })
        .where(eq(newsletter_signups.email, validated.email));

      // Send confirmation email (non-blocking)
      sendConfirmationEmail(validated.email).catch((err) =>
        console.error("Failed to send confirmation email:", err)
      );

      let response = successResponse({
        subscribed: true,
        message: "Check your email to confirm subscription",
      });
      return withSecurityHeaders(withCORS(response));
    }

    // Create new signup with pending status
    await db.insert(newsletter_signups).values({
      email: validated.email,
      source: validated.source || "website",
      status: "pending",
      subscribed_at: new Date(),
    });

    // Send confirmation email (non-blocking)
    sendConfirmationEmail(validated.email).catch((err) =>
      console.error("Failed to send confirmation email:", err)
    );

    let response = successResponse(
      {
        subscribed: true,
        message: "Check your email to confirm subscription",
      },
      201
    );
    return withSecurityHeaders(withCORS(response));
  } catch (err) {
    console.error("Newsletter signup error:", err);

    let response: NextResponse;
    if (err instanceof z.ZodError) {
      response = errorResponse("Invalid email address", "VALIDATION_ERROR", 400);
    } else {
      const errorMsg = err instanceof Error ? err.message : String(err);
      response = errorResponse(errorMsg, "SERVER_ERROR", 500);
    }

    return withSecurityHeaders(withCORS(response));
  }
}
