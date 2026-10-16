import { and, desc, eq } from 'drizzle-orm';
import { db } from '@/lib/db/client';
import { wishlist_items } from '@/lib/db/schema';
import { getAllProducts } from '@/lib/catalogue';
import { DbError, pgErrorCode } from '@/lib/users';

export const isKnownProduct = async (productId: string) =>
  (await getAllProducts()).some((p) => p.id === productId);

/** Thrown when the session's user id has no account row (e.g. a session issued before accounts moved to the DB). */
export class UnknownUserError extends Error {}

// Re-throw without the query parameters Drizzle puts in its error messages.
async function safe<T>(operation: string, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    throw new DbError(pgErrorCode(err), operation);
  }
}

export async function addToWishlist(userId: string, productId: string) {
  try {
    await safe('addToWishlist', () =>
      db.insert(wishlist_items).values({ user_id: userId, product_id: productId }).onConflictDoNothing()
    );
  } catch (err) {
    if (err instanceof DbError && err.code === '23503') throw new UnknownUserError(); // FK violation
    throw err;
  }
  return { success: true };
}

export async function removeFromWishlist(userId: string, productId: string) {
  await safe('removeFromWishlist', () =>
    db
      .delete(wishlist_items)
      .where(and(eq(wishlist_items.user_id, userId), eq(wishlist_items.product_id, productId)))
  );
  return { success: true };
}

export async function getWishlist(userId: string) {
  const rows = await safe('getWishlist', () =>
    db
      .select({ productId: wishlist_items.product_id })
      .from(wishlist_items)
      .where(eq(wishlist_items.user_id, userId))
      .orderBy(desc(wishlist_items.added_at))
  );
  return rows.map((r) => r.productId);
}

export async function isInWishlist(userId: string, productId: string) {
  const rows = await safe('isInWishlist', () =>
    db
      .select({ productId: wishlist_items.product_id })
      .from(wishlist_items)
      .where(and(eq(wishlist_items.user_id, userId), eq(wishlist_items.product_id, productId)))
      .limit(1)
  );
  return rows.length > 0;
}
