'use client';

import Link from 'next/link';
import styles from './FeaturedProducts.module.css';

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      brand: 'Patagonia',
      name: 'Organic Cotton T-Shirt',
      story: 'Made from 100% organic cotton with zero synthetic dyes',
      image: 'https://via.placeholder.com/400x400',
      tier: 'Premium',
    },
    {
      id: 2,
      brand: 'Allbirds',
      name: 'Wool Runners',
      story: 'Sustainably sourced merino wool and sugarcane-based foam',
      image: 'https://via.placeholder.com/400x400',
      tier: 'Essential',
    },
    {
      id: 3,
      brand: 'Package Free Shop',
      name: 'Bamboo Toothbrush',
      story: 'Biodegradable handle with nylon bristles for zero waste',
      image: 'https://via.placeholder.com/400x400',
      tier: 'Essential',
    },
    {
      id: 4,
      brand: 'Pela',
      name: 'Plant-Based Phone Case',
      story: 'Flaxseed fibers blended with plant-based plastics',
      image: 'https://via.placeholder.com/400x400',
      tier: 'Premium',
    },
    {
      id: 5,
      brand: 'Everlane',
      name: 'Recycled Nylon Backpack',
      story: 'Made from 100% recycled ocean-bound plastic nylon',
      image: 'https://via.placeholder.com/400x400',
      tier: 'Essential',
    },
    {
      id: 6,
      brand: 'Rothy\'s',
      name: 'Knit Ballet Flats',
      story: 'Crafted from recycled plastic bottles with zero waste',
      image: 'https://via.placeholder.com/400x400',
      tier: 'Premium',
    },
  ];

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
                <img src={product.image} alt={product.name} />
                <span className={styles.tierBadge}>{product.tier}</span>
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
