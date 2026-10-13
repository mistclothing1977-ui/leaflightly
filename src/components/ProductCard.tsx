'use client';

import { useState } from 'react';
import { Product } from '@/data/products';
import { certificationLabels } from '@/lib/product-labels';
import Link from 'next/link';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${product.id}`}>
      <article className={styles.card}>
        {/* Image Container */}
        <div className={styles.imageContainer}>
          {!imageLoaded && <div className={styles.skeleton} />}
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`${styles.image} ${imageLoaded ? styles.loaded : ''}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
          {discount > 0 && (
            <div className={styles.discountBadge}>
              -{discount}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Brand */}
          <p className={styles.brand}>{product.brand}</p>

          {/* Name */}
          <h3 className={styles.name}>{product.name}</h3>

          {/* Price */}
          <div className={styles.price}>
            <span className={styles.current}>£{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className={styles.original}>£{product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Rating & Reviews */}
          <div className={styles.rating} aria-label={`${product.rating} out of 5 stars, ${product.reviewCount} reviews`}>
            <span className={styles.stars} aria-hidden="true">★★★★★</span>
            <span className={styles.ratingText}>
              {product.rating}
            </span>
            <span className={styles.reviews}>
              ({product.reviewCount})
            </span>
          </div>

          {/* Certifications */}
          {product.certifications.length > 0 && (
            <div className={styles.certifications}>
              {product.certifications.map((cert) => (
                <span key={cert} className={styles.badge}>
                  {certificationLabels[cert]}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
