import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);

  if (!product) {
    notFound();
  }

  const certificationLabels: Record<string, string> = {
    'b-corp': 'B Corp',
    'fsc': 'FSC',
    'pefc': 'PEFC',
    'organic': 'Organic',
    'compostable': 'Compostable',
    'plastic-free': 'Plastic-Free',
    'fair-trade': 'Fair Trade',
    'carbon-neutral': 'Carbon Neutral',
    'vegan': 'Vegan',
  };

  const tierLabels: Record<string, string> = {
    A: 'Certified Eco',
    B: 'Eco-Community Validated',
    C: 'Plastic-Free + Material-Transparent',
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <article className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/products/kitchen">Kitchen</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      {/* Main content grid */}
      <div className={styles.grid}>
        {/* Image */}
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <img src={product.imageUrl} alt={product.name} className={styles.image} />
            {discount > 0 && (
              <div className={styles.discountBadge}>
                Save {discount}%
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className={styles.details}>
          <p className={styles.brand}>{product.brand}</p>
          <h1 className={styles.name}>{product.name}</h1>

          {/* Rating */}
          <div className={styles.rating}>
            <span className={styles.stars}>★★★★★</span>
            <span className={styles.ratingText}>{product.rating}</span>
            <span className={styles.reviews}>
              Based on {product.reviewCount.toLocaleString()} reviews
            </span>
          </div>

          {/* Price */}
          <div className={styles.price}>
            <span className={styles.current}>£{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className={styles.original}>
                Was £{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Certifications */}
          {product.certifications.length > 0 && (
            <div className={styles.certSection}>
              <h3>Certifications & Standards</h3>
              <div className={styles.badges}>
                {product.certifications.map((cert) => (
                  <span key={cert} className={styles.badge}>
                    {certificationLabels[cert]}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tier */}
          <div className={styles.tierSection}>
            <h3>Tier</h3>
            <p className={styles.tierDescription}>
              <strong>Tier {product.tier}</strong> — {tierLabels[product.tier]}
            </p>
          </div>

          {/* CTA */}
          <div className={styles.cta}>
            <button className={styles.ctaButton}>
              View on Amazon
            </button>
            <p className={styles.disclosure}>
              We earn a small affiliate commission if you purchase through this link — at no extra cost to you.
            </p>
          </div>
        </div>
      </div>

      {/* Related products */}
      <section className={styles.related}>
        <h2>Similar Products</h2>
        <p className={styles.relatedDescription}>
          Browse other Tier {product.tier} products in Kitchen
        </p>
      </section>
    </article>
  );
}
