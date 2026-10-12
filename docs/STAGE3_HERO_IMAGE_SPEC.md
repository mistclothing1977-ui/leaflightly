# Stage 3: Hero Background Image Specification

**Objective**: Create a premium, lifestyle hero background that elevates visual appeal while staying true to the Leaf Lightly brand identity.

---

## Brand-Consistent Hero Image Direction

### **Concept: "Intentional Living"**

A curated lifestyle scene showing sustainable products in context—not preachy, not clichéd, but genuinely beautiful and aspirational.

---

## Visual Elements & Composition

### **Setting & Atmosphere**
- **Location**: Bright, natural environment (morning light, sunlit workspace, or garden)
- **Time of day**: Golden hour morning light (warm, welcoming)
- **Aesthetic**: Minimalist, curated, intentional
- **Mood**: Calm, organized, premium, accessible

### **Color Palette** (In Order of Dominance)
1. **Warm naturals** (60%) - Wood tones, cream, beige (#C9B8A0 hints)
2. **Forest green accents** (20%) - Plants, product colors, subtle backgrounds
3. **Neutral whites** (15%) - Negative space, simplicity
4. **Orange accents** (5%) - Product details or subtle highlights

### **Key Products to Feature** (3-4 visible)
1. **Klean Kanteen Bottle** (stainless steel water bottle)
   - Positioned prominently but naturally
   - Reflects light, shows quality
   - Hero product already featured below

2. **Sustainable Fashion Item**
   - Organic cotton shirt, linen scarf, or natural fiber piece
   - Draped naturally, showing texture
   - Example: neutral tones (cream, gray, soft green)

3. **Home/Wellness Item**
   - Wooden plant stand, ceramic vessel, or home accent
   - Shows home category representation
   - Organic, handcrafted feel

### **Scene Details**
- **Surface**: Natural wood table or workspace
- **Background**: Blurred but intentional (window, plants, soft background)
- **Lighting**: Natural window light (professional but not studio)
- **Props**: Coffee cup, notebook, plants, natural objects
- **Style**: Flat lay or overhead angle (shows arrangement, not staged)

---

## What NOT to Include

❌ **Avoid These Common Pitfalls:**
- Clichéd "hugging nature" imagery
- Corporate stock photos
- Oversaturated greens
- People with fake smiles
- Overly staged/artificial look
- Excessive nature scenery (this is about products, not wilderness)
- Confusing visual clutter
- Too many products competing for attention

---

## Specific Image Ideas (Pick One or Blend)

### **Idea A: "Morning Ritual"**
- **Scene**: Sunlit wooden desk with morning coffee setup
- **Products**: Klean Kanteen bottle, organic cotton robe/shirt, wooden accessories
- **Vibe**: Peaceful, intentional, premium self-care
- **Color**: Warm whites, wood, green plants
- **Mood**: "Start your day right"

### **Idea B: "Workspace Essentials"** ⭐ Recommended
- **Scene**: Modern desk with natural light, organized layout
- **Products**: Water bottle, sustainable stationery, plant, fabric/fashion item
- **Vibe**: Productive, organized, conscious choices
- **Color**: Natural wood, cream, forest green hints
- **Mood**: "Everyday sustainability"

### **Idea C: "Creative Workspace"**
- **Scene**: Artist/maker studio with natural materials
- **Products**: Water bottle, tools/supplies, handmade items, plants
- **Vibe**: Creative, maker-focused, artisanal
- **Color**: Warm, textured, organic
- **Mood**: "Create intentionally"

### **Idea D: "Outdoor Lifestyle"**
- **Scene**: Garden or outdoor patio with natural setting
- **Products**: Water bottle in hand, sustainable fashion, home items on table
- **Vibe**: Active, outdoor, connected to nature
- **Color**: Natural greens, wood, warm light
- **Mood**: "Live sustainably"

---

## Technical Specifications

### **Image Requirements**
- **Dimensions**: 1920 x 1080px (or wider for ultrawide)
- **Format**: JPG or WebP (optimized for web)
- **File size**: <200KB (compressed but high quality)
- **Aspect ratio**: 16:9
- **Resolution**: 72 DPI (web optimized)
- **Color space**: RGB (web standard)

### **Placement on Hero**
- **Position**: Full-width background
- **Overlay**: Semi-transparent dark overlay (20-30% opacity)
  - Ensures text legibility
- **Blend mode**: Multiply or Overlay
- **Text overlay on top**: 
  - "Built to last a lifetime"
  - "Durable design meets ethical production"
  - Featured product card

---

## How to Create This Image

### **Option 1: Professional Photography** (Best Quality)
- Hire sustainable lifestyle photographer
- Budget: $500-$2000
- Timeline: 1-2 weeks
- Quality: Highest, most authentic

### **Option 2: AI Image Generation** (Fast, Good Quality)
- Use Midjourney, DALL-E, or Adobe Firefly
- Prompt example below
- Cost: $20-50
- Timeline: 1 day
- Quality: Good, consistent with brand

### **Option 3: Stock Photography + Editing**
- Source from Unsplash, Pexels, or premium stock
- Edit in Canva or Photoshop
- Cost: Free-$100
- Timeline: 1 day
- Quality: Decent, may feel generic

---

## AI Image Generation Prompt (If Using Midjourney/DALL-E)

### **For Idea B (Recommended): "Workspace Essentials"**

```
A serene, minimalist home office workspace shot from above at golden hour morning light. 
Natural wooden desk with warm, light wood tones. 

Products featured:
- Stainless steel water bottle (Klean Kanteen style) positioned on the left, catching light
- Organic cotton fabric or linen scarf draped naturally
- Small potted plant with green foliage
- Handmade ceramic cup with warm coffee

Additional elements:
- Soft, natural sunlight streaming in from the left
- Neutral background (blurred window or cream wall)
- Minimalist aesthetic, very organized and intentional
- No people visible
- Warm color palette: wood tones, creams, soft greens

Style: 
- Professional lifestyle photography
- Modern minimalism
- Warm, inviting, premium feeling
- Not overly staged or artificial
- Inspirational but grounded

Color emphasis: Forest green (#1a472a) plants and accents, warm wood (#C9B8A0 palette), cream backgrounds
```

### **For Idea A: "Morning Ritual"**

```
Peaceful morning scene on a wooden nightstand/desk. Golden hour light. 
Stainless steel water bottle, organic cotton robe or sweater, wooden accessories, small plant, coffee cup.
Warm, minimalist, premium aesthetic. Forest green and natural wood tones.
Professional lifestyle photography. Inviting, intentional, sustainable.
```

---

## Integration with Current Hero

### **Current Layout**
```
┌─────────────────────────────────────┐
│  Hero Section (Light Gradient)      │
│  ┌─────────────────────────────────┐│
│  │ Left: Title + Subtitle + CTA    ││
│  │ Right: Featured Product Card    ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### **With Background Image**
```
┌─────────────────────────────────────┐
│ Hero Section (Image Background)     │
│ [Background Image - Workspace]      │
│ ┌─────────────────────────────────┐│
│ │ Left: Title + Subtitle + CTA    ││
│ │ Right: Featured Product Card    ││
│ │ (All text on 20-30% dark overlay)││
│ └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

---

## CSS Implementation

```css
.hero {
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),
    url('/assets/images/hero-background.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Optional parallax */
  background-repeat: no-repeat;
}

/* For responsive sizing */
@media (max-width: 768px) {
  .hero {
    background-attachment: scroll;
    background-position: 70% center; /* Focus on products */
  }
}
```

---

## Deliverables Checklist

- [ ] Hero image selected or created
- [ ] Image optimized (<200KB)
- [ ] Image tested at all breakpoints
- [ ] Overlay opacity tested (text legibility verified)
- [ ] Colors match brand palette
- [ ] Professional, aspirational feel
- [ ] Not clichéd or generic
- [ ] CSS implemented and tested
- [ ] Mobile responsiveness verified

---

## Timeline & Next Steps

### **Week 1: Image Creation**
- [ ] Finalize image concept (Idea A, B, C, or D)
- [ ] Acquire or create image
- [ ] Optimize for web

### **Week 2: Integration**
- [ ] Implement CSS
- [ ] Test on all devices
- [ ] QA verification
- [ ] Deploy with "Curated From Every Category" section

### **Parallel: Stage 3 Development**
- [ ] Hero background image ← THIS TASK
- [ ] Product carousel section (5 products, one per category)
- [ ] Category discovery improvements
- [ ] Performance optimization

---

## Questions to Answer Before Implementation

1. **Which concept appeals most?**
   - A: Morning Ritual
   - B: Workspace Essentials ⭐ (Recommended)
   - C: Creative Workspace
   - D: Outdoor Lifestyle

2. **Image source preference?**
   - Professional photographer
   - AI generation (fast, consistent)
   - Stock photography

3. **Budget & timeline?**
   - Rush (AI generation, 1 day)
   - Standard (stock + editing, 3 days)
   - Premium (professional shoot, 2 weeks)

---

## Success Criteria

✅ Hero image is:
- Visually striking and premium
- Consistent with brand identity
- Shows sustainable products naturally
- Legible text (good contrast with overlay)
- Fast-loading (<200KB)
- Responsive at all breakpoints
- Inspires action (CTA conversion focus)
- Professional, aspirational, not clichéd

---

**Ready to move forward?** Choose your concept and image source approach above, and Stage 3 hero redesign can begin! 🎨

