import { NextRequest, NextResponse } from 'next/server';
import { mockDatabase } from '@/lib/mockDatabase';
import { generateOrderNumber } from '@/db/auth';

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('sessionToken')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const userId = sessionToken.split('_')[1];
    const body = await request.json();
    const { items, subtotal, tax, shipping, total, shippingAddress } = body;

    if (!items || !subtotal || !shippingAddress) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const order = mockDatabase.createOrder({
      userId,
      orderNumber: generateOrderNumber(),
      items,
      subtotal,
      tax,
      shipping,
      total,
      shippingAddress,
      status: 'confirmed',
    });

    return NextResponse.json(
      {
        message: 'Order created successfully',
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { message: 'An error occurred while creating the order' },
      { status: 500 }
    );
  }
}
