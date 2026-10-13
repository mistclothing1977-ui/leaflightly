'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const socialLinks = [
    { name: 'Facebook', label: 'f', url: 'https://facebook.com/leaflightly' },
    { name: 'Instagram', label: '@', url: 'https://instagram.com/leaflightly' },
    { name: 'Pinterest', label: 'P', url: 'https://pinterest.com/leaflightly' },
    { name: 'TikTok', label: '♪', url: 'https://tiktok.com/@leaflightly' },
  ];

  return (
    <footer className={styles.footer}>
      {/* Main Content */}
      <div className={styles.container}>
        {/* Left: Brand & Description */}
        <div className={styles.brandSection}>
          <Link href="/" className={styles.logoLink}>
            <img src="/assets/logos/logo-mark.png" alt="Leaf Lightly" className={styles.logo} />
          </Link>
        </div>

        {/* Center: Links Grid */}
        <div className={styles.linksGrid}>
          <div className={styles.column}>
            <h4>Categories</h4>
            <ul className={styles.linksList}>
              <li><Link href="/products/kitchen">Kitchen</Link></li>
              <li><Link href="/products/fashion">Fashion</Link></li>
              <li><Link href="/products/lifestyle">Lifestyle</Link></li>
              <li><Link href="/products/beauty">Beauty</Link></li>
              <li><Link href="/products/wellness">Wellness</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Company</h4>
            <ul className={styles.linksList}>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/how-it-works">How It Works</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/affiliate-disclosure">Affiliate</Link></li>
              <li><Link href="/privacy-policy">Privacy</Link></li>
            </ul>
          </div>
        </div>

        {/* Right: Social Media Icons */}
        <div className={styles.socialSection}>
          <h4>Connect</h4>
          <p className={styles.socialDescription}>
            Join our community
          </p>
          <ul className={styles.socialIcons}>
            {socialLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label={`Follow us on ${link.name}`}
                  title={link.name}
                >
                  <span className={styles.iconLabel}>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className={styles.divider}></div>
      <div className={styles.bottom}>
        <p>&copy; 2026 Leaf Lightly. All rights reserved.</p>
      </div>
    </footer>
  );
}
