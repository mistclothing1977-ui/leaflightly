// AUTO-GENERATED: src/data/products.ts
// Leaf Lightly Product Data
// Generated: 2026-10-12T19:17:00Z
// 11 PASS Products (Tier A Certified Eco)

export type Tier = 'A' | 'B' | 'C';
export type Certification = 'b-corp' | 'fsc' | 'pefc' | 'organic' | 'compostable' | 'plastic-free' | 'fair-trade' | 'carbon-neutral' | 'vegan' | 'cosmos' | 'leaping-bunny';
export type AffiliateNetwork = 'awin' | 'avantlink' | 'cj' | 'direct' | 'sharesale' | 'flexoffers' | null;
export type Category = 'kitchen' | 'fashion' | 'lifestyle' | 'beauty' | 'wellness';

// Shown until a product has an approved image. Replace a product's imageUrl with the
// image URL supplied by its affiliate programme (e.g. Amazon SiteStripe/PA-API, Awin feed).
// Never use images copied from brand sites without usage rights.
export const PRODUCT_IMAGE_PLACEHOLDER = '/assets/products/placeholder.svg';

/** One option of a product, such as a colour or bristle type. Each has its own buy link. */
export interface ProductVariant {
  id: string;
  label: string;
  price: number;
  productUrl: string;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  category: Category;
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
  /** Hide the price on cards; the value still drives filters and sorting. */
  priceHidden?: boolean;
  /** Shown in the home page "Handpicked Products We Love" grid. */
  featured?: boolean;
  /** One-line sustainability story used on featured cards. */
  story?: string;
  /** Other options of the same product (colour, bristle, pack). Feed products only. */
  variants?: ProductVariant[];
}

