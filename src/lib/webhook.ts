import crypto from "crypto";

export async function verifyWebhookSignature(
  payload: string,
  signature: string
): Promise<boolean> {
  if (!process.env.WEBHOOK_SECRET) {
    throw new Error("WEBHOOK_SECRET not configured");
  }

  const hash = crypto
    .createHmac("sha256", process.env.WEBHOOK_SECRET)
    .update(payload)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(signature)
  );
}

export function generateWebhookSignature(payload: string): string {
  if (!process.env.WEBHOOK_SECRET) {
    throw new Error("WEBHOOK_SECRET not configured");
  }

  return crypto
    .createHmac("sha256", process.env.WEBHOOK_SECRET)
    .update(payload)
    .digest("hex");
}

export interface WebhookPayload {
  event: string;
  timestamp: number;
  data: Record<string, unknown>;
}

export function createWebhookPayload(
  event: string,
  data: Record<string, unknown>
): WebhookPayload {
  return {
    event,
    timestamp: Date.now(),
    data,
  };
}
