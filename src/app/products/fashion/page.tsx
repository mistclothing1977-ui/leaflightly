import ProductFilter from '@/components/ProductFilter';
import { getAllProducts } from '@/lib/catalogue';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import styles from '../kitchen/page.module.css';

export const metadata = {
  title: 'Fashion — Leaf Lightly',
  description: 'Sustainable, ethical fashion from brands that care',
};

export const revalidate = 3600;

export default async function FashionPage() {
  const items = await getAllProducts();
  return (
    <div className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1>Fashion</h1>
        <p>
          Ethical clothing and accessories from brands committed to fair wages, sustainable materials,
          and transparent supply chains.
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
        <ProductFilter items={items} category="fashion" categoryName="Fashion" />
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>Support Ethical Fashion</h2>
        <p>
          When you shop through our affiliate links, we earn a small commission at no extra cost to you.
          All proceeds support sustainable fashion curation and research.
        </p>
      </section>
    </div>
  );
}
