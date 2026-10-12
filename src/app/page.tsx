import Link from 'next/link';
import TrustSignals from '@/components/TrustSignals';
import NewsletterModal from '@/components/NewsletterModal';
import styles from './home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* All 5 categories now live! */}
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Discover the good stuff that works.</h1>
          <p className={styles.heroSubtitle}>
            Hand-curated sustainable products from brands that actually care.
            Every item is verified for real impact — not just marketing.
          </p>
          <div className={styles.heroCtaGroup}>
            <Link href="/products/kitchen" className={styles.heroCta}>
              Discover Sustainable Products →
            </Link>
            <p className={styles.heroSecondary}>Kitchen products now live. Fashion, home & wellness coming soon.</p>
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroBadge}>✓ Trusted by Sustainable Shoppers</div>
          <TrustSignals />
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>11+</div>
              <div className={styles.statLabel}>Curated Products</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>5</div>
              <div className={styles.statLabel}>Categories</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>Transparent</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className={styles.categories}>
        <h2>Browse by Category</h2>
        <div className={styles.categoryGrid}>
          {[
            { name: 'Kitchen', href: '/products/kitchen', status: 'Live', badge: 'Top Rated' },
            { name: 'Fashion', href: '/products/fashion', status: 'Live', badge: 'NEW: 5 items just added' },
            { name: 'Home', href: '/products/home', status: 'Live', badge: 'Customer Favorite' },
            { name: 'Beauty', href: '/products/beauty', status: 'Live', badge: 'Just Launched' },
            { name: 'Wellness', href: '/products/wellness', status: 'Live', badge: 'Trending This Week' },
          ].map((category) => (
            <div key={category.name} className={styles.categoryCard}>
              {category.badge && <span className={styles.categoryBadge}>{category.badge}</span>}
              <h3>{category.name}</h3>
              <p className={styles.status}>{category.status}</p>
              <Link href={category.href} className={styles.categoryLink}>
                Browse →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks}>
        <h2>How It Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.stepNumber}>1</span>
            <h3>Discover</h3>
            <p>Browse carefully curated, sustainably-made products</p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>2</span>
            <h3>Learn</h3>
            <p>Read real reviews and see certifications and standards</p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>3</span>
            <h3>Shop</h3>
            <p>Buy directly from trusted retailers. We earn a small commission.</p>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className={styles.trust}>
        <h2>Why Leaf Lightly?</h2>
        <ul className={styles.trustList}>
          <li>Only Tier A (Certified Eco), Tier B (Community Validated), or Tier C (Plastic-Free + Transparent) products</li>
          <li>Real customer reviews and ratings from Amazon and Trustpilot</li>
          <li>Transparent affiliate relationships — we disclose all partnerships</li>
          <li>Editorial curation, not algorithmic — real humans choose these products</li>
          <li>UK-first focus on sustainable shopping</li>
        </ul>
      </section>

      {/* Newsletter Modal */}
      <NewsletterModal />
    </div>
  );
}
