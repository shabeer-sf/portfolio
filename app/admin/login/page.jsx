// app/admin/login/page.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#1c1c1c] rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center">Admin Login</h2>
        <p className="text-slate-400 text-center">Authentication is temporarily disabled for debugging</p>
        
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-800/50 border-slate-700 text-white"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-slate-800/50 border-slate-700 text-white"
          />
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
            onClick={() => window.location.href = "/admin/dashboard"}
          >
            Sign In (Debug Mode)
          </Button>
        </div>
      </div>
    </div>
  );
}