import dbConnect from '@/lib/mongodb';
import Order from '@/server/models/Order';
import Product from '@/server/models/Product';
import User from '@/server/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();

    // In a real app, we'd add admin auth middleware check here
    
    const [orders, products, users] = await Promise.all([
      Order.find({}),
      Product.find({}),
      User.find({ role: 'user' })
    ]);

    const totalRevenue = orders.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0);
    const activeOrders = orders.filter(order => order.status !== 'Delivered' && order.status !== 'Cancelled').length;
    
    // Mock growth labels for the UI
    const stats = [
      {
        label: 'Total Revenue',
        value: `₹${totalRevenue.toLocaleString()}`,
        change: '+12.5%',
        isPositive: true,
        type: 'currency'
      },
      {
        label: 'Active Orders',
        value: activeOrders,
        change: '+3 this hour',
        isPositive: true,
        type: 'number'
      },
      {
        label: 'Squad Size',
        value: users.length,
        change: '+14% growth',
        isPositive: true,
        type: 'number'
      },
      {
        label: 'Inventory Units',
        value: products.length,
        change: '2 items low stock',
        isPositive: false,
        type: 'number'
      }
    ];

    return NextResponse.json({ success: true, stats, recentOrders: orders.slice(0, 5) });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
