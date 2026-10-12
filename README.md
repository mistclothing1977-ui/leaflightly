# Leaf Lightly

An editorial discovery platform for sustainable, thoughtfully-made products.

## Getting Started

### Prerequisites

- Node.js 18+ (LTS)
- npm or yarn
- Supabase account

### Setup

1. **Install Node.js** from https://nodejs.org

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`
   - Fill in your Supabase credentials:
     - Create a project at https://supabase.com
     - Get your `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
     - Set your `DATABASE_URL`

4. **Initialize the database:**
```bash
npm run db:generate  # Generate migrations
npm run db:push     # Push schema to Supabase
```

5. **Start the dev server:**
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Project Structure

```
src/
├── app/              # Next.js App Router
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Homepage
│   ├── api/          # API routes
│   └── admin/        # Admin panel
├── lib/
│   ├── db/           # Database (Drizzle + Supabase)
│   ├── api/          # API utilities
│   ├── auth.ts       # Authentication
│   ├── validate.ts   # Zod schemas
│   ├── cache.ts      # Vercel KV caching
│   └── storage.ts    # Supabase Storage
└── components/       # React components
```

## Tech Stack

- **Framework:** Next.js 14+
- **Database:** PostgreSQL via Supabase
- **ORM:** Drizzle
- **Validation:** Zod
- **Caching:** Vercel KV (Redis)
- **Email Queue:** Bull
- **Storage:** Supabase Storage
- **Auth:** Supabase Auth
- **Monitoring:** Sentry
- **Image Optimization:** Sharp

## Development

### Database commands

```bash
# Generate migrations after schema changes
npm run db:generate

# Push migrations to Supabase
npm run db:push

# Open Drizzle Studio (local query builder)
npm run db:studio
```

### Linting

```bash
npm run lint
```

## Architecture

See `LEAF_LIGHTLY_Production_Ready_Architecture.md` for the complete specification.

Key features:
- Type-safe database queries with Drizzle
- Server-side validation with Zod
- Rate limiting on admin endpoints
- Webhook-driven cache invalidation
- Email queue with retry logic
- Product approval workflow
- Audit logging for all changes
- Sentry error tracking
- Slack alerts for critical issues

## Deployment

This project deploys to Vercel with automatic builds on push to `main`.

See `LEAF_LIGHTLY_Production_Ready_Architecture.md` for the complete deployment checklist.

## License

Private project.

# Updated: 2026-10-12 23:02:20
