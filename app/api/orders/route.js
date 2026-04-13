import Order from '@/server/models/Order';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      orderItems, 
      shippingAddress, 
      paymentMethod, 
      itemsPrice, 
      shippingPrice, 
      totalPrice,
      paymentResult
    } = body;

    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json({ success: false, error: 'No order items' }, { status: 400 });
    }

    // Auth verification
    const cookie = request.cookies.get('theesma_token');
    if (!cookie) {
      return NextResponse.json({ 
        success: false, 
        error: 'Authentication Required: Please sign in to complete your acquisition.' 
      }, { status: 401 });
    }

    const decoded = jwt.verify(cookie.value, process.env.JWT_SECRET);
    
    const order = await Order.create({
      user: decoded.id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      paymentResult,
      isPaid: !!paymentResult,
      paidAt: paymentResult ? new Date().toISOString() : null,
      status: paymentResult ? 'Processing' : 'Pending',
    });

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const cookie = request.cookies.get('theesma_token');
    if (!cookie) {
      return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 401 });
    }

    const decoded = jwt.verify(cookie.value, process.env.JWT_SECRET);
    
    // Check if user is admin
    const User = (await import('@/server/models/User')).default;
    const user = await User.findById(decoded.id);
    
    let orders;
    if (user && user.role === 'admin') {
      // Admin sees ALL orders
      orders = await Order.find({});
    } else {
      // Standard user sees only their orders
      orders = await Order.find({ user: decoded.id });
    }

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
