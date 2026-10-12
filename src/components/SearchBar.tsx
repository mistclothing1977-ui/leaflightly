'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<typeof products>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter products by query
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchQuery = query.toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery) ||
        p.brand.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery)
    );

    setResults(filtered.slice(0, 8));
    setIsOpen(true);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
          aria-label="Search products"
        />
        <button type="submit" className={styles.button} aria-label="Search">
          🔍
        </button>
      </form>

      {/* Dropdown Results */}
      {isOpen && query.trim().length > 0 && (
        <div className={styles.dropdown}>
          {results.length > 0 ? (
            <>
              <div className={styles.results}>
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className={styles.resultItem}
                    onClick={() => {
                      setQuery('');
                      setIsOpen(false);
                    }}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className={styles.resultImage}
                    />
                    <div className={styles.resultContent}>
                      <p className={styles.resultName}>{product.name}</p>
                      <p className={styles.resultBrand}>{product.brand}</p>
                      <p className={styles.resultPrice}>£{product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {results.length > 0 && (
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  className={styles.viewAll}
                >
                  View all results →
                </Link>
              )}
            </>
          ) : (
            <div className={styles.noResults}>
              <p>No products found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
