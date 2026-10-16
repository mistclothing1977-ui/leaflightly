import { Metadata } from 'next';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  url: string;
  type?: 'website' | 'product' | 'article';
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

/**
 * Generate metadata for a page
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords,
    image = 'https://leaflightly.com/og-image.jpg',
    imageAlt = 'Leaf Lightly',
    url,
    type = 'website',
  } = config;

  return {
    title,
    description,
    keywords: keywords?.join(', '),
    openGraph: {
      title,
      description,
      url,
      type: type === 'product' ? 'website' : (type as 'website' | 'article'),
      images: [
        {
          url: image,
          alt: imageAlt,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate JSON-LD structured data for a product
 */
export function generateProductSchema(product: {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  brand: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || `High-quality ${product.name} by ${product.brand}`,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      price: product.price.toString(),
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      url: product.url,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      ratingCount: product.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    sku: product.id,
  };
}

/**
 * Generate JSON-LD structured data for reviews
 */
export function generateReviewSchema(reviews: Array<{
  userName: string;
  rating: number;
  title: string;
  text: string;
  createdAt: string;
}>) {
  return reviews.map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.userName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: review.text,
    name: review.title,
    datePublished: review.createdAt,
  }));
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Leaf Lightly',
    url: 'https://leaflightly.com',
    logo: 'https://leaflightly.com/assets/logos/logo-mark.png',
    description:
      'An editorial discovery platform for sustainable, thoughtfully-made products across kitchen, fashion, home, beauty, and wellness.',
    sameAs: [
      'https://twitter.com/leaflightly',
      'https://www.instagram.com/leaflightly/',
      'https://www.facebook.com/Leaflightly.co.uk/',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@leaflightly.com',
    },
  };
}

/**
 * Generate JSON-LD structured data for breadcrumb navigation
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * SEO tips for content optimization
 */
export const seoTips = {
  titleLength: {
    min: 30,
    max: 60,
    tip: 'Keep titles between 30-60 characters for optimal display in search results',
  },
  descriptionLength: {
    min: 120,
    max: 160,
    tip: 'Keep meta descriptions between 120-160 characters',
  },
  imageAlt: {
    tip: 'Always include descriptive alt text for images (50-125 characters)',
  },
  headingHierarchy: {
    tip: 'Use proper heading hierarchy (H1 > H2 > H3, never skip levels)',
  },
  keywordDensity: {
    tip: 'Target keyword density of 1-2% (natural, not keyword stuffing)',
  },
  internalLinks: {
    tip: 'Include 2-3 internal links per 500 words of content',
  },
  mobileOptimized: {
    tip: 'Ensure mobile responsiveness for mobile-first indexing',
  },
  pageSpeed: {
    tip: 'Aim for Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1',
  },
};
