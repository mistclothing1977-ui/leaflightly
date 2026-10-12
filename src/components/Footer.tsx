'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.section}>
          <Link href="/" className={styles.logoLink}>
            <img
              src="/assets/logos/logo-full.webp"
              alt="Leaf Lightly"
              className={styles.logo}
            />
          </Link>
          <p className={styles.tagline}>
            Discover sustainably beautiful products for the conscious shopper.
          </p>
        </div>

        <div className={styles.section}>
          <h3>Categories</h3>
          <ul className={styles.links}>
            <li><Link href="/products/kitchen">Kitchen</Link></li>
            <li><Link href="/products/fashion">Fashion</Link></li>
            <li><Link href="/products/home">Home</Link></li>
            <li><Link href="/products/beauty">Beauty</Link></li>
            <li><Link href="/products/wellness">Wellness</Link></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Company</h3>
          <ul className={styles.links}>
            <li><Link href="/">About</Link></li>
            <li><Link href="/">How It Works</Link></li>
            <li><Link href="/">Contact</Link></li>
            <li><Link href="/affiliate-disclosure">Affiliate Disclosure</Link></li>
            <li><Link href="/">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Connect</h3>
          <p className={styles.social}>
            Follow us on social media for sustainable inspiration.
          </p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; 2026 Leaf Lightly. All rights reserved.</p>
      </div>
    </footer>
  );
}
