'use client';

import styles from './BuyNowButton.module.css';

interface RetailerLink {
  retailer: string;
  url: string;
  icon: string;
  coupon?: string;
}

interface BuyNowButtonProps {
  retailers: RetailerLink[];
}

export default function BuyNowButton({ retailers }: BuyNowButtonProps) {
  if (!retailers || retailers.length === 0) {
    return null;
  }

  if (retailers.length === 1) {
    const retailer = retailers[0];
    return (
      <a
        href={retailer.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.singleButton}
      >
        <span aria-hidden="true">{retailer.icon}</span> Buy on {retailer.retailer} <span>(leaves Leaf Lightly)</span>
        {retailer.coupon && <span className={styles.coupon}>Code: {retailer.coupon}</span>}
      </a>
    );
  }

  return (
    <div className={styles.multipleOptions}>
      <div className={styles.label}>Shop at:</div>
      <div className={styles.buttons}>
        {retailers.map((retailer, idx) => (
          <a
            key={idx}
            href={retailer.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            <span aria-hidden="true">{retailer.icon}</span> {retailer.retailer}
            {retailer.coupon && <span className={styles.coupon}>{retailer.coupon}</span>}
          </a>
        ))}
      </div>
    </div>
  );
}
