/**
 * Affiliate Link Builder
 * Creates properly tracked affiliate URLs for retailers
 */

export interface AffiliateUrl {
  retailer: string;
  url: string;
  icon: string;
  coupon?: string;
}

/**
 * Build Amazon Associates link with tracking
 */
export function buildAmazonLink(productName: string, asin?: string): string {
  const AMAZON_TAG = 'leaflightly-20';
  const query = encodeURIComponent(productName);

  if (asin) {
    return `https://amazon.co.uk/dp/${asin}?tag=${AMAZON_TAG}`;
  }

  return `https://amazon.co.uk/s?k=${query}&tag=${AMAZON_TAG}`;
}

/**
 * Build direct brand affiliate link
 */
export function buildBrandLink(
  brandUrl: string,
  affiliateId?: string,
  couponCode?: string
): string {
  if (!brandUrl) return '';

  const url = new URL(brandUrl);

  // Add affiliate parameter if brand has one
  if (affiliateId) {
    url.searchParams.set('ref', affiliateId);
  }

  // Add coupon code as query param (optional, brands handle differently)
  if (couponCode) {
    url.searchParams.set('code', couponCode);
  }

  return url.toString();
}

/**
 * Get purchase options for a product
 * Returns array of retailer links
 */
export function getRetailerLinks(product: {
  name: string;
  brand: string;
  amazonAsin?: string;
  brandWebsite?: string;
  brandAffiliateId?: string;
  couponCode?: string;
  otherRetailers?: { url: string; name: string }[];
}): AffiliateUrl[] {
  const links: AffiliateUrl[] = [];

  // Brand website (highest priority - direct support)
  if (product.brandWebsite) {
    links.push({
      retailer: `${product.brand} Store`,
      url: buildBrandLink(
        product.brandWebsite,
        product.brandAffiliateId,
        product.couponCode
      ),
      icon: '🏢',
      coupon: product.couponCode,
    });
  }

  // Amazon (widely available, good commission)
  links.push({
    retailer: 'Amazon',
    url: buildAmazonLink(product.name, product.amazonAsin),
    icon: '🛒',
  });

  // Other retailers
  if (product.otherRetailers) {
    product.otherRetailers.forEach((retailer) => {
      links.push({
        retailer: retailer.name,
        url: retailer.url,
        icon: '🛍️',
      });
    });
  }

  return links;
}

/**
 * Build UTM parameters for tracking
 */
export function buildUTM(params: {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}): string {
  const utm = new URLSearchParams();

  if (params.source) utm.set('utm_source', params.source);
  if (params.medium) utm.set('utm_medium', params.medium);
  if (params.campaign) utm.set('utm_campaign', params.campaign);
  if (params.content) utm.set('utm_content', params.content);
  if (params.term) utm.set('utm_term', params.term);

  return utm.toString();
}

/**
 * Add UTM parameters to a URL
 */
export function addUTMToUrl(
  url: string,
  utm: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
  }
): string {
  try {
    const urlObj = new URL(url);

    if (utm.source) urlObj.searchParams.set('utm_source', utm.source);
    if (utm.medium) urlObj.searchParams.set('utm_medium', utm.medium);
    if (utm.campaign) urlObj.searchParams.set('utm_campaign', utm.campaign);
    if (utm.content) urlObj.searchParams.set('utm_content', utm.content);

    return urlObj.toString();
  } catch {
    return url;
  }
}
