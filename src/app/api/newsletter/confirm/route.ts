import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { newsletter_signups } from "@/lib/db/schema";
import { verifyNewsletterToken, siteUrl } from "@/lib/newsletter/security";
import { safeError } from "@/lib/safe-error";

export const dynamic = "force-dynamic";

function go(path: string) {
  return NextResponse.redirect(`${siteUrl()}${path}`, 303);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (!email || !token || !verifyNewsletterToken("confirm", email, token)) {
      return go("/newsletter/invalid");
    }

    const subscriber = await db
      .select()
      .from(newsletter_signups)
      .where(eq(newsletter_signups.email, email))
      .limit(1)
      .then((rows) => rows[0]);

    if (!subscriber) {
      return go("/newsletter/invalid");
    }

    await db
      .update(newsletter_signups)
      .set({ status: "active", confirmed_at: new Date() })
      .where(eq(newsletter_signups.email, email));

    return go("/newsletter/subscribed");
  } catch (err) {
    console.error("Email confirmation error:", safeError(err));
    return go("/newsletter/invalid");
  }
}
