import ProductFilter from '@/components/ProductFilter';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import BrandCard from '@/components/BrandCard';
import { brands, brandMatches } from '@/data/brands';
import { getAllProducts } from '@/lib/catalogue';
import styles from './page.module.css';

// Feed products change daily, so the page is rebuilt at most once an hour.
export const revalidate = 3600;

export const metadata = {
  title: 'All Products — Leaf Lightly',
  description:
    'Browse every vetted sustainable product on Leaf Lightly. Filter by category, tier, certification, price and rating, and sort by price, rating or reviews.',
};

export default async function AllProductsPage() {
  const products = await getAllProducts();
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>All Products</h1>
        <p>
          Every product we&apos;ve vetted, across kitchen, fashion, lifestyle, beauty and wellness.
          Narrow the list by category, tier, certification, price or rating, and sort by what matters to you.
        </p>
      </section>

      <section className={styles.gridSection}>
        <AffiliateDisclosure />
        <ProductFilter showCategories items={products} />
      </section>

      {brands.length > 0 && (
        <section className={styles.gridSection}>
          <h2>Shop by brand</h2>
          <p>Brands we trust. Each page explains what we checked and lists their products.</p>
          <div className={styles.brandGrid}>
            {brands.map((brand) => (
              <BrandCard
                key={brand.slug}
                brand={brand}
                productCount={products.filter((p) => brandMatches(brand, p.brand)).length}
              />
            ))}
          </div>
        </section>
      )}

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
