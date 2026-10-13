'use client';

import styles from './ImpactCounter.module.css';

export default function ImpactCounter() {
  const metrics = [
    { number: '500+', label: 'Curated Products' },
    { number: '200+', label: 'Sustainable Brands' },
    { number: '5', label: 'Categories' },
    { number: '100%', label: 'Verified Certifications' },
  ];

  return (
    <section className={styles.impactSection}>
      <div className={styles.impactContainer}>
        <h2 className={styles.sectionLabel}>Impact by Numbers</h2>
        <div className={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <div key={index} className={styles.metricCard}>
              <div className={styles.metricNumber}>{metric.number}</div>
              <div className={styles.metricLabel}>{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
