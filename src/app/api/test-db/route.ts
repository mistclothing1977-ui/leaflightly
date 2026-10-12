import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // Try to execute a simple query
    const result = await db.select().from({} as any).limit(1);

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database test error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: {
          timestamp: new Date().toISOString(),
          databaseUrl: process.env.DATABASE_URL ? "SET" : "NOT SET",
          nodeEnv: process.env.NODE_ENV,
          vercelEnv: process.env.VERCEL_ENV,
          stack: errorStack?.substring(0, 500),
        },
      },
      { status: 500 }
    );
  }
}
