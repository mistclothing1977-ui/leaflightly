import { NextRequest, NextResponse } from "next/server";
import { ZodError, z } from "zod";
import { verifySupabaseToken } from "@/lib/auth";

export type ApiHandler<T = void> = (
  req: NextRequest,
  context?: { params: Record<string, string> }
) => Promise<NextResponse<ApiResponse<T>>>;

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

export class ApiError extends Error {
  constructor(
    public statusCode: number = 500,
    public code: string = "INTERNAL_ERROR",
    message: string = "Internal server error"
  ) {
    super(message);
  }
}

export async function withAuth(
  req: NextRequest,
  handler: (req: NextRequest, userId: string) => Promise<NextResponse>
) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Missing authorization header", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  const token = authHeader.slice(7);
  const payload = await verifySupabaseToken(token);

  if (!payload?.sub) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Invalid token", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  return handler(req, payload.sub as string);
}

export async function withValidation<T>(
  req: NextRequest,
  schema: z.ZodSchema,
  handler: (req: NextRequest, data: T) => Promise<NextResponse>
) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    return handler(req, data);
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Validation failed",
          code: "VALIDATION_ERROR",
        },
        { status: 400 }
      );
    }
    throw err;
  }
}

export async function withErrorHandling(
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    return await handler();
  } catch (err) {
    console.error("API error:", err);

    if (err instanceof ApiError) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: err.message,
          code: err.code,
        },
        { status: err.statusCode }
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}

export function successResponse<T>(data: T, statusCode: number = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json<ApiResponse<T>>(
    { success: true, data },
    { status: statusCode }
  );
}

export function errorResponse(
  error: string,
  code: string = "ERROR",
  statusCode: number = 400
): NextResponse<ApiResponse> {
  return NextResponse.json<ApiResponse>(
    { success: false, error, code },
    { status: statusCode }
  );
}
