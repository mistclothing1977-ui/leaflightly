# Leaf Lightly Development Workflow

## Data Integration Checklist

### Review Integration (CRITICAL - Add when importing real products)

**Current state:** All product reviews and ratings are placeholder/mock data
- `src/data/products.ts` — Contains auto-generated products with mocked ratings
- `src/data/reviews.ts` — Contains sample reviews (marked "In production, this would come from a database")
- Product images use via.placeholder.com

**When importing real products, implement:**

1. **Amazon Product Advertising API**
   - Real product ratings and review counts
   - Product images
   - Affiliate link generation
   - API docs: https://advertising.amazon.com/API

2. **Trustpilot API**
   - Community validation data
   - Review aggregation
   - Rating integration
   - Documentation: https://developers.trustpilot.com/

3. **Reviews.io API**
   - Verified review data
   - Review text and ratings
   - Customer verification
   - Documentation: https://www.reviews.io/

4. **Direct Database**
   - Replace `src/data/reviews.ts` with real review data
   - Implement review caching strategy
   - Set up review refresh schedule

### Implementation Priority
- [ ] Select primary review data source (Amazon/Trustpilot recommended)
- [ ] Obtain API credentials
- [ ] Create service layer in `src/lib/review-service.ts`
- [ ] Update `src/data/products.ts` to fetch real data
- [ ] Replace mock reviews in `src/data/reviews.ts`
- [ ] Add error handling and fallbacks
- [ ] Test with 10-20 real products first

### Hero Video (IMPLEMENTED - Needs Asset)

**Current state:** PremiumHero component integrated with local video path
- Component: `src/components/PremiumHero.tsx` ✓
- Page integration: `src/app/page.tsx` ✓
- Expected video path: `/public/assets/videos/coastal-cliffs-hero.mp4`
- Video source: Pexels - "Breathtaking Aerial View of Coastal Cliffs" by Khrystyna Ivanova
- Video ID: 31784580
- Resolution: Full HD (1080x1920)
- Duration: 13 seconds (can be trimmed to 4-6 sec in post if needed)

**To complete:**
1. Download from: https://www.pexels.com/video/breathtaking-aerial-view-of-coastal-cliffs-31784580/
2. Select Full HD (1080x1920) resolution
3. Create folder: `public/assets/videos/`
4. Place video as: `public/assets/videos/coastal-cliffs-hero.mp4`
5. Video will auto-load on page refresh

### References
- Mock data location: `src/data/`
- Verified platforms: Amazon, Trustpilot, Reviews.io, Independent
- Review interface: `src/data/reviews.ts` (Review interface)
- Video component: `src/components/PremiumHero.tsx`
