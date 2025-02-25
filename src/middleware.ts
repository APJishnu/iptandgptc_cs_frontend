import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const adminRoutes = req.nextUrl.pathname.startsWith('/admin') && req.nextUrl.pathname !== '/admin-auth';
  const token = req.cookies.get('admin_token'); // Adjust based on your authentication method

  if (adminRoutes && !token) {
    return NextResponse.redirect(new URL('/admin-auth', req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Apply middleware only to /admin and its subroutes except /admin/login
};
