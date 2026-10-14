/**
 * Security-critical helpers: signed newsletter links, cron auth, HTML sanitising,
 * DB error redaction and email validation.
 */
import type { NextRequest } from 'next/server';
import {
  signNewsletterToken,
  verifyNewsletterToken,
  unsubscribeUrl,
  isAuthorizedCron,
} from '@/lib/newsletter/security';
import { sanitizeHtml } from '@/lib/validate';
import { emailSchema } from '@/lib/validate-email';
import { safeError } from '@/lib/safe-error';

const req = (authorization?: string) =>
  ({ headers: { get: (k: string) => (k.toLowerCase() === 'authorization' ? authorization ?? null : null) } }) as unknown as NextRequest;

beforeEach(() => {
  vi.stubEnv('NEWSLETTER_TOKEN_SECRET', 'test-newsletter-secret');
  vi.stubEnv('CRON_SECRET', 'test-cron-secret');
  vi.stubEnv('NEXT_PUBLIC_BASE_URL', 'https://example.test');
});
afterEach(() => vi.unstubAllEnvs());

describe('Newsletter signed links', () => {
  test('a genuine token verifies, regardless of email case', () => {
    const token = signNewsletterToken('confirm', 'Jane.Doe@Example.com');
    expect(verifyNewsletterToken('confirm', 'jane.doe@example.com', token)).toBe(true);
  });

  test('a confirm token cannot be used to unsubscribe', () => {
    const token = signNewsletterToken('confirm', 'a@b.com');
    expect(verifyNewsletterToken('unsubscribe', 'a@b.com', token)).toBe(false);
  });

  test("a token for one address doesn't work for another", () => {
    const token = signNewsletterToken('unsubscribe', 'a@b.com');
    expect(verifyNewsletterToken('unsubscribe', 'c@d.com', token)).toBe(false);
  });

  test('malformed tokens are rejected without throwing', () => {
    expect(verifyNewsletterToken('confirm', 'a@b.com', 'zz')).toBe(false);
    expect(verifyNewsletterToken('confirm', 'a@b.com', '')).toBe(false);
  });

  test('changing the secret invalidates old links', () => {
    const token = signNewsletterToken('unsubscribe', 'a@b.com');
    vi.stubEnv('NEWSLETTER_TOKEN_SECRET', 'rotated');
    expect(verifyNewsletterToken('unsubscribe', 'a@b.com', token)).toBe(false);
  });

  test('unsubscribe URL uses the site URL and carries email + token', () => {
    const url = new URL(unsubscribeUrl('a+b@c.com'));
    expect(url.origin).toBe('https://example.test');
    expect(url.searchParams.get('email')).toBe('a+b@c.com');
    expect(verifyNewsletterToken('unsubscribe', 'a+b@c.com', url.searchParams.get('token')!)).toBe(true);
  });
});

describe('Cron authentication', () => {
  test('accepts the Vercel bearer header', () => {
    expect(isAuthorizedCron(req('Bearer test-cron-secret'))).toBe(true);
  });

  test('rejects wrong, missing or legacy headers', () => {
    expect(isAuthorizedCron(req('Bearer wrong'))).toBe(false);
    expect(isAuthorizedCron(req())).toBe(false);
    expect(isAuthorizedCron(req('test-cron-secret'))).toBe(false);
  });

  test('fails closed when CRON_SECRET is unset', () => {
    vi.stubEnv('CRON_SECRET', '');
    expect(isAuthorizedCron(req('Bearer '))).toBe(false);
    expect(isAuthorizedCron(req('Bearer undefined'))).toBe(false);
  });
});

describe('HTML sanitiser', () => {
  test('removes scripts and disallowed tags, keeps allowed ones', () => {
    expect(sanitizeHtml('<p>Hi <script>alert(1)</script><b>x</b></p>')).toBe('<p>Hi x</p>');
  });

  test('removes javascript: links and event handlers', () => {
    expect(sanitizeHtml('<a href="javascript:alert(1)" onclick="x()">link</a>')).toBe('<a>link</a>');
    expect(sanitizeHtml('<img src=x onerror=alert(1)>text')).toBe('text');
  });

  test('keeps safe https links', () => {
    expect(sanitizeHtml('<a href="https://ok.com" target="_blank">ok</a>')).toBe(
      '<a href="https://ok.com" target="_blank">ok</a>'
    );
  });
});

describe('DB error redaction', () => {
  test('never includes query text or parameters', () => {
    const drizzleError = Object.assign(
      new Error('Failed query: insert into "users" ...\nparams: user_1,secret@example.com,$2a$12$hash'),
      { cause: { code: '23505' } }
    );
    const summary = safeError(drizzleError);
    expect(summary).toEqual({ name: 'Error', code: '23505', message: 'Failed query' });
    expect(JSON.stringify(summary)).not.toMatch(/secret@example\.com|\$2a\$/);
  });
});

describe('Email validation', () => {
  test('accepts and lower-cases a normal address', () => {
    expect(emailSchema.parse({ email: 'Jane@Example.com' }).email).toBe('jane@example.com');
  });

  test('rejects invalid and disposable addresses', () => {
    expect(emailSchema.safeParse({ email: 'not-an-email' }).success).toBe(false);
    expect(emailSchema.safeParse({ email: 'x@mailinator.com' }).success).toBe(false);
  });
});
