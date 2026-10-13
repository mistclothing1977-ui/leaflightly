import { NextRequest, NextResponse } from 'next/server';
import { and, eq, lte, inArray } from 'drizzle-orm';
import { db } from '@/lib/db/client';
import { newsletter_batches, newsletter_signups } from '@/lib/db/schema';
import { sendEmail } from '@/lib/email/resend';
import { renderNewsletterEmail } from '@/lib/email/newsletter-template';
import { isAuthorizedCron, siteUrl, unsubscribeUrl } from '@/lib/newsletter/security';
import type { Product } from '@/data/products';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const SEND_DELAY_MS = 50;

type NewsletterProduct = Parameters<typeof renderNewsletterEmail>[0]['curatedProducts'][number];

// Email clients can't load site-relative paths, so make image URLs absolute.
function toEmailProducts(products: Product[]): NewsletterProduct[] {
  return products.map((p) => ({
    ...p,
    imageUrl: p.imageUrl.startsWith('/') ? `${siteUrl()}${p.imageUrl}` : p.imageUrl,
  })) as unknown as NewsletterProduct[];
}

/**
 * Sends every scheduled batch that is due. Triggered by Vercel Cron daily 09:00 UTC.
 * Each recipient gets their own email with their own signed unsubscribe link.
 * Recipients who unsubscribed after scheduling are skipped.
 */
async function send(req: NextRequest) {
  if (!isAuthorizedCron(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const due = await db
      .select()
      .from(newsletter_batches)
      .where(and(eq(newsletter_batches.status, 'scheduled'), lte(newsletter_batches.scheduled_for, new Date())));

    if (due.length === 0) {
      return NextResponse.json({ message: 'No batches due', batchesSent: 0 });
    }

    const results = [];

    for (const batch of due) {
      // Claim the batch first so an overlapping run can't send it twice.
      const claimed = await db
        .update(newsletter_batches)
        .set({ status: 'sending' })
        .where(and(eq(newsletter_batches.id, batch.id), eq(newsletter_batches.status, 'scheduled')))
        .returning({ id: newsletter_batches.id });
      if (claimed.length === 0) continue;

      const recipients = batch.recipients ?? [];
      const stillActive =
        recipients.length === 0
          ? []
          : (
              await db
                .select({ email: newsletter_signups.email })
                .from(newsletter_signups)
                .where(and(inArray(newsletter_signups.email, recipients), eq(newsletter_signups.status, 'active')))
            ).map((r) => r.email);

      const content = (batch.content ?? {}) as { products?: Product[] };
      const curatedProducts = toEmailProducts(content.products ?? []);
      const weekNumber = Math.ceil(
        (batch.week_start.getTime() - Date.UTC(batch.week_start.getUTCFullYear(), 0, 1)) / (7 * 864e5)
      ) + 1;

      let sent = 0;
      let failed = 0;
      const sentTo: string[] = [];

      for (const email of stillActive) {
        const unsub = unsubscribeUrl(email);
        const result = await sendEmail({
          to: email,
          subject: 'Leaf Lightly — Your Weekly Sustainable Picks',
          html: renderNewsletterEmail({ recipientEmail: email, curatedProducts, unsubscribeUrl: unsub, weekNumber }),
          headers: {
            'List-Unsubscribe': `<${unsub}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          },
        });
        if (result.success) {
          sent++;
          sentTo.push(email);
        } else {
          failed++;
        }
        await new Promise((r) => setTimeout(r, SEND_DELAY_MS));
      }

      if (sentTo.length > 0) {
        await db
          .update(newsletter_signups)
          .set({ last_email_sent: new Date() })
          .where(inArray(newsletter_signups.email, sentTo));
      }

      await db
        .update(newsletter_batches)
        .set({ status: 'sent', sent_at: new Date(), sent_count: sent, failed_count: failed })
        .where(eq(newsletter_batches.id, batch.id));

      results.push({
        batchId: batch.id,
        dayOfWeek: batch.day_of_week,
        sent,
        failed,
        skippedUnsubscribed: recipients.length - stillActive.length,
      });
    }

    return NextResponse.json({ message: 'Due batches sent', batchesSent: results.length, results });
  } catch (error) {
    console.error('Newsletter send error:', error);
    return NextResponse.json({ error: 'Failed to send newsletter batches' }, { status: 500 });
  }
}

// Vercel Cron calls GET; POST kept for manual triggering.
export const GET = send;
export const POST = send;
