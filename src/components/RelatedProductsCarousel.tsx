'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import { tierLabels } from '@/lib/product-labels';
import styles from './RelatedProductsCarousel.module.css';

interface RelatedProductsCarouselProps {
  currentProductId: string;
  category: string;
  tier: string;
  allProducts: Product[];
}

export default function RelatedProductsCarousel({
  currentProductId,
  category,
  tier,
  allProducts,
}: RelatedProductsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Get related products (same category, excluding current product)
  const relatedProducts = allProducts
    .filter((p) => p.category === category && p.id !== currentProductId)
    .slice(0, 8);

  if (relatedProducts.length === 0) {
    return null;
  }

  const itemsPerView = 4;
  const totalSlides = Math.ceil(relatedProducts.length / itemsPerView);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlay, totalSlides]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const visibleProducts = relatedProducts.slice(
    currentIndex * itemsPerView,
    (currentIndex + 1) * itemsPerView
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>Similar Products</h3>
            <p className={styles.subtitle}>
              Other {tier && `Tier ${tier}`} items in {category.charAt(0).toUpperCase() + category.slice(1)}
            </p>
          </div>
          {totalSlides > 1 && (
            <div className={styles.pagination}>
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  className={`${styles.dot} ${idx === currentIndex ? styles.active : ''}`}
                  onClick={() => {
                    setIsAutoPlay(false);
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Carousel */}
        <div className={styles.carouselWrapper}>
          <div className={styles.grid}>
            {visibleProducts.map((product) => {
              const discount = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className={styles.productCard}
                >
                  {/* Image */}
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
                      {product.tier}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={styles.content}>
                    <p className={styles.brand}>{product.brand}</p>
                    <h4 className={styles.productName}>{product.name}</h4>

                    {/* Price */}
                    <div className={styles.price}>
                      <span className={styles.current}>£{product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className={styles.original}>
                          £{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className={styles.rating}>
                      <span className={styles.stars}>★★★★★</span>
                      <span className={styles.ratingValue}>{product.rating}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                className={styles.navButton}
                onClick={handlePrev}
                aria-label="Previous products"
              >
                ←
              </button>
              <button
                className={styles.navButton}
                onClick={handleNext}
                aria-label="Next products"
              >
                →
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
