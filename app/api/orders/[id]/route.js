import Order from '@/server/models/Order';
import { NextResponse } from 'next/server';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    const updateData = { status };
    if (status === 'Delivered') {
      updateData.isDelivered = true;
      updateData.deliveredAt = new Date().toISOString();
    }
    
    const updatedOrder = await Order.updateById(id, updateData);

    return NextResponse.json({ success: true, data: updatedOrder });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
