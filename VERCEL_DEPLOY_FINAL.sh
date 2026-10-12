#!/bin/bash

# Leaf Lightly - Vercel Deployment Script
# This script deploys to Vercel with all environment variables

# Set environment variables
export NEXT_PUBLIC_SUPABASE_URL="https://teqodtkywpiubaokqwnk.supabase.co"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
export SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
export SUPABASE_JWT_SECRET="super-secret-jwt-key-here"
export DATABASE_URL="postgresql://postgres:snoopy123%3F%3F%3F@db.teqodtkywpiubaokqwnk.supabase.co:5432/postgres"
export RESEND_API_KEY="re_test_placeholder"
export UPSTASH_REDIS_REST_URL="https://placeholder.upstash.io"
export UPSTASH_REDIS_REST_TOKEN="placeholder-token"
export WEBHOOK_SECRET="leaf-lightly-webhook-secret-2026"
export EMAIL_FROM="noreply@leaflightly.com"

# Deploy to Vercel
npx vercel deploy --prod \
  --env NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
  --env NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY \
  --env SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY \
  --env SUPABASE_JWT_SECRET=$SUPABASE_JWT_SECRET \
  --env DATABASE_URL=$DATABASE_URL \
  --env RESEND_API_KEY=$RESEND_API_KEY \
  --env UPSTASH_REDIS_REST_URL=$UPSTASH_REDIS_REST_URL \
  --env UPSTASH_REDIS_REST_TOKEN=$UPSTASH_REDIS_REST_TOKEN \
  --env WEBHOOK_SECRET=$WEBHOOK_SECRET \
  --env EMAIL_FROM=$EMAIL_FROM
