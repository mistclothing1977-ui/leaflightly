'use client';

import Link from 'next/link';
import { products } from '@/data/products';
import { tierLabels, certificationLabels } from '@/lib/product-labels';
import styles from './CuratedByCategory.module.css';

const CATEGORIES = ['kitchen', 'fashion', 'home', 'beauty', 'wellness'] as const;

const categoryInfo: Record<string, { label: string; icon: string }> = {
  kitchen: { label: 'Kitchen', icon: '🍽️' },
  fashion: { label: 'Fashion', icon: '👕' },
  home: { label: 'Home', icon: '🏠' },
  beauty: { label: 'Beauty', icon: '💅' },
  wellness: { label: 'Wellness', icon: '🧘' },
};

export default function CuratedByCategory() {
  const curatedProducts = CATEGORIES.map((category) => {
    const categoryProducts = products.filter((p) => p.category === category);
    const topProduct = categoryProducts.sort((a, b) => b.rating - a.rating)[0];
    return topProduct;
  }).filter(Boolean);

  if (curatedProducts.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Curated From Every Category</h2>
          <p className={styles.subtitle}>
            Our top-rated pick from each category — all verified sustainable
          </p>
        </div>

        <div className={styles.grid}>
          {curatedProducts.map((product) => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;
            const info = categoryInfo[product.category];

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className={styles.productCard}
              >
                {/* Category Tag */}
                <div className={styles.categoryTag}>
                  <span className={styles.categoryIcon}>{info.icon}</span>
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
                  <div className={styles.rating}>
                    <span className={styles.stars}>★★★★★</span>
                    <span className={styles.ratingValue}>{product.rating}</span>
                    <span className={styles.reviews}>({product.reviewCount})</span>
                  </div>

                  {/* Tier Badge */}
                  <div className={styles.badges}>
                    <span className={styles.tierBadgeLabel}>{tierLabels[product.tier]}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

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
