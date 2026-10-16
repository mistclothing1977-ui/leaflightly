import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/catalogue';
import Link from 'next/link';
import styles from '../page.module.css';

export const metadata: Metadata = {
  title: 'A Leaf Lightly wishlist shared with you',
  description: 'Sustainable products picked by a friend on Leaf Lightly.',
  robots: { index: false, follow: true },
};

const MAX_ITEMS = 50;

export default async function SharedWishlistPage({
  searchParams,
}: {
  searchParams: Promise<{ items?: string }>;
}) {
  const { items = '' } = await searchParams;
  const products = await getAllProducts();
  const ids = [...new Set(items.split(',').map((s) => s.trim()).filter(Boolean))].slice(0, MAX_ITEMS);
  const shared = ids
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is (typeof products)[number] => Boolean(p));

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>A wishlist shared with you</h1>
        <p className={styles.sharedNote}>
          {shared.length > 0
            ? `${shared.length} sustainable pick${shared.length !== 1 ? 's' : ''}, each vetted by Leaf Lightly.`
            : 'This wishlist link is empty or out of date.'}
        </p>
      </header>

      {shared.length > 0 ? (
        <div className={styles.grid}>
          {shared.map((product) => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;
            return (
              <Link key={product.id} href={`/products/${product.id}`} className={styles.card}>
                <div className={styles.imageContainer}>
                  <img
                    src={product.imageUrl}
                    alt={`${product.brand} ${product.name}`}
                    className={styles.image}
                    loading="lazy"
                  />
                  {discount > 0 && <div className={styles.discountBadge}>-{discount}%</div>}
                </div>
                <div className={styles.content}>
                  <p className={styles.brand}>{product.brand}</p>
                  <h3 className={styles.name}>{product.name}</h3>
                  <div className={styles.price}>
                    <span className={styles.current}>£{product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className={styles.original}>£{product.originalPrice.toFixed(2)}</span>
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
      ) : null}

      <div className={styles.empty} style={{ minHeight: 'auto', padding: '2rem 0 4rem' }}>
        <div className={styles.emptyContent}>
          <h2 className={styles.emptyTitle}>Find your own favourites</h2>
          <p className={styles.emptyText}>
            Browse vetted sustainable products, and save the ones you love to your own wishlist.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className={styles.browseButton}>
              Browse Products
            </Link>
            <Link href="/signup" className={styles.browseButton}>
              Start Your Wishlist
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
