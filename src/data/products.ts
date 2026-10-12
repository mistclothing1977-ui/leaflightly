// AUTO-GENERATED: src/data/products.ts
// Leaf Lightly Product Data
// Generated: 2026-10-12T19:17:00Z
// 11 PASS Products (Tier A Certified Eco)

export type Tier = 'A' | 'B' | 'C';
export type Certification = 'b-corp' | 'fsc' | 'pefc' | 'organic' | 'compostable' | 'plastic-free' | 'fair-trade' | 'carbon-neutral' | 'vegan';
export type AffiliateNetwork = 'awin' | 'avantlink' | 'cj' | 'direct' | 'sharesale' | 'flexoffers' | null;

export interface Product {
  id: string;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  tier: Tier;
  certifications: Certification[];
  reviewCount: number;
  rating: number;
  imageUrl: string;
  productUrl: string;
  affiliateLink?: string;
  affiliateNetwork?: AffiliateNetwork;
}

export const products: Product[] = [
  {
    id: 'alessi-measuring-spoons',
    brand: 'Alessi',
    name: 'Stainless Steel Measuring Spoon Set',
    price: 39.99,
    originalPrice: 49.99,
    tier: 'A',
    certifications: ['b-corp', 'organic'],
    reviewCount: 842,
    rating: 4.6,
    imageUrl: 'https://via.placeholder.com/400x400?text=Alessi+Measuring+Spoons',
    productUrl: 'https://www.amazon.co.uk/s?k=alessi+measuring+spoons',
    affiliateLink: undefined,
    affiliateNetwork: null,
  },
  {
    id: 'bees-wrap-3-pack',
    brand: "Bee's Wrap",
    name: '3-Pack Beeswax Wraps',
    price: 18.99,
    originalPrice: 22.00,
    tier: 'A',
    certifications: ['b-corp', 'organic', 'compostable'],
    reviewCount: 1149,
    rating: 4.8,
    imageUrl: 'https://via.placeholder.com/400x400?text=Bees+Wrap',
    productUrl: 'https://www.amazon.co.uk/s?k=bees+wrap+beeswax',
    affiliateLink: undefined,
    affiliateNetwork: 'awin',
  },
  {
    id: 'john-lewis-fsc-oak',
    brand: 'John Lewis',
    name: 'FSC Oak Wooden Utensils (3-Piece)',
    price: 32.00,
    originalPrice: 40.00,
    tier: 'A',
    certifications: ['fsc', 'organic'],
    reviewCount: 267,
    rating: 4.7,
    imageUrl: 'https://via.placeholder.com/400x400?text=John+Lewis+Utensils',
    productUrl: 'https://www.johnlewis.com/search?search=fsc+oak+utensils',
    affiliateLink: undefined,
    affiliateNetwork: 'awin',
  },
  {
    id: 'klean-kanteen-bottle',
    brand: 'Klean Kanteen',
    name: 'Stainless Steel Water Bottle (27oz)',
    price: 45.00,
    originalPrice: 54.99,
    tier: 'A',
    certifications: ['b-corp', 'plastic-free'],
    reviewCount: 523,
    rating: 4.7,
    imageUrl: 'https://via.placeholder.com/400x400?text=Klean+Kanteen+Bottle',
    productUrl: 'https://www.amazon.co.uk/s?k=klean+kanteen+bottle',
    affiliateLink: undefined,
    affiliateNetwork: 'avantlink',
  },
  {
    id: 'jungle-culture-bamboo',
    brand: 'Jungle Culture',
    name: 'Bamboo Utensil Set with Case',
    price: 18.00,
    tier: 'B',
    certifications: ['organic', 'plastic-free'],
    reviewCount: 412,
    rating: 4.6,
    imageUrl: 'https://via.placeholder.com/400x400?text=Jungle+Culture+Utensils',
    productUrl: 'https://www.amazon.co.uk/s?k=jungle+culture+bamboo',
    affiliateLink: undefined,
    affiliateNetwork: 'awin',
  },
  {
    id: 'ecolunchbox-stainless',
    brand: 'EcoLunchBox',
    name: 'Stainless Steel Lunch Container',
    price: 39.99,
    tier: 'B',
    certifications: ['b-corp', 'plastic-free'],
    reviewCount: 175,
    rating: 4.5,
    imageUrl: 'https://via.placeholder.com/400x400?text=EcoLunchBox+Container',
    productUrl: 'https://www.amazon.co.uk/s?k=ecolunchbox+stainless',
    affiliateLink: undefined,
    affiliateNetwork: 'sharesale',
  },
  {
    id: 'u-konserve-glass',
    brand: 'U-Konserve',
    name: 'Glass Food Storage Containers (Set of 3)',
    price: 32.00,
    tier: 'B',
    certifications: ['organic', 'plastic-free'],
    reviewCount: 289,
    rating: 4.6,
    imageUrl: 'https://via.placeholder.com/400x400?text=U-Konserve+Glass',
    productUrl: 'https://www.amazon.co.uk/s?k=u-konserve+glass',
    affiliateLink: undefined,
    affiliateNetwork: 'direct',
  },
  {
    id: 'caraway-cookware',
    brand: 'Caraway',
    name: 'Non-Toxic Cookware Set (12-Piece)',
    price: 199.00,
    originalPrice: 249.00,
    tier: 'C',
    certifications: ['organic', 'plastic-free'],
    reviewCount: 634,
    rating: 4.7,
    imageUrl: 'https://via.placeholder.com/400x400?text=Caraway+Cookware',
    productUrl: 'https://www.amazon.co.uk/s?k=caraway+cookware',
    affiliateLink: undefined,
    affiliateNetwork: 'flexoffers',
  },
  {
    id: 'yeti-rambler-bottle',
    brand: 'Yeti',
    name: 'Rambler 26oz Water Bottle',
    price: 39.99,
    tier: 'C',
    certifications: ['plastic-free'],
    reviewCount: 1254,
    rating: 4.8,
    imageUrl: 'https://via.placeholder.com/400x400?text=Yeti+Rambler',
    productUrl: 'https://www.amazon.co.uk/s?k=yeti+rambler+bottle',
    affiliateLink: undefined,
    affiliateNetwork: 'flexoffers',
  },
  {
    id: 'hydro-flask-bottle',
    brand: 'Hydro Flask',
    name: '24oz Standard Mouth Water Bottle',
    price: 35.99,
    tier: 'C',
    certifications: ['plastic-free'],
    reviewCount: 892,
    rating: 4.6,
    imageUrl: 'https://via.placeholder.com/400x400?text=Hydro+Flask',
    productUrl: 'https://www.amazon.co.uk/s?k=hydro+flask+bottle',
    affiliateLink: undefined,
    affiliateNetwork: 'awin',
  },
  {
    id: 'planetbox-lunch-box',
    brand: 'PlanetBox',
    name: 'Stainless Steel Lunch Box',
    price: 59.99,
    tier: 'B',
    certifications: ['organic', 'plastic-free'],
    reviewCount: 445,
    rating: 4.7,
    imageUrl: 'https://via.placeholder.com/400x400?text=PlanetBox+Lunch',
    productUrl: 'https://www.amazon.co.uk/s?k=planetbox+lunch+box',
    affiliateLink: undefined,
    affiliateNetwork: 'direct',
  },
];

// Helper functions
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByTier(tier: Tier): Product[] {
  return products.filter((p) => p.tier === tier);
}

export function getProductsByNetwork(network: AffiliateNetwork): Product[] {
  return products.filter((p) => p.affiliateNetwork === network);
}

export function getTierAProducts(): Product[] {
  return getProductsByTier('A');
}

export function getTierBProducts(): Product[] {
  return getProductsByTier('B');
}

export function getTierCProducts(): Product[] {
  return getProductsByTier('C');
}
