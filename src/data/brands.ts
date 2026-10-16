// Brands we trust. Each brand has a page at /brands/[slug] listing its products,
// and a card on the all-products page. Add a brand here first, then load its products.
// Descriptions are written by us; do not copy an advertiser's marketing copy.

export interface Brand {
  slug: string;
  /** Must match Product.brand exactly so its products appear on the brand page. */
  name: string;
  /** Other names the feed uses for this brand (e.g. "The Truthbrush"). */
  aliases?: string[];
  description: string;
  /** Plain-English note on what we have checked. Shown on the brand page. */
  trustNote: string;
  website?: string;
  /** Awin advertiser ID, when the brand is in an Awin programme. */
  awinAdvertiserId?: number;
  /** Logo file in /public. Leave unset until the brand has given permission to use it. */
  logoUrl?: string;
}

export const brands: Brand[] = [
  {
    slug: 'truthbrush',
    name: 'Truthbrush',
    aliases: ['The Truthbrush'],
    description:
      'Bamboo electric toothbrush heads made in Devon. They fit Oral-B and Sonicare handles, use plant-based bristles, and are wrapped in biodegradable packaging.',
    trustNote:
      'The brand describes itself as a B Corp. We have not yet confirmed this on the B Corp directory, so treat it as the brand\'s own claim.',
    website: 'https://www.thetruthbrush.com/',
    awinAdvertiserId: 19976,
  },
];

/** Products whose feed brand name is this brand (name or an alias, case-insensitive). */
export function brandMatches(brand: Brand, productBrand: string): boolean {
  const wanted = [brand.name, ...(brand.aliases ?? [])].map((n) => n.toLowerCase());
  return wanted.includes(productBrand.trim().toLowerCase());
}

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
