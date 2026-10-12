# Stage 12: Affiliate Link Rebuild Plan

## Business Model Change
**Before:** Direct sales with Stripe checkout  
**After:** Affiliate curation platform (links to brand/Amazon)

---

## REMOVE (Payment/Checkout Infrastructure)

### Files to Delete
```
/src/app/cart/
/src/app/checkout/
/src/app/account/
/src/context/CartContext.tsx
/src/components/AddToCartButton.tsx
/src/components/CartIcon.tsx
/src/lib/mockDatabase.ts
/api/orders/
/api/auth/
```

### Components to Remove from Layout
- CartProvider (wrap in layout)
- AuthProvider (wrap in layout)
- Cart icon from Header
- Account link from Header

### Database Schema to Remove
- users table
- orders table
- reviews table (KEEP if user-generated reviews still valuable)
- cart sessions

---

## MODIFY (Core Product Pages)

### Product Page (`/app/products/[slug]/page.tsx`)
**Replace:** "Add to Cart" button  
**With:** "Buy Now" buttons linking to:
```
- Amazon (affiliate link)
- Brand direct site
- Multiple retailers
```

**Example:**
```tsx
<div className={styles.buyButtons}>
  <a href={product.amazonUrl} target="_blank">
    🛒 Buy on Amazon
  </a>
  <a href={product.brandUrl} target="_blank">
    🏢 Brand Site
  </a>
  {product.couponCode && (
    <div className={styles.coupon}>
      Code: {product.couponCode}
    </div>
  )}
</div>
```

### Components to Remove from Product Page
- ❌ AddToCartButton
- ❌ ReviewForm (user-generated reviews)
- ❌ ReviewsSection (if not keeping)

### ReviewsSection (OPTIONAL KEEP)
If keeping user reviews:
- Remove auth requirement
- Make anonymous or email-only
- Don't store in database (use external service or display mock reviews only)
- OR: Keep but display as "curated reviews from Amazon/Trustpilot"

---

## ADD (Affiliate/Link Infrastructure)

### New Product Data Fields
```typescript
interface Product {
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  
  // NEW FIELDS
  amazonUrl: string;        // Affiliate link
  amazonAssociateId: string; // "leaflightly-20"
  brandUrl: string;         // Direct brand site
  brandAffiliateId?: string;
  retailerLinks: {          // Multiple options
    retailer: string;       // "Amazon", "Brand", "Other"
    url: string;
    couponCode?: string;
  }[];
  
  // TRACKING
  affiliateNetwork?: string; // "Amazon Associates", "Brand Partner", "Shareasale"
  commissionRate?: string;   // "4.5%", "£1.50 per sale"
  trackingEnabled: boolean;
}
```

### New Components

#### BuyNowButton.tsx
```tsx
// Replace AddToCartButton
// Links to affiliate URLs
// Shows multiple purchase options
// Displays coupon code if available
```

#### AffiliateDisclosure.tsx
```tsx
// Required legal text on product pages
// "We earn a commission when you shop through these links"
// Link to affiliate disclosure policy
```

#### PriceComparison.tsx
```tsx
// Show price across retailers
// Compare Amazon vs Brand vs Other
// Link to lowest price or preferred retailer
```

### New Files

#### `/src/lib/affiliateLinks.ts`
```typescript
// Build affiliate URLs with proper tracking
// Amazon Associates: add ?tag=leaflightly-20
// Brand partner links: add ?ref=leaflightly
// UTM parameters for tracking
```

#### `/src/data/products-with-links.ts`
```typescript
// Update product data with affiliate URLs
// Example:
{
  slug: "klean-kanteen-bottle",
  amazonUrl: "https://amazon.co.uk/s?k=klean+kanteen&tag=leaflightly-20",
  brandUrl: "https://www.kleankanteen.com?ref=leaflightly",
  retailerLinks: [
    { retailer: "Amazon", url: "..." },
    { retailer: "Brand", url: "..." }
  ]
}
```

---

## UPDATE (Existing Components)

### Header.tsx
- Remove: Cart icon
- Remove: Account link
- Add: "Affiliate Disclosure" footer link

### ProductGrid.tsx / ProductCard.tsx
- Change: Link to product detail page
- Add: Direct "Buy Now" button on card
- Remove: Add to cart button

### Footer.tsx
- Add: Affiliate Disclosure
- Add: Terms of Service (for affiliate links)
- Add: Privacy Policy update
- Add: Disclaimer (not affiliated with brands)

---

## NEW PAGES

### `/app/affiliate-disclosure/page.tsx`
```
Legal requirement for affiliate sites
- List all affiliate programs
- Explain how we earn commissions
- "We only recommend products we genuinely support"
- Clear disclosure on every product page
```

### `/app/terms/page.tsx`
- Update terms to explain affiliate model
- Remove payment/checkout terms
- Add affiliate link disclaimer

