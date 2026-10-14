import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/client';
import { newsletter_signups } from '@/lib/db/schema';
import { verifyNewsletterToken } from '@/lib/newsletter/security';
import { safeError } from '@/lib/safe-error';

export const dynamic = 'force-dynamic';

function page(title: string, message: string, status: number) {
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} — Leaf Lightly</title></head>
<body style="font-family:-apple-system,Segoe UI,Inter,sans-serif;background:#F8F6F3;color:#2A2A26;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;padding:16px">
<main style="max-width:440px;text-align:center"><h1 style="color:#1a472a;font-size:1.5rem">${title}</h1><p>${message}</p>
<p><a href="/" style="color:#1a472a;font-weight:600">Back to Leaf Lightly</a></p></main></body></html>`;
  return new NextResponse(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

async function unsubscribe(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');
  const token = req.nextUrl.searchParams.get('token');

  if (!email || !token || !verifyNewsletterToken('unsubscribe', email, token)) {
    return page('Link not valid', 'This unsubscribe link is invalid or incomplete. Please use the link from your most recent email.', 400);
  }

  try {
    await db
      .update(newsletter_signups)
      .set({ status: 'unsubscribed', unsubscribed_at: new Date() })
      .where(eq(newsletter_signups.email, email));
  } catch (err) {
    console.error('Newsletter unsubscribe error:', safeError(err));
    return page('Something went wrong', 'We could not process your request. Please try again shortly.', 500);
  }

  // Same response whether or not the address was on the list, so the link can't be used to probe membership.
  return page("You're unsubscribed", "You won't receive any more newsletters from Leaf Lightly.", 200);
}

// GET: link in the email footer. POST: RFC 8058 one-click (List-Unsubscribe-Post) used by Gmail/Yahoo.
export const GET = unsubscribe;
export const POST = unsubscribe;
