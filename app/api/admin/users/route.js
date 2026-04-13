import User from '@/server/models/User';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    // Admin Auth verification
    const cookie = request.cookies.get('theesma_token');
    if (!cookie) {
      return NextResponse.json({ success: false, error: 'Unauthorized credentials' }, { status: 401 });
    }

    const decoded = jwt.verify(cookie.value, process.env.JWT_SECRET);
    const requester = await User.findById(decoded.id);

    if (!requester || requester.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Administrative clearance required' }, { status: 403 });
    }

    // Fetch all members
    const users = await User.find({});
    
    // In a real app, we would join with orders to get valuation, 
    // but here we'll return the base user data.
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
