import { getAdminAuth } from '@/lib/firebase-admin';
import User from '@/server/models/User';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ 
        success: false, 
        error: 'Login requires a Firebase ID Token. Please sign in on the client first.' 
      }, { status: 400 });
    }

    // Verify the Firebase ID Token
    const auth = getAdminAuth();
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Get or Create user in Firestore
    const user = await User.upsertFromAuth(uid, {
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.email?.split('@')[0] || 'Athlete'
    });

    if (!user) {
      return NextResponse.json({ success: false, error: 'Database Synchronization Failed' }, { status: 500 });
    }

    // Create our app-specific JWT (maintaining compatibility)
    const token = jwt.sign({ id: uid }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    const response = NextResponse.json({
      success: true,
      data: {
        _id: uid,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });

    // Set session cookie
    response.cookies.set('theesma_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 401 });
  }
}
