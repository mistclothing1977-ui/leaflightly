import ProductFilter from '@/components/ProductFilter';
import styles from '../kitchen/page.module.css';

export const metadata = {
  title: 'Beauty — Leaf Lightly',
  description: 'Clean, sustainable beauty products for healthy skin and self-care',
};

export default function BeautyPage() {
  return (
    <div className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1>Beauty</h1>
        <p>
          Discover clean beauty products that are good for your skin and good for the planet.
          All recommended brands prioritize ingredient transparency and sustainable sourcing.
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
        <ProductFilter category="beauty" categoryName="Beauty" />
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>Invest in Clean Beauty</h2>
        <p>
          When you shop through our affiliate links, we earn a small commission at no extra cost to you.
          All proceeds support sustainable beauty curation and research.
        </p>
      </section>
    </div>
  );
}
