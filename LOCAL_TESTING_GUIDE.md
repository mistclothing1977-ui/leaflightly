# 🧪 Local Testing Guide — Leaf Lightly MVP

## Quick Start

```bash
cd C:\Users\david\projects\leaf-lightly
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Test Plan

### **1. Homepage** → http://localhost:3000

**Visual Checks:**
- [ ] Hero section displays ("Discover the good stuff that works")
- [ ] Background is cream (#FFFBF7), not white
- [ ] "Explore Kitchen →" button is Forest Green (#2c7f6e)
- [ ] Category grid shows 5 cards (Kitchen/Fashion/Home/Beauty/Wellness)
- [ ] Kitchen card shows "Live" status + "Browse →" link
- [ ] "How It Works" section shows 3 numbered steps (1/2/3)
- [ ] Trust section shows ✓ bullets with sustainability messaging

**Responsive:**
- [ ] Desktop (full width): All 5 category cards visible
- [ ] Tablet (768px): Categories in 2 rows
- [ ] Mobile (480px): Categories stack vertically
  - *DevTools: Click ⌘+Shift+M (Chrome) or F12 → toggle device toolbar*

**Interactions:**
- [ ] Hover category cards → background darkens slightly
- [ ] Click "Explore Kitchen" → navigates to /products/kitchen
- [ ] All links work (no 404 errors)

---

### **2. Kitchen Grid** → http://localhost:3000/products/kitchen

**Visual Checks:**
- [ ] Hero section: "Kitchen" heading + description
- [ ] 3 tier badges (Tier A / Tier B / Tier C) with explanations
- [ ] 11 product cards visible in grid
- [ ] Each card shows:
  - Product image (square aspect ratio)
  - Brand (small, uppercase, gray)
  - Product name (bold, dark)
  - Price in Forest Green (#2c7f6e)
  - ★★★★★ rating in Teal (#82d4d8)
  - Review count in gray
  - Certification badges (e.g., "B CORP", "ORGANIC")
  - "View Details" button (Forest Green)

**Responsive Grid:**
- [ ] Desktop (1200px+): 4 columns (Alessi | Bee's Wrap | John Lewis | Klean Kanteen)
- [ ] Tablet (768px): 2 columns
- [ ] Mobile (480px): 1 column
  - *Test with DevTools device toggle*

**Cards - Hover Effects:**
- [ ] Hover product card → shadow deepens + card lifts slightly
- [ ] Hover product card → image zooms in smoothly
- [ ] Hover button → background changes to Teal (#82d4d8)

**Sale Items (Discount Badge):**
- [ ] Alessi: Shows "-20%" in red badge (top-right)
- [ ] Bee's Wrap: Shows "-14%" badge
- [ ] John Lewis: Shows "-20%" badge
- [ ] Klean Kanteen: Shows "-18%" badge
- *Other products don't have originalPrice, so no badge*

**Data Accuracy:**
- [ ] Alessi: £39.99 (was £49.99), 842 reviews, 4.6★
- [ ] Bee's Wrap: £18.99 (was £22.00), 1149 reviews, 4.8★
- [ ] Yeti Rambler: £39.99 (no original price), 1254 reviews, 4.8★
- [ ] All 11 products present

**Interactions:**
- [ ] Click any product card → navigates to detail page
- [ ] URL changes to `/products/[product-id]`

---

### **3. Product Detail** → http://localhost:3000/products/alessi-measuring-spoons

**Visual Checks:**
- [ ] Breadcrumb: "Kitchen / Alessi Stainless Steel Measuring Spoon Set"
- [ ] Large product image (1:1 square, left side)
- [ ] Discount badge: "Save 20%" (red)
- [ ] Brand label: "ALESSI" (small, uppercase)
- [ ] Product name: "Stainless Steel Measuring Spoon Set"
- [ ] Rating: ★★★★★ 4.6 (Based on 842 reviews)
- [ ] Price: "£39.99" (Forest Green, large) + "Was £49.99" (strikethrough, gray)
- [ ] Certifications section:
  - [ ] "B CORP" badge
  - [ ] "ORGANIC" badge
- [ ] Tier section: "Tier A — Certified Eco"
- [ ] "View on Amazon" button (full width, Forest Green)
- [ ] Affiliate disclosure: "We earn a small affiliate commission..."

**Responsive Layout:**
- [ ] Desktop (1200px): Image left, details right (2 columns)
- [ ] Tablet (768px): Image top, details below (1 column)
- [ ] Mobile (480px): Single column, full-width button

**Button Interaction:**
- [ ] Hover "View on Amazon" → background changes to Teal
- [ ] Click → should link to Amazon (currently no href, so just shows click state)

**Navigation:**
- [ ] Click breadcrumb "Kitchen" → back to /products/kitchen
- [ ] Click back button (browser) → back to grid

---

### **4. Test Other Products**

Visit a few other detail pages to verify routing:

- [ ] http://localhost:3000/products/bees-wrap-3-pack (Bee's Wrap)
- [ ] http://localhost:3000/products/yeti-rambler-bottle (Yeti - no discount)
- [ ] http://localhost:3000/products/caraway-cookware (Caraway - Tier C)

**Check:**
- [ ] Each product shows correct data
- [ ] Images display (or show missing image placeholder)
- [ ] Certifications match products.ts
- [ ] Pricing is accurate

---

### **5. Invalid Product URL**

Visit: http://localhost:3000/products/nonexistent-product

**Expected:**
- [ ] 404 page displays (Next.js default)
- [ ] No crash or error

---

### **6. Color & Typography Spot-Check**

**Colors:**
- Forest Green (#2c7f6e): Headings, primary buttons, links
- Teal (#82d4d8): Hover states, star ratings, accents
- Cream (#FFFBF7): Background
- Charcoal (#2A2A26): Body text
- Gray (#8B8B7E): Secondary text, borders

**Typography:**
- Body text: Georgia serif (warm, editorial)
- Headings: System sans (clean, modern)
- Price: Large, bold, Forest Green
- Brand labels: Small caps, gray

**Verify:**
- [ ] No purple/indigo anywhere
- [ ] No Inter or Roboto fonts
- [ ] Type hierarchy clear (size + weight, not borders)

---

### **7. Performance Check**

Open DevTools (F12) → Network tab:

**Metrics:**
- [ ] Page load < 2 seconds
- [ ] Images load smoothly
- [ ] No console errors (red X's)
- [ ] No layout shifts (CLS)

**Common issues:**
- Image 404s: `/images/[product].jpg` paths don't exist yet
  - *Expected for now; images will load once added to public/images/*
- TypeScript errors: Should not appear (all JSX is typed)

---

## Debugging Tips

### Build fails?
```bash
# Clear Next.js cache
rm -r .next

