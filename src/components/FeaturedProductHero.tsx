'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';
import { products } from '@/data/products';
import { tierLabels, certificationLabels } from '@/lib/product-labels';
import styles from './FeaturedProductHero.module.css';

const FEATURED_PRODUCT_IDS = [
  'bees-wrap-3-pack',
  'klean-kanteen-bottle',
  'john-lewis-fsc-oak',
];

interface FeaturedProductHeroProps {
  copyVariant?: 'variant1' | 'variant2' | 'variant3';
}

export default function FeaturedProductHero({ copyVariant = 'variant1' }: FeaturedProductHeroProps) {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);

    // Rotate featured product weekly (consistent for all days Sun-Sat)
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diffToSunday = now.getDate() - dayOfWeek;
    const sundayOfThisWeek = new Date(now.setDate(diffToSunday));

    // Get week number from Sunday of current week
    const firstDay = new Date(sundayOfThisWeek.getFullYear(), 0, 1);
    const weekNumber = Math.floor((sundayOfThisWeek.getTime() - firstDay.getTime()) / 604800000);

    setFeaturedIndex(weekNumber % FEATURED_PRODUCT_IDS.length);
  }, []);

  const featuredProductId = FEATURED_PRODUCT_IDS[featuredIndex];
  const featuredProduct = products.find((p) => p.id === featuredProductId);

  if (!featuredProduct || isLoading) {
    return null;
  }

  const discount = featuredProduct.originalPrice
    ? Math.round(((featuredProduct.originalPrice - featuredProduct.price) / featuredProduct.originalPrice) * 100)
    : 0;

  const copyContent = {
    variant1: {
      heroTitle: 'Built to last a lifetime',
      heroSubtitle: 'Durable design meets ethical production—fewer purchases, less waste',
      ctaText: 'Shop Timeless',
    },
    variant2: {
      heroTitle: 'Join 8,000+ conscious shoppers',
      heroSubtitle: '4.9★ rated. Certified. No compromises.',
      ctaText: 'See What They Found',
    },
    variant3: {
      heroTitle: 'Transparent. Thoughtful. Sustainably beautiful.',
      heroSubtitle: 'We vet every brand. We share the story. You make the choice.',
      ctaText: 'Explore Our Method',
    },
  };

  const copy = copyContent[copyVariant];

  return (
    <section className={styles.hero}>
      {/* Left side - Hero content */}
      <div className={styles.heroLeft}>
        <h1 className={styles.heroTitle}>{copy.heroTitle}</h1>
        <p className={styles.heroSubtitle}>{copy.heroSubtitle}</p>
        <Link href={`/products/${featuredProduct.id}`} className={styles.heroCtaLink}>
          {copy.ctaText} →
        </Link>
      </div>

      {/* Right side - Featured product card */}
      <div className={styles.heroRight}>
        <div className={styles.productCard}>
          {/* Product image */}
          <div className={styles.imageContainer}>
            <img
              src={featuredProduct.imageUrl}
              alt={featuredProduct.name}
              className={styles.productImage}
            />
            {discount > 0 && (
              <div className={styles.discountBadge}>
                -{discount}%
              </div>
            )}
            <div className={styles.tierBadge} data-tier={featuredProduct.tier}>
              Tier {featuredProduct.tier}
            </div>
          </div>

          {/* Product content */}
          <div className={styles.productContent}>
            {/* Brand */}
            <p className={styles.brand}>{featuredProduct.brand}</p>

            {/* Product name */}
            <h2 className={styles.productName}>{featuredProduct.name}</h2>

            {/* Price */}
            <div className={styles.price}>
              <span className={styles.current}>£{featuredProduct.price.toFixed(2)}</span>
              {featuredProduct.originalPrice && (
                <span className={styles.original}>£{featuredProduct.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Rating */}
            <div className={styles.rating}>
              <span className={styles.stars}>★★★★★</span>
              <span className={styles.ratingValue}>{featuredProduct.rating}</span>
              <span className={styles.reviews}>({featuredProduct.reviewCount} reviews)</span>
            </div>

            {/* Tier & Certifications */}
            <div className={styles.badges}>
              <span className={styles.tierBadgeLabel}>{tierLabels[featuredProduct.tier]}</span>
              {featuredProduct.certifications.slice(0, 2).map((cert) => (
                <span key={cert} className={styles.certBadge}>
                  {certificationLabels[cert]}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <Link href={`/products/${featuredProduct.id}`} className={styles.shopButton}>
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
