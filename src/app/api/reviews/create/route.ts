import { NextRequest, NextResponse } from 'next/server';
import { mockDatabase } from '@/lib/mockDatabase';

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('sessionToken')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { message: 'You must be logged in to leave a review' },
        { status: 401 }
      );
    }

    const userId = sessionToken.split('_')[1];
    const user = mockDatabase.getUserById(userId);

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId, rating, title, text } = body;

    if (!productId || !rating || !title || !text) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    if (title.length < 5 || text.length < 10) {
      return NextResponse.json(
        { message: 'Title must be at least 5 characters, text at least 10' },
        { status: 400 }
      );
    }

    // Check if user already reviewed this product
    if (mockDatabase.hasUserReviewedProduct(productId, userId)) {
      return NextResponse.json(
        { message: 'You have already reviewed this product' },
        { status: 409 }
      );
    }

    const review = mockDatabase.createReview(
      productId,
      userId,
      `${user.firstName} ${user.lastName}`,
      rating,
      title,
      text
    );

    return NextResponse.json(
      {
        message: 'Review created successfully',
        review: {
          id: review.id,
          productId: review.productId,
          userName: review.userName,
          rating: review.rating,
          title: review.title,
          text: review.text,
          createdAt: review.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create review error:', error);
    return NextResponse.json(
      { message: 'An error occurred while creating the review' },
      { status: 500 }
    );
  }
}
