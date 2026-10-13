'use client';

import Link from 'next/link';
import { products, Tier } from '@/data/products';
import { tierLabels } from '@/lib/product-labels';
import ProductCard from './ProductCard';
import styles from './TierShowcase.module.css';

const TIER_CONFIG: Record<Tier, { color: string; tagline: string }> = {
  A: {
    color: '#2d5a3d',
    tagline: 'Certified Sustainable',
  },
  B: {
    color: '#4a90c2',
    tagline: 'Community Validated',
  },
  C: {
    color: '#7a7a70',
    tagline: 'Materials You Can Trust',
  },
};

export default function TierShowcase() {
  const getTierProducts = (tier: Tier) => {
    return products.filter((p) => p.tier === tier).slice(0, 2);
  };

  const tiers: Tier[] = ['A', 'B', 'C'];

  return (
    <section className={styles.tierShowcase}>
      <div className={styles.header}>
        <h2>Why Leaf Lightly?</h2>
        <p className={styles.subtitle}>
          Our three-tier system ensures every product meets real sustainability standards
        </p>
      </div>

      <div className={styles.tiersGrid}>
        {tiers.map((tier) => {
          const tierProducts = getTierProducts(tier);
          const config = TIER_CONFIG[tier];

          return (
            <div key={tier} className={styles.tierColumn}>
              {/* Tier Header */}
              <div
                className={styles.tierHeader}
                style={{ borderTopColor: config.color }}
              >
                <div
                  className={styles.tierBadge}
                  style={{ backgroundColor: config.color }}
                >
                  Tier {tier}
                </div>
                <h3 className={styles.tierName}>{tierLabels[tier]}</h3>
                <p className={styles.tierTagline}>{config.tagline}</p>
              </div>

              {/* Products */}
              <div className={styles.productsContainer}>
                {tierProducts.map((product) => (
                  <div key={product.id} className={styles.productCardWrapper}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className={styles.tierDescription}>
                {tier === 'A' && (
                  <p>
                    Only fully certified sustainable products with verifiable credentials like FSC, B Corp, or Organic certification.
                  </p>
                )}
                {tier === 'B' && (
                  <p>
                    Strong sustainability practices validated by our community and verified reviews. Genuine commitment to transparency.
                  </p>
                )}
                {tier === 'C' && (
                  <p>
                    Plastic-free and material-transparent products with clear sustainability communication. Building the future.
                  </p>
                )}
              </div>

              {/* Partner Logos (lazy loaded) */}
              <div className={styles.partnerLogos}>
                <span className={styles.logoLabel}>Verified on</span>
                <div className={styles.logos}>
                  {tier === 'A' && (
                    <>
                      <span className={styles.logo}>Amazon</span>
                      <span className={styles.logo}>Trustpilot</span>
                    </>
                  )}
                  {tier === 'B' && (
                    <>
                      <span className={styles.logo}>Trustpilot</span>
                      <span className={styles.logo}>Reviews.io</span>
                    </>
                  )}
                  {tier === 'C' && (
                    <>
                      <span className={styles.logo}>Amazon</span>
                      <span className={styles.logo}>Independent</span>
                    </>
                  )}
                </div>
              </div>

              {/* View All Link */}
              <Link href={`/products/kitchen?tier=${tier}`} className={styles.viewAllLink}>
                View all Tier {tier} products →
              </Link>
            </div>
          );
        })}
      </div>

      {/* Trust Statement */}
      <div className={styles.trustStatement}>
        <h3>Our Curation Process</h3>
        <ul className={styles.trustList}>
          <li>Real customer reviews from Amazon and Trustpilot</li>
          <li>Transparent affiliate relationships — we always disclose</li>
          <li>Editorial curation, not algorithmic — real humans choose</li>
          <li>UK-first focus on authentic sustainable shopping</li>
        </ul>
      </div>
    </section>
  );
}
