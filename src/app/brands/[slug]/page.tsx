import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllProducts } from '@/lib/catalogue';
import { brands, brandMatches, getBrand } from '@/data/brands';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return { title: 'Brand Not Found — Leaf Lightly' };
  return {
    title: `${brand.name} — Leaf Lightly`,
    description: brand.description,
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const products = await getAllProducts();
  const brandProducts = products.filter((p) => brandMatches(brand, p.brand));

  return (
    <div className={styles.container}>
      <nav className={styles.crumbs} aria-label="Breadcrumb">
        <Link href="/products">All Products</Link> / <span>{brand.name}</span>
      </nav>

      <section className={styles.hero}>
        <h1>{brand.name}</h1>
        <p>{brand.description}</p>
        {brand.brandClaims && brand.brandClaims.length > 0 && (
          <div className={styles.trust}>
            <strong>The brand states:</strong>
            <ul>
              {brand.brandClaims.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p>These are the brand&apos;s own claims. We have not verified them.</p>
          </div>
        )}
        <p className={styles.trust}>
          <strong>Our check:</strong> {brand.trustNote}
        </p>
      </section>

      <section className={styles.products}>
        <p className={styles.disclosure}>
          We earn a commission when you buy through the links on this page, at no extra cost to you.
        </p>
        <h2>{brandProducts.length > 0 ? `${brand.name} products` : `${brand.name} products coming soon`}</h2>
        {brandProducts.length > 0 ? (
          <div className={styles.grid}>
            {brandProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>
            We are loading {brand.name}&apos;s range from its affiliate feed. Check back soon, or browse{' '}
            <Link href="/products">all products</Link>.
          </p>
        )}
      </section>
    </div>
  );
}
