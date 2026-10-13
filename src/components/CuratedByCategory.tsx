'use client';

import Link from 'next/link';
import { products } from '@/data/products';
import { tierLabels } from '@/lib/product-labels';
import BentoGrid, { BentoItem } from './BentoGrid';
import styles from './CuratedByCategory.module.css';

const CATEGORIES = ['kitchen', 'fashion', 'lifestyle', 'beauty', 'wellness'] as const;

const categoryInfo: Record<string, { label: string; icon: string }> = {
  kitchen: { label: 'Kitchen', icon: '🍽️' },
  fashion: { label: 'Fashion', icon: '👕' },
  lifestyle: { label: 'Lifestyle', icon: '🛋️' },
  beauty: { label: 'Beauty', icon: '💅' },
  wellness: { label: 'Wellness', icon: '🧘' },
};

export default function CuratedByCategory() {
  const curatedProducts = CATEGORIES.map((category, index) => {
    const categoryProducts = products.filter((p) => p.category === category);
    // Get top 3 rated products, then select one deterministically (not random)
    // Use category index to ensure server/client consistency (prevents hydration mismatch)
    const topThree = categoryProducts.sort((a, b) => b.rating - a.rating).slice(0, 3);
    return topThree[index % topThree.length];
  }).filter(Boolean);

  if (curatedProducts.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Curated</h2>
          <p className={styles.subtitle}>
            Our top-rated pick from each category — all verified sustainable
          </p>
        </div>

        {/* Asymmetric Bento Layout - Featured product first, then category cards */}
        <BentoGrid gap="large" className={styles.bentoWrapper}>
          {curatedProducts.map((product, index) => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;
            const info = categoryInfo[product.category];

            // First product is featured (2/3 width), others are thirds
            const span = index === 0 ? 'two-thirds' : 'third';

            return (
              <BentoItem key={product.id} span={span}>
                <Link
                  href={`/products/${product.id}`}
                  className={`${styles.productCard} ${index === 0 ? styles.featured : ''}`}
                >
                  {/* Category Tag */}
                  <div className={styles.categoryTag}>
                    <span className={styles.categoryIcon} aria-hidden="true">{info.icon}</span>
                    <span className={styles.categoryLabel}>{info.label}</span>
                  </div>

                  {/* Image Container */}
                  <div className={styles.imageContainer}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className={styles.productImage}
                    />
                    {discount > 0 && (
                      <div className={styles.discountBadge}>
                        -{discount}%
                      </div>
                    )}
                    <div className={styles.tierBadge} data-tier={product.tier}>
                      Tier {product.tier}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={styles.content}>
                    <p className={styles.brand}>{product.brand}</p>
                    <h3 className={styles.productName}>{product.name}</h3>

                    {/* Price */}
                    <div className={styles.price}>
                      <span className={styles.current}>£{product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className={styles.original}>£{product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className={styles.rating} aria-label={`${product.rating} out of 5 stars, ${product.reviewCount} reviews`}>
                      <span className={styles.stars} aria-hidden="true">★★★★★</span>
                      <span className={styles.ratingValue}>{product.rating}</span>
                      <span className={styles.reviews}>({product.reviewCount})</span>
                    </div>

                    {/* Tier Badge */}
                    <div className={styles.badges}>
                      <span className={styles.tierBadgeLabel}>{tierLabels[product.tier]}</span>
                    </div>
                  </div>
                </Link>
              </BentoItem>
            );
          })}
        </BentoGrid>

        {/* CTA */}
        <div className={styles.ctaContainer}>
          <Link href="/products/kitchen" className={styles.exploreButton}>
            Explore All Categories →
          </Link>
        </div>
      </div>
    </section>
  );
}
