import { getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import styles from '../kitchen/page.module.css';

export const metadata = {
  title: 'Home — Leaf Lightly',
  description: 'Sustainable home products and eco-friendly household essentials',
};

export default function HomePage() {
  const products = getProductsByCategory('home');

  return (
    <div className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1>Home</h1>
        <p>
          Create a sustainable home with eco-friendly products that work beautifully and responsibly.
          From cleaning to décor, every item is thoughtfully selected for impact.
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

      {/* Products Grid */}
      <section className={styles.products}>
        <div className={styles.productGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>Build a Sustainable Home</h2>
        <p>
          When you shop through our affiliate links, we earn a small commission at no extra cost to you.
          All proceeds support sustainable living curation and research.
        </p>
      </section>
    </div>
  );
}
