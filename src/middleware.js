// middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define which routes you want to protect
const protectedRoutes = ["/dashboard", "/my-courses", "/profile","/admin/dashboard"];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Check if current path is protected
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    // Redirect to login if user is not authenticated
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
