// middleware.js
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Get the pathname and token
    const { pathname } = req.nextUrl;
    const token = req.nextauth?.token;
    
    // Check if it's an admin route but not the login page
    const isAdminRoute = pathname.startsWith("/admin");
    const isLoginPage = pathname === "/admin/login";
    
    // If trying to access admin route (except login) but not an admin
    if (isAdminRoute && !isLoginPage && (!token || token?.role !== "ADMIN")) {
      const url = new URL("/admin/login", req.url);
      return NextResponse.redirect(url);
    }
    
    // If trying to access login page but already authenticated as admin, redirect to admin dashboard
    if (isLoginPage && token?.role === "ADMIN") {
      const url = new URL("/admin", req.url);
      return NextResponse.redirect(url);
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page without authentication
        if (req.nextUrl.pathname === "/admin/login") {
          return true;
        }
        
        // For other admin routes, require authentication
        return !!token;
      },
    },
  }
);

// Specify routes that should be protected
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};