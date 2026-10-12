'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import styles from './page.module.css';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postcode: string;
  phone: string;
}

export default function CheckoutPage() {
  const { items, subtotal, tax, shipping, total, clearCart } = useCart();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber] = useState(
    `LL-${Date.now().toString().slice(-8).toUpperCase()}`
  );

  if (items.length === 0 && !submitted) {
    return (
      <main className={styles.container}>
        <div className={styles.empty}>
          <h1>Your cart is empty</h1>
          <Link href="/cart">Back to Cart</Link>
        </div>
      </main>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <main className={styles.container}>
        <div className={styles.confirmation}>
          <div className={styles.successIcon}>✓</div>
          <h1 className={styles.confirmTitle}>Order Confirmed!</h1>
          <p className={styles.confirmText}>
            Thank you for your purchase, {formData.firstName}!
          </p>

          <div className={styles.orderDetails}>
            <div className={styles.detailRow}>
              <span className={styles.label}>Order Number:</span>
              <span className={styles.value}>{orderNumber}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{formData.email}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Shipping To:</span>
              <span className={styles.value}>
                {formData.address}, {formData.city} {formData.postcode}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Total:</span>
              <span className={styles.value}>£{total.toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.confirmMessage}>
            <p>A confirmation email has been sent to <strong>{formData.email}</strong></p>
            <p>You can track your order status from your account dashboard.</p>
          </div>

          <Link href="/" className={styles.returnButton}>
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>

      <div className={styles.grid}>
        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Contact Information</legend>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Phone Number <span className={styles.required}>*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Shipping Address</legend>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.label}>
                  First Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.label}>
                  Last Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address" className={styles.label}>
                Street Address <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="city" className={styles.label}>
                  City <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="postcode" className={styles.label}>
                  Postcode <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
            </div>
          </fieldset>

          <button type="submit" className={styles.submitButton}>
            Complete Order
          </button>

          <Link href="/cart" className={styles.backLink}>
            Back to Cart
          </Link>
        </form>

        {/* Summary */}
        <div className={styles.summary}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.items}>
              {items.map((item) => (
                <div key={item.product.id} className={styles.summaryItem}>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.product.name}</p>
                    <p className={styles.itemQty}>Qty: {item.quantity}</p>
                  </div>
                  <p className={styles.itemPrice}>
                    £{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.divider}></div>

            <div className={styles.pricingRow}>
              <span className={styles.label}>Subtotal:</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>

            <div className={styles.pricingRow}>
              <span className={styles.label}>VAT (20%):</span>
              <span>£{tax.toFixed(2)}</span>
            </div>

            <div className={styles.pricingRow}>
              <span className={styles.label}>Shipping:</span>
              <span>
                {shipping === 0 ? (
                  <span className={styles.free}>FREE</span>
                ) : (
                  `£${shipping.toFixed(2)}`
                )}
              </span>
            </div>

            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total:</span>
              <span className={styles.totalValue}>£{total.toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.trustBadges}>
            <div className={styles.badge}>🔒 Secure</div>
            <div className={styles.badge}>🌱 Sustainable</div>
            <div className={styles.badge}>✓ Verified</div>
          </div>
        </div>
      </div>
    </main>
  );
}
