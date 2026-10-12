import Link from 'next/link';
import FeaturedProductHero from '@/components/FeaturedProductHero';
import TierShowcase from '@/components/TierShowcase';
import NewsletterModal from '@/components/NewsletterModal';
import styles from './home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Featured Product Hero */}
      <FeaturedProductHero copyVariant="variant1" />

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
            <h3>We Vet</h3>
            <p>We spend weeks researching each brand. We verify certifications against actual standards. We test products ourselves. Only the truly sustainable make our cut—because a green label isn't enough.</p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>2</span>
            <h3>You Discover</h3>
            <p>Browse 50+ vetted brands across 5 categories. Read real reviews from real shoppers. Compare sustainability tiers. Find the product that matches your values and your life.</p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>3</span>
            <h3>You Earn</h3>
            <p>We earn a small commission when you shop—and we tell you that upfront. It keeps Leaf Lightly free and independent. Your purchase supports both the brand and our curation. Everyone wins.</p>
          </div>
        </div>

        {/* Stat callout */}
        <div className={styles.statCallout}>
          <p className={styles.statCalloutText}>
            <strong>500+ curated products</strong> from <strong>200+ sustainable brands</strong>
          </p>
        </div>
      </section>

      {/* Tier Showcase */}
      <TierShowcase />

      {/* Newsletter Modal */}
      <NewsletterModal />
    </div>
  );
}
