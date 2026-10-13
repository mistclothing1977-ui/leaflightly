import { Resend } from 'resend';

// Created on first send, not at import: Resend throws without an API key, which broke `next build`.
let client: Resend | null = null;

function getResend(): Resend {
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

/**
 * Send email via Resend
 */
export async function sendEmail({
  to,
  subject,
  html,
  from = 'newsletter@leaflightly.com',
  replyTo = 'hello@leaflightly.com',
  headers,
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  headers?: Record<string, string>;
}) {
  try {
    const result = await getResend().emails.send({
      from,
      to,
      subject,
      html,
      reply_to: replyTo,
      headers,
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return { success: false, error: result.error, messageId: null };
    }

    return { success: true, messageId: result.data?.id, error: null };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error, messageId: null };
  }
}

/**
 * Send batch of emails with rate limiting
 * Respects Resend's rate limits and tracks usage
 */
export async function sendEmailBatch({
  emails,
  subject,
  html,
  delayMs = 100, // Delay between emails to avoid rate limits
}: {
  emails: string[];
  subject: string;
  html: string;
  delayMs?: number;
}) {
  const results = [];

  for (const email of emails) {
    const result = await sendEmail({ to: email, subject, html });
    results.push({ email, ...result });

    // Delay between sends to avoid rate limiting
    if (emails.indexOf(email) < emails.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return results;
}
