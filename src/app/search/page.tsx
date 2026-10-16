import { getAllProducts } from '@/lib/catalogue';
import Link from 'next/link';
import styles from './page.module.css';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    sort?: string;
    tier?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '', sort = 'relevance', tier = 'all' } = await searchParams;
  const products = await getAllProducts();
  const query = decodeURIComponent(q).toLowerCase();

  // Filter products
  let results = products.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query);

    const matchesTier = tier === 'all' || p.tier === tier;

    return matchesQuery && matchesTier;
  });

  // Sort by relevance, price, or rating
  const sorted = results.sort((a, b) => {
    switch (sort) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'relevance':
      default:
        const aNameMatch = a.name.toLowerCase().startsWith(query);
        const bNameMatch = b.name.toLowerCase().startsWith(query);
        if (aNameMatch && !bNameMatch) return -1;
        if (!aNameMatch && bNameMatch) return 1;
        return 0;
    }
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

      <div className={styles.layout}>
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Sustainability Tier</h3>
            <div className={styles.filterOptions}>
              <Link
                href={`/search?q=${encodeURIComponent(q)}&sort=${sort}`}
                className={tier === 'all' ? styles.filterActive : ''}
                aria-current={tier === 'all' ? 'page' : undefined}
              >
                All Tiers
              </Link>
              {['A', 'B', 'C'].map((t) => (
                <Link
                  key={t}
                  href={`/search?q=${encodeURIComponent(q)}&sort=${sort}&tier=${t}`}
                  className={tier === t ? styles.filterActive : ''}
                  aria-current={tier === t ? 'page' : undefined}
                >
                  Tier {t}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Results */}
        <div className={styles.main}>
          {/* Sort Controls */}
          <div className={styles.controls}>
            <span className={styles.sortLabel}>Sort by:</span>
            <div className={styles.sortButtons}>
              {['relevance', 'price-low', 'price-high', 'rating'].map((s) => (
                <Link
                  key={s}
                  href={`/search?q=${encodeURIComponent(q)}&sort=${s}${tier !== 'all' ? `&tier=${tier}` : ''}`}
                  className={sort === s ? styles.sortButtonActive : styles.sortButton}
                >
                  {s === 'relevance' && 'Relevance'}
                  {s === 'price-low' && 'Price: Low to High'}
                  {s === 'price-high' && 'Price: High to Low'}
                  {s === 'rating' && 'Rating'}
                </Link>
              ))}
            </div>
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
                  <div className={styles.rating} aria-label={`${product.rating} out of 5 stars`}>
                    <span className={styles.stars} aria-hidden="true">★★★★★</span>
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
        </div>
      </div>
    </main>
  );
}
