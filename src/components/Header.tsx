'use client';

import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        <img
          src="/assets/logos/logo-mark.webp"
          alt="Leaf Lightly Logo"
          className={styles.logo}
        />
      </Link>
      <nav className={styles.nav}>
        <Link href="/products/kitchen" className={styles.navLink}>Kitchen</Link>
        <Link href="/products/fashion" className={styles.navLink}>Fashion</Link>
        <Link href="/products/home" className={styles.navLink}>Home</Link>
        <Link href="/products/beauty" className={styles.navLink}>Beauty</Link>
        <Link href="/products/wellness" className={styles.navLink}>Wellness</Link>
      </nav>
    </header>
  );
}