# Reinstall dependencies
npm install

# Try again
npm run dev
```

### Images not loading?
- Expected: Product images are `/images/[name].jpg` — files don't exist yet
- Workaround: Add placeholder images to `public/images/` folder
- Or: Update imageUrl in products.ts to external URLs

### Styling issues?
- Check DevTools → Inspect element → Computed tab
- Verify CSS variables in globals.css are applied
- Check for conflicting inline styles (shouldn't be any)

### Product data not showing?
- Check DevTools → Console tab for errors
- Verify products.ts is in `src/data/products.ts`
- Check ProductCard component imports

---

## Test Report Template

Keep this handy when testing:

```
✅ HOMEPAGE
- Hero section: PASS / FAIL
- Category grid: PASS / FAIL
- Links work: PASS / FAIL
- Responsive (mobile): PASS / FAIL

✅ KITCHEN GRID
- All 11 products load: PASS / FAIL
- Grid responsive (4→2→1): PASS / FAIL
- Card hover effects: PASS / FAIL
- Discount badges: PASS / FAIL
- Product detail links: PASS / FAIL

✅ PRODUCT DETAIL
- Breadcrumb works: PASS / FAIL
- Image displays: PASS / FAIL
- Data accurate: PASS / FAIL
- Button state changes: PASS / FAIL
- Responsive layout: PASS / FAIL

✅ OVERALL
- No console errors: PASS / FAIL
- Colors correct: PASS / FAIL
- Typography clean: PASS / FAIL
- Performance OK: PASS / FAIL

Notes:
- [Any issues found]
```

---

## Ready to Test?

Run:
```bash
npm run dev
```

Then visit http://localhost:3000 and work through the checklist above.

**Report back:** Let me know which items PASS and which FAIL. I'll debug and fix any issues.
