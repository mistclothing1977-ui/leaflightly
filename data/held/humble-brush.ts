// Held out of the live catalogue until the product details are complete.
// To reinstate: paste this entry back into the products array in src/data/products.ts,
// set featured if it should be on the homepage, and check the Amazon link is a Get Link URL.

import { PRODUCT_IMAGE_PLACEHOLDER } from '@/data/products';

export const heldHumbleBrush = [
  {
    id: 'bamboo-toothbrush-set',
    featured: false,
    story: 'Biodegradable handle with nylon bristles for zero waste',
    brand: 'Humble Brush',
    name: 'Bamboo Toothbrush Set (12-Pack)',
    category: 'wellness',
    price: 18.99,
    tier: 'B',
    certifications: ['organic', 'compostable', 'vegan'],
    reviewCount: 412,
    rating: 4.7,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=humble+bamboo+toothbrush',
    affiliateLink: undefined,
    affiliateNetwork: 'awin',
  },
];
