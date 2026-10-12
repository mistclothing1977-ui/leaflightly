'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import styles from './AddToCartButton.module.css';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.quantityControl}>
        <label htmlFor="quantity" className={styles.label}>
          Quantity:
        </label>
        <div className={styles.controls}>
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className={styles.decrementButton}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            id="quantity"
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className={styles.quantityInput}
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className={styles.incrementButton}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className={`${styles.button} ${added ? styles.success : ''}`}
      >
        {added ? '✓ Added to Cart' : '🛒 Add to Cart'}
      </button>

      {added && (
        <div className={styles.successMessage}>
          <p>Added {quantity} item(s) to your cart</p>
          <Link href="/cart" className={styles.viewCartLink}>
            View Cart →
          </Link>
        </div>
      )}
    </div>
  );
}
