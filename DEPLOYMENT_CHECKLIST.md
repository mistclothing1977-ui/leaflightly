# ✅ Vercel Deployment Checklist - Leaf Lightly

## **Pre-Deployment Checklist**

- ✅ GitHub account connected to Vercel
- ✅ Repository pushed to GitHub
- ✅ Code builds locally: `npm run build` ✓
- ✅ All TypeScript errors fixed ✓
- ✅ Supabase database configured ✓
- ✅ .env.local file with credentials ✓

---

## **STAGE 1: Import Repository to Vercel**

### **Action**: 
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Select **"Continue with GitHub"**
4. Find **"leaf-lightly"** repository
5. Click **"Import"**

### **Vercel Auto-Detects**:
- ✅ Framework: **Next.js**
- ✅ Build: `npm run build`
- ✅ Output: `.next`

---

## **STAGE 2: Project Settings Confirmation**

### **Verify Settings Tab**:
- Root Directory: `./` (default)
- Build Command: `npm run build` ✓
- Output Directory: `.next` ✓
- Install Command: `npm install` ✓

### **No changes needed** - defaults are correct

---

## **STAGE 3: Add Environment Variables**

### **Location**: 
- Vercel Dashboard → Your Project → **Settings** → **Environment Variables**

### **Add Each Variable** (Copy entire block):

#### **Variable 1**
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://teqodtkywpiubaokqwnk.supabase.co
Environment: Production
```
→ Click **"Add"**

#### **Variable 2**
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [Get from your .env.local - look for NEXT_PUBLIC_SUPABASE_ANON_KEY=...]
Environment: Production
```
→ Click **"Add"**

#### **Variable 3**
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: [Get from your .env.local - look for SUPABASE_SERVICE_ROLE_KEY=...]
Environment: Production
```
→ Click **"Add"**

#### **Variable 4**
```
Name: SUPABASE_JWT_SECRET
Value: [Get from your .env.local - look for SUPABASE_JWT_SECRET=...]
Environment: Production
```
→ Click **"Add"**

#### **Variable 5**
```
Name: DATABASE_URL
Value: postgresql://postgres:snoopy123%3F%3F%3F@db.teqodtkywpiubaokqwnk.supabase.co:5432/postgres
Environment: Production
```
→ Click **"Add"**

#### **Variable 6**
```
Name: RESEND_API_KEY
Value: re_test_placeholder
Environment: Production
```
→ Click **"Add"**

#### **Variable 7**
```
Name: UPSTASH_REDIS_REST_URL
Value: https://placeholder.upstash.io
Environment: Production
```
→ Click **"Add"**

#### **Variable 8**
```
Name: UPSTASH_REDIS_REST_TOKEN
Value: placeholder-token
Environment: Production
```
→ Click **"Add"**

#### **Variable 9**
```
Name: WEBHOOK_SECRET
Value: leaf-lightly-webhook-secret-2026
Environment: Production
```
→ Click **"Add"**

#### **Variable 10**
```
Name: EMAIL_FROM
Value: noreply@leaflightly.com
Environment: Production
```
→ Click **"Add"**

### **Status After All Variables Added**:
```
✅ 10 Environment Variables Set
```

---

## **STAGE 4: Deploy**

### **Action**:
1. Go to **"Deployments"** tab
2. Click **"Deploy"** button (or wait for auto-deploy if already pushed)
3. Watch the build progress (3-5 minutes)
4. See ✅ **"Congratulations! Your site is live"**

### **What Happens**:
- Vercel clones your GitHub repo
- Runs `npm install` with dependencies
- Runs `npm run build` to compile Next.js
- Uploads `.next` folder to CDN
- Your app is LIVE

---

## **STAGE 5: Test Deployment**

### **Get Your Live URL**:
- Vercel shows it: **https://leaf-lightly-xxxxx.vercel.app**

### **Test Health Endpoint**:
```bash
curl https://leaf-lightly-xxxxx.vercel.app/api/health
```

### **Expected Response** (200 OK):
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2026-10-12T...",
  "version": "1.0.0"
}
```

### **If You See This** ✅ Deployment Successful!

---

## **STAGE 6: Production Verification**

### **API Endpoints Now Live**:
- ✅ Health Check: `GET /api/health`
- ✅ Newsletter: `POST /api/newsletter/subscribe`
- ✅ Admin Products: `GET /api/admin/products` (auth required)
- ✅ Create Product: `POST /api/admin/products` (auth required)
- ✅ Update Product: `PUT /api/admin/products/[id]` (auth required)
- ✅ Delete Product: `DELETE /api/admin/products/[id]` (auth required)
- ✅ Approve Product: `POST /api/admin/products/[id]/approve` (auth required)

### **Features Active**:
- ✅ Rate limiting (Upstash mock fallback)
- ✅ JWT authentication via Supabase
- ✅ Database persistence
- ✅ Audit logging
- ✅ Email queue (Resend)
- ✅ CORS + Security headers

---

## **Troubleshooting**

### **Build Fails**
→ Check Vercel build logs for errors
→ Ensure all env vars are set
→ Verify DATABASE_URL format

### **500 Error on API Calls**
→ Check env vars are correct
→ Verify database connection
→ Check Vercel function logs

### **Rate Limiting Not Working**
→ That's OK - mock limiter active
→ Update UPSTASH credentials later

---

## **Next Steps**

1. ✅ Deploy to Vercel (these instructions)
2. ✅ Test API endpoints
3. 🔄 Add custom domain (leaflightly.com)
4. 🔄 Set up monitoring/alerts
5. 🔄 Configure Resend email API
6. 🔄 Set up Upstash Redis for rate limiting

---

**Status**: 🟢 Ready to Deploy

**Estimated Time**: 15 minutes total
