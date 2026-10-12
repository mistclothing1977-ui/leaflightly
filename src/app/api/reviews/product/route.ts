import { NextRequest, NextResponse } from 'next/server';
import { mockDatabase } from '@/lib/mockDatabase';

export async function GET(request: NextRequest) {
  try {
    const productId = request.nextUrl.searchParams.get('productId');

    if (!productId) {
      return NextResponse.json(
        { message: 'Product ID is required' },
        { status: 400 }
      );
    }

    const reviews = mockDatabase.getReviewsForProduct(productId);
    const averageRating = mockDatabase.getAverageRating(productId);

    return NextResponse.json(
      {
        reviews: reviews.map((review) => ({
          id: review.id,
          productId: review.productId,
          userName: review.userName,
          rating: review.rating,
          title: review.title,
          text: review.text,
          helpful: review.helpful,
          createdAt: review.createdAt.toISOString(),
        })),
        averageRating,
        totalReviews: reviews.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get reviews error:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching reviews' },
      { status: 500 }
    );
  }
}
