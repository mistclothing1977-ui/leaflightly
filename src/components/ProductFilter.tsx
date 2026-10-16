'use client';

import { useState, useMemo } from 'react';
import { products as staticProducts } from '@/data/products';
import { Tier, Certification, Category, Product } from '@/data/products';
import ProductCard from './ProductCard';
import styles from './ProductFilter.module.css';

interface ProductFilterProps {
  /** Limit to one category (category pages). Omit for the all-products page. */
  category?: string;
  categoryName?: string;
  /** Show the category filter (all-products page only). */
  showCategories?: boolean;
  /** Products to filter. Defaults to the curated static list. */
  items?: Product[];
}

const CERTIFICATIONS: { value: Certification; label: string }[] = [
  { value: 'b-corp', label: 'B Corp' },
  { value: 'fsc', label: 'FSC Certified' },
  { value: 'organic', label: 'Organic' },
  { value: 'plastic-free', label: 'Plastic-Free' },
  { value: 'compostable', label: 'Compostable' },
  { value: 'fair-trade', label: 'Fair Trade' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'cosmos', label: 'COSMOS' },
  { value: 'leaping-bunny', label: 'Leaping Bunny' },
];

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'wellness', label: 'Wellness' },
];

type SortKey = 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'reviews' | 'name';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Highest rated' },
  { value: 'reviews', label: 'Most reviewed' },
  { value: 'name', label: 'Name A–Z' },
];

export default function ProductFilter({ category, showCategories = false, items }: ProductFilterProps) {
  const products = items ?? staticProducts;
  // Filter state
  const [selectedTiers, setSelectedTiers] = useState<Tier[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<Certification[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortKey>('recommended');
  const [showFilters, setShowFilters] = useState(true);

  // Products in scope: one category, or everything
  const categoryProducts = useMemo(() => {
    return category ? products.filter((p) => p.category === category) : products;
  }, [category, products]);

  // Calculate price range
  const priceRange = useMemo(() => {
    if (categoryProducts.length === 0) return { min: 0, max: 500 };
    const prices = categoryProducts.map((p) => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [categoryProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = categoryProducts.filter((product) => {
      // Category filter (all-products page)
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

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

    const sorted = [...filtered];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'reviews':
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break; // 'recommended' keeps catalogue order
    }
    return sorted;
  }, [categoryProducts, selectedCategories, selectedTiers, selectedCertifications, minPrice, maxPrice, minRating, sortBy]);

  const toggleCategory = (value: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

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
    setSelectedCategories([]);
    setSelectedTiers([]);
    setSelectedCertifications([]);
    setMinPrice(priceRange.min);
    setMaxPrice(priceRange.max);
    setMinRating(0);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
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

        {/* Category Filter (all-products page only) */}
        {showCategories && (
          <div className={styles.filterGroup}>
            <h4>Category</h4>
            <div className={styles.checkboxGroup}>
              {CATEGORIES.map(({ value, label }) => (
                <label key={value} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(value)}
                    onChange={() => toggleCategory(value)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

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
        <div className={styles.sortBar}>
          <label htmlFor="product-sort">Sort by</label>
          <select
            id="product-sort"
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
          >
            {SORT_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
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
