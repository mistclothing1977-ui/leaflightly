import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { newsletter_signups } from "@/lib/db/schema";
import { successResponse, errorResponse } from "@/lib/api/handler";
import { withCORS, withSecurityHeaders } from "@/lib/api/middleware";
import { verifyNewsletterToken } from "@/lib/newsletter/security";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (!email || !token) {
      let response = errorResponse(
        "Missing email or token",
        "INVALID_REQUEST",
        400
      );
      return withSecurityHeaders(withCORS(response));
    }

    // searchParams already decodes; decoding again would corrupt addresses containing "%".
    const decodedEmail = email;

    if (!verifyNewsletterToken("confirm", decodedEmail, token)) {
      let response = errorResponse("Invalid confirmation link", "INVALID_TOKEN", 400);
      return withSecurityHeaders(withCORS(response));
    }

    // Find subscriber
    const subscriber = await db
      .select()
      .from(newsletter_signups)
      .where(eq(newsletter_signups.email, decodedEmail))
      .limit(1)
      .then((rows) => rows[0]);

    if (!subscriber) {
      let response = errorResponse("Email not found", "NOT_FOUND", 404);
      return withSecurityHeaders(withCORS(response));
    }

    // Mark as confirmed
    await db
      .update(newsletter_signups)
      .set({
        status: "active",
        confirmed_at: new Date(),
      })
      .where(eq(newsletter_signups.email, decodedEmail));

    let response = successResponse({
      confirmed: true,
      message: "Email confirmed! You're subscribed to our newsletter.",
    });
    return withSecurityHeaders(withCORS(response));
  } catch (err) {
    console.error("Email confirmation error:", err);

    let response = errorResponse("Internal server error", "INTERNAL_ERROR", 500);
    return withSecurityHeaders(withCORS(response));
  }
}
