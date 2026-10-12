// Email queue no longer used - emails sent directly via Resend
// This file kept for backward compatibility with imports

interface EmailJob {
  email: string;
  subject: string;
  html: string;
  type: "transactional" | "marketing";
  queueId?: number;
}

export async function queueEmail(_job: EmailJob): Promise<void> {
  // Emails are now sent directly via Resend in email-confirmation.ts
  return Promise.resolve();
}
