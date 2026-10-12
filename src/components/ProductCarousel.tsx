'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import { tierLabels } from '@/lib/product-labels';
import styles from './ProductCarousel.module.css';

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Get best-rated products (top 8)
  const featuredProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  const itemsPerView = 4;
  const totalSlides = Math.ceil(featuredProducts.length / itemsPerView);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

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

  const visibleProducts = featuredProducts.slice(
    currentIndex * itemsPerView,
    (currentIndex + 1) * itemsPerView
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Best Sellers</h2>
          <p className={styles.subtitle}>Most-loved sustainable products</p>
        </div>

        {/* Carousel */}
        <div className={styles.carouselWrapper}>
          {/* Products Grid */}
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
                      {product.tier}
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

                    {/* Tier */}
                    <div className={styles.tierLabel}>
                      {tierLabels[product.tier]}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Navigation Arrows */}
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
        </div>

        {/* Pagination Dots */}
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

        {/* CTA */}
        <div className={styles.ctaContainer}>
          <Link href="/products/kitchen" className={styles.viewAllButton}>
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
