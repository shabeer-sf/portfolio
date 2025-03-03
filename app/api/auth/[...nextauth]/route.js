// app/api/auth/[...nextauth]/route.js
import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

console.log("Auth API route is loaded");

// Create handler directly here for debugging
const handler = NextAuth(authOptions);

export const GET = async (req) => {
  console.log("NextAuth GET request received:", req.url);
  return handler(req);
}

export const POST = async (req) => {
  console.log("NextAuth POST request received:", req.url);
  return handler(req);
}