import type { Metadata } from 'next';
import PremiumHero from '@/components/PremiumHero';
import ProblemStatement from '@/components/ProblemStatement';
import ImpactCounter from '@/components/ImpactCounter';
import OurApproach from '@/components/OurApproach';
import TierSystemRedesigned from '@/components/TierSystemRedesigned';
import FeaturedProducts from '@/components/FeaturedProducts';
import { getAllProducts, HOMEPAGE_FEED_SLUGS } from '@/lib/catalogue';
import CustomerStories from '@/components/CustomerStories';
import VideoBlock from '@/components/VideoBlock';
import NewsletterSection from '@/components/NewsletterSection';
import { StructuredData } from '@/components/StructuredData';
import { generateOrganizationSchema, generateBreadcrumbSchema } from '@/lib/seo';
import styles from './home.module.css';

export const metadata: Metadata = {
  title: 'Leaf Lightly — Discover the Good Stuff That Works',
  description:
    'An editorial discovery platform for sustainable, thoughtfully-made products across kitchen, fashion, home, beauty, and wellness. We vet every brand and product.',
  keywords: [
    'sustainable products',
    'eco-friendly',
    'organic',
    'ethical brands',
    'plastic-free',
    'zero waste',
    'eco-conscious',
  ],
  openGraph: {
    title: 'Leaf Lightly — Discover Sustainable Products',
    description: 'Curated sustainable products for a better lifestyle',
    url: 'https://leaflightly.com',
    type: 'website',
    images: [
      {
        url: 'https://leaflightly.com/assets/images/hero-background.webp',
        width: 1200,
        height: 630,
        alt: 'Leaf Lightly - Sustainable Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leaf Lightly — Sustainable Products',
    description: 'Discover eco-friendly, ethically-made products',
    images: ['https://leaflightly.com/assets/images/hero-background.webp'],
  },
};

export default async function Home() {
  const feedFeatured = (await getAllProducts()).filter((p) => HOMEPAGE_FEED_SLUGS.includes(p.id));
  const organizationSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://leaflightly.com' },
  ]);
  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* 1. HERO SECTION - Full Width Video */}
      <PremiumHero
        title="Discover Products You Can Trust"
        subtitle="We've done the hard work of finding sustainable products. You just enjoy them."
        ctaText="Start Exploring"
        ctaHref="/products"
        videoUrl="/assets/videos/water-hero.mp4"
        poster="/assets/images/water-hero-poster.jpg"
      />

      {/* 2. PROBLEM STATEMENT */}
      <ProblemStatement />

      {/* 3. IMPACT COUNTER */}
      <ImpactCounter />

      {/* 3.5. EARTH VIDEO BLOCK */}
      <VideoBlock
        videoUrl="/assets/videos/earth-hero.mp4"
        element="earth"
        title="Rooted in Nature"
        description="Grown responsibly. Made to last."
      />

      {/* 4. OUR APPROACH */}
      <OurApproach />

      {/* 5. TIER SYSTEM - Redesigned */}
      <TierSystemRedesigned />

      {/* 5.5. AIR VIDEO BLOCK */}
      <VideoBlock
        videoUrl="/assets/videos/air-hero.mp4"
        element="air"
        title="Lighter Footprint"
        description="Less waste. More of what matters."
      />

      {/* 6. FEATURED PRODUCTS */}
      <FeaturedProducts extra={feedFeatured} />

      {/* 7. CUSTOMER STORIES */}
      <CustomerStories />

      {/* 7.5. FIRE VIDEO BLOCK */}
      <VideoBlock
        videoUrl="/assets/videos/fire-hero.mp4"
        element="fire"
        title="Made With Purpose"
        description="Crafted with intention. Built to inspire."
      />

      {/* 8. NEWSLETTER - Full Page Section */}
      <NewsletterSection />

      {/* 9. FOOTER */}
      <div className={styles.container}>
        {/* Placeholder footer - keep existing footer here if present */}
      </div>
    </>
  );
}