export const products: Product[] = [
  // KITCHEN - Tier A
  {
    id: 'alessi-measuring-spoons',
    brand: 'Alessi',
    name: 'Stainless Steel Measuring Spoon Set',
    category: 'kitchen',
    price: 39.99,
    originalPrice: 49.99,
    tier: 'A',
    certifications: ['b-corp', 'organic'],
    reviewCount: 842,
    rating: 4.6,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=alessi+measuring+spoons',
    affiliateLink: undefined,
    affiliateNetwork: null,
  },
  {
    id: 'bees-wrap-3-pack',
    featured: true,
    story: 'Organic cotton and beeswax - a compostable swap for cling film',
    brand: "Bee's Wrap",
    name: '3-Pack Beeswax Wraps',
    category: 'kitchen',
    price: 18.99,
    originalPrice: 22.00,
    tier: 'A',
    certifications: ['b-corp', 'organic', 'compostable'],
    reviewCount: 1149,
    rating: 4.8,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://link.amazon/B07BjzTOL',
    affiliateLink: undefined,
    affiliateNetwork: 'awin',
  },
  {
    id: 'john-lewis-fsc-oak',
    brand: 'John Lewis',
    name: 'FSC Oak Wooden Utensils (3-Piece)',
    category: 'kitchen',
    price: 32.00,
    originalPrice: 40.00,
    tier: 'A',
    certifications: ['fsc', 'organic'],
    reviewCount: 267,
    rating: 4.7,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.johnlewis.com/search?search=fsc+oak+utensils',
    affiliateLink: undefined,
    affiliateNetwork: 'awin',
  },
  {
    id: 'klean-kanteen-bottle',
    featured: true,
    story: 'Vacuum flask with a bamboo cap, made from 90% recycled steel',
    brand: 'Klean Kanteen',
    name: 'Rise Reflect Vacuum Flask with Bamboo Cap - 592ml',
    category: 'kitchen',
    price: 42.04,
    tier: 'A',
    certifications: ['plastic-free'],
    reviewCount: 27,
    rating: 4.3,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://link.amazon/B0dDpq0ln',
    affiliateLink: undefined,
    affiliateNetwork: null,
  },
  // KITCHEN - Tier B
  {
    id: 'jungle-culture-bamboo',
    brand: 'Jungle Culture',
    name: 'Bamboo Utensil Set with Case',
    category: 'kitchen',
    price: 18.00,
    tier: 'B',
    certifications: ['organic', 'plastic-free'],
    reviewCount: 412,
    rating: 4.6,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=jungle+culture+bamboo',
    affiliateLink: undefined,
    affiliateNetwork: 'awin',
  },
  {
    id: 'ecolunchbox-stainless',
    brand: 'EcoLunchBox',
    name: 'Stainless Steel Lunch Container',
    category: 'kitchen',
    price: 39.99,
    tier: 'B',
    certifications: ['b-corp', 'plastic-free'],
    reviewCount: 175,
    rating: 4.5,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=ecolunchbox+stainless',
    affiliateLink: undefined,
    affiliateNetwork: 'sharesale',
  },
  {
    id: 'u-konserve-glass',
    brand: 'U-Konserve',
    name: 'Glass Food Storage Containers (Set of 3)',
    category: 'kitchen',
    price: 32.00,
    tier: 'B',
    certifications: ['organic', 'plastic-free'],
    reviewCount: 289,
    rating: 4.6,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=u-konserve+glass',
    affiliateLink: undefined,
    affiliateNetwork: 'direct',
  },
  {
    id: 'planetbox-lunch-box',
    brand: 'PlanetBox',
    name: 'Stainless Steel Lunch Box',
    category: 'kitchen',
    price: 59.99,
    tier: 'B',
    certifications: ['organic', 'plastic-free'],
    reviewCount: 445,
    rating: 4.7,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=planetbox+lunch+box',
    affiliateLink: undefined,
    affiliateNetwork: 'direct',
  },
  // KITCHEN - Tier C
  {
    id: 'caraway-cookware',
    brand: 'Caraway',
    name: 'Non-Toxic Cookware Set (12-Piece)',
    category: 'kitchen',
    price: 199.00,
    originalPrice: 249.00,
    tier: 'C',
    certifications: ['organic', 'plastic-free'],
    reviewCount: 634,
    rating: 4.7,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=caraway+cookware',
    affiliateLink: undefined,
    affiliateNetwork: 'flexoffers',
  },
  {
    id: 'yeti-rambler-bottle',
    brand: 'Yeti',
    name: 'Rambler 26oz Water Bottle',
    category: 'kitchen',
    price: 39.99,
    tier: 'C',
    certifications: ['plastic-free'],
    reviewCount: 1254,
    rating: 4.8,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=yeti+rambler+bottle',
    affiliateLink: undefined,
    affiliateNetwork: 'flexoffers',
  },
  {
    id: 'hydro-flask-bottle',
    brand: 'Hydro Flask',
    name: '24oz Standard Mouth Water Bottle',
    category: 'kitchen',
    price: 35.99,
    tier: 'C',
    certifications: ['plastic-free'],
    reviewCount: 892,
    rating: 4.6,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=hydro+flask+bottle',
    affiliateLink: undefined,
    affiliateNetwork: 'awin',
  },
  // FASHION - Tier A
  {
    id: 'patagonia-organic-cotton-tee',
    featured: true,
    story: 'Recycled cotton and polyester tee, Fair Trade Certified',
    brand: 'Patagonia',
    name: 'P-6 Logo Responsibili-tee T-Shirt',
    category: 'fashion',
    price: 28.39,
    tier: 'B',
    certifications: ['fair-trade'],
    reviewCount: 9,
    rating: 4.1,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://link.amazon/B05Yi8LjS',
    affiliateLink: undefined,
    affiliateNetwork: null,
  },
  {
    id: 'veja-white-sneakers',
    brand: 'Veja',
    name: 'V-10 White Sneakers',
    category: 'fashion',
    price: 110.00,
    originalPrice: 130.00,
    tier: 'A',
    certifications: ['b-corp', 'fair-trade', 'organic'],
    reviewCount: 892,
    rating: 4.8,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=veja+v10+white',
    affiliateLink: undefined,
    affiliateNetwork: 'avantlink',
  },
  {
    id: 'reformation-denim-jeans',
    brand: 'Reformation',
    name: 'Levi Style Organic Denim Jeans',
    category: 'fashion',
    price: 128.00,
    tier: 'A',
    certifications: ['organic', 'b-corp'],
    reviewCount: 567,
    rating: 4.6,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=reformation+denim',
    affiliateLink: undefined,
    affiliateNetwork: 'awin',
  },
  // FASHION - Tier B
  {
    id: 'everlane-organic-basics',
    featured: true,
    story: 'Medium-weight organic cotton Oxford, made in audited factories',
    brand: 'Everlane',
    name: 'Organic Cotton Oxford Shirt',
    category: 'fashion',
    price: 89.00,
    tier: 'B',
    certifications: ['organic', 'plastic-free'],
    reviewCount: 421,
    rating: 4.5,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://link.amazon/B08dNBJu6',
    affiliateLink: undefined,
    affiliateNetwork: 'cj',
  },
  {
    id: 'allbirds-wool-runners',
    featured: true,
    story: 'Merino wool runner sneakers in ZQ-certified merino wool',
    brand: 'Allbirds',
    name: 'Men's Wool Runner GoSneaker',
    category: 'fashion',
    price: 63.07,
    tier: 'B',
    certifications: ['organic', 'carbon-neutral'],
    reviewCount: 132,
    rating: 4.2,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://link.amazon/B02gyKDXT',
    affiliateLink: undefined,
    affiliateNetwork: null,
  },
  // HOME - Tier A
  {
    id: 'seventh-generation-cleaning',
    brand: 'Seventh Generation',
    name: 'Multi-Surface Cleaner (5-Pack)',
    category: 'lifestyle',
    price: 22.99,
    originalPrice: 28.00,
    tier: 'A',
    certifications: ['b-corp', 'organic', 'compostable'],
    reviewCount: 512,
    rating: 4.6,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=seventh+generation+cleaner',
    affiliateLink: undefined,
    affiliateNetwork: 'sharesale',
  },
  {
    id: 'ecos-laundry-detergent',
    brand: 'Ecos',
    name: 'Hypoallergenic Laundry Detergent',
    category: 'lifestyle',
    price: 14.99,
    tier: 'A',
    certifications: ['b-corp', 'organic', 'vegan'],
    reviewCount: 623,
    rating: 4.7,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=ecos+laundry+detergent',
    affiliateLink: undefined,
    affiliateNetwork: 'awin',
  },
  {
    id: 'bamboo-bed-sheets',
    brand: 'Bampure',
    name: 'Organic Bamboo Sheet Set',
    category: 'lifestyle',
    price: 89.99,
    originalPrice: 119.99,
    tier: 'A',
    certifications: ['organic', 'b-corp'],
    reviewCount: 421,
    rating: 4.8,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=bamboo+sheet+set',
    affiliateLink: undefined,
    affiliateNetwork: 'flexoffers',
  },
  // HOME - Tier B
  {
    id: 'aroma-diffuser-wood',
    brand: 'Aria Naturals',
    name: 'Bamboo Wood Essential Oil Diffuser',
    category: 'lifestyle',
    price: 34.99,
    tier: 'B',
    certifications: ['organic', 'plastic-free'],
    reviewCount: 289,
    rating: 4.5,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=bamboo+diffuser',
    affiliateLink: undefined,
    affiliateNetwork: 'direct',
  },
  {
    id: 'natural-area-rug',
    brand: 'Armadillo & Co',
    name: 'Handwoven Jute Area Rug (5x8)',
    category: 'lifestyle',
    price: 199.00,
    tier: 'B',
    certifications: ['organic', 'fair-trade'],
    reviewCount: 178,
    rating: 4.6,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=jute+area+rug',
    affiliateLink: undefined,
    affiliateNetwork: 'avantlink',
  },
  // HOME - Tier C
  {
    id: 'waterhaul-rescue-folding-knife',
    brand: 'Waterhaul',
    name: 'Rescue Folding Knife (Recycled)',
    category: 'lifestyle',
    price: 24.99,
    priceHidden: true,
    tier: 'C',
    certifications: [],
    reviewCount: 0,
    rating: 0,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/Waterhaul-Rescue-Folding-Knife-Recycled/dp/B0BSXQNYRZ?dib=eyJ2IjoiMSJ9.9hWnwrSCuIo5P_h_Vo0HJw.oidbDLXOc9Ar3Hl4_V3G9J5r4vosH_mdK60x_H3XZKE&dib_tag=se&keywords=waterhaul&qid=1792067647&s=camping-hiking&sr=1-1&th=1&linkCode=ll2&tag=leaflightly-21&linkId=beaf4843adab384111c30df2db35be0c&ref_=as_li_ss_tl',
    affiliateLink: undefined,
    affiliateNetwork: null,
  },

  // BEAUTY - Tier A
  {
    id: 'beauty-counter-skincare',
    brand: 'Beautycounter',
    name: 'Clean Skincare Starter Set',
    category: 'beauty',
    price: 78.00,
    originalPrice: 98.00,
    tier: 'A',
    certifications: ['b-corp', 'organic', 'vegan'],
    reviewCount: 456,
    rating: 4.7,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=beautycounter+skincare',
    affiliateLink: undefined,
    affiliateNetwork: 'awin',
  },
  {
    id: 'osea-seaweed-mask',
    brand: 'OSEA',
    name: 'Seaweed Detox Mask',
    category: 'beauty',
    price: 48.00,
    tier: 'A',
    certifications: ['organic', 'vegan', 'compostable'],
    reviewCount: 321,
    rating: 4.6,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=osea+seaweed+mask',
    affiliateLink: undefined,
    affiliateNetwork: 'direct',
  },
  {
    id: 'drunk-elephant-vitamin-c',
    brand: 'Drunk Elephant',
    name: 'C-Firma Fresh Serum',
    category: 'beauty',
    price: 68.00,
    tier: 'A',
    certifications: ['vegan', 'plastic-free'],
    reviewCount: 798,
    rating: 4.8,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=drunk+elephant+serum',
    affiliateLink: undefined,
    affiliateNetwork: 'flexoffers',
  },
  // BEAUTY - Tier B
  {
    id: 'herbivore-eye-cream',
    brand: 'Herbivore Botanicals',
    name: 'Emerald Deep Moisture Eye Cream',
    category: 'beauty',
    price: 52.00,
    tier: 'B',
    certifications: ['vegan', 'organic'],
    reviewCount: 234,
    rating: 4.5,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=herbivore+eye+cream',
    affiliateLink: undefined,
    affiliateNetwork: 'sharesale',
  },
  {
    id: 'rms-beauty-lip-stain',
    brand: 'RMS Beauty',
    name: 'Lip Stain - Demure',
    category: 'beauty',
    price: 28.00,
    tier: 'B',
    certifications: ['organic', 'vegan'],
    reviewCount: 187,
    rating: 4.6,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=rms+beauty+lip+stain',
    affiliateLink: undefined,
    affiliateNetwork: 'awin',
  },
  // WELLNESS - Tier A
  {
    id: 'lululemon-yoga-mat',
    brand: 'Lululemon',
    name: 'The Yoga Mat Pro',
    category: 'wellness',
    price: 88.00,
    originalPrice: 98.00,
    tier: 'A',
    certifications: ['b-corp', 'plastic-free'],
    reviewCount: 645,
    rating: 4.8,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=lululemon+yoga+mat',
    affiliateLink: undefined,
    affiliateNetwork: 'direct',
  },
  {
    id: 'meditation-cushion-organic',
    brand: 'Mindfulness',
    name: 'Organic Buckwheat Meditation Cushion',
    category: 'wellness',
    price: 45.00,
    tier: 'A',
    certifications: ['organic', 'fair-trade'],
    reviewCount: 312,
    rating: 4.7,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=meditation+cushion+organic',
    affiliateLink: undefined,
    affiliateNetwork: 'avantlink',
  },
  {
    id: 'blue-light-glasses',
    brand: 'Felix Gray',
    name: 'Blue Light Blocking Glasses',
    category: 'wellness',
    price: 95.00,
    tier: 'A',
    certifications: ['b-corp'],
    reviewCount: 523,
    rating: 4.6,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=felix+gray+glasses',
    affiliateLink: undefined,
    affiliateNetwork: 'cj',
  },
  // WELLNESS - Tier B
  {
    id: 'resistance-bands-eco',
    brand: 'Eco Fitness',
    name: 'Sustainable Resistance Bands (Set of 5)',
    category: 'wellness',
    price: 32.99,
    tier: 'B',
    certifications: ['plastic-free', 'organic'],
    reviewCount: 198,
    rating: 4.5,
    imageUrl: PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: 'https://www.amazon.co.uk/s?k=eco+resistance+bands',
    affiliateLink: undefined,
    affiliateNetwork: 'sharesale',
  },
  {
    id: 'bamboo-toothbrush-set',
    featured: true,
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

// Helper functions
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsByTier(tier: Tier): Product[] {
  return products.filter((p) => p.tier === tier);
}

export function getProductsByNetwork(network: AffiliateNetwork): Product[] {
  return products.filter((p) => p.affiliateNetwork === network);
}

export function getProductsByCategoryAndTier(category: Category, tier: Tier): Product[] {
  return products.filter((p) => p.category === category && p.tier === tier);
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
