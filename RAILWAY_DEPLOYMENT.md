# Deploy Leaf Lightly to Railway.app

Railway.app offers **$5/month free credit** - enough for the MVP!

## **Quick Deploy Steps**

1. **Create Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "GitHub Repo"
   - Connect your GitHub and select `leaf-lightly` repository

3. **Configure Build Settings**
   - Railway auto-detects Next.js
   - Set environment variables in Project Settings

4. **Add Environment Variables**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://teqodtkywpiubaokqwnk.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-key]
   SUPABASE_SERVICE_ROLE_KEY=[your-key]
   SUPABASE_JWT_SECRET=[your-key]
   DATABASE_URL=postgresql://postgres:snoopy123%3F%3F%3F@db.teqodtkywpiubaokqwnk.supabase.co:5432/postgres
   RESEND_API_KEY=[from resend.com]
   UPSTASH_REDIS_REST_URL=[from upstash.com]
   UPSTASH_REDIS_REST_TOKEN=[from upstash.com]
   WEBHOOK_SECRET=your-secure-key
   EMAIL_FROM=noreply@leaflightly.com
   ```

5. **Deploy**
   - Railway automatically deploys on push
   - View live URL in Dashboard

## **Railway vs Vercel**

| Feature | Railway | Vercel |
|---------|---------|--------|
| **Free Credit** | $5/month | Generous free tier |
| **Setup** | 5 minutes | 2 minutes |
| **Auto-deploy** | ✅ GitHub push | ✅ GitHub push |
| **Scaling** | Pay-as-you-go | Automatic |
| **Database** | Easy integration | Connect external DB |

**For Leaf Lightly MVP**: Railway is perfect!
