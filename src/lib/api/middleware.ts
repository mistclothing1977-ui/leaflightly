import { NextRequest, NextResponse } from "next/server";
import { verifySupabaseToken } from "@/lib/auth";
import { ApiResponse } from "./handler";

export async function withAuth(
  req: NextRequest,
  handler: (req: NextRequest, userId: string) => Promise<NextResponse>
): Promise<NextResponse> {
  const authHeader = req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Missing or invalid authorization header", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  const token = authHeader.slice(7);
  const payload = await verifySupabaseToken(token);

  if (!payload?.sub) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Invalid or expired token", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  return handler(req, payload.sub as string);
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
