import { products } from '@/data/products';
import { certificationLabels, tierLabels } from '@/lib/product-labels';
import { getReviewsForProduct, getAverageRating } from '@/data/reviews';
import ReviewsSection from '@/components/ReviewsSection';
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

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Get reviews for this product
  const reviews = getReviewsForProduct();
  const averageRating = getAverageRating(reviews);

  return (
    <article className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href={`/products/${product.category}`}>
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
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
            <a href={product.productUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
              View on Amazon
            </a>
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
          Browse other Tier {product.tier} products in {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </p>
      </section>

      {/* Customer Reviews */}
      <ReviewsSection
        productName={product.name}
        overallRating={averageRating}
        totalReviews={product.reviewCount}
        reviews={reviews}
      />
    </article>
  );
}
