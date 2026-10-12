# 🚀 Vercel Environment Variables - Copy & Paste

## **Stage 1: Go to Vercel Dashboard**
```
https://vercel.com/dashboard
```

---

## **Stage 2: Select Your Project**
- Look for: **"leaf-lightly"** (or click Import if not there)
- Click it to open Project Settings

---

## **Stage 3: Go to Environment Variables**
- Left sidebar → **"Settings"**
- Tab → **"Environment Variables"**

---

## **Stage 4: Add Each Variable Below**

For each line below:
1. Copy the **Variable Name** (left side)
2. Paste in "Name" field
3. Copy the **Value** (right side) 
4. Paste in "Value" field
5. Select **"Production"** in dropdown
6. Click **"Save"**

---

### **Copy-Paste Variables**

```
Variable Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://teqodtkywpiubaokqwnk.supabase.co
Environment: Production
```

```
Variable Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [COPY FROM YOUR .env.local FILE - THIS FILE]
Environment: Production
```

```
Variable Name: SUPABASE_SERVICE_ROLE_KEY
Value: [COPY FROM YOUR .env.local FILE - THIS FILE]
Environment: Production
```

```
Variable Name: SUPABASE_JWT_SECRET
Value: [COPY FROM YOUR .env.local FILE - THIS FILE]
Environment: Production
```

```
Variable Name: DATABASE_URL
Value: postgresql://postgres:snoopy123%3F%3F%3F@db.teqodtkywpiubaokqwnk.supabase.co:5432/postgres
Environment: Production
```

```
Variable Name: RESEND_API_KEY
Value: re_test_placeholder
Environment: Production
```

```
Variable Name: UPSTASH_REDIS_REST_URL
Value: https://placeholder.upstash.io
Environment: Production
```

```
Variable Name: UPSTASH_REDIS_REST_TOKEN
Value: placeholder-token
Environment: Production
```

```
Variable Name: WEBHOOK_SECRET
Value: leaf-lightly-webhook-secret-key-2026
Environment: Production
```

```
Variable Name: EMAIL_FROM
Value: noreply@leaflightly.com
Environment: Production
```

---

## **Stage 5: Deploy**

After adding all variables:
1. Go back to **"Deployments"** tab
2. Click **"Deploy"** button
3. Wait 3-5 minutes for build
4. See ✅ "Congratulations!"

---

## **Test Your Deployment**

Once it says "Ready", click the URL and test:

```
https://leaf-lightly.vercel.app/api/health
```

Should show green checkmark ✅

---

## **Values from .env.local**

Your .env.local file has these - copy the actual values:

From `.env.local` file, get these exact values:
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=` → copy the part after `=`
- `SUPABASE_SERVICE_ROLE_KEY=` → copy the part after `=`
- `SUPABASE_JWT_SECRET=` → copy the part after `=`

**Example**:
If your .env.local says:
```
SUPABASE_JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Then copy: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
