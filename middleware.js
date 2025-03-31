// middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for non-admin routes and api routes
  if (!pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  
  // Skip middleware for login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Get the user token
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  // Check if the user is authenticated and has admin role
  const isAuthenticated = !!token;
  const isAdmin = token?.role === "ADMIN";

  // If not authenticated or not an admin, redirect to login
  if (!isAuthenticated || !isAdmin) {
    const url = new URL('/admin/login', request.url);
    return NextResponse.redirect(url);
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};