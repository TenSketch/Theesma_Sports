import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully'
  });

  // Clear the session cookie
  response.cookies.set('theesma_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0), // Set to historical date to expire immediately
    path: '/',
  });

  return response;
}
