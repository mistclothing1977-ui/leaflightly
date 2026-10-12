'use client';

import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import { Tier, Certification } from '@/data/products';
import ProductCard from './ProductCard';
import styles from './ProductFilter.module.css';

interface ProductFilterProps {
  category: string;
  categoryName: string;
}

const CERTIFICATIONS: { value: Certification; label: string }[] = [
  { value: 'b-corp', label: 'B Corp' },
  { value: 'fsc', label: 'FSC Certified' },
  { value: 'organic', label: 'Organic' },
  { value: 'plastic-free', label: 'Plastic-Free' },
  { value: 'compostable', label: 'Compostable' },
  { value: 'fair-trade', label: 'Fair Trade' },
];

export default function ProductFilter({ category, categoryName }: ProductFilterProps) {
  // Filter state
  const [selectedTiers, setSelectedTiers] = useState<Tier[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<Certification[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(true);

  // Get category products
  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.category === category);
  }, [category]);

  // Calculate price range
  const priceRange = useMemo(() => {
    if (categoryProducts.length === 0) return { min: 0, max: 500 };
    const prices = categoryProducts.map((p) => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [categoryProducts]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      // Tier filter
      if (selectedTiers.length > 0 && !selectedTiers.includes(product.tier)) {
        return false;
      }

      // Certification filter
      if (selectedCertifications.length > 0) {
        const hasCert = selectedCertifications.some((cert) =>
          product.certifications.includes(cert)
        );
        if (!hasCert) return false;
      }

      // Price filter
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      // Rating filter
      if (product.rating < minRating) {
        return false;
      }

      return true;
    });
  }, [categoryProducts, selectedTiers, selectedCertifications, minPrice, maxPrice, minRating]);

  const toggleTier = (tier: Tier) => {
    setSelectedTiers((prev) =>
      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]
    );
  };

  const toggleCertification = (cert: Certification) => {
    setSelectedCertifications((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  };

  const resetFilters = () => {
    setSelectedTiers([]);
    setSelectedCertifications([]);
    setMinPrice(priceRange.min);
    setMaxPrice(priceRange.max);
    setMinRating(0);
  };

  const hasActiveFilters =
    selectedTiers.length > 0 ||
    selectedCertifications.length > 0 ||
    minPrice > priceRange.min ||
    maxPrice < priceRange.max ||
    minRating > 0;

  return (
    <div className={styles.container}>
      {/* Toggle Button (Mobile) */}
      <button
        className={styles.filterToggle}
        onClick={() => setShowFilters(!showFilters)}
        aria-label="Toggle filters"
      >
        🔍 Filters {hasActiveFilters && <span className={styles.badge}>{1}</span>}
      </button>

      {/* Filter Panel */}
      <div className={`${styles.filterPanel} ${showFilters ? styles.visible : ''}`}>
        <div className={styles.filterHeader}>
          <h3>Filter</h3>
          {hasActiveFilters && (
            <button className={styles.resetButton} onClick={resetFilters}>
              Reset
            </button>
          )}
        </div>

        {/* Tier Filter */}
        <div className={styles.filterGroup}>
          <h4>Tier</h4>
          <div className={styles.checkboxGroup}>
            {(['A', 'B', 'C'] as Tier[]).map((tier) => (
              <label key={tier} className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={selectedTiers.includes(tier)}
                  onChange={() => toggleTier(tier)}
                />
                <span>Tier {tier}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className={styles.filterGroup}>
          <h4>Price Range</h4>
          <div className={styles.priceInputs}>
            <input
              type="number"
              min={priceRange.min}
              max={priceRange.max}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              placeholder="Min"
              className={styles.input}
            />
            <span>—</span>
            <input
              type="number"
              min={priceRange.min}
              max={priceRange.max}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              placeholder="Max"
              className={styles.input}
            />
          </div>
          <div className={styles.priceDisplay}>
            £{minPrice} - £{maxPrice}
          </div>
        </div>

        {/* Rating Filter */}
        <div className={styles.filterGroup}>
          <h4>Minimum Rating</h4>
          <div className={styles.ratingOptions}>
            {[0, 4, 4.5, 4.8].map((rating) => (
              <label key={rating} className={styles.radio}>
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === rating}
                  onChange={() => setMinRating(rating)}
                />
                <span>
                  {rating === 0 ? 'All' : `${rating}★ & up`}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Certification Filter */}
        <div className={styles.filterGroup}>
          <h4>Certifications</h4>
          <div className={styles.checkboxGroup}>
            {CERTIFICATIONS.map(({ value, label }) => (
              <label key={value} className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={selectedCertifications.includes(value)}
                  onChange={() => toggleCertification(value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className={styles.resultsCount}>
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Products Grid */}
      <div className={styles.productsSection}>
        {filteredProducts.length > 0 ? (
          <div className={styles.grid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <p>No products match your filters.</p>
            <button className={styles.resetButtonAlt} onClick={resetFilters}>
              Clear filters and try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
