import type { Metadata } from 'next';
import PremiumHero from '@/components/PremiumHero';
import ProblemStatement from '@/components/ProblemStatement';
import ImpactCounter from '@/components/ImpactCounter';
import OurApproach from '@/components/OurApproach';
import TierSystemRedesigned from '@/components/TierSystemRedesigned';
import FeaturedProducts from '@/components/FeaturedProducts';
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

export default function Home() {
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
        videoUrl="/assets/videos/hero-video.mp4"
      />

      {/* 2. PROBLEM STATEMENT */}
      <ProblemStatement />

      {/* 3. IMPACT COUNTER */}
      <ImpactCounter />

      {/* 3.5. WATER VIDEO BLOCK */}
      <VideoBlock
        videoUrl="/assets/videos/water-hero.mp4"
        element="water"
        title="From Ocean to Home"
        description="Sourced responsibly. Crafted sustainably."
      />

      {/* 4. OUR APPROACH */}
      <OurApproach />

      {/* 5. TIER SYSTEM - Redesigned */}
      <TierSystemRedesigned />

      {/* 6. FEATURED PRODUCTS */}
      <FeaturedProducts />

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
