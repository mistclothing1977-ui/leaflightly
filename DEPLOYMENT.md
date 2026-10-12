# 🌿 Leaf Lightly - Deployment Guide

## Production Deployment to Vercel

Your **Leaf Lightly** application is production-ready! Follow these steps to deploy:

### **Option 1: Deploy via Vercel Dashboard (Easiest)**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Leaf Lightly MVP"
   git remote add origin https://github.com/YOUR_USERNAME/leaf-lightly.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js configuration

3. **Set Environment Variables in Vercel**
   In Project Settings → Environment Variables, add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://teqodtkywpiubaokqwnk.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[from Supabase project]
   SUPABASE_SERVICE_ROLE_KEY=[from Supabase project]
   SUPABASE_JWT_SECRET=[from Supabase project]
   DATABASE_URL=postgresql://postgres:snoopy123%3F%3F%3F@db.teqodtkywpiubaokqwnk.supabase.co:5432/postgres
   RESEND_API_KEY=[from Resend.com]
   UPSTASH_REDIS_REST_URL=[from Upstash console]
   UPSTASH_REDIS_REST_TOKEN=[from Upstash console]
   WEBHOOK_SECRET=your-secure-webhook-secret
   EMAIL_FROM=noreply@leaflightly.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Your app will be live at `https://your-project.vercel.app`

---

### **Option 2: Deploy via Vercel CLI**

```bash
# Login to Vercel
npx vercel login

# Deploy to production
npx vercel deploy --prod

# Follow the prompts to configure environment variables
```

---

## **Pre-Deployment Checklist**

- ✅ TypeScript compilation: **PASSING**
- ✅ Security headers configured
- ✅ Rate limiting implemented
- ✅ JWT authentication enabled
- ✅ Audit logging configured
- ✅ CORS properly set
- ✅ Database migrations ready
- ✅ Email provider (Resend) integrated
- ✅ Supabase Storage configured

---

## **Required External Services**

### **1. Supabase (Database)**
- Project URL: `https://teqodtkywpiubaokqwnk.supabase.co`
- Status: ✅ Already configured
- Features: PostgreSQL, Storage, Auth

### **2. Resend (Email Service)**
- Sign up: [resend.com](https://resend.com)
- Get API key and add to environment
- Configure sender domain

### **3. Upstash (Rate Limiting)**
- Sign up: [upstash.com](https://upstash.com)
- Create Redis database
- Get REST URL and token

### **4. GitHub (Source Control)**
- Repository for Vercel integration

---

## **Production API Endpoints**

Once deployed, your endpoints will be:

```
GET  https://your-project.vercel.app/api/health
POST https://your-project.vercel.app/api/newsletter/subscribe
GET  https://your-project.vercel.app/api/newsletter/confirm
GET  https://your-project.vercel.app/api/admin/products
POST https://your-project.vercel.app/api/admin/products
GET  https://your-project.vercel.app/api/admin/products/[id]
PUT  https://your-project.vercel.app/api/admin/products/[id]
DELETE https://your-project.vercel.app/api/admin/products/[id]
POST https://your-project.vercel.app/api/admin/products/[id]/approve
```

---

## **Post-Deployment**

1. **Verify Health Check**
   ```bash
   curl https://your-project.vercel.app/api/health
   ```
   Expected: `{"success":true,"status":"healthy",...}`

2. **Test Newsletter Signup**
   ```bash
   curl -X POST https://your-project.vercel.app/api/newsletter/subscribe \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```

3. **Monitor with Vercel Analytics**
   - Log in to Vercel dashboard
   - View deployment logs, analytics, and errors

4. **Set Up Custom Domain**
   - Go to Project Settings → Domains
   - Add your domain (e.g., leaflightly.com)
   - Update DNS records

---

## **Environment Variables Reference**

| Variable | Source | Purpose |
|----------|--------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase | Database URL (public) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase | Frontend auth key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase | Server-side access |
| `SUPABASE_JWT_SECRET` | Supabase | Token verification |
| `DATABASE_URL` | Supabase | PostgreSQL connection |
| `RESEND_API_KEY` | Resend | Email sending |
| `UPSTASH_REDIS_REST_URL` | Upstash | Rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash | Redis auth |
| `WEBHOOK_SECRET` | Your choice | Webhook validation |
| `EMAIL_FROM` | Your choice | Sender email address |

---

## **Troubleshooting**

### Build fails with missing environment variables
- Ensure all required env vars are set in Vercel dashboard
- Don't include `.env.local` in git commits

### 500 Internal Server Error
- Check Vercel function logs
- Verify database connection string
- Check API key permissions

### Rate limiting not working
- Verify Upstash credentials
- App falls back to mock limiter if Upstash unavailable
- Check Redis connection in Vercel logs

---

## **Support**

For issues with deployment:
1. Check Vercel logs: Project → Deployments → View logs
2. Verify environment variables
3. Test local build: `npm run build && npm run start`

---

**Deployment Status**: 🟢 Ready for Production
