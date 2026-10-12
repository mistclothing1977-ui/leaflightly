import { products } from '@/data/products';
import Link from 'next/link';
import styles from './page.module.css';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '' } = await searchParams;
  const query = decodeURIComponent(q).toLowerCase();

  // Filter products
  const results = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
  );

  // Sort by relevance (name match first, then brand)
  const sorted = results.sort((a, b) => {
    const aNameMatch = a.name.toLowerCase().startsWith(query);
    const bNameMatch = b.name.toLowerCase().startsWith(query);
    if (aNameMatch && !bNameMatch) return -1;
    if (!aNameMatch && bNameMatch) return 1;
    return 0;
  });

  return (
    <main className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Search Results</h1>
        {query && (
          <p className={styles.query}>
            Results for <strong>"{query}"</strong>
          </p>
        )}
        <p className={styles.count}>
          {sorted.length} product{sorted.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Results */}
      {sorted.length > 0 ? (
        <div className={styles.grid}>
          {sorted.map((product) => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className={styles.productCard}
              >
                {/* Image */}
                <div className={styles.imageContainer}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className={styles.productImage}
                  />
                  {discount > 0 && (
                    <div className={styles.discountBadge}>
                      -{discount}%
                    </div>
                  )}
                  <div className={styles.tierBadge} data-tier={product.tier}>
                    {product.tier}
                  </div>
                </div>

                {/* Content */}
                <div className={styles.content}>
                  <p className={styles.brand}>{product.brand}</p>
                  <h3 className={styles.productName}>{product.name}</h3>

                  {/* Category */}
                  <p className={styles.category}>
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </p>

                  {/* Price */}
                  <div className={styles.price}>
                    <span className={styles.current}>£{product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className={styles.original}>
                        £{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className={styles.rating}>
                    <span className={styles.stars}>★★★★★</span>
                    <span className={styles.ratingValue}>{product.rating}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className={styles.noResults}>
          <div className={styles.noResultsContent}>
            <p className={styles.noResultsTitle}>No products found</p>
            <p className={styles.noResultsText}>
              {query
                ? `We couldn't find any products matching "${query}". Try searching for a different term.`
                : 'Enter a search term to find products.'}
            </p>
            <Link href="/" className={styles.browseButton}>
              Browse All Products
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
