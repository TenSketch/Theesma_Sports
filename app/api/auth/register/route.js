import User from '@/server/models/User';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ success: false, error: 'User already exists' }, { status: 400 });
    }

    // Create user in Firebase Auth and Firestore
    const user = await User.create({
      name,
      email,
      password,
    });

    // Create token (using Firebase UID as id)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    const response = NextResponse.json({
      success: true,
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });

    // Set cookie
    response.cookies.set('theesma_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
