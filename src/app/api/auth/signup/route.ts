import { NextRequest, NextResponse } from 'next/server';
import { mockDatabase } from '@/lib/mockDatabase';
import { createSessionToken } from '@/db/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Create user
    const user = mockDatabase.createUser(email, password, firstName, lastName);

    // Create session
    const sessionToken = createSessionToken(user.id);

    // Set session cookie
    const response = NextResponse.json(
      {
        message: 'Account created successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      { status: 201 }
    );

    response.cookies.set('sessionToken', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json(
      { message },
      { status: error instanceof Error && error.message.includes('already exists') ? 409 : 500 }
    );
  }
}
