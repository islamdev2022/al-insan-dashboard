import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/dashboard/:path*']
};

export default async function middleware(request: NextRequest) {
  // Check for HttpOnly cookie (this should work)
  const token = request.cookies.get('token')?.value;
  
  if (!token) {
    console.log('🚫 No token in cookies — redirecting to /auth');
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  console.log('✅ Token found in cookies, allowing access');
  return NextResponse.next();
}