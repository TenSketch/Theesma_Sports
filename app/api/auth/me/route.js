import User from '@/server/models/User';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    const cookie = request.cookies.get('theesma_token');
    if (!cookie) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = jwt.verify(cookie.value, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Remove sensitive info if present
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({ success: true, data: userWithoutPassword });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Session expired' }, { status: 401 });
  }
}
