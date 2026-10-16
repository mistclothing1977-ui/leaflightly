'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import NavWithMegaMenu from './NavWithMegaMenu';
import ThemeToggle from './ThemeToggle';
import styles from './Header.module.css';

export default function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [mobileMenuOpen]);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        <img src="/assets/logos/logo-mark.png" alt="Leaf Lightly" className={styles.logo} />
        <span className={styles.brandName}>Leaf Lightly</span>
      </Link>
      <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}>
        <Link href="/" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <NavWithMegaMenu
          label="Kitchen"
          href="/products/kitchen"
          category="kitchen"
          onClick={() => setMobileMenuOpen(false)}
        />
        <NavWithMegaMenu
          label="Fashion"
          href="/products/fashion"
          category="fashion"
          onClick={() => setMobileMenuOpen(false)}
        />
        <NavWithMegaMenu
          label="Lifestyle"
          href="/products/lifestyle"
          category="lifestyle"
          onClick={() => setMobileMenuOpen(false)}
        />
        <NavWithMegaMenu
          label="Beauty"
          href="/products/beauty"
          category="beauty"
          onClick={() => setMobileMenuOpen(false)}
        />
        <NavWithMegaMenu
          label="Wellness"
          href="/products/wellness"
          category="wellness"
          onClick={() => setMobileMenuOpen(false)}
        />
        <Link href="/products#shop-by-brand" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Brands</Link>
        <Link href="/wishlist" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Wishlist</Link>
      </nav>

      <button
        className={styles.hamburger}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
      </button>

      <div className={styles.rightSection}>
        <SearchBar />
        <ThemeToggle />
        {session ? (
          <button onClick={() => signOut()} className={styles.navLink}>Sign Out</button>
        ) : (
          <>
            <Link href="/login" className={styles.navLink}>Login</Link>
            <Link href="/signup" className={styles.navLink}>Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
}
