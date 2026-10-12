# Stage 13: Account & Persistent Wishlists

## What We're Building

**Users can:**
1. Create account (email/password)
2. Login
3. Save products to wishlist (persists across devices)
4. View wishlist with all saved items
5. Click through to buy each item

**We handle:**
- User authentication (simple email/password)
- Wishlist storage (database)
- NO payments, NO orders, NO complexity

---

## Architecture

### Database Schema

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  passwordHash VARCHAR(255) NOT NULL,
  firstName VARCHAR(100),
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- Wishlists table
CREATE TABLE wishlists (
  id UUID PRIMARY KEY,
  userId UUID NOT NULL REFERENCES users(id),
  productId VARCHAR(255) NOT NULL,
  addedAt TIMESTAMP DEFAULT NOW(),
  UNIQUE(userId, productId)
);
```

### Tech Stack

- **Auth:** NextAuth.js or simple JWT
- **Database:** Neon PostgreSQL (free tier)
- **Password hashing:** bcrypt
- **Sessions:** HTTP-only cookies

---

## Files to Create

### Auth Pages
```
/src/app/login/page.tsx
/src/app/signup/page.tsx
/src/app/account/page.tsx (just wishlist view)
/src/app/wishlist/page.tsx (detailed wishlist)
```

### Components
```
/src/components/LoginForm.tsx
/src/components/SignupForm.tsx
/src/components/WishlistButton.tsx
/src/components/WishlistPreview.tsx
```

### API Routes
```
/src/api/auth/signup.ts
/src/api/auth/login.ts
/src/api/auth/logout.ts
/src/api/auth/me.ts
/src/api/wishlist/add.ts
/src/api/wishlist/remove.ts
/src/api/wishlist/get.ts
```

### Context & Utilities
```
/src/context/AuthContext.tsx (simpler than before)
/src/lib/auth.ts (password hashing, JWT)
/src/lib/db.ts (Neon connection)
```

---

## Simplified Auth Flow

### Signup
```
User enters email + password
  ↓
Hash password with bcrypt
  ↓
Save to users table
  ↓
Create session (HTTP-only cookie)
  ↓
Redirect to /wishlist
```

### Login
```
User enters email + password
  ↓
Look up user by email
  ↓
Compare hashed password
  ↓
Create session
  ↓
Redirect to /wishlist
```

### Wishlist
```
User clicks ❤️ on product
  ↓
POST /api/wishlist/add { productId }
  ↓
Insert into wishlists table (if userId is in session)
  ↓
Update UI (heart filled)
```

---

## Key Differences from Stage 6 (Old Auth)

| Feature | Old (Stage 6) | New (Stage 13) |
|---------|---------------|----------------|
| Purpose | Support cart checkout | Persistent favorites |
| Complexity | High (orders, payments) | Low (just wishlists) |
| Database | Mock in-memory | Real Neon DB |
| Auth library | Custom | NextAuth or JWT |
| Pages | Login, signup, account, orders | Login, signup, wishlist |
| API routes | 6+ (auth, orders, reviews) | 3 (signup, login, logout) |
| Data per user | orders, reviews, cart | wishlist only |

---

## Implementation Steps

### Step 1: Database Setup
- Connect to Neon PostgreSQL
- Create users table
- Create wishlists table
- Test connection

### Step 2: Auth System
- Password hashing utility
- Signup API endpoint
- Login API endpoint
- Logout endpoint
- Session middleware

### Step 3: Auth Pages & Forms
- LoginForm component
- SignupForm component
- Login page (/login)
- Signup page (/signup)

### Step 4: Wishlist Features
- WishlistButton component (add/remove)
- Wishlist page (/wishlist)
- API endpoints (add, remove, get)

### Step 5: Integration
- Update product cards (add wishlist button)
- Update Header (login link if not authenticated)
- Update Footer (account link if authenticated)
- Update layout with AuthContext

### Step 6: Testing & Deploy
- Test signup flow
- Test login flow
- Test add to wishlist
- Test remove from wishlist
- Test persistence across sessions
- Deploy to Vercel

---

## Stack Choice

### Option A: NextAuth.js
✅ Simpler, handles sessions for you  
✅ Built for Next.js  
✅ Secure out of the box  
⚠️ More opinionated  

### Option B: Manual JWT
✅ Full control  
✅ Lightweight  
⚠️ More code to write  
⚠️ More security to manage  

**Recommendation:** NextAuth.js (simpler, more secure)

---

## Environment Setup

### .env.local
```
DATABASE_URL=postgresql://...neon...
NEXTAUTH_SECRET=generate-random-secret
NEXTAUTH_URL=http://localhost:3000
```

### .env.production (Vercel)
```
DATABASE_URL=postgresql://...neon...
NEXTAUTH_SECRET=production-secret
NEXTAUTH_URL=https://leaflightly.com
```

---

## Wishlist UX

### Product Card
```
[Product Image]
[Brand Name]
[Product Name]
[£Price]
[Rating]
❤️ Add to Wishlist
🛒 Buy Now
```

### Wishlist Page
```
My Wishlist (5 items)

[Product 1]
├── Brand: Amazon
├── Link: Buy on Amazon
└── 🗑️ Remove

[Product 2]
├── Brand: Organic Basics
├── Links: Buy from Brand / Buy on Amazon
└── 🗑️ Remove

[Total items] [Continue Shopping] [Checkout flow]
```

---

## Timeline

- Step 1 (DB): 30 min
- Step 2 (Auth): 1 hour
- Step 3 (Pages): 1.5 hours
- Step 4 (Wishlist): 1.5 hours
- Step 5 (Integration): 1 hour
- Step 6 (Test & Deploy): 1 hour

**Total: ~6 hours**

---

## Security Checklist

- ✅ Passwords hashed with bcrypt
- ✅ Sessions use HTTP-only cookies
- ✅ CSRF protection (NextAuth handles)
- ✅ SQL injection prevention (parameterized queries)
- ✅ Rate limiting on auth endpoints
- ✅ Validate email format
- ✅ Validate password strength (min 8 chars)

---

## Success Criteria

- ✅ Can sign up with email/password
- ✅ Can login
- ✅ Can add products to wishlist
- ✅ Can remove from wishlist
- ✅ Wishlist persists after logout/login
- ✅ Wishlist syncs across devices
- ✅ All pages responsive (mobile)
- ✅ No console errors
- ✅ Database queries performant

