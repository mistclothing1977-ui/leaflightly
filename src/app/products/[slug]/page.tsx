import { products } from '@/data/products';
import { certificationLabels, tierLabels } from '@/lib/product-labels';
import ReviewsSection from '@/components/ReviewsSection';
import RelatedProductsCarousel from '@/components/RelatedProductsCarousel';
import CompareButton from '@/components/CompareButton';
import BuyNowButton from '@/components/BuyNowButton';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import WishlistButton from '@/components/WishlistButton';
import { StructuredData } from '@/components/StructuredData';
import { generateMetadata as generatePageMetadata, generateProductSchema, generateOrganizationSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { buildAmazonLink } from '@/lib/affiliateLinks';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'This product could not be found.',
    };
  }

  return generatePageMetadata({
    title: `${product.name} | Leaf Lightly`,
    description: `Buy sustainable ${product.name} by ${product.brand}. Tier ${product.tier} certified eco-friendly product. ⭐ ${product.rating} rating.`,
    keywords: [
      product.name,
      product.brand,
      product.category,
      'sustainable',
      'eco-friendly',
      'organic',
    ],
    image: product.imageUrl,
    imageAlt: product.name,
    url: `https://leaflightly.com/products/${product.id}`,
    type: 'product',
  });
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

  // Generate structured data
  const productSchema = generateProductSchema({
    id: product.id,
    name: product.name,
    description: `High-quality ${product.name} by ${product.brand}. Certified sustainable product.`,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.imageUrl,
    rating: product.rating,
    reviewCount: product.reviewCount,
    category: product.category,
    brand: product.brand,
    url: `https://leaflightly.com/products/${product.id}`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://leaflightly.com' },
    {
      name: product.category.charAt(0).toUpperCase() + product.category.slice(1),
      url: `https://leaflightly.com/products/${product.category}`,
    },
    { name: product.name, url: `https://leaflightly.com/products/${product.id}` },
  ]);

  const organizationSchema = generateOrganizationSchema();

  return (
    <article className={styles.container}>
      <StructuredData data={productSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={organizationSchema} />

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
            <div className={styles.ctaRow}>
              <BuyNowButton
                retailers={[
                  {
                    retailer: 'Amazon',
                    url: buildAmazonLink(product.name),
                    icon: '🛒',
                  },
                ]}
              />
              <WishlistButton productId={product.id} />
            </div>
            <AffiliateDisclosure />
            <CompareButton productId={product.id} productName={product.name} />
          </div>
        </div>
      </div>

      {/* Related products */}
      <RelatedProductsCarousel
        currentProductId={product.id}
        category={product.category}
        tier={product.tier}
        allProducts={products}
      />

      {/* Customer Reviews */}
      <ReviewsSection productId={product.id} productName={product.name} />
    </article>
  );
}
