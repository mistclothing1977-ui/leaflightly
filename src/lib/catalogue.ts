// Catalogue reads for pages. Returns the curated static products plus any
// approved feed products from catalogue_products. If the database is unreachable,
// the static list is returned on its own, so the site never goes blank.
import { sql } from 'drizzle-orm';
import { db } from '@/lib/db/client';
import { products as staticProducts, PRODUCT_IMAGE_PLACEHOLDER, type Category, type Certification, type Product, type ProductVariant, type Tier } from '@/data/products';

interface CatalogueRow {
  slug: string;
  brand: string;
  name: string;
  category: string;
  tier: string;
  certifications: string[] | string | null;
  price: string | number | null;
  product_url: string | null;
  image_url: string | null;
  group_key: string | null;
  variant_label: string | null;
}

function parseCerts(value: CatalogueRow['certifications']): Certification[] {
  if (!value) return [];
  const list = typeof value === 'string' ? (JSON.parse(value) as string[]) : value;
  return list as Certification[];
}

function toVariant(row: CatalogueRow): ProductVariant {
  return {
    id: row.slug,
    label: row.variant_label || row.name,
    price: Number(row.price) || 0,
    productUrl: row.product_url || '',
  };
}

function toProduct(row: CatalogueRow): Product {
  return {
    id: row.slug,
    brand: row.brand,
    name: row.name,
    category: row.category as Category,
    price: Number(row.price) || 0,
    tier: row.tier as Tier,
    certifications: parseCerts(row.certifications),
    // No reviews come with an affiliate feed. ProductCard hides the rating when reviewCount is 0.
    reviewCount: 0,
    rating: 0,
    imageUrl: row.image_url || PRODUCT_IMAGE_PLACEHOLDER,
    productUrl: row.product_url || '',
    affiliateNetwork: 'awin',
  };
}

export async function getFeedProducts(): Promise<Product[]> {
  try {
    // Listed products: one primary row per group (ungrouped rows count as primary).
    const rows = (await db.execute(sql`
      select slug, brand, name, category, tier, certifications, price, product_url, image_url, group_key, variant_label
      from catalogue_products
      where approved = true and removed = false and is_primary = true and slug is not null
      order by brand, name
    `)) as unknown as CatalogueRow[];
    // Other options (colour, bristle, pack) for grouped products.
    const options = (await db.execute(sql`
      select slug, brand, name, price, product_url, group_key, variant_label
      from catalogue_products
      where approved = true and removed = false and is_primary = false and group_key is not null
      order by price, slug
    `)) as unknown as CatalogueRow[];
    const byGroup = new Map<string, ProductVariant[]>();
    for (const o of options) {
      const key = o.group_key as string;
      byGroup.set(key, [...(byGroup.get(key) ?? []), toVariant(o)]);
    }
    return rows.map((row) => {
      const product = toProduct(row);
      const variants = row.group_key ? byGroup.get(row.group_key) : undefined;
      if (variants?.length) {
        // The primary product is itself an option, so it is listed first.
        product.variants = [toVariant(row), ...variants];
      }
      return product;
    });
  } catch (err) {
    console.error('catalogue: falling back to static products', err);
    return [];
  }
}

/** All products shown on the site: curated static list plus approved feed products. */
export async function getAllProducts(): Promise<Product[]> {
  const feed = await getFeedProducts();
  const staticIds = new Set(staticProducts.map((p) => p.id));
  return [...staticProducts, ...feed.filter((p) => !staticIds.has(p.id))];
}
