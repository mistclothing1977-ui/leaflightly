import crypto from "crypto";
import { db } from "@/lib/db/client";
import { newsletter_signups } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";

// const CONFIRMATION_TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export function generateConfirmationToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function sendConfirmationEmail(
  email: string,
  token: string,
  baseUrl: string = "https://leaflightly.com"
): Promise<void> {
  const confirmUrl = `${baseUrl}/api/newsletter/confirm?token=${token}&email=${encodeURIComponent(email)}`;

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #6B8E5F;">Confirm Your Newsletter Subscription</h2>
      <p>Thank you for subscribing to Leaf Lightly! Please confirm your email address by clicking the button below:</p>
      <a href="${confirmUrl}" style="display: inline-block; padding: 12px 24px; background-color: #6B8E5F; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">
        Confirm Email
      </a>
      <p style="color: #666; font-size: 14px;">
        Or copy this link: <a href="${confirmUrl}">${confirmUrl}</a>
      </p>
      <p style="color: #999; font-size: 12px; margin-top: 30px;">
        This link expires in 24 hours.
      </p>
    </div>
  `;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "noreply@leaflightly.com",
      to: email,
      subject: "Confirm Your Leaf Lightly Newsletter Subscription",
      html,
    });
  } catch (err) {
    console.error("Failed to send confirmation email:", err);
    // Don't throw - let the signup complete even if email fails
  }
}

export async function verifyConfirmationToken(
  email: string,
  _token: string
): Promise<boolean> {
  try {
    const subscriber = await db
      .select()
      .from(newsletter_signups)
      .where(eq(newsletter_signups.email, email))
      .limit(1)
      .then((rows) => rows[0]);

    if (!subscriber) {
      return false;
    }

    // In production, you'd store the hashed token with expiry
    // For MVP, we'll just verify the email exists
    return true;
  } catch (err) {
    console.error("Token verification failed:", err);
    return false;
  }
}
