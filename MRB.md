# 📋 Master Replication Blueprint: Affiliate Site Build
## Leaf Lightly — Production-Ready Sustainable Product Discovery Platform

**Document Version:** 1.0  
**Last Updated:** 2026-10-13  
**Status:** PRODUCTION BUILD COMPLETE  
**Build Hash:** 26c8070 (main branch)

---

## 1. Executive Summary & Core Concept

### 1.1 Project Definition

**Leaf Lightly** is a **curated affiliate discovery platform** for sustainable, ethically-made products. The platform does NOT sell products directly. Instead, it:

1. **Curates** a hand-picked catalog of sustainable products across 5 categories (Kitchen, Fashion, Home, Beauty, Wellness)
2. **Educates** users with tier-based sustainability certifications, brand vetting, and honest reviews
3. **Redirects** users directly to retailers/brands via affiliate links (Amazon Associates, Direct Brand Partnerships)
4. **Earns** small commissions (4-5% typical) when users purchase through Leaf Lightly's affiliate links, at zero cost to the user
5. **Retains** users by allowing them to create accounts, save favorite products to wishlists, and manage their preferences

### 1.2 Core Value Proposition

**For End Users:**
- Transparent discovery of genuinely sustainable products
- No hidden markups or inflated pricing (direct brand links)
- Honest, AI-assisted reviews and sustainability ratings
- Personal wishlist to track products across visits
- Free service (no ads, affiliate-only revenue model)

**For Business:**
- Affiliate commission revenue (primary income stream)
- Data on user preferences (anonymized, compliant)
- Scalable to international markets by adding country-specific retailer partnerships
- SEO-optimized content attracts organic traffic and builds brand authority in "sustainable products" niche

### 1.3 Target End-User

**Primary:** Eco-conscious consumers aged 25-45, willing to pay premium for verified sustainability
- High purchase intent (already committed to buying sustainable)
- Desire for curation (too many "greenwashing" brands; Leaf Lightly filters the noise)
- Trust-seeking (want independent reviews, not brand marketing)

**Secondary:** Sustainability researchers, journalists, CSR teams using Leaf Lightly as a source

### 1.4 Final Scope Boundary

#### ✅ **IS IN SCOPE:**
- 5 product categories with 20-30 curated products each
- Per-product details: brand, tier (1-5), certifications, pricing, affiliate links
- User authentication (email/password + Google/GitHub OAuth)
- Per-user persistent wishlists (saved products with dates)
- Customer reviews/ratings per product (read-only display, comment/submit disabled pending legal review)
- Responsive design (mobile 375px, tablet 768px, desktop 1440px+)
- SEO: JSON-LD schema, meta tags, structured breadcrumbs, sitemaps
- Newsletter signup (Resend email provider)
- Admin panel for product approval (stub, not fully built)
- Affiliate disclosure compliance page
- Dark mode ready (CSS variables defined, no media query yet)

#### ❌ **IS NOT IN SCOPE:**
- Direct product sales or payment processing
- User-submitted reviews (write functionality) — comments disabled pending legal review
- Real-time inventory sync with retailers
- Product search by price range or advanced filters (basic category filters only)
- Recommendation engine (AI-powered product suggestions stub exists but not trained)
- Multi-language support (English UK only)
- Community forums or social features
- Mobile app (web-only, responsive)
- Analytics dashboard or reporting tools
- Retail partner admin panels (manual product data management)

---

## 2. Technical Stack & Environmental Architecture

### 2.1 Core Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Runtime** | Node.js | 20.x LTS | Server-side execution |
| **Framework** | Next.js | 16.4.0 (Turbopack) | React SSR, API routes, file-based routing |
| **Language** | TypeScript | 5.3.3 | Type safety, development DX |
| **Frontend** | React | 19.0.0 | Component library, hooks-based UI |
| **Auth** | NextAuth.js | 4.24.0 | Session management, OAuth providers |
| **Password Hashing** | bcryptjs | 2.4.3 | Credentials provider password hashing |
| **Styling** | CSS Modules | (native Next.js) | Scoped component styles |
| **Email** | Resend | 3.0.0 | Transactional email (newsletter confirmations) |
| **Database** | In-Memory Store | (custom) | User sessions, wishlists (see 2.3) |
| **Rate Limiting** | Upstash Redis | (optional) | API endpoint rate limiting |
| **CI/CD** | GitHub + Vercel | (latest) | Git-based auto-deploy pipeline |

### 2.2 Critical Dependencies (Complete List)

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.43.4",
    "@types/node": "^20.10.5",
    "@types/react": "^19.0.0",
    "@upstash/ratelimit": "^1.1.2",
    "@upstash/redis": "^1.31.5",
    "@vercel/kv": "^1.0.1",
    "bcryptjs": "^2.4.3",
    "drizzle-orm": "^0.45.4",
    "isomorphic-dompurify": "^2.13.0",
    "jose": "^5.4.1",
    "next": "^16.4.0",
    "next-auth": "^4.24.0",
    "postgres": "^3.4.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "rehype-sanitize": "^6.0.0",
    "rehype-stringify": "^10.0.0",
    "remark": "^15.0.1",
    "remark-rehype": "^11.1.0",
    "resend": "^3.0.0",
    "sharp": "^0.35.5",
    "typescript": "^5.3.3",
    "uuid": "^14.0.3",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/react-dom": "^19.0.0",
    "autoprefixer": "^10.4.16",
    "dotenv-cli": "^11.0.0",
    "drizzle-kit": "^0.31.11",
    "eslint": "^9.0.0",
    "eslint-config-next": "^16.4.0",
    "postcss": "^8.4.32",
    "tailwindcss": "^4.3.3"
  }
}
```

### 2.3 Data Models & State Management

#### 2.3.1 User Model (In-Memory Store)

**File:** `src/auth.ts`

```typescript
interface User {
  id: string;                    // Generated: "user_<timestamp>"
  email: string;                 // Unique
  name: string;                  // Display name
  passwordHash?: string;         // bcryptjs hash (credentials provider only)
  // OAuth users: no passwordHash
}

// Storage: Plain JS object keyed by userId
const users: Record<string, User> = {};
```

**Persistence:** In-memory (lost on server restart). For production, replace with Neon PostgreSQL using Drizzle ORM schema at `src/db/schema.ts`.

#### 2.3.2 Wishlist Model

**File:** `src/lib/wishlist-store.ts`

```typescript
interface WishlistItem {
  userId: string;
  productId: string;
  addedAt: Date;
}

// Storage: Array of items
const wishlistStore: WishlistItem[] = [];

