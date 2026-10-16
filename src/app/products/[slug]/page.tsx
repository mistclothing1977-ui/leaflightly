import { getAllProducts } from '@/lib/catalogue';
import { certificationLabels, tierLabels } from '@/lib/product-labels';
import ReviewsSection from '@/components/ReviewsSection';
import RelatedProductsCarousel from '@/components/RelatedProductsCarousel';
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
  const products = await getAllProducts();
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
  const products = await getAllProducts();
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

      {/* Header Section */}
      <header className={styles.header}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <ol className={styles.breadcrumbList}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href={`/products/${product.category}`}>
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </li>
            <li aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>
        <h1 className={styles.title}>{product.name}</h1>
      </header>

      {/* Main content grid: 60% image, 40% info */}
      <div className={styles.grid}>
        {/* Left: Image Section */}
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className={styles.image}
            />
            {discount > 0 && (
              <div className={styles.discountBadge}>
                -{discount}%
              </div>
            )}
          </div>
        </div>

        {/* Right: Sticky Purchase Section */}
        <aside className={styles.sidebar}>
          {/* Quick Purchase Card (Sticky) */}
          <div className={styles.purchaseCard}>
            {/* Brand & Rating */}
            <p className={styles.brand}>{product.brand}</p>
            {product.reviewCount > 0 && (
              <div className={styles.rating} aria-label={`${product.rating} out of 5 stars, ${product.reviewCount.toLocaleString()} reviews`}>
                <span className={styles.stars} aria-hidden="true">★★★★★</span>
                <span className={styles.ratingValue}>{product.rating}</span>
                <span className={styles.reviewCount}>
                  ({product.reviewCount.toLocaleString()})
                </span>
              </div>
            )}

            {/* Tier Badge */}
            <div className={styles.tierBadge}>
              <span className={styles.tierLabel}>Tier {product.tier}</span>
              <span className={styles.tierDesc}>{tierLabels[product.tier]}</span>
            </div>

            {/* Price */}
            <div className={styles.priceSection}>
              <span className={styles.currentPrice}>
                £{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className={styles.originalPrice}>
                  £{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* CTA Buttons */}
            <div className={styles.ctaButtons}>
              <BuyNowButton
                retailers={[
                  product.affiliateNetwork === 'awin'
                    ? { retailer: product.brand, url: product.productUrl, icon: '🛒' }
                    : { retailer: 'Amazon', url: buildAmazonLink(product.name), icon: '🛒' },
                ]}
              />
              <WishlistButton productId={product.id} />
            </div>

            {product.variants && product.variants.length > 1 && (
              <div className={styles.options}>
                <h3>Options</h3>
                <ul>
                  {product.variants.map((v) => (
                    <li key={v.id}>
                      <a href={v.productUrl} target="_blank" rel="noopener noreferrer sponsored">
                        {v.label}
                      </a>
                      <span> £{v.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Affiliate Disclosure */}
            <AffiliateDisclosure amazon={product.affiliateNetwork !== 'awin'} />
          </div>

          {/* Certifications */}
          {product.certifications.length > 0 && (
            <div className={styles.certificationsCard}>
              <h3 className={styles.cardTitle}>Certifications</h3>
              <div className={styles.certBadges}>
                {product.certifications.map((cert) => (
                  <span key={cert} className={styles.certBadge}>
                    {certificationLabels[cert]}
                  </span>
                ))}
              </div>
            </div>
          )}
          {product.brandClaims && product.brandClaims.length > 0 && (
            <div className={styles.certificationsCard}>
              <h3 className={styles.cardTitle}>The brand states</h3>
              <ul>
                {product.brandClaims.map((claim) => (
                  <li key={claim}>{claim}</li>
                ))}
              </ul>
              <p>These are the brand&apos;s own claims. We have not verified them.</p>
            </div>
          )}
        </aside>
      </div>

      {/* Product Specs Section */}
      <section className={styles.specsSection}>
        <h2 className={styles.sectionTitle}>Product Details</h2>
        <div className={styles.specs}>
          <div className={styles.spec}>
            <dt className={styles.specLabel}>Category</dt>
            <dd className={styles.specValue}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </dd>
          </div>
        </div>
      </section>

      {/* Curation Statement (Trust Signal) */}
      <section className={styles.curationSection}>
        <h2 className={styles.sectionTitle}>Why We Picked This</h2>
        <p className={styles.curationText}>
          We spent weeks researching this product and verified its sustainability claims
          against official certifications. Every item on Leaf Lightly meets our strict standards
          for environmental impact and ethical production.
        </p>
      </section>

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
