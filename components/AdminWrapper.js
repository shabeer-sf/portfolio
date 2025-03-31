'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// This component wraps admin pages to handle authentication client-side
// to prevent hydration errors
export default function AdminWrapper({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  
  // Don't apply checks on login page
  if (pathname === '/admin/login') {
    return children;
  }

  // Show loading state while checking session
  if (status === 'loading') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#1c1c1c]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (status === 'unauthenticated') {
    router.push('/admin/login');
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#1c1c1c]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          <p className="text-slate-400">Redirecting to login...</p>
        </div>
      </div>
    );
  }
  
  // Check if user is admin
  if (session?.user?.role !== 'ADMIN') {
    router.push('/admin/login');
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#1c1c1c]">
        <div className="flex flex-col items-center gap-4">
          <p className="text-red-400">Access denied. Admin privileges required.</p>
        </div>
      </div>
    );
  }
  
  // If authenticated and admin, render the children
  return children;
}