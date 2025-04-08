"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Instagram, Github, Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Navigation links
  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Services", href: "#what-i-do" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a nav link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full py-3 px-4 sm:px-6 md:px-10 flex justify-between items-center fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50"
            : "bg-transparent sm:py-5"
        }`}
      >
        {/* Logo/Brand */}
        <Link href="#hero" className="flex items-center z-10">
          <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Shabeer
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-3 lg:px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        {/* Contact & Social Icons - Desktop */}
        <div className="hidden md:flex items-center">
          <div className="hidden lg:flex items-center space-x-3 mr-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="mailto:mohammedshabeer2520@gmail.com"
                    target="_blank"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    <Mail size={18} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Email Me</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="https://www.linkedin.com/in/mohammed-shabeer-1a4869221"
                    target="_blank"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    <Linkedin size={18} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>LinkedIn</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="https://github.com/"
                    target="_blank"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    <Github size={18} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>GitHub</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="https://instagram.com/"
                    target="_blank"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    <Instagram size={18} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Instagram</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none rounded-full px-3 lg:px-5 py-2 text-sm"
            onClick={() => window.location.href = 'mailto:mohammedshabeer2520@gmail.com'}
          >
            <Mail size={14} className="mr-2 flex-shrink-0" />
            <span>Contact Me</span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white z-10 p-1"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-full h-screen bg-slate-900/95 backdrop-blur-md z-40 md:hidden overflow-auto"
          >
            <div className="flex flex-col h-full p-6 sm:p-8 pt-24">
              <div className="space-y-5">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className="flex items-center py-2 text-lg sm:text-xl text-slate-200 hover:text-white"
                    >
                      <ChevronRight size={16} className="mr-2 text-blue-400" />
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-10">
                <p className="text-slate-400 text-sm mb-4">Connect with me:</p>
                <div className="grid grid-cols-4 gap-3 mb-8">
                  <Link
                    href="mailto:mohammedshabeer2520@gmail.com"
                    className="flex items-center justify-center h-12 bg-slate-800/80 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/80 transition-colors"
                  >
                    <Mail size={20} />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/mohammed-shabeer-1a4869221"
                    className="flex items-center justify-center h-12 bg-slate-800/80 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/80 transition-colors"
                  >
                    <Linkedin size={20} />
                  </Link>
                  <Link
                    href="https://github.com/"
                    className="flex items-center justify-center h-12 bg-slate-800/80 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/80 transition-colors"
                  >
                    <Github size={20} />
                  </Link>
                  <Link
                    href="https://instagram.com/"
                    className="flex items-center justify-center h-12 bg-slate-800/80 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/80 transition-colors"
                  >
                    <Instagram size={20} />
                  </Link>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none rounded-lg py-6" 
                  onClick={() => {
                    window.location.href = 'mailto:mohammedshabeer2520@gmail.com';
                    setMobileMenuOpen(false);
                  }}
                >
                  <Mail size={16} className="mr-2" />
                  Contact Me
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;