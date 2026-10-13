import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import {
  newsletterBatches,
  newsletterSubscribers,
  emailLogs,
} from '@/db/schema';
import { and, eq, gte, lte } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { sendEmailBatch } from '@/lib/email/resend';
import { renderNewsletterEmail } from '@/lib/email/newsletter-template';

/**
 * POST /api/newsletter/send
 *
 * Sends scheduled newsletter batches.
 * Triggered by Vercel Cron daily at 09:00 UTC (or configurable time).
 *
 * Add to vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/newsletter/send",
 *     "schedule": "0 9 * * *"
 *   }]
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Verify cron secret
    const secret = request.headers.get('x-cron-secret');
    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find pending batches scheduled for now (within 1 hour window)
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

    const pendingBatches = await db
      .select()
      .from(newsletterBatches)
      .where(
        and(
          eq(newsletterBatches.status, 'scheduled'),
          gte(newsletterBatches.scheduledFor, now),
          lte(newsletterBatches.scheduledFor, oneHourFromNow)
        )
      );

    if (pendingBatches.length === 0) {
      return NextResponse.json({
        message: 'No batches to send',
        batchesSent: 0,
      });
    }

    // Process each batch
    let totalEmailsSent = 0;
    const results = [];

    for (const batch of pendingBatches) {
      // Get subscriber emails for this batch
      const subscribers = await db
        .select()
        .from(newsletterSubscribers)
        .where(eq(newsletterSubscribers.status, 'active'));

      // Get subscriber emails in batch range
      const batchSubscriberIds = await db
        .select()
        .from(newsletterSubscribers)
        .where(eq(newsletterSubscribers.status, 'active'))
        .limit(batch.emailCount)
        .offset(
          pendingBatches.indexOf(batch) * batch.emailCount
        );

      if (batchSubscriberIds.length === 0) {
        continue;
      }

      const emails = batchSubscriberIds.map((s) => s.email);

      // Generate email HTML
      const unsubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(emails[0])}`;
      const emailHtml = renderNewsletterEmail({
        recipientEmail: emails[0], // Template will show per recipient
        curatedProducts: (batch.contentSnapshot as any)?.products || [],
        unsubscribeUrl,
        weekNumber: (batch.contentSnapshot as any)?.weekNumber || 1,
      });

      // Send batch via Resend
      const sendResults = await sendEmailBatch({
        emails,
        subject: `🌱 Leaf Lightly - Your Weekly Sustainable Picks`,
        html: emailHtml,
        delayMs: 50, // 50ms between emails to respect rate limits
      });

      // Log results in database
      const successCount = sendResults.filter((r) => r.success).length;
      const failedCount = sendResults.filter((r) => !r.success).length;

      // Create email logs for each send
      for (const result of sendResults) {
        const subscriberId = batchSubscriberIds.find(
          (s) => s.email === result.email
        )?.id;

        if (subscriberId) {
          await db.insert(emailLogs).values({
            id: uuidv4(),
            batchId: batch.id,
            subscriberId,
            email: result.email,
            status: result.success ? 'sent' : 'failed',
            resendMessageId: result.messageId || null,
            sentAt: new Date(),
            bounceReason: result.success ? null : String(result.error),
          });
        }
      }

      // Update batch status
      await db
        .update(newsletterBatches)
        .set({
          status: 'sent',
          sentAt: new Date(),
        })
        .where(eq(newsletterBatches.id, batch.id));

      // Update subscriber last email timestamp
      for (const subscriber of batchSubscriberIds) {
        await db
          .update(newsletterSubscribers)
          .set({ lastEmailAt: new Date() })
          .where(eq(newsletterSubscribers.id, subscriber.id));
      }

      totalEmailsSent += successCount;
      results.push({
        batchId: batch.id,
        dayOfWeek: batch.dayOfWeek,
        scheduled: batch.scheduledFor,
        emailsSent: successCount,
        emailsFailed: failedCount,
      });
    }

    return NextResponse.json({
      message: 'Newsletter batches sent successfully',
      batchesSent: results.length,
      totalEmailsSent,
      results,
    });
  } catch (error) {
    console.error('Newsletter send error:', error);
    return NextResponse.json(
      {
        error: 'Failed to send newsletter batches',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