### `/app/privacy/page.tsx`
- Remove payment data handling
- Keep: tracking/UTM parameter handling
- Add: Affiliate link disclosure

---

## REMOVE FROM LAYOUT

### Layout.tsx Changes
```tsx
// REMOVE:
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

// REMOVE from JSX:
<AuthProvider>
  <CartProvider>
    {children}
  </CartProvider>
</AuthProvider>

// KEEP:
<Header />
<main>{children}</main>
<Footer />
<AIChat />
```

---

## DATA MIGRATION

### Products Array
Update all 50+ products with:
```
amazonUrl: "https://amazon.co.uk/s?k=product+name&tag=leaflightly-20"
brandUrl: "https://brand.com/product"
couponCode?: "LEAFLIGHTLY15" (if available)
retailerLinks: [...]
```

### Remove From Database
- Delete mockDatabase.ts
- Remove user auth logic
- Remove order history
- Remove cart storage

---

## AFFILIATE PROGRAMS TO SET UP

1. **Amazon Associates**
   - Associate ID: leaflightly-20 (example)
   - Links: `https://amazon.co.uk/... ?tag=leaflightly-20`
   - Commission: ~4-5% (varies by category)

2. **Brand Direct Partnerships**
   - Contact brands directly
   - Ask for affiliate program
   - Get affiliate IDs/promo codes
   - Track in product data

3. **Alternative Networks** (optional)
   - ShareASale
   - CJ Affiliate
   - Impact
   - VigLink (auto-converts links)

---

## TRACKING SETUP

### What to Track
- Click-through rate to affiliate sites
- Which products are clicked most
- Which retailer gets most traffic
- Conversion (done by affiliate network)

### How to Track
- UTM parameters on all links
- Analytics (Google Analytics 4)
- Affiliate dashboard monitoring
- Monthly revenue reporting

### UTM Structure
```
?utm_source=leaflightly
&utm_medium=product_page
&utm_campaign=category_kitchen
&utm_content=product_name
```

---

## UI/UX CHANGES

### Before Checkout
```
Product Page
↓
Add to Cart
↓
View Cart
↓
Checkout (pay here)
```

### After Affiliate
```
Product Page
↓
Buy Now (links out)
↓
→ Amazon / Brand Site (they handle payment)
↓
Leaf Lightly gets commission
```

---

## LEGAL REQUIREMENTS

### Must Add
- ✅ Affiliate disclosure on every product page
- ✅ "We earn commissions" notice in header/footer
- ✅ Affiliate Disclosure page (/affiliate-disclosure)
- ✅ Terms updated
- ✅ Privacy policy updated
- ✅ FTC compliance (USA) / ASA compliance (UK)

### Affiliate Disclosure Example
```
"As an Amazon Associate and affiliate partner, 
we earn commissions from qualifying purchases. 
This does not affect the price you pay."
```

---

## TIMELINE

### Phase 1: Remove (1-2 hours)
- Delete checkout files
- Remove CartContext, AuthContext
- Remove payment logic
- Strip from layout

### Phase 2: Update Products (2-3 hours)
- Add affiliate URLs to all 50+ products
- Set up Amazon Associates links
- Add brand direct links
- Add coupon codes

### Phase 3: Build New Components (2-3 hours)
- BuyNowButton component
- AffiliateDisclosure component
- PriceComparison component
- New pages (disclosure, terms, privacy)

### Phase 4: Testing & Deploy (1-2 hours)
- Test all affiliate links
- Verify UTM tracking
- Check legal compliance
- Deploy to Vercel

---

## ROLLBACK STRATEGY

If needed to revert:
- Git branch: `feature/affiliate-rebuild`
- Keep original checkout code in separate branch
- Tag current main as `v1-checkout` before major changes

---

## SUCCESS METRICS

After rebuild:
- ✅ All product pages have working affiliate links
- ✅ No broken cart/checkout references
- ✅ Affiliate disclosure visible
- ✅ Links properly attributed (UTM tracking)
- ✅ No console errors
- ✅ Mobile responsive
- ✅ Analytics tracking working

---

## AFFILIATE NETWORK SIGNUP

### Amazon Associates
- Sign up: https://associates.amazon.com
- Get Associate ID
- Create links using: https://amazon-associates-link-builder.s3.amazonaws.com/iba.html
- Commission: Varies (books 5%, electronics ~4%, home ~4-15%)

### Brand Partnerships
- Contact each brand's partnership team
- Ask for affiliate program
- Get promo code/affiliate link
- Track in product data

---

## QUESTIONS TO ANSWER

Before starting Stage 12:
1. Which affiliate program to prioritize? (Amazon first? Brand direct?)
2. Should reviews stay anonymous or be removed?
3. Do you have brand partnerships already?
4. Target commission rate? (5%, 10%, £ per sale?)
5. Preferred retailers for each product?
6. Geo-targeting (UK-only or international)?