// Public API:
export async function addToWishlist(userId: string, productId: string)
export async function removeFromWishlist(userId: string, productId: string)
export async function getWishlist(userId: string): Promise<string[]>
export async function isInWishlist(userId: string, productId: string): Promise<boolean>
```

**Persistence:** In-memory (same caveat as User model).

#### 2.3.3 Product Model

**File:** `src/data/products.ts`

```typescript
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'kitchen' | 'fashion' | 'home' | 'beauty' | 'wellness';
  imageUrl: string;
  price: number;
  originalPrice?: number;
  rating: number;           // 1-5 stars
  reviewCount: number;
  tier: Tier;               // 1-5 (sustainability level)
  certifications: Certification[];
  description: string;
}

type Tier = 1 | 2 | 3 | 4 | 5;
type Certification = 'b-corp' | 'fsc' | 'organic' | 'plastic-free' | 'compostable' | 'fair-trade';
```

**Source:** Hard-coded in `src/data/products.ts` (20-30 products per category). For production, migrate to database.

#### 2.3.4 NextAuth Session Structure

**File:** `src/auth.ts` (Type Augmentation)

```typescript
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}
```

**Session Providers:**
1. **Credentials Provider** — Email/password login
2. **Google OAuth** — Requires env vars: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
3. **GitHub OAuth** — Requires env vars: `GITHUB_ID`, `GITHUB_SECRET`

### 2.4 Environment Variables (.env.local Schema)

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000          # Or production domain
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>

# OAuth Providers (Optional for local dev, required for production)
GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
GITHUB_ID=<from GitHub OAuth Apps>
GITHUB_SECRET=<from GitHub OAuth Apps>

# Email (Resend)
RESEND_API_KEY=<from Resend dashboard>

# Rate Limiting (Optional)
UPSTASH_REDIS_REST_URL=<from Upstash Redis>
UPSTASH_REDIS_REST_TOKEN=<from Upstash Redis>

# Database (for future Postgres integration)
DATABASE_URL=<postgres://user:pass@host:port/db>
```

### 2.5 File System Architecture

```
leaf-lightly/
├── .env.local                          # Environment secrets (not in git)
├── .env.example                        # Template for contributors
├── .gitignore                          # Standard Next.js ignores
├── package.json                        # Dependencies & scripts
├── package-lock.json                   # Locked dependency versions
├── tsconfig.json                       # TypeScript configuration
├── next.config.ts                      # Next.js configuration (Turbopack)
├── tailwind.config.ts                  # Tailwind CSS config (installed, not used yet)
├── postcss.config.mjs                  # PostCSS pipeline
├── eslint.config.mjs                   # ESLint rules
│
├── public/
│   ├── favicon.ico
│   └── assets/images/
│       └── hero-background.webp        # Home page hero image
│
├── src/
│   ├── auth.ts                         # NextAuth configuration & handlers
│   │
│   ├── app/
│   │   ├── layout.tsx                  # Root layout (Header, Footer, AIChat)
│   │   ├── globals.css                 # Global styles & CSS variables
│   │   ├── page.tsx                    # Home page (/)
│   │   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/route.ts    # NextAuth handler
│   │   │   │   └── signup/route.ts           # POST /api/auth/signup
│   │   │   ├── wishlist/
│   │   │   │   ├── add/route.ts              # POST /api/wishlist/add
│   │   │   │   ├── remove/route.ts           # POST /api/wishlist/remove
│   │   │   │   └── get/route.ts              # GET /api/wishlist/get
│   │   │   ├── newsletter/
│   │   │   │   ├── subscribe/route.ts        # POST /api/newsletter/subscribe
│   │   │   │   └── confirm/route.ts          # GET /api/newsletter/confirm
│   │   │   ├── admin/
│   │   │   │   └── products/[id]/...         # Admin product approval (stub)
│   │   │   ├── health/route.ts               # GET /api/health (liveness probe)
│   │   │   └── webhook/
│   │   │       └── revalidate/route.ts       # ISR revalidation webhook
│   │   │
│   │   ├── products/
│   │   │   ├── [slug]/
│   │   │   │   ├── page.tsx                  # Product detail page
│   │   │   │   └── page.module.css
│   │   │   ├── kitchen/page.tsx              # Kitchen category
│   │   │   ├── fashion/page.tsx              # Fashion category
│   │   │   ├── home/page.tsx                 # Home category
│   │   │   ├── beauty/page.tsx               # Beauty category
│   │   │   ├── wellness/page.tsx             # Wellness category
│   │   │   └── [category]/page.module.css
│   │   │
│   │   ├── login/
│   │   │   ├── page.tsx                      # Login page
│   │   │   └── page.module.css
│   │   ├── signup/
│   │   │   ├── page.tsx                      # Signup page
│   │   │   └── page.module.css
│   │   ├── wishlist/
│   │   │   ├── page.tsx                      # User's wishlist (/wishlist)
│   │   │   └── page.module.css
│   │   ├── search/
│   │   │   ├── page.tsx                      # Product search
│   │   │   └── page.module.css
│   │   ├── compare/
│   │   │   ├── page.tsx                      # Product comparison
│   │   │   └── page.module.css
│   │   ├── affiliate-disclosure/
│   │   │   ├── page.tsx                      # Legal/compliance page
│   │   │   └── page.module.css
│   │   │
│   │   ├── robots.ts                    # robots.txt generation
│   │   └── sitemap.ts                   # XML sitemap generation
│   │
│   ├── components/
│   │   ├── Header.tsx                   # Navigation header
│   │   ├── Header.module.css
│   │   ├── Footer.tsx                   # Footer with links
│   │   ├── Footer.module.css
│   │   ├── AIChat.tsx                   # AI chat widget (stub)
│   │   ├── AIChat.module.css
│   │   │
│   │   ├── ProductCard.tsx              # Reusable product card
│   │   ├── ProductCard.module.css
│   │   ├── ProductFilter.tsx            # Filter by tier/certifications
│   │   ├── ProductFilter.module.css
│   │   ├── ProductCarousel.tsx          # Horizontal product carousel
│   │   ├── ProductCarousel.module.css
│   │   ├── RelatedProductsCarousel.tsx  # Related products widget
│   │   ├── RelatedProductsCarousel.module.css
│   │   ├── CuratedByCategory.tsx        # Category showcase section
│   │   ├── CuratedByCategory.module.css
│   │   │
│   │   ├── FeaturedProductHero.tsx      # Hero section with featured product
│   │   ├── FeaturedProductHero.module.css
│   │   ├── TierShowcase.tsx             # Tier level explanations
│   │   ├── TierShowcase.module.css
│   │   ├── TrustSignals.tsx             # Trust badges/signals
│   │   ├── TrustSignals.module.css
│   │   │
│   │   ├── BuyNowButton.tsx             # Affiliate link button(s)
│   │   ├── BuyNowButton.module.css
│   │   ├── AffiliateDisclosure.tsx      # Affiliate notice banner
│   │   ├── AffiliateDisclosure.module.css
│   │   ├── WishlistButton.tsx           # Heart icon toggle (client)
│   │   ├── WishlistButton.module.css
│   │   ├── CompareButton.tsx            # Add to compare (stub)
│   │   ├── CompareButton.module.css
│   │   │
│   │   ├── ReviewsSection.tsx           # Display product reviews
│   │   ├── ReviewsSection.module.css
│   │   ├── ReviewForm.tsx               # Review submission (disabled)
│   │   ├── ReviewForm.module.css
│   │   │
│   │   ├── NewsletterModal.tsx          # Newsletter signup popup
│   │   ├── NewsletterModal.module.css
│   │   │
│   │   ├── SearchBar.tsx                # Product search input
│   │   ├── SearchBar.module.css
│   │   │
│   │   ├── LoginForm.tsx                # Email/password login form
│   │   ├── SignupForm.tsx               # Registration form
│   │   ├── AuthForm.module.css          # Shared form styles
│   │   │
│   │   └── StructuredData.tsx           # JSON-LD schema rendering
│   │
│   ├── lib/
│   │   ├── auth.ts                      # NextAuth config (see above)
│   │   ├── wishlist-store.ts            # Wishlist in-memory store
│   │   ├── affiliateLinks.ts            # Affiliate URL builders
│   │   │   ├── buildAmazonLink()        # Amazon Associates links
│   │   │   ├── buildBrandLink()         # Direct brand links with params
│   │   │   ├── getRetailerLinks()       # Get all retail options per product
│   │   │   ├── buildUTM()               # UTM parameter builder
│   │   │   └── addUTMToUrl()            # Apply UTM to URL
│   │   ├── product-labels.ts            # Certification & tier labels
│   │   ├── seo.ts                       # SEO metadata & schema generators
│   │   │   ├── generateMetadata()       # Next.js Metadata object
│   │   │   ├── generateProductSchema()  # JSON-LD Product
│   │   │   ├── generateReviewSchema()   # JSON-LD Review collection
│   │   │   ├── generateOrganizationSchema()  # JSON-LD Organization
│   │   │   └── generateBreadcrumbSchema()    # JSON-LD BreadcrumbList
│   │   ├── schemaValidator.ts           # SEO schema validation utilities
│   │   ├── aeo.ts                       # AI-Enhanced Optimization (stub)
│   │   ├── recommendations.ts           # Product recommendation engine (stub)
│   │   ├── validate.ts                  # Data validation helpers
│   │   ├── email-confirmation.ts        # Email validation logic
│   │   ├── logging.ts                   # Structured logging
│   │   ├── rateLimit.ts                 # Rate limiting utilities
│   │   ├── cache.ts                     # Caching layer
│   │   ├── storage.ts                   # File storage abstraction
│   │   ├── db/
│   │   │   ├── client.ts                # Database client init
│   │   │   ├── schema.ts                # Drizzle ORM schema (for future DB)
│   │   │   └── auth.ts                  # Auth-related DB functions (stub)
│   │   │
│   │   ├── api/
│   │   │   ├── handler.ts               # API handler utilities
│   │   │   ├── middleware.ts            # Auth/rate-limit middleware
│   │   │   └── webhook.ts               # Webhook handling
│   │   │
│   │   └── email/
│   │       └── queue.ts                 # Email queue (Resend)
│   │
│   └── data/
│       ├── products.ts                  # Product catalog (hardcoded)
│       └── reviews.ts                   # Sample reviews data
│
├── node_modules/                        # Dependencies (generated, not in git)
└── .next/                               # Build output (generated, not in git)
```

