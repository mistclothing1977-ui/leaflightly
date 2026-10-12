import { NextRequest, NextResponse } from 'next/server';
import { mockDatabase } from '@/lib/mockDatabase';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('sessionToken')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Extract userId from token
    const userId = sessionToken.split('_')[1];

    const orders = mockDatabase.getOrdersByUserId(userId);

    return NextResponse.json(
      {
        orders: orders.map((order) => ({
          id: order.id,
          orderNumber: order.orderNumber,
          items: order.items,
          subtotal: order.subtotal.toString(),
          tax: order.tax.toString(),
          shipping: order.shipping.toString(),
          total: order.total.toString(),
          shippingAddress: order.shippingAddress,
          status: order.status,
          createdAt: order.createdAt.toISOString(),
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { message: 'An error occurred' },
      { status: 500 }
    );
  }
}
