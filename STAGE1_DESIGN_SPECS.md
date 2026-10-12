# Leaf Lightly — Stage 1 Design Specifications

**Document Date:** 2026-10-12  
**Status:** Complete  
**Next Handoff:** Frontend Agent (Ready for Implementation)

---

## 1. HERO IMAGE OPTIONS

### Required Specifications
- **Dimensions:** 1920x1080 (minimum), landscape orientation
- **Color Palette:** Warm neutrals, greens, earth tones (no jarring colors)
- **Subject Matter:** Sustainability in action, aspirational but relatable
- **People:** Diverse representation, real moments (avoid stock-photo perfection)
- **Source:** Royalty-free, commercial use allowed

---

### Option 1: "Conscious Shopping"
**Image Description:**  
A diverse woman (30s, mixed ethnicity) at a farmers market examining produce, holding a reusable cloth bag. Natural morning sunlight, warm wooden market stalls in background. Multiple people browsing around her creating organic context. Focus on intentional selection and community.

**Where to Find:** Unsplash  
**Search Terms:** "sustainable shopping farmers market" OR "conscious consumer organic"  
**Specific Recommendation:** Look for images tagged #sustainablelifestyle #ecoconsumer  
**Why This Works:**
- Shows active, intentional behavior (shopping consciously)
- Warm lighting creates inviting atmosphere
- Diverse, relatable moment
- Strong emotional connection to "sustainable choices"
- Community element reinforces belonging

**Positioning:** Hero left (70% width), allows right side for trust signals  
**Text Overlay:** "Shop with intention. Choose better."

---