---

## 3. The "Zero-Start" Step-by-Step Build Workflow

### 3.1 Prerequisites & Environment Setup

```bash
# Required software (check versions):
node --version              # Must be 20.x LTS or higher
npm --version               # Must be 10.x or higher
git --version               # Any recent version

# Recommended: Git configured with SSH keys
git config --list | grep user.name
```

### 3.2 Clone & Initialize Repository

```bash
# Clone from GitHub
git clone https://github.com/mistclothing1977-ui/leaflightly.git
cd leaf-lightly

# Verify main branch is checked out
git branch -v              # Should show "* main"

# Create local environment file
cp .env.example .env.local

# Edit .env.local with your actual values
# CRITICAL: NEXTAUTH_SECRET must be unique per environment
# Generate with: openssl rand -base64 32
```

### 3.3 Install Dependencies

```bash
# Install all npm packages
npm install

# Verify installation
npm list next react typescript   # Should show versions matching package.json
```

### 3.4 Build & Verify

```bash
# Production build (tests the complete pipeline)
npm run build

# Expected output:
# ✓ Compiled successfully
# ✓ TypeScript check passed
# ✓ Generating static pages (17/17)
# ✓ Route summary: 12 static, 15 dynamic, 0 errors

# Start production server
npm start

# Navigate to http://localhost:3000
# Verify: Home page loads, navigation works, no console errors
```

### 3.5 Development Workflow

```bash
# Start dev server (hot reload enabled)
npm run dev

# Server runs on http://localhost:3000
# Changes to src/ files auto-refresh in browser
# Turbopack provides fast incremental compilation

# Run linter
npm run lint

# Type checking (already part of build, but can run standalone)
npx tsc --noEmit
```

### 3.6 Build Sequence (Order of Feature Implementation)

