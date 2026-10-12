/**
 * Wishlist Storage
 * In-memory store for demo (replace with Neon DB in production)
 */

interface WishlistItem {
  userId: string;
  productId: string;
  addedAt: Date;
}

const wishlistStore: WishlistItem[] = [];

export async function addToWishlist(userId: string, productId: string) {
  const exists = wishlistStore.find(
    (item) => item.userId === userId && item.productId === productId
  );

  if (!exists) {
    wishlistStore.push({
      userId,
      productId,
      addedAt: new Date(),
    });
  }

  return { success: true };
}

export async function removeFromWishlist(userId: string, productId: string) {
  const index = wishlistStore.findIndex(
    (item) => item.userId === userId && item.productId === productId
  );

  if (index > -1) {
    wishlistStore.splice(index, 1);
  }

  return { success: true };
}

export async function getWishlist(userId: string) {
  return wishlistStore
    .filter((item) => item.userId === userId)
    .map((item) => item.productId);
}

export async function isInWishlist(userId: string, productId: string) {
  return wishlistStore.some(
    (item) => item.userId === userId && item.productId === productId
  );
}
