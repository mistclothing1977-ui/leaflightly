'use client';

import { useState, useEffect } from 'react';
import { products } from '@/data/products';
import { Product } from '@/data/products';
import { certificationLabels, tierLabels } from '@/lib/product-labels';
import Link from 'next/link';
import styles from './page.module.css';

export default function ComparePage() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [allProducts] = useState(products);
  const [mounted, setMounted] = useState(false);

  // Load from URL params and localStorage on mount
  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const productIds = params.get('products')?.split(',').filter(Boolean) || [];

    // Also check localStorage for backup
    const saved = localStorage.getItem('compareList');
    const compareList = productIds.length > 0 ? productIds : (saved ? JSON.parse(saved) : []);

    const selected = compareList
      .map((id: string) => products.find((p) => p.id === id))
      .filter(Boolean);

    setSelectedProducts(selected as Product[]);
  }, []);

  const handleRemoveProduct = (productId: string) => {
    const newSelected = selectedProducts.filter((p) => p.id !== productId);
    setSelectedProducts(newSelected);

    // Update URL
    if (newSelected.length > 0) {
      const newIds = newSelected.map((p) => p.id).join(',');
      window.history.replaceState(null, '', `/compare?products=${newIds}`);
    } else {
      window.history.replaceState(null, '', '/compare');
    }

    // Update localStorage
    const newList = newSelected.map((p) => p.id);
    if (newList.length > 0) {
      localStorage.setItem('compareList', JSON.stringify(newList));
    } else {
      localStorage.removeItem('compareList');
    }
  };

  const handleAddProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product && selectedProducts.length < 4) {
      const newSelected = [...selectedProducts, product];
      setSelectedProducts(newSelected);

      // Update URL
      const newIds = newSelected.map((p) => p.id).join(',');
      window.history.replaceState(null, '', `/compare?products=${newIds}`);

      // Update localStorage
      localStorage.setItem('compareList', JSON.stringify(newSelected.map((p) => p.id)));
    }
  };

  if (!mounted) return null;

  const availableProducts = allProducts.filter(
    (p) => !selectedProducts.find((sp) => sp.id === p.id)
  );

  return (
    <main className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Compare Products</h1>
          <p className={styles.subtitle}>
            {selectedProducts.length === 0
              ? 'Add up to 4 products to compare side-by-side'
              : `Comparing ${selectedProducts.length} product${selectedProducts.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        {selectedProducts.length > 0 && (
          <button
            className={styles.clearButton}
            onClick={() => {
              setSelectedProducts([]);
              window.history.replaceState(null, '', '/compare');
              localStorage.removeItem('compareList');
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {selectedProducts.length === 0 ? (
        <div className={styles.empty}>
          <p>No products selected for comparison</p>
          <Link href="/" className={styles.browseButton}>
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          {/* Comparison Table */}
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <tbody>
                {/* Product Row */}
                <tr className={styles.productRow}>
                  <td className={styles.label}>Product</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className={styles.cell}>
                      <div className={styles.productInfo}>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className={styles.productImage}
                        />
                        <div>
                          <p className={styles.productName}>{product.name}</p>
                          <p className={styles.productBrand}>{product.brand}</p>
                        </div>
                        <button
                          className={styles.removeButton}
                          onClick={() => handleRemoveProduct(product.id)}
                          title="Remove from comparison"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Price Row */}
                <tr>
                  <td className={styles.label}>Price</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className={styles.cell}>
                      <div className={styles.priceCell}>
                        <span className={styles.price}>£{product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className={styles.originalPrice}>
                            £{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Category Row */}
                <tr>
                  <td className={styles.label}>Category</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className={styles.cell}>
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </td>
                  ))}
                </tr>

                {/* Tier Row */}
                <tr>
                  <td className={styles.label}>Tier</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className={styles.cell}>
                      <div className={styles.tierCell}>
                        <span className={styles.tierBadge} data-tier={product.tier}>
                          Tier {product.tier}
                        </span>
                        <p className={styles.tierDescription}>{tierLabels[product.tier]}</p>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Rating Row */}
                <tr>
                  <td className={styles.label}>Rating</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className={styles.cell}>
                      <div className={styles.ratingCell}>
                        <span className={styles.stars}>★★★★★</span>
                        <span className={styles.rating}>{product.rating}</span>
                        <span className={styles.reviewCount}>
                          ({product.reviewCount.toLocaleString()})
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Certifications Row */}
                <tr>
                  <td className={styles.label}>Certifications</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className={styles.cell}>
                      {product.certifications.length > 0 ? (
                        <div className={styles.certifications}>
                          {product.certifications.map((cert) => (
                            <span key={cert} className={styles.certification}>
                              {certificationLabels[cert]}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className={styles.none}>None</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* View Details Row */}
                <tr>
                  <td className={styles.label}>Details</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className={styles.cell}>
                      <Link href={`/products/${product.id}`} className={styles.viewLink}>
                        View Product →
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Add More Products */}
          {selectedProducts.length < 4 && availableProducts.length > 0 && (
            <div className={styles.addMore}>
              <h3 className={styles.addMoreTitle}>Add another product to compare</h3>
              <div className={styles.productList}>
                {availableProducts.slice(0, 8).map((product) => (
                  <button
                    key={product.id}
                    className={styles.addProductButton}
                    onClick={() => handleAddProduct(product.id)}
                  >
                    <img src={product.imageUrl} alt={product.name} />
                    <span className={styles.addProductName}>{product.name}</span>
                    <span className={styles.addButton}>+ Add</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
