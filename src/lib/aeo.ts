/**
 * Answer Engine Optimization (AEO) & Generative Engine Optimization (GEO)
 * Utilities for optimizing content for AI search engines and LLMs
 *
 * Key principles:
 * 1. Answer first - lead with the actual answer in the first sentence
 * 2. Digestible format - short paragraphs, bullets, numbered steps
 * 3. Focused pieces - specific questions with clear answers
 * 4. FAQ schema - Q&A format for AI training data
 * 5. Clean language - no filler, no keyword stuffing
 * 6. Authority signals - expertise and credibility markers
 * 7. Structured data - schema.org markup for AI readability
 */

/**
 * FAQ Schema for AI models
 */
export interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

export function generateFAQSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * How-To Schema for step-by-step guides
 */
export interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export function generateHowToSchema(
  title: string,
  description: string,
  steps: HowToStep[],
  image?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    image: image || '',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: (index + 1).toString(),
      name: step.name,
      text: step.text,
      image: step.image || '',
    })),
  };
}

/**
 * Article Schema with focus on authority
 */
export function generateArticleSchema(
  headline: string,
  description: string,
  author: string,
  datePublished: string,
  dateModified: string,
  image?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image || '',
    author: {
      '@type': 'Organization',
      name: author,
      logo: 'https://leaflightly.com/assets/logos/logo-mark.png',
      sameAs: [
        'https://twitter.com/leaflightly',
        'https://instagram.com/leaflightly',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Leaf Lightly',
      logo: 'https://leaflightly.com/assets/logos/logo-mark.png',
    },
    datePublished,
    dateModified,
  };
}

/**
 * AEO Content Guidelines
 */
export const aeoGuidelines = {
  titleFormat: {
    example: 'How to Choose Sustainable Kitchenware: A Step-by-Step Guide',
    tips: [
      'Start with action verb (How, What, Why, Where, When)',
      'Include main keyword early',
      'Be specific (avoid generic)',
      'Keep under 60 characters for display',
    ],
  },

  openingParagraph: {
    example:
      'The best sustainable kitchenware combines durability, eco-friendly materials, and fair manufacturing. Look for: certified organic, plastic-free, B-Corp brands, and items with 5+ year lifespans.',
    tips: [
      'Answer the main question in 1-2 sentences',
      'No introductory fluff ("Let\'s explore...")',
      'Include key criteria upfront',
      'Make it copyable for AI responses',
    ],
  },

  bodyFormat: {
    tips: [
      'Use short paragraphs (2-3 sentences max)',
      'Number steps (1, 2, 3)',
      'Use bullet points for lists',
      'One idea per heading',
      'Avoid walls of text',
    ],
  },

  faqs: {
    tips: [
      'Create 5-10 focused FAQs per page',
      'Use natural question language',
      'Answer directly in first sentence',
      'Keep answers under 200 words',
      'Focus on user intent, not keywords',
    ],
  },

  authority: {
    tips: [
      'Cite certifications (B Corp, etc.)',
      'Reference testing/verification process',
      'Mention expert partnerships',
      'Include brand credentials',
      'Use numbers and data when possible',
    ],
  },

  avoidList: [
    'Long introductions',
    'Keyword stuffing',
    'Vague claims ("may", "could")',
    'Nested paragraphs',
    'Clickbait titles',
    'Excessive marketing language',
    'Outdated information',
  ],
};

/**
 * Content optimization scoring
 */
