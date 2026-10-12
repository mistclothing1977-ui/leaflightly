import { db } from "@/lib/db/client";
import { product_audit_logs } from "@/lib/db/schema";

export interface AuditLog {
  product_id: number;
  user_id: string;
  action: string;
  changes?: Record<string, unknown>;
  reason?: string;
}

export async function logAuditEvent(log: AuditLog): Promise<void> {
  try {
    await db.insert(product_audit_logs).values({
      product_id: log.product_id,
      user_id: log.user_id,
      action: log.action,
      changes: log.changes ? JSON.stringify(log.changes) : undefined,
      reason: log.reason,
      created_at: new Date(),
    });
  } catch (err) {
    console.error("Failed to log audit event:", err);
  }
}

export function logInfo(message: string, data?: Record<string, unknown>): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] INFO: ${message}`, data ? JSON.stringify(data) : "");
}

export function logError(message: string, error?: Error, data?: Record<string, unknown>): void {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ERROR: ${message}`, {
    error: error?.message,
    stack: error?.stack,
    ...data,
  });
}

export function logWarn(message: string, data?: Record<string, unknown>): void {
  const timestamp = new Date().toISOString();
  console.warn(`[${timestamp}] WARN: ${message}`, data ? JSON.stringify(data) : "");
}

// Slack integration (optional)
export async function notifySlack(
  message: string,
  severity: "info" | "warning" | "error" = "info"
): Promise<void> {
  if (!process.env.SLACK_WEBHOOK_URL) {
    return;
  }

  const color =
    severity === "error" ? "#FF0000" : severity === "warning" ? "#FFA500" : "#00AA00";

  try {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        attachments: [
          {
            color,
            title: `Leaf Lightly - ${severity.toUpperCase()}`,
            text: message,
            ts: Math.floor(Date.now() / 1000),
          },
        ],
      }),
    });
  } catch (err) {
    console.error("Failed to send Slack notification:", err);
  }
}
