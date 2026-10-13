/**
 * Batch Calculator for Weekly Newsletter
 *
 * Spreads subscriber emails across 7 days respecting:
 * - 100 emails per day limit (Resend free tier)
 * - 700 emails per week maximum
 * - Configurable send times
 */

export interface BatchSchedule {
  dayOfWeek: number; // 0 = Monday, 6 = Sunday
  scheduledFor: Date;
  emailCount: number;
  subscriberEmails: string[];
}

export interface BatchPlan {
  weekStart: Date;
  totalSubscribers: number;
  dailyLimit: number;
  batches: BatchSchedule[];
  weeklyTotal: number;
}

/**
 * Calculate optimal batch distribution across the week
 * @param subscribers List of subscriber emails
 * @param weekStart Monday of the current week
 * @param scheduleTime Time of day to send (HH:mm UTC, default 9:00)
 * @param dailyLimit Max emails per day (default 100)
 * @returns Batch plan with distribution across 7 days
 */
export function calculateBatchSchedule(
  subscribers: string[],
  weekStart: Date,
  scheduleTime: string = '09:00',
  dailyLimit: number = 100
): BatchPlan {
  const totalSubscribers = subscribers.length;
  const daysAvailable = 7;

  // Calculate emails per day (distributed evenly)
  const emailsPerDay = Math.ceil(totalSubscribers / daysAvailable);
  const capped = Math.min(emailsPerDay, dailyLimit);

  // Parse schedule time
  const [hours, minutes] = scheduleTime.split(':').map(Number);

  // Create batches
  const batches: BatchSchedule[] = [];
  let emailIndex = 0;

  for (let day = 0; day < daysAvailable; day++) {
    const scheduledFor = new Date(weekStart);
    scheduledFor.setUTCDate(scheduledFor.getUTCDate() + day);
    scheduledFor.setUTCHours(hours, minutes, 0, 0);

    // Remaining emails to send
    const remaining = totalSubscribers - emailIndex;
    const batchSize = Math.min(capped, remaining);

    if (batchSize > 0) {
      const subscriberEmails = subscribers.slice(
        emailIndex,
        emailIndex + batchSize
      );

      batches.push({
        dayOfWeek: day,
        scheduledFor,
        emailCount: batchSize,
        subscriberEmails,
      });

      emailIndex += batchSize;
    }
  }

  return {
    weekStart,
    totalSubscribers,
    dailyLimit,
    batches,
    weeklyTotal: emailIndex,
  };
}

/**
 * Calculate when to upgrade to paid plan
 * @param currentSubscriberCount Current number of subscribers
 * @param dailyLimit Current daily limit (100 for free tier)
 * @returns Days until upgrade needed, or null if under limit
 */
export function calculateUpgradeThreshold(
  currentSubscriberCount: number,
  dailyLimit: number = 100
): { isAtThreshold: boolean; daysUntilOverage: number; upgradeRecommended: boolean } {
  const weeklyCapacity = dailyLimit * 7; // 700 for free tier

  // Recommend upgrade at 90% capacity
  const recommendThreshold = weeklyCapacity * 0.9; // 630

  // Alert threshold at 100% (would fail)
  const alertThreshold = weeklyCapacity; // 700

  return {
    isAtThreshold: currentSubscriberCount >= alertThreshold,
    daysUntilOverage: Math.max(
      0,
      Math.ceil((weeklyCapacity - currentSubscriberCount) / (currentSubscriberCount / 7))
    ),
    upgradeRecommended: currentSubscriberCount >= recommendThreshold,
  };
}

/**
 * Get next batch to send
 * @param batches All batches for the week
 * @returns Next pending batch, or null if all sent
 */
export function getNextBatchToSend(
  batches: BatchSchedule[]
): BatchSchedule | null {
  const now = new Date();

  // Find first batch that's scheduled for now or past
  const nextBatch = batches.find((batch) => {
    const timeDiff = batch.scheduledFor.getTime() - now.getTime();
    // Send if scheduled time is within last 5 minutes and upcoming
    return timeDiff <= 0 && timeDiff > -300000; // 5 min window
  });

  return nextBatch || null;
}

/**
 * Chunk array into smaller arrays
 * Useful for batching database operations
 */
export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
