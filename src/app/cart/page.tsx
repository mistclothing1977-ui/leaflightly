'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import styles from './page.module.css';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, tax, shipping, total } = useCart();

  if (items.length === 0) {
    return (
      <main className={styles.container}>
        <div className={styles.emptyCart}>
          <h1 className={styles.emptyTitle}>Your Cart is Empty</h1>
          <p className={styles.emptyText}>Looks like you haven't added any products yet.</p>
          <Link href="/" className={styles.continueShopping}>
            Continue Shopping →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Shopping Cart</h1>

      <div className={styles.grid}>
        {/* Items */}
        <div className={styles.itemsSection}>
          <div className={styles.itemsList}>
            {items.map((item) => (
              <div key={item.product.id} className={styles.cartItem}>
                {/* Image */}
                <Link href={`/products/${item.product.id}`} className={styles.imageLink}>
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className={styles.image}
                  />
                </Link>

                {/* Product Info */}
                <div className={styles.productInfo}>
                  <Link
                    href={`/products/${item.product.id}`}
                    className={styles.productLink}
                  >
                    <h3 className={styles.productName}>{item.product.name}</h3>
                    <p className={styles.productBrand}>{item.product.brand}</p>
                  </Link>
                  <p className={styles.category}>
                    {item.product.category.charAt(0).toUpperCase() + item.product.category.slice(1)}
                  </p>
                </div>

                {/* Price */}
                <div className={styles.price}>
                  <span className={styles.priceLabel}>£{item.product.price.toFixed(2)}</span>
                </div>

                {/* Quantity */}
                <div className={styles.quantity}>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className={styles.quantityButton}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className={styles.quantityValue}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className={styles.quantityButton}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className={styles.subtotal}>
                  £{(item.product.price * item.quantity).toFixed(2)}
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.product.id)}
                  className={styles.removeButton}
                  title="Remove from cart"
                  aria-label="Remove from cart"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className={styles.summary}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            {/* Pricing */}
            <div className={styles.pricingRow}>
              <span className={styles.label}>Subtotal:</span>
              <span className={styles.value}>£{subtotal.toFixed(2)}</span>
            </div>

            <div className={styles.pricingRow}>
              <span className={styles.label}>VAT (20%):</span>
              <span className={styles.value}>£{tax.toFixed(2)}</span>
            </div>

            <div className={styles.pricingRow}>
              <span className={styles.label}>Shipping:</span>
              <span className={styles.value}>
                {shipping === 0 ? (
                  <span className={styles.free}>FREE</span>
                ) : (
                  `£${shipping.toFixed(2)}`
                )}
              </span>
            </div>

            {shipping === 0 && (
              <p className={styles.freeShippingNote}>Free shipping on orders over £50</p>
            )}

            {/* Total */}
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total:</span>
              <span className={styles.totalValue}>£{total.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout" className={styles.checkoutButton}>
              Proceed to Checkout
            </Link>

            {/* Continue Shopping */}
            <Link href="/" className={styles.continueLink}>
              Continue Shopping
            </Link>
          </div>

          {/* Trust Signals */}
          <div className={styles.trustSignals}>
            <div className={styles.signal}>
              <span className={styles.icon}>🔒</span>
              <span>Secure checkout</span>
            </div>
            <div className={styles.signal}>
              <span className={styles.icon}>🚚</span>
              <span>Free shipping over £50</span>
            </div>
            <div className={styles.signal}>
              <span className={styles.icon}>↩️</span>
              <span>30-day returns</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
