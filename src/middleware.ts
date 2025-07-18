import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/dashboard/:path*']
};

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    console.log('🚫 No token — redirecting to /auth');
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}