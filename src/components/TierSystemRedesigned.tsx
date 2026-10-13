'use client';

import Link from 'next/link';
import styles from './TierSystemRedesigned.module.css';

export default function TierSystemRedesigned() {
  const tiers = [
    {
      id: 'essential',
      name: 'Essential',
      tagline: 'Transparent & Honest',
      description: 'Verified sustainable with clear certifications and material sourcing.',
      cta: 'Shop Essential',
      badge: '🌱',
    },
    {
      id: 'premium',
      name: 'Premium',
      tagline: 'Beyond Standards',
      description: 'Highest sustainability standards with exceptional transparency and impact.',
      cta: 'Shop Premium',
      badge: '✨',
    },
  ];

  return (
    <section className={styles.tierSection}>
      <div className={styles.tierContainer}>
        <div className={styles.tierHeader}>
          <h2 className={styles.sectionLabel}>Sustainability Tiers</h2>
          <h3 className={styles.tierTitle}>Choose What Aligns With You</h3>
        </div>

        <div className={styles.tiersWrapper}>
          {tiers.map((tier, index) => (
            <div
              key={tier.id}
              className={`${styles.tierCard} ${index === 0 ? styles.tierCardPrimary : styles.tierCardSecondary}`}
            >
              <div className={styles.tierBadge}>{tier.badge}</div>
              <h4 className={styles.tierName}>{tier.name}</h4>
              <p className={styles.tierTagline}>{tier.tagline}</p>
              <p className={styles.tierDescription}>{tier.description}</p>
              <Link href={`/products?tier=${tier.id}`} className={styles.tierCta}>
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
