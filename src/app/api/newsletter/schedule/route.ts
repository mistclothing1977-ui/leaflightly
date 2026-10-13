import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { newsletterSubscribers, newsletterBatches } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { calculateBatchSchedule } from '@/lib/email/batch-calculator';
import { products } from '@/data/products';

/**
 * POST /api/newsletter/schedule
 *
 * Creates weekly newsletter batches for all active subscribers.
 * Distributes across 7 days (100 emails/day max).
 *
 * Should be triggered by Vercel Cron on Mondays at 08:00 UTC
 * Add to vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/newsletter/schedule",
 *     "schedule": "0 8 * * 1"
 *   }]
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Verify secret to prevent unauthorized calls
    const secret = request.headers.get('x-cron-secret');
    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all active subscribers
    const activeSubscribers = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.status, 'active'));

    if (activeSubscribers.length === 0) {
      return NextResponse.json({
        message: 'No active subscribers',
        batchesCreated: 0,
      });
    }

    // Get curated products (top rated from each category)
    const categories = ['kitchen', 'fashion', 'lifestyle', 'beauty', 'wellness'];
    const curatedProducts = categories
      .map((category) => {
        return products
          .filter((p) => p.category === category)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 1)[0];
      })
      .filter(Boolean);

    // Get subscriber emails
    const subscriberEmails = activeSubscribers.map((s) => s.email);

    // Calculate batch schedule (100/day x 7 days)
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1); // Monday
    weekStart.setHours(0, 0, 0, 0);

    const settings = await db.query.newsletterSettings.findFirst();
    const scheduleTime = settings?.weeklyScheduleTime || '09:00';

    const batchPlan = calculateBatchSchedule(
      subscriberEmails,
      weekStart,
      scheduleTime,
      100 // Daily limit
    );

    // Create batches in database
    const createdBatches = [];
    for (const batch of batchPlan.batches) {
      const batchId = uuidv4();
      await db.insert(newsletterBatches).values({
        id: batchId,
        weekStart,
        dayOfWeek: batch.dayOfWeek,
        scheduledFor: batch.scheduledFor,
        status: 'scheduled',
        emailCount: batch.emailCount,
        contentSnapshot: {
          products: curatedProducts,
          weekNumber: Math.ceil(
            (new Date().getTime() - new Date(weekStart).getTime()) /
              (7 * 24 * 60 * 60 * 1000)
          ),
        },
      });

      createdBatches.push({
        id: batchId,
        dayOfWeek: batch.dayOfWeek,
        emailCount: batch.emailCount,
        scheduledFor: batch.scheduledFor,
      });
    }

    // Check if over capacity threshold
    const subscriberCount = activeSubscribers.length;
    const weeklyCapacity = 700; // 100 per day × 7 days
    const upgradeThreshold = weeklyCapacity * 0.9; // 630

    if (subscriberCount >= upgradeThreshold) {
      console.warn(
        `⚠️  Newsletter subscriber threshold reached: ${subscriberCount}/${weeklyCapacity}. Consider upgrading to paid Resend plan.`
      );

      // Send alert to admin (non-blocking)
      // TODO: Implement admin alert email
    }

    return NextResponse.json({
      message: 'Weekly batches scheduled successfully',
      weekStart,
      subscriberCount,
      batchesCreated: createdBatches.length,
      totalEmails: batchPlan.weeklyTotal,
      batches: createdBatches,
      capacityAlert:
        subscriberCount >= upgradeThreshold
          ? `At ${Math.round((subscriberCount / weeklyCapacity) * 100)}% capacity`
          : null,
    });
  } catch (error) {
    console.error('Newsletter schedule error:', error);
    return NextResponse.json(
      {
        error: 'Failed to schedule batches',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
