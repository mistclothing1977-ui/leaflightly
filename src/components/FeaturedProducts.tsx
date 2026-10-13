'use client';

import Link from 'next/link';
import { products as allProducts } from '@/data/products';
import { tierLabels } from '@/lib/product-labels';
import styles from './FeaturedProducts.module.css';

export default function FeaturedProducts() {
  const products = allProducts.filter((p) => p.featured);

  return (
    <section className={styles.featuredSection}>
      <div className={styles.featuredContainer}>
        <div className={styles.featuredHeader}>
          <h2 className={styles.sectionLabel}>Featured Selection</h2>
          <h3 className={styles.featuredTitle}>Handpicked Products We Love</h3>
        </div>

        <div className={styles.productsGrid}>
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className={styles.productCard}
            >
              <div className={styles.productImage}>
                <img src={product.imageUrl} alt={`${product.brand} ${product.name}`} loading="lazy" />
                <span className={styles.tierBadge}>{tierLabels[product.tier]}</span>
              </div>
              <div className={styles.productContent}>
                <p className={styles.productBrand}>{product.brand}</p>
                <h4 className={styles.productName}>{product.name}</h4>
                <p className={styles.productStory}>{product.story}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.featuredCta}>
          <Link href="/products" className={styles.ctaButton}>
            Explore All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
