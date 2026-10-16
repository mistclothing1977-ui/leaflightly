import ProductFilter from '@/components/ProductFilter';
import { getAllProducts } from '@/lib/catalogue';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import styles from '../kitchen/page.module.css';

export const metadata = {
  title: 'Lifestyle — Leaf Lightly',
  description: 'Sustainable lifestyle products for eco-conscious living',
};

export const revalidate = 3600;

export default async function LifestylePage() {
  const items = await getAllProducts();
  return (
    <div className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1>Lifestyle</h1>
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

      {/* Products with Filtering */}
      <section className={styles.products}>
        <AffiliateDisclosure />
        <ProductFilter items={items} category="lifestyle" categoryName="Lifestyle" />
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>Build a Sustainable Lifestyle</h2>
        <p>
          When you shop through our affiliate links, we earn a small commission at no extra cost to you.
          All proceeds support sustainable living curation and research.
        </p>
      </section>
    </div>
  );
}