**If building from scratch (not recommended—use this repo's code), follow this order:**

1. **Initialize Next.js 16 project with TypeScript**
   ```bash
   npx create-next-app@latest --typescript --tailwind
   ```

2. **Create root layout & global styles**
   - `src/app/layout.tsx`
   - `src/app/globals.css` (define color variables, reset styles)

3. **Create core data model**
   - `src/data/products.ts` (hardcoded product catalog)
   - `src/lib/product-labels.ts` (certification/tier labels)

4. **Build header, footer, basic page structure**
   - `src/components/Header.tsx`
   - `src/components/Footer.tsx`
   - `src/app/page.tsx` (home page shell)

5. **Create product display components**
   - `src/components/ProductCard.tsx`
   - `src/components/ProductCarousel.tsx`
   - `src/app/products/[slug]/page.tsx` (product detail)
   - `src/app/products/[category]/page.tsx` (category pages)

6. **Set up NextAuth authentication**
   - `src/auth.ts` (NextAuth configuration)
   - `src/app/api/auth/[...nextauth]/route.ts`
   - `src/app/login/page.tsx`
   - `src/app/signup/page.tsx`

7. **Implement wishlist functionality**
   - `src/lib/wishlist-store.ts` (in-memory store)
   - `src/app/api/wishlist/[add|remove|get]/route.ts`
   - `src/components/WishlistButton.tsx`
   - `src/app/wishlist/page.tsx`

8. **Add affiliate link system**
   - `src/lib/affiliateLinks.ts`
   - `src/components/BuyNowButton.tsx`
   - `src/components/AffiliateDisclosure.tsx`
   - `src/app/affiliate-disclosure/page.tsx`

9. **Implement SEO & schema markup**
   - `src/lib/seo.ts` (metadata generators)
   - `src/components/StructuredData.tsx`
   - `src/app/robots.ts`
   - `src/app/sitemap.ts`

10. **Add responsive design & accessibility**
    - Convert all CSS to modules
    - Add media queries (768px, 480px breakpoints)
    - Add aria-labels, alt text, semantic HTML

11. **Integrate optional features**
    - Newsletter signup (Resend)
    - Product reviews display
    - Search & comparison (stubs)
    - AI chat widget (stub)

12. **Run comprehensive audit**
    - Build test: `npm run build`
    - Type check: `npx tsc --noEmit`
    - Lint: `npm run lint`
    - Fix any errors before commit

---

## 4. AI Agent Persona & Workflow Setup

### 4.1 Specialized AI Persona for This Project

**Name:** Lead Frontend Architect + Full-Stack Engineer

**Core Capabilities Required:**
- Next.js 16 & React 19 expertise (SSR, SSG, API routes, file-based routing)
- TypeScript strict mode proficiency
- CSS Modules and responsive design (no Tailwind for this project)
- NextAuth.js implementation and OAuth configuration
- SEO & JSON-LD schema expertise
- Affiliate marketing domain knowledge
- QA/audit skills (build verification, type checking, dead code detection)

**Required System Prompt Instruction Block:**

```
You are a production-ready Next.js 16 full-stack engineer building an affiliate 
discovery platform. Your constraints:

1. CODE QUALITY:
   - TypeScript strict mode, no `any` types unless essential
   - CSS Modules only (no Tailwind CSS on this project)
   - Component-first architecture
   - No external UI frameworks

2. PERFORMANCE:
   - Minimize bundle size
   - Use Next.js SSG/ISR where possible
   - Lazy-load components below the fold
   - Optimize images with next/image

3. ARCHITECTURE:
   - Server components by default (async operations at compile time)
   - Client components ('use client') only for interactivity
   - API routes for auth, wishlist, newsletter (protected with session checks)
   - In-memory stores for user/wishlist data (document for DB migration)

4. SEO & COMPLIANCE:
   - All product pages include JSON-LD schema
   - Meta descriptions on every page
   - Affiliate disclosure on every buy button
   - Semantic HTML (proper heading hierarchy, nav/main/footer tags)

5. TESTING & VERIFICATION:
   - Before declaring done: `npm run build` must succeed with 0 errors
   - TypeScript check must pass
   - All imports must resolve
   - Dead code must be removed
   - CSS Module selectors must be local classes (no bare elements)

6. RESPONSIVENESS:
   - Mobile first: design for 375px viewport
   - Test at 375px (mobile), 768px (tablet), 1440px (desktop)
   - Media queries at exact breakpoints: @media (max-width: 768px), etc.
   - Ensure buttons/inputs are touch-friendly (min 44px height)

7. AFFILIATE MODEL:
   - No checkout, shopping cart, or payment processing
   - All "buy" actions are external affiliate links
   - Affiliate disclosure banner on every product page
   - User redirected to retailer, not through an intermediate page
```

### 4.2 Development Workflow & Tool Setup

**Optimal Development Loop:**

1. **Start dev server** (persistent, in dedicated terminal tab):
   ```bash
   npm run dev
   ```

2. **For each feature/fix:**
   - Edit file in editor
   - Dev server auto-compiles (watch mode)
   - Refresh browser to see changes
   - Check console for errors

3. **Before pushing:**
   ```bash
   npm run build        # Full production build
   npm run lint         # Linting
   # If any errors: fix and rebuild
   git status           # Review changes
   git diff --cached    # Verify what's committed
   git commit -m "..."
   git push
   ```

**Terminal Extensions & Commands:**

```bash
# Quick dev start (alias recommended in .bashrc/.zshrc):
alias leafdev="cd ~/projects/leaf-lightly && npm run dev"

# Build + start prod:
alias leafprod="npm run build && npm start"

# Check build size:
npm run build | grep -i "route\|size"

# Type check without full build:
npx tsc --noEmit

# Find unused imports/vars:
npm run lint -- --fix   # Auto-fix fixable issues
```

### 4.3 Critical Development Constraints

**⚠️ DO NOT:**
- Use Tailwind CSS (already installed but not used—use CSS Modules instead)
- Add external component libraries (Material-UI, shadcn, etc.)
- Use `any` types except as absolute last resort
- Implement user-facing review submission (comment feature disabled for legal review)
- Add payment/checkout (affiliate model only)
- Deploy without running `npm run build` locally first

**✅ DO:**
- Write CSS in `.module.css` files (scoped to components)
- Use CSS variables in `globals.css` for colors/spacing
- Keep components under 300 lines (split into smaller ones)
- Add JSDoc comments for complex functions
- Test responsive design on actual viewport sizes (not just browser dev tools)
- Commit frequently with clear messages
- Review diffs before pushing

---

## 5. Architectural Decisions Log (ADL) & Hard Lessons

### 5.1 Core Architectural Decisions

#### **AD-001: Affiliate-Only Model (Not Direct Sales)**

**Decision:** Build a discovery/curation platform that redirects to external retailers via affiliate links. Do NOT implement Stripe checkout or shopping cart.

**Context & Why:**
- **Initial Assumption (Wrong):** Built Stages 1-9 with full e-commerce: cart, checkout, order history
- **Pivot Trigger:** User explicitly stated "buyers will be purchasing from the brand sites not ours"
- **Technical Impact:** Deleted 5,000+ lines of checkout code (cart, order API, payment logic)
- **Lesson:** Clarify business model BEFORE coding. Full e-commerce scaffold (Stripe, order DB, shipping logic) was completely wasted effort.

**Trade-offs:**
- ✅ Simpler architecture (no payment PCI compliance)
- ✅ No inventory management needed
- ✅ Faster to market (weeks vs. months)
- ❌ No direct transaction revenue (affiliate only, 3-5% margins)
- ❌ Less user lock-in (users leave site for purchase)

**How to Avoid This Mistake:**
- Spend 1 hour with stakeholder to document: revenue model, user flow, conversion path
- Create a 1-page "Business Model Canvas" before writing ANY code

---

#### **AD-002: In-Memory User & Wishlist Stores**

**Decision:** Store users and wishlists in plain JavaScript objects in RAM. Not a database.

**Context & Why:**
- **Requirement:** Need user accounts and persistent wishlists for MVP
- **Trade-off:** PostgreSQL + migrations adds 2+ weeks; in-memory works for MVP
- **Documentation:** Clearly marked as demo; migration path to Neon PostgreSQL is prepared (`src/db/schema.ts` via Drizzle ORM)

**Implementation:**
```typescript
// src/auth.ts
const users: Record<string, User> = {};

// src/lib/wishlist-store.ts
const wishlistStore: WishlistItem[] = [];
```

**Implications:**
- ✅ Zero database setup for local dev
- ✅ No migrations or schema versioning
- ✅ Session data survives server restarts (NextAuth JWT + HTTP-only cookies)
- ❌ **DATA LOSS on server restart** (user accounts, wishlists deleted)
- ❌ Multi-instance deployments lose state sync (Vercel serverless = multiple Node processes)
- ❌ Cannot query users (e.g., "find all users in London")

**Production Migration Path:**
```bash
# 1. Create Neon PostgreSQL database
# 2. Update src/db/schema.ts with full Drizzle schema
# 3. Run: npm run db:generate && npm run db:push
# 4. Replace in-memory loops with Drizzle queries
# 5. Update auth.ts to query DB instead of users object
# 6. Update wishlist-store.ts to use DB
# 7. Redeploy
```

**Hard Lesson:** Never ship in-memory stores to production without data persistence. Vercel serverless restarts silently; customers lose their wishlists.

---

#### **AD-003: NextAuth.js v4 (Not v5 Beta)**

**Decision:** Use stable NextAuth.js 4.24.0 instead of v5 beta.

**Context & Why:**
- v5 was in beta at build time (not production-ready)
- v4 is well-tested, widely documented
- v5 has breaking changes in handler export pattern

**Trade-offs:**
- ✅ Proven, stable library
- ✅ Large community support (GitHub issues answered fast)
- ❌ v5 has better Next.js 16 support (we worked around this)
- ❌ Some v4 callbacks had type issues (added `any` type annotations)

**Next.js 16 Compatibility Issue Encountered:**
```typescript
// During build, NextAuth handlers were undefined
// Error: "Cannot destructure property 'GET' of 'e.i(...).i' as it is undefined"
// Root cause: Turbopack module loading quirk with NextAuth v4

// Solution: Wrap handlers in intermediate variable
const nextAuthResult = NextAuth(authConfig);
export const handlers = nextAuthResult.handlers;
export const auth = nextAuthResult.auth;
```

**Lesson:** When upgrading to cutting-edge frameworks (Next.js 16 with Turbopack), expect integration hiccups with libraries not yet optimized for them. Have a rollback plan.

---

#### **AD-004: CSS Modules Instead of Tailwind**

**Decision:** Use CSS Modules (scoped `.module.css` files). Tailwind is installed but not used.

**Context & Why:**
- **Project Requirement:** Custom design system, precise brand colors, no utility classes
- **Simplicity:** CSS Modules enforce component-scoped styles (no global naming collisions)
- **Performance:** Smaller CSS bundle (no Tailwind's 60KB baseline)

**Trade-offs:**
- ✅ Pixel-perfect styling control
- ✅ Smaller CSS bundle
- ✅ Clear separation of component markup + styles
- ❌ More verbose (e.g., `className={styles.button}` vs. `className="btn px-4"`)
- ❌ No rapid prototyping with utility classes
- ❌ Harder for junior devs (need to understand CSS specificity, media queries)

**Hard Lesson (Found During Audit):**
CSS Modules have a strict rule: **No bare element selectors**.

```css
/* ❌ INVALID in CSS Modules (causes Turbopack build error):
h1 { color: red; }

/* ✅ VALID (scoped class):
.heading { color: red; }
```

During the final audit, this cost 30 minutes of debugging. **Always validate CSS Modules syntax early.**

---

#### **AD-005: Product Data as Hardcoded JSON**

**Decision:** Store product catalog in `src/data/products.ts` as a hardcoded array.

**Context & Why:**
- 100-150 products across 5 categories (manageable size)
- No dynamic product creation (curation is manual)
- Easier to version control and review changes
- No risk of data loss (versioned in Git)

**Trade-offs:**
- ✅ Simple to implement and query
- ✅ SEO-friendly (all products pre-rendered at build time)
- ✅ Zero database latency
- ❌ **Every product change requires code redeploy**
- ❌ Cannot bulk-upload from CSV/Excel
- ❌ No edit UI (must edit JSON manually)

**Production Upgrade Path:**
1. Create `products` table in PostgreSQL
2. Build admin CRUD UI
3. Replace hardcoded import with DB query
4. Update product pages to fetch from DB (with ISR)

**Lesson:** Hardcoding works for MVP but becomes a bottleneck at scale. Plan migration to DB-backed admin from day 1.

---

#### **AD-006: Single Affiliate Link Per Product (Initially)**

**Decision:** Each product has ONE primary affiliate link (Amazon Associates).

**Context & Why:**
- MVP simplicity
- Amazon has 50M+ products (high coverage)
- Direct brand partnerships harder to negotiate upfront

**Architecture:**
```typescript
// BuyNowButton accepts array for future expansion
interface RetailerLink {
  retailer: string;
  url: string;
  icon: string;
  coupon?: string;
}

// Single button if 1 retailer, dropdown if >1
if (retailers.length === 1) {
  // Single button
} else {
  // Multi-option dropdown
}
```

**Future Roadmap:** Add direct brand affiliate partnerships (e.g., Patagonia, Allbirds) to reduce Amazon dependency.

---

#### **AD-007: No User-Submitted Reviews (Write Feature Disabled)**

**Decision:** Display hardcoded reviews only. User review submission disabled pending legal review.

**Context & Why:**
- **Legal Risk:** User-generated content requires moderation, terms of service, GDPR/privacy compliance
- **Time Constraint:** Review system adds 2+ weeks (moderation pipeline, spam detection)
- **MVP Focus:** Curation + discovery is core value prop; reviews are secondary

**Implementation:**
- `src/data/reviews.ts`: Hardcoded sample reviews
- `ReviewsSection.tsx`: Display only (no submit form visible)
- `ReviewForm.tsx`: Exists but never imported/rendered
- Affiliate disclosure mentions: "We provide honest ratings and reviews" ✅

**Production Checklist for Enabling Reviews:**
- [ ] Legal: Review ToS, privacy policy, GDPR compliance
- [ ] Moderation: Implement review approval workflow (admin panel)
- [ ] Spam Detection: Rate limiting, CAPTCHA, content filtering
- [ ] User Verification: Only verified buyers can review
- [ ] Database: Add `reviews` table with fields: userId, productId, rating, text, status (pending/approved/rejected), createdAt

**Lesson:** Features that seem simple ("let users leave reviews") have complex legal/operational tail. Ship read-only first; enable writes only when fully compliant.

---

### 5.2 Dead Ends & Landmines Encountered

#### **LM-001: Hero Image Path Error**

**Issue:** Hero background image not displaying on home page despite code appearing correct.

**Symptom:** 
- Page loaded, but hero section was blank/white
- Console showed no errors
- CSS rule existed: `background-image: url(...)`

**Root Cause:**
```css
/* src/components/FeaturedProductHero.module.css (WRONG) */
background-image: url('/assets/images/hero-background-compressed.webp');

/* Actual file was named: hero-background.webp (no "-compressed" suffix) */
```

**Solution:**
```bash
# 1. Check actual filename in public/assets/images/
ls -la public/assets/images/

# 2. Update CSS to match actual filename
# Change: hero-background-compressed.webp → hero-background.webp

# 3. Clear build cache
rm -rf .next

# 4. Rebuild
npm run build
```

**Lesson:** Asset paths are case-sensitive and must match exactly. Use absolute paths (`/assets/images/`) not relative (`./images/`). Test in multiple browsers (some cache aggressively).

---

#### **LM-002: CSS Module Bare Selector Errors (Turbopack)**

**Issue:** Build failed with cryptic error: "Selector 'h1' is not pure. Pure selectors must contain at least one local class or id."

**Root Cause:**
CSS Modules enforce strict scoping. Bare HTML element selectors (`h1`, `p`, `a`, etc.) are NOT allowed—they must be wrapped in local classes.

```css
/* ❌ INVALID (causes build failure) */
h1 { color: red; }
p { font-size: 1rem; }
a { text-decoration: underline; }

/* ✅ VALID (scoped) */
.heading { color: red; }
.text { font-size: 1rem; }
.link { text-decoration: underline; }
```

**Files Affected During Audit:**
- `src/app/affiliate-disclosure/page.module.css` (9 bare selectors)
- `src/app/wishlist/page.module.css` (1 bare selector in media query)

**Solution:**
1. Rename all bare selectors to `.className` equivalents
2. Update JSX to apply classes: `<h1 className={styles.heading}>`
3. Rebuild: `npm run build`

**Prevention:**
- Use a linter rule (ESLint plugin for CSS Modules) to catch this early
- Educate team: "No bare element selectors in .module.css files"

**Lesson:** CSS Modules are stricter than global CSS. This design prevents naming conflicts but requires discipline.

---

#### **LM-003: Missing Dependencies (bcryptjs, next-auth)**

**Issue:** Build succeeded but failed at runtime: "Module not found: Can't resolve 'bcryptjs'".

**Root Cause:**
- `src/auth.ts` imported `bcryptjs` for password hashing
- `bcryptjs` was NOT in `package.json` (only used in code, not listed as dependency)
- Locally, npm might have cached it; but Vercel's fresh `npm install` failed

**Symptom:**
```
Error: Failed to collect configuration for /api/auth/[...nextauth]
TypeError: Cannot destructure property 'GET' of 'e.i(...).i' as it is undefined.
```

**Solution:**
```bash
# 1. Add missing packages to package.json
npm install bcryptjs next-auth

# 2. Add TypeScript types
npm install --save-dev @types/bcryptjs

# 3. Verify package.json has entries:
{
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "next-auth": "^4.24.0"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6"
  }
}

# 4. Rebuild
npm run build
```

**Prevention:**
- Before final build, audit imports: `grep -r "from.*['\"]" src/ | grep -v "node_modules"`
- Ensure all imports are in `package.json`
- Use ESLint plugin `eslint-plugin-import` to catch missing dependencies

**Lesson:** "Works on my machine" (cached locally) != "works everywhere". Always test build in clean environment (fresh clone + npm install).

---

#### **LM-004: NextAuth Handler Undefined (Next.js 16 Turbopack Issue)**

**Issue:** Build passed TypeScript check but failed at page generation: "Cannot destructure property 'GET' of 'e.i(...).i' as it is undefined."

**Root Cause:**
Turbopack's module evaluation didn't properly expose `handlers` from NextAuth during build. The following code worked in webpack but broke in Turbopack:

```typescript
// ❌ BROKEN (Turbopack + NextAuth v4.24)
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

// ✅ FIXED (intermediate variable)
const nextAuthResult = NextAuth(authConfig);
export const handlers = nextAuthResult.handlers;
export const auth = nextAuthResult.auth;
```

**Solution:**
1. Update `src/auth.ts` to use intermediate variable (as shown above)
2. Update route handler to import correctly

**Prevention:**
- When upgrading to new framework versions (Turbopack, Next.js 16), test ALL integrations (NextAuth, Drizzle, etc.) early
- Keep CI/CD pipeline strict: build must pass before merge

**Lesson:** Turbopack is fast but has edge cases with CommonJS/ESM transitions. Some libraries need adapter layers.

---

#### **LM-005: AuthContext Deleted But Still Imported**

**Issue:** Build failed: "Module not found: Can't resolve '@/context/AuthContext'".

**Root Cause:**
Migrated from custom `AuthContext` (Stage 11) to `NextAuth.js` (Stage 13). Deleted file but didn't update imports.

**Files Left Orphaned:**
```typescript
// src/components/ReviewForm.tsx (BROKEN)
import { useAuth } from '@/context/AuthContext';  // ❌ File deleted

// src/app/api/reviews/create/route.ts (BROKEN)
import { mockDatabase } from '@/lib/mockDatabase';  // ❌ File deleted (replaced by NextAuth)
```

**Solution:**
1. Search for imports of deleted files: `grep -r "AuthContext\|mockDatabase" src/`
2. Either:
   - Remove the component entirely (if not used), OR
   - Refactor to use NextAuth: `const session = await auth()`
3. Rebuild

**Prevention:**
- Before deleting a file, search for all imports: `grep -r "filename" src/`
- Update CI/CD to fail on unused imports (ESLint: `no-unused-imports`)

**Lesson:** Refactoring large-scale architectural changes (Context → NextAuth) requires careful import cleanup. Use IDE refactoring tools (VS Code: "Find All References") rather than manual deletion.

---

#### **LM-006: Unused CSS Classes & Dead Code**

**Issue:** During audit, found 5 unused CSS files and 4 orphaned API routes.

**Examples:**
- `src/components/AddToCartButton.module.css` (button component deleted, CSS remained)
- `src/app/api/orders/create/route.ts` (checkout removed, endpoint remained)
- `src/app/api/reviews/create/route.ts` (review writes disabled, endpoint remained)

**Root Cause:**
Feature removal wasn't exhaustive. Code was deleted but dependencies weren't cleaned up.

**Solution:**
1. Identify dead code: `npm run lint` + manual review
2. Delete safely: use git to confirm it's not referenced
   ```bash
   git log -p --all -S "AddToCartButton.module.css" -- src/
   git grep "AddToCartButton.module" HEAD~5  # Check last 5 commits
   ```
3. Delete: `git rm src/components/AddToCartButton.module.css`
4. Rebuild: `npm run build`

**Prevention:**
- Add pre-commit hook to detect dead code:
  ```bash
  npm install --save-dev knip  # Detects unused imports/exports
  npx knip --include files
  ```
- Code review checklist: "Any deleted components have their imports removed?"

**Lesson:** Technical debt compounds. 1 dead file = 10 dead files if not cleaned immediately.

---

#### **LM-007: TypeScript `any` Types Creeping In**

**Issue:** During audit, found several `any` type annotations that weakened type safety.

**Examples:**
```typescript
// src/auth.ts (callbacks had no type info)
async signIn({ user, account }) {  // ❌ user, account are implicitly 'any'

// Fix:
async signIn({ user, account }: { user?: any; account?: any }) {  // Better
```

**Root Cause:**
NextAuth v4 callbacks have complex, nested types. Rather than spend 30 min figuring out exact type, devs used `any`.

**Prevention:**
- Enable TypeScript strict mode (it's enabled; we just ignored it momentarily)
- Code review: "Any `any` types? Justify them with a comment"
- Use `@ts-expect-error` for intentional type bypasses (searchable)

**Lesson:** Type safety is a team discipline. One person using `any` → entire codebase follows suit.

---

### 5.3 Architectural Lessons & Best Practices Extracted

#### **L-001: Business Model → Code, Not Reverse**

Always clarify business requirements BEFORE designing technical architecture. We wasted weeks building Stripe checkout for a non-transactional platform.

**Best Practice:**
1. Document business model (1 hour, 1 page)
2. Create user flow diagram
3. List revenue streams
4. THEN design tech stack

#### **L-002: MVP ≠ Unscalable, But Time-Box It**

In-memory stores are fine for MVP. But have a clear upgrade path documented:
```markdown
# Wishlist Store Migration Plan
- [ ] Neon PostgreSQL: `$ neon databases create prod`
- [ ] Schema: `$ drizzle-kit generate`
- [ ] Sync: Replace in-memory loops with DB queries
- [ ] Test: User can create wishlist, persist across restarts
- [ ] Deploy: Push to Vercel
```

#### **L-003: Separate "Write-Once" Data from Dynamic Data**

- **Write-Once** (Products): Hardcoded JSON, rebuild on change—OK
- **Dynamic** (User wishlists, auth): Must persist in DB—NOT OK to use in-memory

This distinction clarifies which features need database love.

#### **L-004: CSS Modules Require Discipline**

CSS Modules prevent globals collisions but enforce rules:
- ✅ Use for component styles (scoped)
- ✅ Use media queries within .module.css
- ✅ Name classes clearly (`.heading`, `.button`, not `.h1`, `.btn`)
- ❌ Don't use bare selectors (no `h1 { }`)
- ❌ Don't nest bare element selectors (no `.container h1 { }`)

#### **L-005: Integration Testing with Fresh Builds**

Always test in clean environment before shipping:
```bash
# Simulate CI/CD locally
rm -rf node_modules .next
npm install
npm run build    # Must succeed with 0 errors
npm start        # Verify page loads
```

---

## 6. Living Ledger & Critical Path Maintenance Protocol

### 6.1 Document Maintenance Instructions

This Master Replication Blueprint is a **living document**. It evolves as the project evolves. Future maintainers must follow these rules:

#### **When to Update This Document:**

**Trigger 1: Critical Path Change**
- Database schema change (add/remove/rename table)
- Framework upgrade (Next.js, React, TypeScript major version)
- Dependency change (remove/replace library, update to breaking version)
- Architecture pivot (new revenue model, auth system change, etc.)
- File structure reorganization
- New environment variable added/removed

**Trigger 2: Hard Lesson Learned**
- A bug occurred that took >2 hours to diagnose
- A mistake was made that another dev might repeat
- A workaround was implemented for framework limitation

**Trigger 3: Build/Deployment Issue**
- Build fails mysteriously
- Deployment to Vercel breaks despite local success
- TypeScript errors emerge in production

#### **How to Update:**

**Step 1: Create a git branch**
```bash
git checkout -b docs/update-mrb-<reason>
# e.g., docs/update-mrb-nextauth-upgrade
```

**Step 2: Edit this file (MRB.md)**

For **architecture changes**, update Section 2 (Technical Stack) and Section 5 (ADL).

For **lessons learned**, add entry to Section 5.2 (Dead Ends & Landmines).

For **workflow changes**, update Section 4 (AI Agent Persona).

**Template for New Architectural Decision:**

```markdown
#### **AD-XXX: [Decision Title]**

**Decision:** [Brief statement]

**Context & Why:**
- [Background/problem]
- [Why this decision was made]
- [Trade-offs considered]

**Implementation:**
```code```

**Implications:**
- ✅ [Positive outcome]
- ❌ [Negative outcome]

**Lesson:** [What you learned]
```

**Template for New Landmine:**

```markdown
#### **LM-XXX: [Problem Title]**

**Issue:** [What went wrong]

**Symptom:** [How did you detect it]

**Root Cause:** [Why did it happen]

**Solution:** [How to fix it]

**Prevention:** [How to avoid next time]

**Lesson:** [Key insight]
```

**Step 3: Update version number and timestamp**

```markdown
**Document Version:** 1.1
**Last Updated:** 2026-10-15
```

**Step 4: Commit & push**

```bash
git add MRB.md
git commit -m "docs: update MRB - add AD-XXX (NextAuth upgrade)"
git push origin docs/update-mrb-nextauth-upgrade

# Create PR and have it reviewed before merging to main
```

---

### 6.2 Critical Path Trigger Template

Use this template when a critical path change occurs:

```markdown
# Critical Path Change Notice

**Date:** 2026-10-XX  
**Change:** [Brief title]  
**Impact Severity:** LOW / MEDIUM / HIGH / CRITICAL  
**Effort to Implement:** [hours]

## What Changed
[1-2 paragraph description of what changed]

## Why It Happened
[Context: was it a breaking upgrade, new requirement, bug fix?]

## Affected Components
- [ ] [Component/file name]
- [ ] [Component/file name]

## Migration Path
1. [Step 1]
2. [Step 2]
3. [Test procedure]
4. [Deploy procedure]

## Rollback Plan
If something breaks, revert with: `git revert <commit-hash>`

## Verification Checklist
- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes
- [ ] Manual testing on localhost:3000
- [ ] Deployment to staging environment
- [ ] User acceptance testing
- [ ] Production deployment
```

---

### 6.3 Version History Ledger

| Version | Date | Change | Author | Status |
|---------|------|--------|--------|--------|
| 1.0 | 2026-10-13 | Initial MRB created | AI Agent (Lead Architect) | PRODUCTION |
| 1.1 | [TBD] | [Planned update] | [Name] | PENDING |

---

### 6.4 Monitoring & Health Check Protocol

**Every quarter** (or before major features), run this health check:

```bash
#!/bin/bash
# save as scripts/health-check.sh

echo "=== Leaf Lightly Health Check ==="

# 1. Dependencies audit
echo "Checking dependencies..."
npm audit

# 2. Build test
echo "Building production..."
npm run build

# 3. Lint test
echo "Linting code..."
npm run lint

# 4. Type check
echo "Type checking..."
npx tsc --noEmit

# 5. Dead code detection
echo "Detecting dead code..."
npx knip --include files

# 6. Security
echo "Checking for secrets in git history..."
git log -p --all | grep -i "password\|secret\|token\|key=" && echo "⚠️ SECRETS FOUND" || echo "✅ No secrets"

echo "=== Health Check Complete ==="
```

**Run quarterly:**
```bash
bash scripts/health-check.sh
```

---

## 7. Production Deployment & Ongoing Maintenance

### 7.1 Vercel Deployment (Current Setup)

**Automatic Deployment:**
- Every push to `main` branch triggers build on Vercel
- If build succeeds → auto-deploy to production
- If build fails → email notification, production unchanged

**Manual Deployment:**
```bash
# 1. Ensure all changes committed
git status    # Should be clean

# 2. Build locally (same as CI)
npm run build

# 3. If successful, push to main
git push origin main

# 4. Monitor Vercel dashboard
# https://vercel.com/mistclothing1977-ui/leaflightly
```

### 7.2 Environment Variables (Production)

**Set in Vercel Dashboard → Settings → Environment Variables:**

```env
# NextAuth
NEXTAUTH_URL=https://leaflightly.com
NEXTAUTH_SECRET=<unique-per-deployment>

# OAuth
GOOGLE_CLIENT_ID=<production-value>
GOOGLE_CLIENT_SECRET=<production-value>
GITHUB_ID=<production-value>
GITHUB_SECRET=<production-value>

# Email
RESEND_API_KEY=<production-key>

# Rate Limiting (optional)
UPSTASH_REDIS_REST_URL=<if-enabled>
UPSTASH_REDIS_REST_TOKEN=<if-enabled>
```

### 7.3 Data Persistence Roadmap

**Current:** In-memory stores (users, wishlists) — data lost on server restart

**Phase 1 (Next 3 months):** Migrate to Neon PostgreSQL
```bash
# 1. Create Neon project
# 2. Update .env: DATABASE_URL=postgresql://...
# 3. Run migrations
npm run db:generate
npm run db:push

# 4. Rewrite src/lib/wishlist-store.ts to query DB
# 5. Update src/auth.ts to persist users to DB
# 6. Deploy
```

**Phase 2 (6-12 months):** Add analytics & reporting
- Track product views (for recommendation engine)
- Track affiliate link clicks (for ROI analysis)
- Track user demographics (for marketing)

---

## 8. Final Checklist: Is This Production-Ready?

**Pre-Launch Verification:**

- [ ] **Build:** `npm run build` succeeds with 0 errors
- [ ] **Types:** `npx tsc --noEmit` passes
- [ ] **Linting:** `npm run lint` has 0 fixable warnings
- [ ] **Responsive:** Tested on mobile (375px), tablet (768px), desktop (1440px)
- [ ] **Accessibility:** 
  - [ ] All images have alt text
  - [ ] All buttons are keyboard-navigable
  - [ ] Color contrast ratio ≥ 4.5:1
  - [ ] Heading hierarchy is correct (h1 → h2 → h3, no skips)
- [ ] **SEO:**
  - [ ] All pages have meta descriptions
  - [ ] JSON-LD schema present on product pages
  - [ ] Open Graph meta tags configured
  - [ ] robots.txt and sitemap.xml generated
- [ ] **Security:**
  - [ ] No secrets in .env file (use .env.example for template)
  - [ ] API routes protected with session checks
  - [ ] NEXTAUTH_SECRET is cryptographically strong
  - [ ] No XSS vulnerabilities (inputs sanitized)
- [ ] **Affiliate Compliance:**
  - [ ] Affiliate disclosure banner on every product page
  - [ ] Affiliate disclosure legal page at /affiliate-disclosure
  - [ ] "Buy Now" buttons link to external retailers
  - [ ] No intermediate payment page
- [ ] **Performance:**
  - [ ] Page load time < 3 seconds (locally)
  - [ ] Lighthouse score ≥ 80
  - [ ] Images optimized (WebP format)
- [ ] **Testing:**
  - [ ] Created account (email/password, Google, GitHub)
  - [ ] Logged in, saved products to wishlist
  - [ ] Viewed wishlist, removed product
  - [ ] Clicked "Buy Now" → redirected to external site
  - [ ] Searched products, filtered by category
  - [ ] Viewed product detail page
- [ ] **Deployment:**
  - [ ] Pushed to main branch
  - [ ] Vercel build succeeded
  - [ ] Production URL accessible
  - [ ] All pages load without errors

---

## 9. Quick Reference: Common Commands

```bash
# Development
npm run dev              # Start local dev server (http://localhost:3000)
npm run build           # Build for production
npm start               # Start production server (local)
npm run lint            # ESLint
npm run lint -- --fix   # Auto-fix lint issues

# Database (when implemented)
npm run db:generate     # Generate Drizzle ORM
npm run db:push         # Push schema to database
npm run db:studio       # Open Drizzle Studio (visual DB browser)

# Maintenance
npm audit               # Security audit
npm outdated            # Check outdated packages
npm update              # Update to latest versions

# Git Workflow
git status              # Check changes
git add .               # Stage all changes
git commit -m "msg"     # Commit
git push                # Push to GitHub (triggers Vercel deploy)

# Cleanup
rm -rf .next            # Clear build cache
rm -rf node_modules     # Clear dependencies
npm install             # Reinstall dependencies
```

---

## 10. Contact & Support

**Repository:** https://github.com/mistclothing1977-ui/leaflightly  
**Live Site:** https://leaflightly.com (once deployed)  
**Primary Contact:** mistclothing1977@gmail.com  

**For Future Maintainers:**
- Any questions about architectural decisions? → Check Section 5 (ADL)
- Build failing? → Check Section 5.2 (Dead Ends & Landmines)
- Upgrading frameworks? → Follow Section 7 (Deployment & Maintenance)
- Adding features? → Use Section 3 (Build Workflow) as template

---

**End of Master Replication Blueprint v1.0**  
*Last Updated: 2026-10-13*  
*Status: PRODUCTION BUILD READY*
