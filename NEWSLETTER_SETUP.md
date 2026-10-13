# Automated Weekly Newsletter Setup Guide

## 🎯 System Overview

Your newsletter system is now complete with:
- ✅ Database schema (4 tables)
- ✅ Resend email integration
- ✅ Smart batching (100/day × 7 days = 700/week)
- ✅ Automatic scheduling (cron jobs)
- ✅ Upgrade threshold alerts
- ✅ Unsubscribe management

---

## 📋 Pre-Deployment Checklist

### 1. Environment Variables

Add to `.env.local`:
```env
# Resend API Key (get from https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Cron secret (generate random, keep safe)
CRON_SECRET=your_super_secret_cron_key_here

# Base URL for email links
NEXT_PUBLIC_BASE_URL=https://leaflightly.com
# Or for dev: http://localhost:3000
```

### 2. Database Migration

Run Drizzle migration to create tables:
```bash
npm run db:push
```

This creates:
- `newsletter_subscribers` — store emails
- `newsletter_batches` — weekly send schedule
- `email_logs` — email tracking
- `newsletter_settings` — configuration

### 3. Get Resend API Key

1. Go to https://resend.com
2. Sign up (free tier: 100 emails/day)
3. Get API key from dashboard
4. Add to `.env.local`

### 4. Verify Sender Email

Resend requires verification:
1. In Resend dashboard, add sender domain: `newsletter@leaflightly.com`
2. Follow verification steps (DNS records)
3. Test with `/api/newsletter/send` endpoint

---

## 🚀 How It Works

### Weekly Flow

**Monday 08:00 UTC** (via Vercel Cron)
- `/api/newsletter/schedule` runs
- Creates 7 daily batches (Mon-Sun)
- Distributes 100 emails per day
- Stores curated products for the week

**Daily 09:00 UTC** (via Vercel Cron)
- `/api/newsletter/send` runs
- Sends batch scheduled for today
- Logs all sends in `email_logs`
- Updates subscriber `lastEmailAt`

### Subscriber Journey

1. **Subscribe** (via NewsletterModal)
   - `POST /api/newsletter/subscribe` 
   - Stores email in `newsletter_subscribers`
   - Status: `active`

2. **Receive Email**
   - Gets product recommendations
   - Receives once per week (day determined by batch)
   - Can track opens/clicks via Resend

3. **Unsubscribe** (via email link)
   - `GET /api/newsletter/unsubscribe?email=...`
   - Sets status to `unsubscribed`
   - Stops receiving emails

---

## 📊 Capacity & Scaling

### Free Tier (Current)
- **100 emails/day** (Resend limit)
- **700 emails/week** (7 days × 100)
- **Upgrade recommended** at 90% capacity (630 subscribers)

### Upgrade Trigger

When subscribers reach **3,500 emails/week**:
1. System logs warning to console
2. Recommend upgrading Resend plan
3. Switch to paid tier: **$0.20 per 1,000 emails**

---

## 🔌 API Endpoints

### 1. Subscribe
```bash
POST /api/newsletter/subscribe
Content-Type: application/json

{
  "email": "user@example.com"
}

Response:
{
  "message": "Subscribed successfully",
  "email": "user@example.com"
}
```

### 2. Schedule Batches (Auto via Cron)
```bash
POST /api/newsletter/schedule
X-Cron-Secret: your_super_secret_cron_key_here

Response:
{
  "message": "Weekly batches scheduled successfully",
  "subscriberCount": 1250,
  "batchesCreated": 7,
  "totalEmails": 1250,
  "capacityAlert": "At 89% capacity"
}
```

### 3. Send Batch (Auto via Cron)
```bash
POST /api/newsletter/send
X-Cron-Secret: your_super_secret_cron_key_here

Response:
{
  "message": "Newsletter batches sent successfully",
  "batchesSent": 1,
  "totalEmailsSent": 142,
  "results": [...]
}
```

### 4. Unsubscribe
```bash
GET /api/newsletter/unsubscribe?email=user@example.com

Response: HTML success page
```

