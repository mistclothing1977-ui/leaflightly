import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/client';
import { newsletter_signups, newsletter_batches } from '@/lib/db/schema';
import { calculateBatchSchedule } from '@/lib/email/batch-calculator';
import { isAuthorizedCron } from '@/lib/newsletter/security';
import { products } from '@/data/products';
import { safeError } from '@/lib/safe-error';

export const dynamic = 'force-dynamic';

const DAILY_LIMIT = 100; // Resend free tier
const SEND_TIME_UTC = '09:00';

function currentWeekStartUtc(now = new Date()): Date {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const daysSinceMonday = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - daysSinceMonday);
  return d;
}

/**
 * Creates this week's newsletter batches (one per day, max DAILY_LIMIT each) for all
 * confirmed subscribers. Triggered by Vercel Cron, Mondays 08:00 UTC (see vercel.json).
 * Idempotent: does nothing if this week's batches already exist.
 */
async function schedule(req: NextRequest) {
  if (!isAuthorizedCron(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const weekStart = currentWeekStartUtc();

    const existing = await db
      .select({ id: newsletter_batches.id })
      .from(newsletter_batches)
      .where(eq(newsletter_batches.week_start, weekStart))
      .limit(1);
    if (existing.length > 0) {
      return NextResponse.json({ message: 'Already scheduled for this week', batchesCreated: 0 });
    }

    const subscribers = await db
      .select({ email: newsletter_signups.email })
      .from(newsletter_signups)
      .where(eq(newsletter_signups.status, 'active'));

    if (subscribers.length === 0) {
      return NextResponse.json({ message: 'No active subscribers', batchesCreated: 0 });
    }

    // Top-rated product from each category
    const categories = ['kitchen', 'fashion', 'lifestyle', 'beauty', 'wellness'] as const;
    const curatedProducts = categories
      .map((c) => products.filter((p) => p.category === c).sort((a, b) => b.rating - a.rating)[0])
      .filter(Boolean);

    const plan = calculateBatchSchedule(
      subscribers.map((s) => s.email),
      weekStart,
      SEND_TIME_UTC,
      DAILY_LIMIT
    );

    for (const batch of plan.batches) {
      await db.insert(newsletter_batches).values({
        week_start: weekStart,
        day_of_week: batch.dayOfWeek,
        scheduled_for: batch.scheduledFor,
        recipients: batch.subscriberEmails,
        content: { products: curatedProducts },
      });
    }

    const capacity = DAILY_LIMIT * 7;
    const unscheduled = subscribers.length - plan.weeklyTotal;
    if (subscribers.length >= capacity * 0.9) {
      console.warn(`Newsletter at ${subscribers.length}/${capacity} weekly capacity — upgrade Resend plan.`);
    }

    return NextResponse.json({
      message: 'Weekly batches scheduled',
      weekStart,
      subscriberCount: subscribers.length,
      batchesCreated: plan.batches.length,
      emailsScheduled: plan.weeklyTotal,
      notScheduledOverCapacity: unscheduled > 0 ? unscheduled : 0,
    });
  } catch (error) {
    console.error('Newsletter schedule error:', safeError(error));
    return NextResponse.json({ error: 'Failed to schedule batches' }, { status: 500 });
  }
}

// Vercel Cron calls GET; POST kept for manual triggering.
export const GET = schedule;
export const POST = schedule;
