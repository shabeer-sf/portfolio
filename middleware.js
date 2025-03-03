// middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Check if the path starts with /admin (except for login page)
  if (pathname.startsWith("/admin") && !pathname.includes("/admin/login")) {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    // Not signed in or not an admin
    if (!token || token.role !== "ADMIN") {
      const url = new URL("/admin/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(pathname));
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};