export function scoreAEOContent(content: {
  title: string;
  openingParagraph: string;
  structure: 'bullets' | 'numbered' | 'paragraphs' | 'mixed';
  hasFAQ: boolean;
  hasAuthority: boolean;
  wordCount: number;
}): {
  score: number;
  feedback: string[];
} {
  let score = 0;
  const feedback: string[] = [];

  // Title (20 points)
  if (content.title.length < 60) {
    score += 10;
  } else {
    feedback.push('Title too long - aim for under 60 characters');
  }

  if (content.title.match(/^(How|What|Why|Where|When|Best|Top)/i)) {
    score += 10;
  } else {
    feedback.push('Consider starting title with action verb');
  }

  // Opening paragraph (20 points)
  if (content.openingParagraph.length < 300) {
    score += 10;
  } else {
    feedback.push('Opening paragraph too long - keep under 300 characters');
  }

  if (content.openingParagraph.split('.')[0].length < 100) {
    score += 10;
  } else {
    feedback.push('First sentence too long - answer quickly');
  }

  // Structure (20 points)
  if (content.structure !== 'paragraphs') {
    score += 20;
  } else {
    feedback.push('Use bullets or numbered lists for better AI parsing');
  }

  // FAQ (20 points)
  if (content.hasFAQ) {
    score += 20;
  } else {
    feedback.push('Add FAQ section for AI training data');
  }

  // Authority (20 points)
  if (content.hasAuthority) {
    score += 20;
  } else {
    feedback.push('Add authority signals (certifications, credentials)');
  }

  return {
    score: Math.min(score, 100),
    feedback,
  };
}

/**
 * Sample FAQs for Leaf Lightly
 */
export const leafLightlyFAQs: FAQ[] = [
  {
    question: 'What does Tier A, B, and C mean at Leaf Lightly?',
    answer:
      'Tier A is exceptional - products meet the highest sustainability standards with certifications, ethical manufacturing, and durability ratings 5+ years. Tier B is excellent - strong sustainable practices with some certification or eco-friendly materials. Tier C is good - solid sustainability efforts with room for improvement. All products meet our minimum environmental standards.',
    category: 'products',
  },
  {
    question: 'How does Leaf Lightly verify product sustainability?',
    answer:
      'We spend weeks researching each brand: verifying certifications against actual standards (B Corp, Plastic-Free Certification, Fair Trade), testing products ourselves, checking manufacturing practices, and confirming company values. Only products that genuinely meet sustainability criteria make our platform. A green label alone is not enough.',
    category: 'process',
  },
  {
    question: 'What is plastic-free certification?',
    answer:
      'Plastic-free certification means products are made without any plastic materials in manufacturing, packaging, or delivery. This includes avoiding microplastics, synthetic fibers, and petroleum-based materials. Products may use biodegradable, compostable, or recyclable alternatives like cardboard, glass, metal, or natural fibers.',
    category: 'certifications',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Standard shipping (£5.99) takes 3-5 business days. Orders over £50 qualify for FREE shipping with the same 3-5 day timeframe. Express shipping available at checkout. You\'ll receive a tracking link via email once your order ships.',
    category: 'shipping',
  },
  {
    question: 'What is your return policy?',
    answer:
      'We offer 30-day returns. Items must be unused and in original condition. Visit your account dashboard under "Order History" to start a return. We\'ll email a free return label. Refunds process within 5 business days of receiving returned items.',
    category: 'returns',
  },
  {
    question: 'How do I know if a product is genuinely sustainable?',
    answer:
      'Look for: 1) Third-party certifications (B Corp, Fair Trade, organic), 2) Transparency about materials and manufacturing, 3) Company mission alignment with sustainability, 4) Durability (products lasting 5+ years reduce waste), 5) Ethical labor practices. At Leaf Lightly, we verify all of these before listing any product.',
    category: 'sustainability',
  },
  {
    question: 'Can I compare products at Leaf Lightly?',
    answer:
      'Yes! Use our comparison tool to view up to 4 products side-by-side. Compare prices, ratings, certifications, tier levels, and sustainability details. This helps you make informed decisions between similar sustainable options.',
    category: 'features',
  },
  {
    question: 'How do I leave a product review?',
    answer:
      'Sign in to your account, visit any product page, scroll to "Share Your Review," select your rating (1-5 stars), write a title and your experience (minimum 10 characters each). Submit to have your review appear instantly. Your name and review help other shoppers make sustainable choices.',
    category: 'reviews',
  },
];
