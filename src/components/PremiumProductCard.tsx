'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import styles from './PremiumProductCard.module.css';

interface PremiumProductCardProps {
  product: Product;
  showOverlay?: boolean;
}

export default function PremiumProductCard({
  product,
  showOverlay = true,
}: PremiumProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Link href={`/products/${product.id}`} className={styles.cardWrapper}>
      <div
        className={`${styles.premiumCard} ${isHovered ? styles.hovered : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        style={{
          '--x': `${mousePosition.x}px`,
          '--y': `${mousePosition.y}px`,
        } as React.CSSProperties}
      >
        {/* Spotlight Effect: Follows cursor on hover */}
        {showOverlay && isHovered && (
          <div className={styles.spotlight} />
        )}

        {/* Image Container: Premium scaling */}
        <div className={styles.imageContainer}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className={styles.productImage}
            loading="lazy"
          />

          {/* Overlay Gradient: Depth & sophistication */}
          <div className={styles.imageOverlay} />

          {/* Badge: Discount */}
          {discount > 0 && (
            <div className={styles.discountBadge}>
              <span className={styles.discountValue}>-{discount}%</span>
            </div>
          )}

          {/* Tier Badge: Glassmorphism */}
          <div className={styles.tierBadgeGlass} data-tier={product.tier}>
            Tier {product.tier}
          </div>
        </div>

        {/* Content: Premium spacing & typography */}
        <div className={styles.cardContent}>
          {/* Brand: Subtle text */}
          <p className={styles.brand}>{product.brand}</p>

          {/* Product Name: Clean typography */}
          <h3 className={styles.productName}>{product.name}</h3>

          {/* Price: Clear hierarchy */}
          <div className={styles.priceSection}>
            <span className={styles.currentPrice}>£{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>
                £{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Rating: Semantic accessibility */}
          <div className={styles.ratingSection} aria-label={`${product.rating} out of 5 stars`}>
            <span className={styles.stars} aria-hidden="true">★★★★★</span>
            <span className={styles.ratingValue}>{product.rating}</span>
            <span className={styles.reviewCount}>({product.reviewCount})</span>
          </div>

          {/* CTA: Magnetic hover effect */}
          <button className={styles.ctaButton} aria-label={`View ${product.name} details`}>
            Explore
            <span className={styles.arrow}>→</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
