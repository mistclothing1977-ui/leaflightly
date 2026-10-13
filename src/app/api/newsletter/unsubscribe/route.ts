import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { newsletterSubscribers } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * GET /api/newsletter/unsubscribe?email=user@example.com
 *
 * Unsubscribes an email from the newsletter.
 * Can be used in email links or standalone.
 */
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Find and unsubscribe
    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email))
      .limit(1);

    if (existing.length === 0) {
      // Email not in list, still return 200 (don't leak if email exists)
      return NextResponse.json(
        { message: 'Unsubscribe processed' },
        { status: 200 }
      );
    }

    await db
      .update(newsletterSubscribers)
      .set({
        status: 'unsubscribed',
        unsubscribedAt: new Date(),
      })
      .where(eq(newsletterSubscribers.email, email));

    // Return HTML page for browser
    return new NextResponse(
      `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Unsubscribe Successful</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #1a472a 0%, #2d6d42 100%);
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 12px;
      text-align: center;
      max-width: 500px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }
    h1 {
      color: #1a472a;
      margin: 0 0 10px 0;
      font-size: 24px;
    }
    p {
      color: #666;
      margin: 10px 0 20px 0;
      line-height: 1.6;
    }
    .email {
      background: #f5f5f5;
      padding: 10px;
      border-radius: 6px;
      font-weight: 600;
      word-break: break-all;
      margin: 15px 0;
    }
    .button {
      display: inline-block;
      background: #1a472a;
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      margin-top: 20px;
      font-weight: 600;
    }
    .button:hover {
      background: #FF6B35;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>✓ Unsubscribed</h1>
    <p>You've been unsubscribed from Leaf Lightly's newsletter.</p>
    <div class="email">${email}</div>
    <p>You won't receive any more newsletters from us. If you change your mind, you can resubscribe anytime.</p>
    <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://leaflightly.com'}" class="button">
      Return to Leaf Lightly
    </a>
  </div>
</body>
</html>
      `,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      }
    );
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process unsubscribe',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
