import { Resend } from "resend";
import { confirmUrl } from "@/lib/newsletter/security";

export async function sendConfirmationEmail(email: string): Promise<void> {
  const url = confirmUrl(email);

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #6B8E5F;">Confirm Your Newsletter Subscription</h2>
      <p>Thank you for subscribing to Leaf Lightly! Please confirm your email address by clicking the button below:</p>
      <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #6B8E5F; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">
        Confirm Email
      </a>
      <p style="color: #666; font-size: 14px;">
        Or copy this link: <a href="${url}">${url}</a>
      </p>
      <p style="color: #999; font-size: 12px; margin-top: 30px;">
        If you didn't sign up, you can ignore this email.
      </p>
    </div>
  `;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || "noreply@leaflightly.com",
      to: email,
      subject: "Confirm Your Leaf Lightly Newsletter Subscription",
      html,
    });
    if (result.error) {
      console.error("Resend rejected confirmation email:", result.error.name, result.error.message);
    } else {
      console.log("Confirmation email queued:", result.data?.id);
    }
  } catch (err) {
    console.error("Failed to send confirmation email:", err);
    // Don't throw - let the signup complete even if email fails
  }
}
