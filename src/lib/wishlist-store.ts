import { and, desc, eq } from 'drizzle-orm';
import { db } from '@/lib/db/client';
import { wishlist_items } from '@/lib/db/schema';
import { products } from '@/data/products';
import { pgErrorCode } from '@/lib/users';

const knownProductIds = new Set(products.map((p) => p.id));

export const isKnownProduct = (productId: string) => knownProductIds.has(productId);

/** Thrown when the session's user id has no account row (e.g. a session issued before accounts moved to the DB). */
export class UnknownUserError extends Error {}

export async function addToWishlist(userId: string, productId: string) {
  try {
    await db
      .insert(wishlist_items)
      .values({ user_id: userId, product_id: productId })
      .onConflictDoNothing();
  } catch (err) {
    if (pgErrorCode(err) === '23503') throw new UnknownUserError(); // FK violation
    throw err;
  }
  return { success: true };
}

export async function removeFromWishlist(userId: string, productId: string) {
  await db
    .delete(wishlist_items)
    .where(and(eq(wishlist_items.user_id, userId), eq(wishlist_items.product_id, productId)));
  return { success: true };
}

export async function getWishlist(userId: string) {
  const rows = await db
    .select({ productId: wishlist_items.product_id })
    .from(wishlist_items)
    .where(eq(wishlist_items.user_id, userId))
    .orderBy(desc(wishlist_items.added_at));
  return rows.map((r) => r.productId);
}

export async function isInWishlist(userId: string, productId: string) {
  const rows = await db
    .select({ productId: wishlist_items.product_id })
    .from(wishlist_items)
    .where(and(eq(wishlist_items.user_id, userId), eq(wishlist_items.product_id, productId)))
    .limit(1);
  return rows.length > 0;
}
