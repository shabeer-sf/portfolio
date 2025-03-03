"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Briefcase, 
  MessageSquare, 
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Code,
  GanttChartSquare,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const AdminSidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navigationItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
    },
    {
      title: "Projects",
      icon: FolderKanban,
      href: "/admin/projects",
    },
    {
      title: "Experience",
      icon: Briefcase,
      href: "/admin/experience",
    },
    {
      title: "Messages",
      icon: MessageSquare,
      href: "/admin/messages",
      badge: {
        text: "New",
        variant: "red",
      },
    },
    {
      title: "Services",
      icon: GanttChartSquare,
      href: "/admin/services",
    },
    {
      title: "Social Links",
      icon: Users,
      href: "/admin/socials",
    },
    {
      title: "Profile",
      icon: Settings,
      href: "/admin/profile",
    },
  ];

  return (
    <aside
      className={cn(
        "h-screen bg-[#0a0a0a] border-r border-slate-800 flex flex-col transition-all duration-300 sticky top-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo & Toggle */}
      <div className={cn(
        "flex items-center p-4 h-16 border-b border-slate-800",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Code className="h-6 w-6 text-blue-500" />
            <span className="font-bold text-white">Portfolio Admin</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
        <TooltipProvider>
          <ul className="space-y-1 px-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              
              return (
                <li key={item.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors",
                          isActive
                            ? "bg-blue-500/10 text-blue-400"
                            : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                        )}
                      >
                        <item.icon size={20} />
                        {!collapsed && (
                          <span className="font-medium flex-1">{item.title}</span>
                        )}
                        {!collapsed && item.badge && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            item.badge.variant === "red" 
                              ? "bg-red-500/20 text-red-400" 
                              : "bg-slate-700 text-slate-300"
                          }`}>
                            {item.badge.text}
                          </span>
                        )}
                      </Link>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right" className="bg-slate-900 text-slate-200 border-slate-800">
                        <div className="flex items-center gap-1">
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                              item.badge.variant === "red" 
                                ? "bg-red-500/20 text-red-400" 
                                : "bg-slate-700 text-slate-300"
                            }`}>
                              {item.badge.text}
                            </span>
                          )}
                        </div>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </li>
              );
            })}
          </ul>
        </TooltipProvider>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className={cn(
                  "w-full flex items-center gap-3 text-red-400 hover:bg-red-500/10 hover:text-red-400 justify-start",
                  collapsed && "justify-center"
                )}
              >
                <LogOut size={20} />
                {!collapsed && <span>Logout</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right" className="bg-slate-900 text-slate-200 border-slate-800">
                Logout
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

export default AdminSidebar;