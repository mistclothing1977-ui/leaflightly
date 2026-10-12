import ProductFilter from '@/components/ProductFilter';
import styles from './page.module.css';

export const metadata = {
  title: 'Kitchen Products — Leaf Lightly',
  description: 'Discover eco-friendly, plastic-free kitchen products. Certified sustainable brands with real reviews.',
};

export default function KitchenPage() {
  return (
    <div className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1>Kitchen</h1>
        <p>
          Thoughtfully-made tools and storage for a plastic-free kitchen.
          From certified sustainable brands to verified eco alternatives.
        </p>
      </section>

      {/* Tier indicators */}
      <section className={styles.tiers}>
        <div className={styles.tier}>
          <span className={styles.tierBadge}>Tier A</span>
          <p>Certified Eco — B Corp, FSC, or equivalent</p>
        </div>
        <div className={styles.tier}>
          <span className={styles.tierBadge}>Tier B</span>
          <p>Eco-Community Validated</p>
        </div>
        <div className={styles.tier}>
          <span className={styles.tierBadge}>Tier C</span>
          <p>Plastic-Free + Material-Transparent</p>
        </div>
      </section>

      {/* Filtered Products */}
      <section className={styles.gridSection}>
        <ProductFilter category="kitchen" categoryName="Kitchen" />
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>Ready to switch?</h2>
        <p>
          All products link directly to trusted retailers.
          We earn a small commission if you buy through our links — at no extra cost to you.
        </p>
      </section>
    </div>
  );
}
