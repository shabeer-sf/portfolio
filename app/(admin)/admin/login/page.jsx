"use client"; // ✅ Add this at the top

import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginFormWithSearchParams from "./_components/LoginFormWithSearchParams"; // Ensure this is correct

function LoginFormSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="h-5 w-16 bg-slate-800 rounded animate-pulse"></div>
        <div className="h-10 w-full bg-slate-800 rounded animate-pulse"></div>
      </div>
      <div className="space-y-2">
        <div className="h-5 w-20 bg-slate-800 rounded animate-pulse"></div>
        <div className="h-10 w-full bg-slate-800 rounded animate-pulse"></div>
      </div>
      <div className="h-10 w-full bg-gradient-to-r from-blue-600/40 to-purple-600/40 rounded animate-pulse"></div>
    </div>
  );
}

// ✅ Mark entire page as client-side
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] px-4">
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl -z-10" />

      <Card className="w-full max-w-md bg-[#1c1c1c] border-slate-800 shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Admin Login
          </CardTitle>
          <CardDescription className="text-slate-400">
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<LoginFormSkeleton />}>
            <LoginFormWithSearchParams />
          </Suspense>
        </CardContent>
        <CardFooter className="border-t border-slate-800 pt-4 text-xs text-slate-500 text-center">
          Authorized personnel only. This area is protected and monitored.
        </CardFooter>
      </Card>
    </div>
  );
}
