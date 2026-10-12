# 🧪 Leaf Lightly API Endpoint Testing Guide

## Testing Your Live Endpoints

Once deployed to Vercel, test your endpoints with these commands. Replace `your-url.vercel.app` with your actual Vercel URL.

---

## ✅ 1. Health Check

**Endpoint**: `GET /api/health`

**Purpose**: Verify the application is running

**cURL**:
```bash
curl https://your-url.vercel.app/api/health
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2026-10-12T15:30:00.000Z",
  "version": "1.0.0"
}
```

---

## 📧 2. Newsletter Signup

**Endpoint**: `POST /api/newsletter/subscribe`

**Purpose**: Subscribe email to newsletter with double opt-in

**cURL**:
```bash
curl -X POST https://your-url.vercel.app/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "subscribed": true,
    "message": "Check your email to confirm subscription"
  }
}
```

**Features Tested**:
- ✅ Email validation
- ✅ Disposable email blocking
- ✅ Rate limiting (5/hour per IP)
- ✅ Double opt-in flow
- ✅ Confirmation email sent

---

## 📨 3. Newsletter Confirmation

**Endpoint**: `GET /api/newsletter/confirm?email=X&token=Y`

**Purpose**: Confirm email subscription

**cURL**:
```bash
curl https://your-url.vercel.app/api/newsletter/confirm \
  -d "email=test@example.com&token=abc123"
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "message": "Email confirmed",
  "data": {
    "status": "active"
  }
}
```

---

## 🔒 Admin Endpoints (Require JWT Auth)

### Test Without Auth (Should Fail)

```bash
curl https://your-url.vercel.app/api/admin/products
```

**Expected Response** (401 Unauthorized):
```json
{
  "success": false,
  "error": "Missing or invalid authorization header",
  "code": "UNAUTHORIZED"
}
```

### 4. List Products

**Endpoint**: `GET /api/admin/products`

**Requires**: Valid JWT token in `Authorization: Bearer {token}` header

**cURL**:
```bash
curl https://your-url.vercel.app/api/admin/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": 1,
        "slug": "product-name",
        "name": "Product Name",
        "status": "published",
        "created_at": "2026-10-12T...",
        ...
      }
    ]
  }
}
```

**Features Tested**:
- ✅ JWT authentication
- ✅ Authorization check
- ✅ Product listing with pagination

---

### 5. Create Product

**Endpoint**: `POST /api/admin/products`

**Requires**: Valid JWT token

**cURL**:
```bash
curl -X POST https://your-url.vercel.app/api/admin/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Eco Water Bottle",
    "brand_id": 1,
    "category_id": 2,
    "description": "Sustainable stainless steel water bottle",
    "price_gbp": "45.99",
    "tier": "A"
  }'
```

**Expected Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "product": {
      "id": 1,
      "slug": "eco-water-bottle",
      "status": "draft",
      "created_by": "user-id",
      "created_at": "2026-10-12T...",
      ...
    }
  }
}
```

**Features Tested**:
- ✅ Input validation (Zod)
- ✅ Slug generation
- ✅ Draft status default
- ✅ Rate limiting (10 creates/hour)
- ✅ Audit logging
- ✅ Auth requirement

---

### 6. Update Product

**Endpoint**: `PUT /api/admin/products/[id]`

**cURL**:
```bash
curl -X PUT https://your-url.vercel.app/api/admin/products/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Updated Name",
    "description": "Updated description",
    "price_gbp": "49.99"
  }'
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "product": {
      "id": 1,
      "name": "Updated Name",
      "updated_at": "2026-10-12T..."
    }
  }
}
```

**Features Tested**:
- ✅ Rate limiting (20 updates/hour)
- ✅ Change tracking (audit log)
- ✅ Validation

---

### 7. Approve/Reject Product

**Endpoint**: `POST /api/admin/products/[id]/approve`

**cURL**:
```bash
curl -X POST https://your-url.vercel.app/api/admin/products/1/approve \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "action": "approve",
    "review_notes": "Looks good, approved for publishing"
  }'
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "product": {
      "id": 1,
      "status": "published",
      "reviewed_by": "reviewer-id",
      "reviewed_at": "2026-10-12T...",
      "published_at": "2026-10-12T..."
    }
  }
}
```

**Features Tested**:
- ✅ Status transition (draft → published)
- ✅ Reviewer tracking
- ✅ Review notes storage
- ✅ Audit logging

---

### 8. Delete Product

**Endpoint**: `DELETE /api/admin/products/[id]`

**cURL**:
```bash
curl -X DELETE https://your-url.vercel.app/api/admin/products/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "message": "Product archived"
}
```

**Features Tested**:
- ✅ Soft delete (status: archived)
- ✅ Audit logging

---

## 🔐 Security Features Tested

| Feature | Endpoint | Expected Behavior |
|---------|----------|-------------------|
| JWT Auth | All admin endpoints | Returns 401 without valid token |
| Rate Limiting | POST /products | Returns 429 after 10 requests/hour |
| CORS Headers | All endpoints | Includes proper CORS headers |
| Input Validation | All POST/PUT | Rejects invalid input with 400 |
| Audit Logging | All mutations | Logs action, user, timestamp |
| HTML Sanitization | Description fields | Sanitizes HTML, XSS prevention |

---

## 📊 Testing Checklist

- [ ] Health endpoint returns 200
- [ ] Newsletter signup works
- [ ] Admin endpoints return 401 without auth
- [ ] Can create product (requires auth)
- [ ] Can update product (requires auth)
- [ ] Can approve product (requires auth)
- [ ] Can delete product (requires auth)
- [ ] Rate limiting works (429 after limit)
- [ ] Security headers present (CORS, etc)
- [ ] Audit logs recorded

---

## 🚀 How to Get JWT Token for Testing

1. **Via Supabase Dashboard**:
   - Go to: `https://app.supabase.com`
   - Select your project
   - Go to: Authentication → Users
   - Create a test user or use existing
   - Use their UID in test requests

2. **Via Supabase CLI**:
   ```bash
   supabase auth users list
   ```

3. **Via Postman**:
   - Create environment variable: `jwt_token`
   - Set value to valid Supabase JWT
   - Use: `Authorization: Bearer {{jwt_token}}`

---

## 📝 Response Codes Reference

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Product retrieved/updated |
| 201 | Created | Product created |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing/invalid JWT |
| 404 | Not Found | Product doesn't exist |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Database error |

---

## ✨ Production Verification

Once all endpoints pass:

✅ **API is production-ready!**

Your Leaf Lightly platform is fully functional with:
- 8 working endpoints
- JWT authentication
- Rate limiting
- Audit logging
- Security headers
- Input validation
- Error handling
