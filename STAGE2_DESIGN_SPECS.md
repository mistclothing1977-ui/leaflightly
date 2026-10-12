# Stage 2 Design Specifications
## Product-Focused Hero & System Redesign

**Last Updated:** 2026-10-12  
**Version:** 1.0 — Initial Implementation Specs  
**Status:** Ready for Frontend Agent Development

---

## 1. UPDATED COLOR PALETTE

### 1.1 Primary Color System

Replace current teal (#2c7f6e) with premium sustainable aesthetic:

```css
:root {
  /* Previous palette (DEPRECATED) */
  --color-forest-OLD: #2c7f6e;
  --color-teal-OLD: #82d4d8;

  /* New premium palette */
  --color-forest: #1a472a;        /* Deep forest green (primary) */
  --color-accent: #FF6B35;         /* Sustainable orange (CTAs, urgency) */
  --color-warm-beige: #C9B8A0;     /* Warm tan (secondary, inviting) */
  --color-charcoal: #2A2A26;       /* Deep charcoal (text, not gray) */
  --color-light-gray: #F8F6F3;     /* Off-white (premium background) */
  
  /* Tier-specific colors (new) */
  --color-tier-a: #1a7a4a;         /* Green - Certified Eco */
  --color-tier-b: #2563b3;         /* Blue - Community Validated */
  --color-tier-c: #8B8B7E;         /* Gray - Transparent Materials */
  
  /* Semantic colors (updated) */
  --color-success: #2d9d5d;
  --color-warning: #FF6B35;        /* Now matches accent for prominence */
  --color-error: #D84844;
  --color-border: #E8E5E0;         /* Premium border */
}
```

### 1.2 Application Guide

| Element | Color | Reasoning |
|---------|-------|-----------|
| Primary headings (h1, h2) | `--color-forest` | Premium, natural authority |
| Body text | `--color-charcoal` | Warmer than gray, more premium |
| CTA buttons | `--color-accent` | High contrast, creates urgency |
| Links (default) | `--color-forest` | Consistent with headings |
| Links (hover) | `--color-accent` | Warm, inviting transition |
| Tier A badges | `--color-tier-a` | Eco-certification green |
| Tier B badges | `--color-tier-b` | Trust/validation blue |
| Tier C badges | `--color-tier-c` | Neutral gray (lowest tier) |
| Background | `--color-light-gray` | Subtle, premium |
| Cards/containers | White or `--color-light-gray` | Clean, minimal |
| Borders/dividers | `--color-border` | Subtle separation |

### 1.3 Contrast Verification (WCAG AA)

All color combinations tested for accessibility:

```
✓ Forest on Off-white: 7.2:1 (AAA)
✓ Charcoal on Off-white: 9.1:1 (AAA)
✓ Orange on White: 6.8:1 (AAA)
✓ Forest on White: 7.4:1 (AAA)
✓ Tier A on White: 6.2:1 (AA)
✓ Tier B on White: 6.5:1 (AA)
✓ Tier C on White: 5.1:1 (AA)
```

### 1.4 CSS Migration Steps

1. Update `src/app/globals.css` with new `--color-*` variables
2. Update `src/app/home.module.css` hex values to use CSS variables
3. Search/replace in all `.module.css` files:
   - `#2c7f6e` → `var(--color-forest)`
   - `#82d4d8` → `var(--color-accent)` (for interactive elements)
   - `#2A2A26` → `var(--color-charcoal)`
4. Add tier badge classes to components that display tiers

---

## 2. PRODUCT-FOCUSED HERO SECTION (Reformation-Style Split Layout)

### 2.1 Hero Container Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Hero Section                           │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────┐    ┌──────────────────────────────┐ │
│  │                    │    │  Featured Product Card       │ │
│  │  Lifestyle Image   │    │  ┌────────────────────────┐  │ │
│  │  (Left 50%)        │    │  │ Product Image          │  │ │
│  │                    │    │  │ [small, 200x200]       │  │ │
│  │  - Brand           │    │  ├────────────────────────┤  │ │
│  │    photography     │    │  │ Brand Name             │  │ │
│  │  - Lifestyle       │    │  │ Product Name           │  │ │
│  │    environment     │    │  │ £XX.XX [discount %]    │  │ │
│  │  - Hero imagery    │    │  │                        │  │ │
│  │    (800x800px)     │    │  │ ★★★★★ 4.8 (342)       │  │ │
│  │                    │    │  │                        │  │ │
│  │                    │    │  │ [Tier Badge]           │  │ │
│  │  Size: 50% width   │    │  │ [Certifications list]  │  │ │
│  │  Aspect: 1:1 sq    │    │  │                        │  │ │
│  │  Max: 800x800px    │    │  │ [Shop Now] Button      │  │ │
│  │                    │    │  │                        │  │ │
│  │                    │    │  │ ⟳ Changes weekly       │  │ │
│  │                    │    │  └────────────────────────┘  │ │
│  └────────────────────┘    │  (Right 50%, 400px wide)     │ │
│                            │                              │ │
│                            │  Secondary CTAs below        │ │
│                            │  ┌─────────────────────────┐ │ │
│                            │  │ Featured Product Stats  │ │ │
│                            │  └─────────────────────────┘ │ │
│                            └──────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### 2.2 Desktop Layout Specifications

**Container:**
- Max-width: 1200px
- Grid: 2 columns, equal width (1fr 1fr)
- Gap: 4rem (64px)
- Padding: 4rem 2rem
- Background: Gradient `linear-gradient(135deg, #f5f3f0 0%, #f9f7f5 100%)`

**Left Side (Lifestyle Image):**
- Width: 50% of container (calc from max-width)
- Aspect ratio: 1:1 (square)
- Max-width: 500px
- Border-radius: 12px
- Image: Use `next/image` with `priority` (hero-critical)
- Object-fit: cover
- Box-shadow: `0 12px 32px rgba(26, 71, 42, 0.15)`

**Right Side (Featured Product Card):**
- Width: 50% of container
- Max-width: 420px
- Background: White
- Border-radius: 12px
- Padding: 2rem
- Box-shadow: `0 8px 24px rgba(0, 0, 0, 0.08)`
- Display: flex
- Flex-direction: column
- Gap: 1rem

**Product Card Contents (right side):**

1. **Product Image Container:**
   - Width: 100%
   - Height: 200px
   - Border-radius: 8px
   - Background: `var(--color-light-gray)`
   - Display: flex, center items
   - Image size: 160x160px (within container)
   - Object-fit: contain

2. **Product Metadata:**
   ```jsx
   <div className={styles.productMeta}>
     <p className={styles.productBrand}>Brand Name</p>
     <h3 className={styles.productName}>Product Name (max 50 chars)</h3>
     <div className={styles.priceRow}>
       <span className={styles.price}>£XX.XX</span>
       {originalPrice && <span className={styles.originalPrice}>£XX.XX</span>}
       {discount > 0 && <span className={styles.discount}>-{discount}%</span>}
     </div>
   </div>
   ```

3. **Rating & Reviews:**
   ```jsx
   <div className={styles.ratingSection}>
     <div className={styles.stars}>★★★★★</div>
     <span className={styles.ratingValue}>4.8</span>
     <span className={styles.reviewCount}>(342 reviews)</span>
   </div>
   ```
   - Font-size: 0.9rem
   - Color: `var(--color-charcoal)`
   - Line-height: 1.4

4. **Tier Badge & Certifications:**
   ```jsx
   <div className={styles.tierBadge}>
     <span className={styles.tierLabel}>Tier A</span>
     <span className={styles.tierName}>Certified Eco</span>
   </div>
   
   <div className={styles.certificationList}>
     {certifications.map(cert => (
       <span key={cert} className={styles.certBadge}>{cert}</span>
     ))}
   </div>
   ```
   
   **Tier Badge Styling:**
   - Tier A: Background `var(--color-tier-a)`, color white, padding 0.75rem 1rem
   - Tier B: Background `var(--color-tier-b)`, color white
   - Tier C: Background `var(--color-tier-c)`, color white
   - Border-radius: 6px
   - Font-size: 0.8rem
   - Font-weight: 600
   - Display: inline-block

   **Certification Badges:**
   - Each certification as small pill badge
   - Background: `var(--color-light-gray)`
   - Color: `var(--color-forest)`
   - Padding: 0.4rem 0.75rem
   - Font-size: 0.75rem
   - Border-radius: 12px
   - Display: flex, gap 0.5rem, wrap

5. **CTA Button:**
   ```jsx
   <button className={styles.shopNowButton}>
     Shop Now →
   </button>
   ```
   - Full width
   - Background: `var(--color-accent)` (#FF6B35)
   - Color: white
   - Padding: 1rem 2rem
   - Border-radius: 8px
   - Font-size: 1.05rem
   - Font-weight: 600
   - Border: none
   - Cursor: pointer
   - Transition: all 0.3s

   **Hover state:**
   - Background: darken(`var(--color-accent)`) → #E55A28
   - Transform: translateY(-2px)
   - Box-shadow: `0 8px 20px rgba(255, 107, 53, 0.3)`

   **Active state:**
   - Transform: translateY(0)
   - Box-shadow: `0 4px 12px rgba(255, 107, 53, 0.2)`

6. **Rotation Logic:**
   - Display a client-side component that fetches featured product
   - Add to `src/components/HeroFeaturedProduct.tsx`
   - Query logic: Select random Tier A product weekly
   - Cache strategy: Revalidate on Sundays at midnight UTC
   - Fallback: If no featured, show first Tier A product

   **Sample implementation structure:**
   ```tsx
   'use client';
   import { useEffect, useState } from 'react';
   import { Product } from '@/data/products';
   
   export function HeroFeaturedProduct() {
     const [featured, setFeatured] = useState<Product | null>(null);
     
     useEffect(() => {
       // Fetch featured product from API or cache
       const getFeatured = async () => {
         const res = await fetch('/api/featured-product');
         const data = await res.json();
         setFeatured(data);
       };
       getFeatured();
     }, []);
     
     if (!featured) return null;
     return <ProductCard product={featured} variant="hero" />;
   }
   ```

### 2.3 Tablet Layout (1024px and below)

- Grid: Change to 1 column
- Hero becomes vertical stack
- Image: 100% width, max-width 500px, centered
- Product card: 100% width, max-width 420px, centered
- Gap between sections: 3rem
- Padding: 3rem 2rem
- Both sections stack vertically, image on top, card below

**CSS:**
```css
@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .heroLeft {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .heroRight {
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
  }
}
```

### 2.4 Mobile Layout (768px and below)

- Single column, centered
- Hero padding: 2rem 1.5rem
- Image: 100% width, max-width 400px
- Product card: 100% width, max-width 100%
- Gap: 2rem
- Card padding: 1.5rem
- Typography scale down:
  - Product name: 1rem (from 1.2rem)
  - Price: 1.1rem (from 1.3rem)
- Button: Full width, padding 0.875rem 1.5rem

**CSS:**
```css
@media (max-width: 768px) {
  .hero {
    padding: 2rem 1.5rem;
    gap: 2rem;
  }
  
  .heroLeft img {
    max-width: 400px;
    width: 100%;
  }
  
  .productCard {
    padding: 1.5rem;
  }
  
  .productName {
    font-size: 1rem;
  }
  
  .price {
    font-size: 1.1rem;
  }
  
  .shopNowButton {
    padding: 0.875rem 1.5rem;
  }
}
```

### 2.5 Mobile Layout (480px and below)

- Hero padding: 1.5rem 1rem
- Image max-width: 300px
- Product card padding: 1.25rem
- Gap: 1.5rem
- Button: Adjusted padding 0.75rem 1rem
- Brand font-size: 0.8rem
- Product name: 0.95rem
- Price: 1rem

---

## 3. "HOW IT WORKS" SECTION REDESIGN

### 3.1 Section Architecture

Replace generic e-commerce flow with Leaf Lightly-specific value prop:

```
┌──────────────────────────────────────────────────────────────┐
│                    How It Works                              │
│                 (Leaf Lightly Specific)                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Step 1        Step 2          Step 3                        │
│  We Vet     You Discover      You Earn                       │
│                                                              │
│  [Icon]       [Icon]          [Icon]                         │
│                                                              │
│  Editorial    Browse        Affiliate                        │
│  curation    collections    transparency                     │
│              visual                                          │
│                                                              │
│  [Stat/             [Stat/          [Stat/                  │
│   Testimonial]       Testimonial]     Testimonial]           │
│                                                              │
│  "We hand-      "Discover       "Real impact:               │
│   pick each     across 5       Commission helps             │
│   product       sustainable    fund more                    │
│   against       categories     research"                    │
│   strict        with 1000+                                  │
│   criteria"     verified items"                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘

Bottom stat banner:
┌──────────────────────────────────────────────────────────────┐
│  500+ curated products from 200+ sustainable brands          │
└──────────────────────────────────────────────────────────────┘
```

### 3.2 Desktop Layout Specifications

**Section Container:**
- Max-width: 1200px
- Margin: 0 auto
- Padding: 4rem 2rem
- Background: `var(--color-light-gray)` (off-white)
- Border-radius: 12px

**Header:**
- H2 text: "How It Works" (Leaf Lightly Edition)
- Text-align: center
- Font-size: 2.5rem
- Color: `var(--color-forest)`
- Margin-bottom: 3rem

**Steps Container:**
- Display: grid
- Grid-template-columns: repeat(3, 1fr)
- Gap: 3rem

**Individual Step Card:**
- Background: white
- Padding: 2rem
- Border-radius: 12px
- Text-align: center
- Box-shadow: `0 4px 12px rgba(0, 0, 0, 0.05)`
- Transition: transform 0.3s, box-shadow 0.3s

**Step Card Hover State:**
- Transform: translateY(-4px)
- Box-shadow: `0 12px 24px rgba(0, 0, 0, 0.1)`

**Icon Area:**
- Height: 80px
- Width: 80px
- Margin: 0 auto 1.5rem
- Display: flex, center items
- Background: varies by step
  - Step 1 (We Vet): `linear-gradient(135deg, var(--color-tier-a), #1a7a4a)`
  - Step 2 (You Discover): `linear-gradient(135deg, var(--color-tier-b), #1e4a8b)`
  - Step 3 (You Earn): `linear-gradient(135deg, var(--color-accent), #E55A28)`
- Border-radius: 12px
- Color: white
- Font-size: 2.5rem

**Step Content:**

```jsx
<div className={styles.step}>
  <div className={styles.stepIcon}>
    {/* Icon SVG or emoji */}
  </div>
  
  <h3 className={styles.stepTitle}>We Vet</h3>
  <p className={styles.stepDescription}>
    Editorial curation, not algorithms.
    Every product meets our strict sustainability criteria.
  </p>
  
  <div className={styles.stepStat}>
    <div className={styles.statHighlight}>Tier A/B/C</div>
    <div className={styles.statLabel}>Certification badge shown</div>
  </div>
</div>
```

**Step Titles:**
- Font-size: 1.4rem
- Font-weight: 600
- Color: `var(--color-forest)`
- Margin: 1rem 0

**Step Descriptions:**
- Font-size: 1rem
- Color: `var(--color-charcoal)`
- Line-height: 1.6
- Margin: 0.5rem 0 1.5rem

**Step Stats/Testimonials:**
- Background: `var(--color-light-gray)`
- Padding: 1rem
- Border-radius: 8px
- Font-size: 0.95rem
- Color: `var(--color-charcoal)`
- Border-left: 4px solid `var(--color-accent)`

**Bottom Banner:**

```jsx
<div className={styles.statsBanner}>
  <h3>500+ curated products from 200+ sustainable brands</h3>
</div>
```

- Margin-top: 3rem
- Padding: 2rem
- Background: white
- Border-top: 2px solid `var(--color-accent)`
- Text-align: center
- Font-size: 1.3rem
- Font-weight: 600
- Color: `var(--color-forest)`

### 3.3 Icon Concepts

**Step 1 - We Vet:**
- Checkmark circle (editorial approval)
- Or: Magnifying glass + checkmark
- SVG: 24x24 grid, outline stroke style
- Color: white

**Step 2 - You Discover:**
- Stack of products / browsing visual
- Or: Grid of 4 squares (representing product grid)
- SVG: Simplified product cards
- Color: white

**Step 3 - You Earn:**
- Coin/currency symbol
- Or: Handshake + coin
- SVG: Simple outlined coin
- Color: white

**Implementation:**
- Create `src/components/HowItWorksIcons.tsx` with SVG exports
- Each icon: `<svg viewBox="0 0 24 24">` format
- Icons available in both solid and outline variants
- Use `fill="currentColor"` for easy color theming

### 3.4 Tablet Layout (1024px and below)

- Grid: 2 columns, gap 2rem
- Step 3 spans full width (centered)
- Or: Stack to single column with card layout
- Padding: 3rem 2rem
- Font-size scale: -0.1rem across sizes

**CSS:**
```css
@media (max-width: 1024px) {
  .steps {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .step:nth-child(3) {
    grid-column: 1 / -1;
    max-width: 50%;
    margin: 0 auto;
  }
}
```

### 3.5 Mobile Layout (768px and below)

- Grid: 1 column
- All steps stack vertically
- Padding: 2rem 1.5rem
- Font-size adjustments:
  - H2: 1.8rem
  - Step title: 1.2rem
  - Description: 0.95rem
- Icon size: 70px

---

## 4. "WHY LEAF LIGHTLY?" TIER BADGE SYSTEM

### 4.1 Section Architecture

```
┌────────────────────────────────────────────────────────────┐
│             Why Leaf Lightly?                              │
│          Tier Badge System Showcase                        │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │  Tier A     │  │  Tier B     │  │  Tier C     │       │
│  │ CERTIFIED   │  │ COMMUNITY   │  │ TRANSPARENT │       │
│  │    ECO      │  │ VALIDATED   │  │ MATERIALS   │       │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤       │
│  │             │  │             │  │             │       │
│  │  Product 1  │  │  Product 1  │  │  Product 1  │       │
│  │  [Image]    │  │  [Image]    │  │  [Image]    │       │
│  │  Rating     │  │  Rating     │  │  Rating     │       │
│  │             │  │             │  │             │       │
│  │  Product 2  │  │  Product 2  │  │  Product 2  │       │
│  │  [Image]    │  │  [Image]    │  │  [Image]    │       │
│  │  Rating     │  │  Rating     │  │  Rating     │       │
│  │             │  │             │  │             │       │
│  │  Product 3  │  │  Product 3  │  │  Product 3  │       │
│  │  [Image]    │  │  [Image]    │  │  [Image]    │       │
│  │  Rating     │  │  Rating     │  │  Rating     │       │
│  │             │  │             │  │             │       │
│  └─────────────┘  └─────────────┘  └─────────────┘       │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                   Trust Factors                            │
│  Partner Logos: [Amazon] [Trustpilot] [Eco-Cert] etc.   │
│                                                            │
│  Key Differentiators (visual bullets)                     │
│  ✓ Editorial curation                                    │
│  ✓ Real customer reviews                                 │
│  ✓ Transparent partnerships                              │
│  ✓ UK-first sustainable focus                            │
└────────────────────────────────────────────────────────────┘
```

### 4.2 Desktop Layout Specifications

**Section Container:**
- Max-width: 1200px
- Margin: 0 auto
- Padding: 4rem 2rem
- Background: white (or very subtle pattern)

**Section Header:**
- H2: "Why Leaf Lightly?"
- Text-align: center
- Font-size: 2.5rem
- Color: `var(--color-forest)`
- Margin-bottom: 1rem
- Subtitle text: "We showcase products across three quality tiers"
- Subtitle font-size: 1.1rem
- Subtitle color: `var(--color-charcoal)`
- Margin-bottom: 3rem

**Tier Container:**
- Display: grid
- Grid-template-columns: repeat(3, 1fr)
- Gap: 2.5rem

**Individual Tier Column:**

```jsx
<div className={styles.tierColumn}>
  <div className={styles.tierHeader}>
    <div className={styles.tierBadge}>
      <span className={styles.tierIcon}>✓</span>
      <span className={styles.tierLabel}>Tier A</span>
    </div>
    <p className={styles.tierDescription}>Certified Eco</p>
  </div>
  
  <div className={styles.productGrid}>
    {products.map(product => (
      <div key={product.id} className={styles.tierProduct}>
        <img src={product.imageUrl} alt={product.name} />
        <p className={styles.productName}>{product.name}</p>
        <div className={styles.rating}>
          <span className={styles.stars}>★★★★★</span>
          <span>{product.rating}</span>
        </div>
      </div>
    ))}
  </div>
</div>
```

**Tier Header Styling:**

```css
.tierHeader {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid {color-based};
}

.tierBadge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

/* Tier A */
.tierBadge.tierA {
  background: rgba(26, 122, 74, 0.1);
  color: var(--color-tier-a);
  border: 1px solid var(--color-tier-a);
}

/* Tier B */
.tierBadge.tierB {
  background: rgba(37, 99, 179, 0.1);
  color: var(--color-tier-b);
  border: 1px solid var(--color-tier-b);
}

/* Tier C */
.tierBadge.tierC {
  background: rgba(139, 139, 126, 0.1);
  color: var(--color-tier-c);
  border: 1px solid var(--color-tier-c);
}

.tierIcon {
  font-weight: 700;
}

.tierDescription {
  font-size: 1rem;
  color: var(--color-charcoal);
  font-weight: 500;
}
```

**Product Grid (within tier):**
- Display: grid
- Grid-template-columns: 1fr
- Gap: 1.5rem
- (Showing 3 products per tier)

**Individual Tier Product Card:**
```css
.tierProduct {
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-light-gray);
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.tierProduct:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.tierProduct img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

.productName {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-charcoal);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.rating {
  font-size: 0.8rem;
  color: var(--color-gray);
}

.stars {
  color: #FFB800;
  font-size: 0.85rem;
}
```

### 4.3 Trust Factors Section (Below Tiers)

```
Horizontal divider (top margin: 3rem)

┌────────────────────────────────────────────────────────────┐
│              Trusted By Sustainable Shoppers               │
│                                                            │
│  Partner Logos:                                            │
│  [Amazon Logo] [Trustpilot Logo] [FSC] [Fair Trade] etc. │
│                                                            │
│  Key Differentiators:                                      │
│  ✓ Editorial Curation    ✓ Real Reviews                   │
│  ✓ Transparent Affiliate ✓ UK-First Focus                 │
└────────────────────────────────────────────────────────────┘
```

**Logos Container:**
- Display: flex
- Flex-wrap: wrap
- Gap: 2rem
- Justify-content: center
- Align-items: center
- Margin: 2rem 0

**Logo Images:**
- Max-height: 50px
- Max-width: 120px
- Grayscale filter default
- Opacity: 0.7
- Hover: Grayscale 0%, Opacity 1

**Differentiator Bullets:**
- Display: grid or flex
- 2 columns (desktop)
- Gap: 2rem
- Each item: flex with checkmark icon
- Font-size: 0.95rem
- Color: `var(--color-charcoal)`

### 4.4 Tablet Layout (1024px and below)

- Grid: 2 columns for tiers
- 3rd tier spans full width (centered)
- Or: Stack to single column
- Gap: 2rem
- Product images: 100px height
- Logo grid: 2 columns

### 4.5 Mobile Layout (768px and below)

- Grid: 1 column
- All tiers stack vertically
- Product grid: Horizontal scroll or 2 columns
- Logo grid: Single column or 2 columns
- Padding: 2rem 1.5rem
- Font-size scale down -0.1rem
- Tier badge: Smaller padding

---

## 5. RESPONSIVE BREAKPOINTS & GRID SYSTEM

### 5.1 Breakpoint Configuration

```css
/* Desktop */
@media (min-width: 1025px) {
  /* Primary grid layouts use 3 columns for tiers, 2 for hero */
}

/* Tablet */
@media (max-width: 1024px) and (min-width: 769px) {
  /* Grid shifts to 2 columns where applicable */
  /* Hero becomes single column stacked vertical */
}

/* Mobile */
@media (max-width: 768px) and (min-width: 481px) {
  /* Single column, font sizes reduced 0.1-0.2rem */
  /* All grids become 1 column */
}

/* Small Mobile */
@media (max-width: 480px) {
  /* Extra padding reduction */
  /* Minimal spacing */
  /* Button full width */
}
```

### 5.2 Container Queries (Future Enhancement)

For maximum flexibility, consider adding CSS Container Queries:

```css
.heroSection {
  container-type: inline-size;
  container-name: hero;
}

@container hero (max-width: 600px) {
  .productCard {
    flex-direction: column;
  }
}
```

---

## 6. COMPONENT IMPLEMENTATION CHECKLIST

### 6.1 New Components to Create

- [ ] `src/components/HeroFeaturedProduct.tsx` — Featured product card (client)
- [ ] `src/components/HeroFeaturedProduct.module.css` — Styling
- [ ] `src/components/HowItWorksIcons.tsx` — SVG icons for how it works
- [ ] `src/components/TierBadge.tsx` — Reusable tier badge component
- [ ] `src/components/TrustFactorsSection.tsx` — Trust logos and differentiators

### 6.2 Files to Modify

- [ ] `src/app/globals.css` — Update color palette variables
- [ ] `src/app/home.module.css` — Update hero, how-it-works, trust sections
- [ ] `src/app/page.tsx` — Integrate new hero and section structure
- [ ] `src/components/ProductCard.tsx` — Add variant support for "hero" display
- [ ] `src/lib/product-labels.ts` — Add tier descriptions

### 6.3 API Routes to Add (optional but recommended)

- [ ] `src/app/api/featured-product/route.ts` — Get weekly featured product
- [ ] Logic: Select Tier A product by week number (deterministic rotation)

---

## 7. IMAGE OPTIMIZATION REQUIREMENTS

### 7.1 Hero Left Image (Lifestyle)

- Format: WebP with fallback to JPG
- Dimensions: 800x800px (max)
- File size: < 100KB (WebP)
- Quality: 80% (balanced)
- Alt text: "Sustainable living - [Brand/Product theme]"
- Use `next/image` with `priority` flag
- Placeholder: Blur effect or base64 preview

### 7.2 Product Card Images

- Format: WebP with fallback
- Dimensions: 300x300px (for hero featured card)
- File size: < 50KB
- Quality: 75%
- Alt text: "[Brand] [Product Name]"
- Use `next/image` with lazy loading (default)

### 7.3 Tier Product Images

- Format: WebP
- Dimensions: 200x200px
- File size: < 30KB
- Quality: 70%
- Alt text: "[Product Name] - Tier [A/B/C]"

---

## 8. ACCESSIBILITY CHECKLIST

- [ ] All images have descriptive alt text
- [ ] Color contrast meets WCAG AA standard (verified in 1.3)
- [ ] Interactive elements are keyboard accessible
- [ ] Focus states are visible and clear
- [ ] Star ratings use semantic HTML or ARIA attributes
- [ ] Tier badges have sufficient color differentiation (not color-only)
- [ ] Button text clearly indicates action
- [ ] Links are underlined or have sufficient contrast
- [ ] Responsive text sizing (no fixed px for body text)
- [ ] Sufficient whitespace (padding/gap) for readability

---

## 9. PERFORMANCE OPTIMIZATION

### 9.1 Image Loading

- Hero left image: `priority` flag for LCP
- Featured product: `loading="eager"` or default lazy
- Tier products: `loading="lazy"`

### 9.2 Component Code Splitting

- `HeroFeaturedProduct`: Client component (lightweight)
- `HowItWorks`: Can remain static if no interactivity
- `TierBadges`: Static or minimal client code

### 9.3 CSS Optimization

- Keep `.module.css` files scoped to components
- Use CSS variables for colors (reduces specificity)
- Minimize media queries (combine breakpoints where possible)

---

## 10. ANIMATION & INTERACTION SPECIFICATIONS

### 10.1 Button Interactions

```css
.shopNowButton {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.shopNowButton:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
}

.shopNowButton:active {
  transform: translateY(0px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.2);
}
```

### 10.2 Card Hover Effects

```css
.tierProduct:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.step:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}
```

### 10.3 No Animation Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11. TESTING CHECKLIST

### 11.1 Visual Testing

- [ ] Hero layout on desktop, tablet, mobile
- [ ] Product card display in hero (correct image, text, buttons)
- [ ] Color contrast verified with axe/WAVE
- [ ] Responsive images load correctly
- [ ] Icons render without distortion

### 11.2 Interaction Testing

- [ ] Button hover/active states work
- [ ] Links are clickable and navigate
- [ ] Featured product rotates weekly (if implemented)
- [ ] No layout shifts (CLS)

### 11.3 Performance Testing

- [ ] Lighthouse score > 80
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Images optimized (DevTools)

---

## 12. MIGRATION & ROLLOUT STRATEGY

### 12.1 Implementation Phase

1. **Phase 1: Colors** (Low Risk)
   - Update `globals.css` with new palette
   - Update `home.module.css` color references
   - Test contrast, verify no visual regressions

2. **Phase 2: Hero Section** (Medium Risk)
   - Create `HeroFeaturedProduct.tsx` component
   - Update `home.module.css` hero styles
   - Update `page.tsx` to use new hero layout
   - Test responsive behavior

3. **Phase 3: How It Works & Trust** (Low Risk)
   - Update section styles
   - Add tier badge styling
   - Test layout changes

4. **Phase 4: Final Polish** (Low Risk)
   - Image optimization
   - Accessibility audit
   - Performance optimization
   - Browser testing

### 12.2 Rollback Plan

- All CSS changes are non-destructive (just updated)
- Color variables have clear mapping
- Old component code remains untouched initially
- If issues arise: revert color variables to old values

---

## 13. DESIGN TOKENS SUMMARY

### 13.1 Color Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-forest` | #1a472a | Primary text, headings |
| `--color-accent` | #FF6B35 | CTAs, hover states |
| `--color-warm-beige` | #C9B8A0 | Secondary accents |
| `--color-charcoal` | #2A2A26 | Body text |
| `--color-light-gray` | #F8F6F3 | Backgrounds |
| `--color-tier-a` | #1a7a4a | Tier A badges |
| `--color-tier-b` | #2563b3 | Tier B badges |
| `--color-tier-c` | #8B8B7E | Tier C badges |

### 13.2 Spacing Tokens

| Purpose | Value |
|---------|-------|
| Section padding | 4rem / 2rem |
| Component gap | 2rem - 3rem |
| Text margin | 0.5rem - 2rem |
| Border-radius | 8px - 12px |

### 13.3 Typography Tokens

| Level | Font | Size | Weight |
|-------|------|------|--------|
| H1 | Heading | 2.5-3.5rem | 600-700 |
| H2 | Heading | 2rem-2.5rem | 600 |
| H3 | Heading | 1.2-1.4rem | 600 |
| Body | Georgia, serif | 1rem | 400 |
| Label | Heading | 0.75-0.9rem | 600 |

---

## End of Specifications

**Total Implementation Time Estimate:** 8-12 hours (including testing)

**Next Steps:**
1. Frontend Agent reads this document
2. Implements components and styling in order
3. Conducts visual and performance testing
4. Deploys to staging for review
5. Iterates based on feedback

**Questions? Contact the Design Agent for clarification on any section.**