---

## 📈 Monitoring

### Check Subscriber Count
```sql
SELECT COUNT(*) as total, status FROM newsletter_subscribers GROUP BY status;
```

### View Sent Emails
```sql
SELECT * FROM email_logs ORDER BY sent_at DESC LIMIT 10;
```

### Check Failed Sends
```sql
SELECT * FROM email_logs WHERE status = 'failed';
```

### View Batches
```sql
SELECT * FROM newsletter_batches WHERE week_start = NOW()::date - NOW()::date % 7;
```

---

## 🔐 Security Notes

1. **Cron Secret** - Generate strong random key, keep private
2. **API Key** - Never commit `RESEND_API_KEY` to git
3. **Unsubscribe** - Anyone can unsubscribe (intentional, per CAN-SPAM)
4. **Database** - Subscribers table is never exposed publicly

---

## 📧 Email Template

Email includes:
- ✅ Curated product picks (5 items)
- ✅ Product images, ratings, prices
- ✅ "View Details" CTA link per product
- ✅ Unsubscribe link (legal requirement)
- ✅ Mobile responsive design
- ✅ Leaf Lightly branding

---

## 🐛 Troubleshooting

### "Unauthorized" on cron endpoints
- Verify `CRON_SECRET` in `.env.local` matches vercel.json
- Ensure header `X-Cron-Secret` is being sent

### "Failed to send email"
- Verify Resend API key is correct
- Verify sender email is verified in Resend dashboard
- Check Resend quota (100 emails/day free)

### "No batches to send"
- Batches only created Monday 08:00 UTC
- Verify `CRON_SECRET` env var set correctly
- Check newsletter_batches table has records

### Subscribers not receiving emails
- Verify status is `active` in newsletter_subscribers
- Check email_logs for bounce reasons
- Verify Resend API key quota not exceeded

---

## 📝 Testing

### Test Subscribe Endpoint
```bash
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### Test Schedule Manually
```bash
curl -X POST http://localhost:3000/api/newsletter/schedule \
  -H "X-Cron-Secret: your_secret_here"
```

### Test Send Manually
```bash
curl -X POST http://localhost:3000/api/newsletter/send \
  -H "X-Cron-Secret: your_secret_here"
```

### View Database
```bash
npm run db:studio
# Opens Drizzle Studio at localhost
```

---

## 📚 Files Created

```
src/
├── db/
│   └── schema.ts (updated with newsletter tables)
├── lib/email/
│   ├── resend.ts (Resend integration)
│   ├── batch-calculator.ts (100/day distribution)
│   └── newsletter-template.tsx (email template)
└── app/api/newsletter/
    ├── subscribe/route.ts (updated)
    ├── schedule/route.ts (NEW)
    ├── send/route.ts (NEW)
    └── unsubscribe/route.ts (NEW)

vercel.json (updated with crons)
```

---

## 🚢 Deployment Steps

1. **Add environment variables** to Vercel project settings
2. **Run database migration** in Vercel CLI or dashboard
3. **Deploy** to Vercel (crons auto-activate)
4. **Test subscribe** via NewsletterModal
5. **Monitor** first week (check email_logs table)

---

## ✅ Post-Launch Checklist

- [ ] RESEND_API_KEY added to Vercel env vars
- [ ] CRON_SECRET added to Vercel env vars
- [ ] NEXT_PUBLIC_BASE_URL set correctly
- [ ] Database migration ran (`npm run db:push`)
- [ ] Sender email verified in Resend dashboard
- [ ] Crons visible in Vercel project settings
- [ ] Test subscriber added and email sent
- [ ] Unsubscribe link tested
- [ ] Email logs checked for success

---

## 📞 Support

For issues:
1. Check error logs in Resend dashboard
2. Review email_logs table for failure reasons
3. Verify cron jobs in Vercel settings
4. Test endpoints manually with curl

---

**System Status:** ✅ Ready to Deploy  
**Last Updated:** 2026-10-13  
**Weekly Capacity:** 700 emails (100/day × 7 days)
