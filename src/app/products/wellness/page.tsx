import ProductFilter from '@/components/ProductFilter';
import styles from '../kitchen/page.module.css';

export const metadata = {
  title: 'Wellness — Leaf Lightly',
  description: 'Sustainable wellness products and gear for a healthier lifestyle',
};

export default function WellnessPage() {
  return (
    <div className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1>Wellness</h1>
        <p>
          Support your physical and mental wellbeing with sustainably-made wellness products.
          From yoga to meditation, every item promotes health for you and the planet.
        </p>
      </section>

      {/* Tier Explanation */}
      <section className={styles.tiers}>
        <div className={styles.tierBox}>
          <span className={styles.tierLabel}>TIER A</span>
          <p>Certified Eco — B Corp, FSC, or equivalent</p>
        </div>
        <div className={styles.tierBox}>
          <span className={styles.tierLabel}>TIER B</span>
          <p>Eco-Community Validated</p>
        </div>
        <div className={styles.tierBox}>
          <span className={styles.tierLabel}>TIER C</span>
          <p>Plastic-Free + Material-Transparent</p>
        </div>
      </section>

      {/* Products with Filtering */}
      <section className={styles.products}>
        <ProductFilter category="wellness" categoryName="Wellness" />
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>Wellness with Purpose</h2>
        <p>
          When you shop through our affiliate links, we earn a small commission at no extra cost to you.
          All proceeds support sustainable wellness curation and research.
        </p>
      </section>
    </div>
  );
}
