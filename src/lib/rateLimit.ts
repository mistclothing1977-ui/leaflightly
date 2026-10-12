import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const hasRedis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

let redis: Redis | null = null;
if (hasRedis) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

// Mock limiter for development when Redis is unavailable
class MockRatelimit {
  async limit(_identifier: string) {
    return {
      success: true,
      remaining: 999,
      resetAfter: 3600,
    };
  }
}

function createLimiter(limit: number, window: string) {
  if (!redis) {
    console.warn(`Rate limiting disabled (Upstash not configured). Using mock limiter.`);
    return new MockRatelimit() as any;
  }
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window as any),
    analytics: true,
  });
}

// Admin product creation: 10 per hour
export const adminProductRateLimit = createLimiter(10, "1 h");

// Admin product updates: 20 per hour
export const adminUpdateRateLimit = createLimiter(20, "1 h");

// Newsletter signups: 5 per IP per hour
export const newsletterSignupRateLimit = createLimiter(5, "1 h");

// Image uploads: 20 per user per day
export const imageUploadRateLimit = createLimiter(20, "1 d");

export async function checkRateLimit(
  limiter: any,
  identifier: string
): Promise<{ success: boolean; remaining: number; resetIn: number }> {
  const result = await limiter.limit(identifier);
  return {
    success: result.success,
    remaining: result.remaining,
    resetIn: result.resetAfter,
  };
}
