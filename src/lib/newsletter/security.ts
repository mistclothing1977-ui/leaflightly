import crypto from 'crypto';
import type { NextRequest } from 'next/server';

type TokenPurpose = 'confirm' | 'unsubscribe';

function tokenSecret(): string {
  const secret = process.env.NEWSLETTER_TOKEN_SECRET || process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error('NEWSLETTER_TOKEN_SECRET (or NEXTAUTH_SECRET) is not set');
  return secret;
}

// Stateless signed token: no DB storage needed, can't be forged without the secret.
export function signNewsletterToken(purpose: TokenPurpose, email: string): string {
  return crypto
    .createHmac('sha256', tokenSecret())
    .update(`${purpose}:${email.trim().toLowerCase()}`)
    .digest('hex');
}

export function verifyNewsletterToken(purpose: TokenPurpose, email: string, token: string): boolean {
  const expected = Buffer.from(signNewsletterToken(purpose, email), 'hex');
  const given = Buffer.from(token, 'hex');
  return given.length === expected.length && crypto.timingSafeEqual(given, expected);
}

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_BASE_URL || 'https://leaflightly.com').replace(/\/$/, '');
}

export function unsubscribeUrl(email: string): string {
  const token = signNewsletterToken('unsubscribe', email);
  return `${siteUrl()}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}&token=${token}`;
}

export function confirmUrl(email: string): string {
  const token = signNewsletterToken('confirm', email);
  return `${siteUrl()}/api/newsletter/confirm?email=${encodeURIComponent(email)}&token=${token}`;
}

// Vercel Cron sends `Authorization: Bearer <CRON_SECRET>`. Fails closed if the secret is unset.
export function isAuthorizedCron(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const expected = Buffer.from(`Bearer ${secret}`);
  const given = Buffer.from(req.headers.get('authorization') ?? '');
  return given.length === expected.length && crypto.timingSafeEqual(given, expected);
}
