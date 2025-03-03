import React from "react";
import Link from "next/link";
import { Mail, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 flex justify-between items-center border-b border-slate-800 bg-black/60 backdrop-blur-sm sticky top-0 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={"mailto:shabeersggs@gmail.com"}
              target="_blank"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="text-slate-400 rounded-full bg-[#1a1a1a] p-3 shadow-sm">
                <Mail size={18} strokeWidth={2} />
              </div>
              <p className="text-slate-400 font-medium max-md:hidden">
                shabeersggs@gmail.com
              </p>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Send me an email</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white hover:bg-slate-800"
                asChild
              >
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/in/mohammed-shabeer-1a4869221"
                >
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>LinkedIn Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator orientation="vertical" className="h-6 bg-slate-700" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white hover:bg-slate-800"
                asChild
              >
                <Link target="_blank" href="https://instagram.com/">
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Instagram Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default Navbar;