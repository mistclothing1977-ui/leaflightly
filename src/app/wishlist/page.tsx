'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCatalogue } from '@/lib/use-catalogue';
import WishlistButton from '@/components/WishlistButton';
import ShareWishlistButton from './ShareWishlistButton';
import styles from './page.module.css';

export default function WishlistPage() {
  const products = useCatalogue();
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [signedOut, setSignedOut] = useState(false);

  useEffect(() => {
    fetch('/api/wishlist/get')
      .then(async (res) => {
        if (res.status === 401) {
          setSignedOut(true);
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setWishlistItems(Array.isArray(data.wishlist) ? data.wishlist : []);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const removeItem = (productId: string) =>
    setWishlistItems((items) => items.filter((id) => id !== productId));

  const wishlistProducts = products.filter((p) => wishlistItems.includes(p.id));

  if (!isLoading && signedOut) {
    return (
      <main className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>My Wishlist</h1>
        </header>
        <div className={styles.empty}>
          <div className={styles.emptyContent}>
            <h2 className={styles.emptyTitle}>Sign in to see your wishlist</h2>
            <p className={styles.emptyText}>Your saved products are kept with your account.</p>
            <Link href="/login" className={styles.browseButton}>
              Sign In
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Wishlist</h1>
        <p className={styles.subtitle}>
          {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''}
        </p>
        {!isLoading && wishlistProducts.length > 0 && (
          <ShareWishlistButton productIds={wishlistProducts.map((p) => p.id)} />
        )}
      </header>

      {isLoading ? (
        <div className={styles.loading} role="status" aria-live="polite">Loading your wishlist...</div>
      ) : wishlistProducts.length > 0 ? (
        <>
          <div className={styles.grid}>
            {wishlistProducts.map((product) => {
              const discount = product.originalPrice
                ? Math.round(
                    ((product.originalPrice - product.price) / product.originalPrice) * 100
                  )
                : 0;

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className={styles.card}
                >
                  <div className={styles.imageContainer}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className={styles.image}
                    />
                    {discount > 0 && (
                      <div className={styles.discountBadge}>-{discount}%</div>
                    )}
                    <div className={styles.removeButton}>
                      <WishlistButton
                        productId={product.id}
                        initiallyWishlisted
                        onChange={(wishlisted) => !wishlisted && removeItem(product.id)}
                      />
                    </div>
                  </div>

                  <div className={styles.content}>
                    <p className={styles.brand}>{product.brand}</p>
                    <h3 className={styles.name}>{product.name}</h3>

                    <div className={styles.price}>
                      <span className={styles.current}>£{product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className={styles.original}>
                          £{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className={styles.rating} aria-label={`${product.rating} out of 5 stars`}>
                      <span className={styles.stars} aria-hidden="true">★★★★★</span>
                      <span className={styles.ratingValue}>{product.rating}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Tips for Your Wishlist</h2>
            <div className={styles.tips}>
              <div className={styles.tip}>
                <p className={styles.tipTitle}>Share Your Picks</p>
                <p className={styles.tipDesc}>
                  Use &ldquo;Share wishlist&rdquo; above to send your picks to friends and family.
                </p>
              </div>
              <div className={styles.tip}>
                <p className={styles.tipTitle}>Compare Products</p>
                <p className={styles.tipDesc}>Compare sustainability features side-by-side.</p>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyContent}>
            <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
            <p className={styles.emptyText}>
              Start adding products to save your favorite sustainable picks for later.
            </p>
            <Link href="/products/lifestyle" className={styles.browseButton}>
              Browse Products
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
