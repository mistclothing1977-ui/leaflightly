import { Resend } from "resend";
import { confirmUrl, siteUrl } from "@/lib/newsletter/security";

const BRAND = {
  primary: "#1a472a",
  accent: "#FF6B35",
  text: "#2A2A26",
  muted: "#6B6B63",
  bg: "#F8F6F3",
  card: "#FFFFFF",
};

function confirmationHtml(url: string): string {
  const logo = `${siteUrl()}/assets/logos/logo-mark.png`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Confirm your Leaf Lightly subscription</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};">
  <div style="display:none;max-height:0;overflow:hidden;color:${BRAND.bg};">One click to start receiving our weekly sustainable picks.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${BRAND.card};border-radius:12px;overflow:hidden;font-family:Georgia,'Times New Roman',serif;color:${BRAND.text};">
        <tr><td align="center" style="padding:36px 32px 8px 32px;">
          <img src="${logo}" width="72" height="72" alt="Leaf Lightly" style="display:block;border:0;outline:none;text-decoration:none;">
          <p style="margin:12px 0 0 0;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.primary};font-weight:700;">Leaf Lightly</p>
        </td></tr>
        <tr><td style="padding:24px 40px 8px 40px;">
          <h1 style="margin:0 0 16px 0;font-size:26px;line-height:1.25;color:${BRAND.primary};font-weight:700;">Welcome to Leaf Lightly</h1>
          <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;">Thank you for joining us. We do the hard work of checking brands and products so you can shop with confidence, and each week we'll send you our favourite vetted picks.</p>
          <p style="margin:0 0 24px 0;font-size:16px;line-height:1.6;">Please confirm your email address to start receiving them.</p>
        </td></tr>
        <tr><td align="center" style="padding:0 40px 28px 40px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr><td align="center" style="border-radius:8px;background:${BRAND.accent};">
            <a href="${url}" style="display:inline-block;padding:14px 32px;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;font-weight:700;color:#FFFFFF;text-decoration:none;border-radius:8px;">Confirm my subscription</a>
          </td></tr></table>
          <p style="margin:20px 0 0 0;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;color:${BRAND.muted};">If the button doesn't work, copy this link into your browser:<br><a href="${url}" style="color:${BRAND.primary};word-break:break-all;">${url}</a></p>
        </td></tr>
        <tr><td style="padding:0 40px 32px 40px;border-top:1px solid #EEEAE4;">
          <p style="margin:24px 0 0 0;font-size:14px;line-height:1.6;color:${BRAND.muted};">Didn't sign up? You can ignore this email and you won't be subscribed.</p>
          <p style="margin:16px 0 0 0;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:1.5;color:${BRAND.muted};">Leaf Lightly &middot; <a href="${siteUrl()}" style="color:${BRAND.muted};">leaflightly.com</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function confirmationText(url: string): string {
  return [
    "Welcome to Leaf Lightly",
    "",
    "Thank you for joining us. We check brands and products so you can shop with confidence, and each week we'll send you our favourite vetted picks.",
    "",
    "Confirm your subscription:",
    url,
    "",
    "Didn't sign up? Ignore this email and you won't be subscribed.",
  ].join("\n");
}

export async function sendConfirmationEmail(email: string): Promise<void> {
  const url = confirmUrl(email);

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || "noreply@leaflightly.com",
      to: email,
      subject: "Welcome to Leaf Lightly: please confirm your subscription",
      html: confirmationHtml(url),
      text: confirmationText(url),
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
