import dbConnect from '@/lib/mongodb';
import Order from '@/server/models/Order';
import { NextResponse } from 'next/server';

export async function PATCH(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { status } = await request.json();

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    order.status = status;
    if (status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }
    
    await order.save();

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
