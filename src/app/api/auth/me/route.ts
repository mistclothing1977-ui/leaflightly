import { NextRequest, NextResponse } from 'next/server';
import { mockDatabase } from '@/lib/mockDatabase';

// Simple mock session lookup (in production, use JWT or database sessions)
const sessions = new Map<string, { userId: string; createdAt: Date }>();

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('sessionToken')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // For demo purposes, extract userId from token
    // In production, verify JWT or lookup in database
    const userId = sessionToken.split('_')[1];

    const user = mockDatabase.getUserById(userId);

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred' },
      { status: 500 }
    );
  }
}
