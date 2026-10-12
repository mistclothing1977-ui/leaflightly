import { kv } from "@vercel/kv";

const CACHE_TTL = 300; // 5 minutes

export async function getCachedProduct(id: number): Promise<unknown | null> {
  try {
    const cached = await kv.get(`product:${id}`);
    return cached;
  } catch (err) {
    console.error("Cache get error:", err);
    return null;
  }
}

export async function setCachedProduct(
  id: number,
  data: unknown,
  ttl: number = CACHE_TTL
): Promise<void> {
  try {
    await kv.setex(`product:${id}`, ttl, JSON.stringify(data));
  } catch (err) {
    console.error("Cache set error:", err);
  }
}

export async function invalidateProductCache(id: number): Promise<void> {
  try {
    await kv.del(`product:${id}`);
  } catch (err) {
    console.error("Cache invalidate error:", err);
  }
}

export async function getCachedCollection(slug: string): Promise<unknown | null> {
  try {
    const cached = await kv.get(`collection:${slug}`);
    return cached;
  } catch (err) {
    console.error("Cache get error:", err);
    return null;
  }
}

export async function setCachedCollection(
  slug: string,
  data: unknown,
  ttl: number = CACHE_TTL
): Promise<void> {
  try {
    await kv.setex(`collection:${slug}`, ttl, JSON.stringify(data));
  } catch (err) {
    console.error("Cache set error:", err);
  }
}

export async function invalidateCollectionCache(slug: string): Promise<void> {
  try {
    await kv.del(`collection:${slug}`);
  } catch (err) {
    console.error("Cache invalidate error:", err);
  }
}

export async function invalidateAllCaches(): Promise<void> {
  try {
    const keys = await kv.keys("*");
    if (keys.length > 0) {
      await kv.del(...keys);
    }
  } catch (err) {
    console.error("Bulk cache invalidate error:", err);
  }
}
