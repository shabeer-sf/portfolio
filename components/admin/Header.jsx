"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Bell, 
  Search, 
  Menu,
  X,
  ExternalLink,
  User,
  LogOut,
  Settings
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AdminHeader = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="h-16 border-b border-slate-800 flex items-center justify-between px-4 bg-[#0a0a0a]">
      {/* Mobile Sidebar Toggle */}
      <div className="flex lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-[#0a0a0a] border-r border-slate-800">
            <div className="h-full">
              {/* Mobile sidebar content here */}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex max-w-md flex-1 mx-4">
        <form onSubmit={handleSearch} className="w-full relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-9 bg-slate-900/50 border-slate-700 text-slate-300 focus-visible:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        {/* View Site Button */}
        <Button
          variant="ghost"
          size="sm"
          className="hidden md:flex items-center gap-1 text-slate-400 hover:text-white"
          asChild
        >
          <Link href="/" target="_blank">
            <span>View Site</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-red-500 text-[10px]">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-[#1c1c1c] border-slate-700">
            <DropdownMenuLabel className="text-slate-300">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            {/* Notification items */}
            <div className="py-2 px-4 text-sm text-slate-400 hover:bg-slate-800 cursor-pointer">
              <div className="flex justify-between items-start">
                <p className="font-medium text-slate-300">New contact message</p>
                <span className="text-xs text-slate-500">2h ago</span>
              </div>
              <p className="mt-1 text-xs line-clamp-2">
                You received a new message from John Doe about a potential project.
              </p>
            </div>
            <DropdownMenuSeparator className="bg-slate-700" />
            <div className="py-2 px-4 text-sm text-slate-400 hover:bg-slate-800 cursor-pointer">
              <div className="flex justify-between items-start">
                <p className="font-medium text-slate-300">Profile updated</p>
                <span className="text-xs text-slate-500">1d ago</span>
              </div>
              <p className="mt-1 text-xs line-clamp-2">
                Your profile information was successfully updated.
              </p>
            </div>
            <DropdownMenuSeparator className="bg-slate-700" />
            <div className="py-2 px-4 text-center">
              <Button variant="ghost" size="sm" className="text-slate-400 text-xs">
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-slate-900">
              <Avatar className="h-8 w-8 border border-slate-700">
                <AvatarFallback className="bg-blue-500/20 text-blue-400 text-sm">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#1c1c1c] border-slate-700">
            <DropdownMenuLabel className="text-slate-300">
              <div className="flex flex-col">
                <span>{user?.name || "Admin"}</span>
                <span className="text-xs font-normal text-slate-500">{user?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-slate-300 focus:bg-slate-800 focus:text-white cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 focus:bg-slate-800 focus:text-white cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem 
              className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;