### Option 2: "Home Garden/Growing"
**Image Description:**  
A person tending to raised garden beds or potted plants in a sunny backyard. Multiple plants visible, hands in soil or watering. Bright natural light, green foliage dominant. Could be balcony or small garden setup (shows it's accessible).

**Where to Find:** Pexels or Unsplash  
**Search Terms:** "home gardening sustainable" OR "growing plants balcony" OR "urban gardening"  
**Specific Recommendation:** Avoid overly manicured gardens; look for realistic, lived-in spaces  
**Why This Works:**
- Direct visual metaphor for "growing" and sustainability
- Home-based (relatable, not commercial)
- Diverse age/ability representation possible
- Positive emotions around growth and nurturing
- Warm earth tones align with brand

**Positioning:** Hero full-width with semi-transparent overlay for text  
**Text Overlay:** "Grow your impact. One choice at a time."

---

### Option 3: "Sustainable Home Organization"
**Image Description:**  
Close-up of a beautifully organized kitchen or pantry with sustainable products: glass jars, wooden utensils, natural cleaning supplies, reusable containers. Warm lighting, minimal waste aesthetic. Hands arranging items or reaching for products.

**Where to Find:** Unsplash (search "zero waste kitchen") or Pexels  
**Search Terms:** "sustainable kitchen organization" OR "zero waste home" OR "eco-friendly organizing"  
**Specific Recommendation:** Avoid sterile/clinical look; aim for warm, welcoming, lived-in space  
**Why This Works:**
- Directly shows sustainability in the home environment
- Practical inspiration (customers see themselves doing this)
- Warm, inviting aesthetic
- Aspirational but achievable
- Strong conversion signal: "This could be my home"

**Positioning:** Hero background with semi-transparent white overlay (60-70% opacity)  
**Text Overlay:** "Beautiful, sustainable living. Starts here."

---

### Option 4: "Outdoor Lifestyle - Adventure"
**Image Description:**  
A diverse group (3-4 people) on an outdoor adventure (hiking, picnicking, park day) with sustainable gear visible. Reusable water bottles, cloth bags, eco-friendly clothing. Golden hour lighting, natural landscape. Genuine moment of connection and joy.

**Where to Find:** Unsplash  
**Search Terms:** "sustainable outdoor adventure" OR "eco-friendly hiking" OR "conscious lifestyle outdoors"  
**Specific Recommendation:** Look for candid moments, not posed shots  
**Why This Works:**
- Shows sustainable living as aspirational lifestyle choice
- Community/friendship element
- Outdoor freshness aligns with environmental values
- Diverse representation in natural setting
- Emotional sell: "Be part of this movement"

**Positioning:** Hero full-width with gradient overlay  
**Text Overlay:** "Live better. Feel better."

---

### Option 5: "Female Entrepreneur/Small Business"
**Image Description:**  
A woman (diverse, any age) in a small studio or shop space surrounded by sustainable products, packaging sustainable goods, or running an eco-conscious small business. Natural light, organized but personal workspace.

**Where to Find:** Unsplash or Pexels  
**Search Terms:** "woman sustainable business" OR "eco entrepreneur" OR "small business sustainable"  
**Specific Recommendation:** Should feel authentic, not too polished  
**Why This Works:**
- Shows empowerment and agency
- Builds trust (real people, real business)
- Emotional connection to supporting small businesses
- Aligns with Leaf Lightly's values
- Diverse representation

**Positioning:** Hero with overlay  
**Text Overlay:** "Support sustainable. Support real."

---

## RECOMMENDATION FOR HERO IMAGE

**Primary Choice: Option 1 (Conscious Shopping)**
- Strongest conversion signal
- Most directly relates to Leaf Lightly's core business (product curation)
- Warm, inviting, relatable aesthetic
- Easiest to compose with trust signals on right side
- Immediate emotional connection

**Fallback Choice: Option 3 (Home Organization)**
- If Option 1 not available in desired quality
- Similarly strong conversion signal
- More intimate/home-focused angle

**Secondary Options:** 2, 4, 5 all viable depending on brand direction preference

---

## 2. TRUST SIGNALS PANEL DESIGN

### Location & Layout
**Position:** Right side of hero image (desktop only; mobile: below hero)  
**Width:** 360px (desktop), 100% (mobile)  
**Background:** Semi-transparent white or brand color with 85% opacity  
**Padding:** 40px all sides  
**Spacing:** 32px gap between items  
**Border Radius:** 12px  

---

### Trust Signal Items (Vertical Stack)

#### Item 1: Free Delivery
```
Icon: Truck / Package
Text: "Free delivery on orders over £50"
Secondary: "No hidden fees"
```

#### Item 2: Returns
```
Icon: Arrows/Refresh/Shield
Text: "30-day returns, no questions"
Secondary: "We stand behind our products"
```

#### Item 3: Fast Shipping
```
Icon: Lightning / Speedometer
Text: "UK shipping, 2-5 business days"
Secondary: "Quick, reliable delivery"
```

#### Item 4: Transparency
```
Icon: Handshake / Eye / Certificate
Text: "Affiliate partnerships, fully transparent"
Secondary: "See where your money goes"
```

---

### Individual Item Specification

**Container:** 100% width, minimal padding (8px top/bottom)  
**Icon Size:** 32x32px (SVG, not raster)  
**Icon Color:** Brand primary green (#2d7d4a or similar earth green)  
**Icon Spacing:** 12px left of text block  
**Layout:** Flexbox, horizontal alignment (icon | text block)  

**Text Block:**
- **Main Text:** 16px, font-weight: 600, line-height: 1.4, color: #1a1a1a
- **Secondary Text:** 14px, font-weight: 400, line-height: 1.3, color: #666666
- **Max Width:** 100% of text block

---

### Typography for Trust Signals
- **Font Family:** System stack or custom (Segment, Inter, or similar friendly sans-serif)
- **Line Height:** 1.5 for readability
- **Letter Spacing:** 0 (neutral)
- **Text Transform:** Sentence case (capitalize first letter only)

---

### Visual Hierarchy
1. Warm, inviting aesthetic (no cold blues or sharp reds)
2. Icons should feel approachable, not corporate
3. Text should feel conversational, not legalistic
4. Icons + text create visual rhythm (not overwhelming)

---

### Responsive Behavior (Mobile)
**Below 768px:**
- Panel appears below hero image as 2-column grid (2 items per row)
- Width: 100% - 32px (16px margin each side)
- Padding: 24px
- Gap: 24px between items
- Icon size: 28x28px
- Font sizes: -2px (14px main, 12px secondary)

---

## 3. COMPONENT SPECIFICATIONS

### 3.1 Trust Signal Item Component

**Component Name:** `TrustSignalItem`

```
Props:
- icon: React.ReactNode (SVG component)
- title: string (max 40 chars)
- description?: string (optional, max 50 chars)
- variant?: 'default' | 'highlighted'

States:
- Default: normal display
- Highlighted: (optional) for featured signal

Styling:
- Container: flex, gap: 12px
- Icon: color: var(--color-primary), size: 32px
- Title: font-weight: 600, color: var(--text-primary)
- Description: font-weight: 400, color: var(--text-secondary)
```

---

### 3.2 Category Badge Component

**Component Name:** `CategoryBadge`

**Purpose:** Label new or featured products

```
Props:
- label: string ('NEW', 'FEATURED', 'HOT')
- variant?: 'primary' | 'secondary' | 'warning'

Styling:
- Background: 
  - primary: #2d7d4a (green, NEW default)
  - secondary: #f5f5f5 (light gray)
  - warning: #d4a574 (warm orange)
- Text Color: white (primary), #333 (secondary)
- Padding: 4px 12px
- Border Radius: 4px
- Font Size: 12px
- Font Weight: 600
- Text Transform: Uppercase
- Letter Spacing: 0.5px

States:
- Default: hover none (static label)
- Optional: subtle shadow on hover
```

---

### 3.3 Button Component Variants

**Component Name:** `Button`

#### Variant A: Primary Button
```
Background: #2d7d4a (primary green)
Text Color: white
Padding: 12px 24px (tall variant), 10px 20px (compact)
Border Radius: 8px
Font Size: 14px
Font Weight: 600
Border: none
Cursor: pointer
Transition: all 200ms ease

States:
- Default: #2d7d4a
- Hover: #1f5830 (darker green)
- Active: #1a4620 (even darker)
- Disabled: #cccccc, cursor: not-allowed
- Focus: outline 2px solid #2d7d4a offset 2px
```

#### Variant B: Secondary Button
```
Background: transparent
Text Color: #2d7d4a
Border: 2px solid #2d7d4a
Padding: 10px 22px (adjusted for border)
Border Radius: 8px
Font Size: 14px
Font Weight: 600
Cursor: pointer
Transition: all 200ms ease

States:
- Default: transparent bg, #2d7d4a text & border
- Hover: #f5f5f5 (light background)
- Active: #e8e8e8
- Disabled: #cccccc text & border, cursor: not-allowed
- Focus: outline 2px solid #2d7d4a offset 2px
```

#### Variant C: Ghost Button (Text-only)
```
Background: transparent
Text Color: #2d7d4a
Border: none
Padding: 10px 12px
Font Size: 14px
Font Weight: 600
Cursor: pointer

States:
- Default: transparent
- Hover: underline or slight text emphasis
- Active: color shift to #1f5830
```

---

### 3.4 Input Field Component

**Component Name:** `TextInput` (for newsletter signup)

```
Props:
- type: 'email' | 'text'
- placeholder: string
- value: string
- onChange: (value: string) => void
- disabled?: boolean
- error?: string

Styling:
- Border: 1px solid #ddd
- Border Radius: 4px
- Padding: 12px 14px
- Font Size: 14px
- Background: white
- Focus: 
  - Border color: #2d7d4a
  - Box shadow: 0 0 0 3px rgba(45, 125, 74, 0.1)
  - Outline: none
- Error state: 
  - Border color: #d9534f
  - Box shadow: 0 0 0 3px rgba(217, 83, 79, 0.1)
- Disabled state:
  - Background: #f5f5f5
  - Color: #999
  - Cursor: not-allowed
```

---

## 4. NEWSLETTER EXIT-INTENT MODAL DESIGN

### Modal Specifications

**Trigger:** Exit-intent (when user moves mouse toward close/back, or after 30 seconds)

**Display Behavior:**
- Desktop: Centered modal, 480px width, max-height: 90vh
- Mobile: Full-width, 40px margin, centered vertically
- Z-index: 1000 (above all other content)

---

### Modal Structure

#### Header Section (Optional)
- **Height:** 40px (optional close button area)
- **Close Button:** Positioned top-right, 24x24px
- **Icon:** Simple X, color #999, hover to #333

#### Content Section
```
Padding: 48px 40px (desktop), 32px 20px (mobile)
```

**Headline:**
- Text: "Get insider tips on sustainable products"
- Font Size: 24px (desktop), 20px (mobile)
- Font Weight: 700
- Line Height: 1.3
- Color: #1a1a1a
- Margin Bottom: 12px

**Subheadline (Optional):**
- Text: "Join hundreds of conscious shoppers. Curated products, sustainability tips, and exclusive offers."
- Font Size: 16px (desktop), 14px (mobile)
- Font Weight: 400
- Line Height: 1.5
- Color: #666666
- Margin Bottom: 28px

---

#### Email Input & CTA Section

**Layout:** Vertical stack (mobile) or inline (desktop wide enough)

**Desktop Layout (600px+ screens):**
```
Display: flex
Gap: 12px
Align Items: flex-end

Email Input: flex 1
Button: width auto, padding: 12px 28px
```

**Mobile Layout:**
```
Display: flex
Flex Direction: column
Gap: 12px

Email Input: width 100%
Button: width 100%
```

---

**Email Input Field:**
- Placeholder: "your@email.com"
- Type: email
- Required: true
- Border: 1px solid #ddd
- Padding: 12px 14px
- Border Radius: 4px
- Font Size: 14px
- Focus state: border #2d7d4a, box-shadow: 0 0 0 3px rgba(45, 125, 74, 0.1)

---

**CTA Button:**
- Text: "Get 10% Off"
- Background: #2d7d4a (primary green)
- Text Color: white
- Padding: 12px 32px
- Border Radius: 4px
- Font Size: 14px
- Font Weight: 600
- Cursor: pointer
- Hover: #1f5830 (darker green)
- Disabled (on submit): opacity 0.7, cursor not-allowed

---

#### Footer/Legal Text (Optional)
```
Font Size: 12px
Font Weight: 400
Color: #999999
Margin Top: 16px
Text: "We respect your inbox. Unsubscribe anytime."
Text Align: center
```

---

### Modal Overlay
- Background: rgba(0, 0, 0, 0.5) (semi-transparent dark)
- Transition: opacity 300ms ease-in-out
- Click outside modal: closes modal (standard UX)

---

### Modal Animations
**Entry:**
- Duration: 300ms
- Easing: ease-out (cubic-bezier(0.16, 1, 0.3, 1))
- Animation: fade in + slight scale up (transform: scale(0.95) → scale(1), opacity: 0 → 1)

**Exit:**
- Duration: 200ms
- Easing: ease-in
- Animation: fade out + scale down

---

### Modal Copy Variations (A/B Test Ready)

**Variant A (Current):**
- Headline: "Get insider tips on sustainable products"
- Subheadline: "Join hundreds of conscious shoppers. Curated products, sustainability tips, and exclusive offers."
- Button: "Get 10% Off"

**Variant B (Urgency):**
- Headline: "Don't miss out. Save 10%"
- Subheadline: "Join our community of conscious shoppers. Get exclusive offers and sustainability tips."
- Button: "Claim My 10% Off"

**Variant C (Community):**
- Headline: "Join the sustainable shopping movement"
- Subheadline: "Get tips, product recommendations, and exclusive member offers."
- Button: "Sign Me Up"

---

## 5. COLOR & TYPOGRAPHY SPECIFICATIONS

### Brand Color Palette

**Primary Green:** #2d7d4a (sustainability, trust, growth)  
- Hover/Active: #1f5830 (darker)
- Light variant: #e8f3ed (backgrounds, subtle accents)

**Neutrals:**
- Dark text: #1a1a1a
- Medium text: #666666
- Light text/disabled: #999999
- Borders: #ddd or #eeeeee
- Light backgrounds: #f5f5f5 or #fafafa

**Accent Colors (Reserved):**
- Success: #5cb85c (green, for confirmations)
- Warning: #d4a574 (warm orange, for caution)
- Error: #d9534f (red, for errors/warnings)

---

### Typography System

**Headlines (all weights 600-700):**
- H1: 32px / 1.2 (hero/page titles)
- H2: 28px / 1.3 (section titles)
- H3: 24px / 1.3 (subsection titles)
- H4: 20px / 1.4 (smaller headings)

**Body Text:**
- Large: 16px / 1.5 (body copy, descriptions)
- Regular: 14px / 1.5 (default body)
- Small: 12px / 1.4 (captions, metadata)

**Font Family (Recommended):**
- Primary: Inter, Segoe UI, system-ui, or custom eco-friendly sans-serif
- Monospace (if needed): SF Mono, Menlo, or similar

**Font Weights:**
- Regular: 400 (body text, descriptions)
- Semibold: 600 (buttons, labels, emphasized text)
- Bold: 700 (headlines)

---

### Spacing Scale

**Base unit: 8px**

- xs: 4px (minimal, internal spacing)
- sm: 8px (small gaps, icon padding)
- md: 16px (standard spacing, padding)
- lg: 24px (larger sections)
- xl: 32px (major spacing)
- 2xl: 48px (hero padding, modal padding)

---

## 6. DESIGN DECISIONS & RATIONALE

### Why This Design Approach?

1. **Trust-First Hero Section**
   - E-commerce requires immediate trust signals
   - Right-side panel is secondary to hero image (doesn't compete)
   - Allows storytelling through image while providing reassurance through text

2. **Warm, Sustainable Aesthetic**
   - Greens & earth tones align with environmental values
   - Warm whites/creams feel inviting vs. cold blues
   - Avoids "corporate green" (disingenuous sustainability claims)

3. **Accessible Typography**
   - 16px body text ensures readability at distance
   - 1.5 line-height supports users with dyslexia
   - High contrast (dark text on light bg) meets WCAG AA

4. **Exit-Intent Modal Strategy**
   - 30-second delay or scroll-off captures interested but undecided users
   - 10% discount is strong but not unsustainable
   - Email capture enables long-term customer relationships
   - Mobile-responsive ensures conversion across devices

5. **Component Reusability**
   - Trust signal items use consistent structure (icon + text)
   - Button variants cover 90% of call-to-action needs
   - Badge component scales from 12px (small) to 20px+ (large)

---

## 7. IMPLEMENTATION NOTES FOR FRONTEND TEAM

### Hero Image Integration
1. Use Next.js `<Image>` component with proper sizing/optimization
2. Implement responsive srcset for mobile/tablet/desktop
3. Add lazy loading for below-fold sections
4. Use `priority` prop on hero image for LCP optimization

### Trust Panel Responsiveness
- Desktop (1200px+): Absolute positioned panel on right at hero
- Tablet (768-1199px): Panel below hero, 2-column layout
- Mobile: Full-width 2-column grid below hero

### Modal Implementation
- Use Headless UI Dialog or Radix Dialog component
- Implement `useEffect` with 30-second timer or scroll detection
- Handle escape key to close
- Prevent body scroll when modal is open
- Test on 320px, 375px, and larger viewports

### Accessibility Requirements
- Use semantic HTML (header, main, form, etc.)
- All icons must have aria-label
- Form inputs require associated labels
- Modal should have role="dialog" and aria-labelledby
- Trust signals should be list items (<ul> / <li>)
- Tab order should flow logically (left to right, top to bottom)

---

## 8. SUCCESS METRICS

Once implemented, track these metrics:

1. **Hero Engagement:** Scroll depth past hero section (target: 65%+)
2. **Trust Panel Visibility:** Scroll-to-view percentage on desktop (target: 80%+)
3. **Modal Conversion:** Email capture rate from exit-intent (target: 8-12%)
4. **Modal View Rate:** % of users who see modal (target: 40-50%)
5. **CTA Click Rate:** Primary button clicks as % of page views (target: 15%+)

---

## 9. NEXT STEPS FOR FRONTEND TEAM

1. Download/save hero images from recommended sources
2. Implement hero section with responsive image
3. Build TrustSignalItem component with icon system
4. Create Button component with variants
5. Build exit-intent modal with exit detection logic
6. Integrate email capture with backend/email service
7. Test across breakpoints and browsers
8. A/B test modal copy variants

---

**Status:** READY FOR IMPLEMENTATION  
**Created:** 2026-10-12  
**Design Agent:** Claude Code (Design Phase)  
**Next Handoff:** Frontend Agent  
**Message to Frontend:** "Design ready for implementation"
