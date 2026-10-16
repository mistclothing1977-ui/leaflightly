import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/lib/db/client";
import { admin_users } from "@/lib/db/schema";
import { ApiResponse } from "./handler";

// Admin routes: the signed-in NextAuth user must have an active admin_users row.
export async function withAuth(
  req: NextRequest,
  handler: (req: NextRequest, userId: string) => Promise<NextResponse>
): Promise<NextResponse> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Please sign in", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  const admin = await db
    .select({ id: admin_users.id })
    .from(admin_users)
    .where(and(eq(admin_users.user_id, userId), eq(admin_users.active, true)))
    .limit(1)
    .then((rows) => rows[0]);

  if (!admin) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Not authorised", code: "FORBIDDEN" },
      { status: 403 }
    );
  }

  return handler(req, userId);
}

export function withSecurityHeaders(response: NextResponse): NextResponse {
  // Prevent clickjacking
  response.headers.set("X-Frame-Options", "DENY");

  // Prevent MIME sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Enable XSS protection
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Referrer policy
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions policy
  response.headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=(), payment=()"
  );

  return response;
}

export function withCORS(
  response: NextResponse,
  allowedOrigins: string[] = []
): NextResponse {
  const origin = allowedOrigins[0] || "*";

  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Max-Age", "86400");

  return response;
}
