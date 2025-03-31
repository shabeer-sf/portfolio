// app/admin/layout.jsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Mail,
  Briefcase,
  FolderKanban,
  UserCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { signOut } from "next-auth/react";
import AdminWrapper from "@/components/AdminWrapper";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // If not authenticated and not on login page, show loading
  if (status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#1c1c1c]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Only render sidebar if we're not on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      title: "Messages",
      icon: Mail,
      href: "/admin/messages",
      active: pathname === "/admin/messages",
    },
    {
      title: "Projects",
      icon: FolderKanban,
      href: "/admin/projects",
      active: pathname === "/admin/projects",
    },
    {
      title: "Experience",
      icon: Briefcase,
      href: "/admin/experience",
      active: pathname === "/admin/experience",
    },
    {
      title: "Profile",
      icon: UserCircle,
      href: "/admin/profile",
      active: pathname === "/admin/profile",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/admin/settings",
      active: pathname === "/admin/settings",
    },
  ];

  return (
    <div className="flex h-screen bg-[#121212]">
      {/* Sidebar */}
      <div className="w-64 bg-[#1c1c1c] border-r border-slate-800 h-full flex flex-col">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="text-white font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Shabeer<span className="text-blue-400">Admin</span>
            </div>
          </Link>
        </div>

        <Separator className="bg-slate-800" />

        <div className="flex-1 overflow-auto py-4 px-3">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <item.icon size={18} />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-white">
              {session?.user?.name?.charAt(0) || "A"}
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {session?.user?.name || "Admin"}
              </p>
              <p className="text-xs text-slate-400">
                {session?.user?.email || "admin@example.com"}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full text-slate-400 border-slate-700 hover:text-white hover:bg-slate-800"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="h-full">{children}</main>
      </div>
    </div>
  );
}
