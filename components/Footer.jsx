"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, Github, Linkedin, Instagram, Mail, Code, Rocket, ExternalLink } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  // Footer links with grouping
  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Home", href: "#hero" },
        { name: "Services", href: "#what-i-do" },
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Connect",
      links: [
        { name: "Email", href: "mailto:mohammedshabeer2520@gmail.com", icon: Mail },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/mohammed-shabeer-1a4869221", icon: Linkedin },
        { name: "Instagram", href: "https://instagram.com/", icon: Instagram },
        { name: "GitHub", href: "https://github.com/", icon: Github },
      ],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.3,
      },
    },
  };

  return (
    <footer className="relative pt-24 pb-12 border-t border-slate-800/50 bg-gradient-to-b from-slate-900 to-black overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-60 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-full blur-3xl -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute right-1/4 top-1/3 w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
      <div className="absolute left-1/3 bottom-1/4 w-1 h-1 bg-purple-500 rounded-full animate-pulse delay-300" />
      <div className="absolute right-1/3 bottom-1/3 w-1 h-1 bg-emerald-500 rounded-full animate-pulse delay-500" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"
        >
          {/* Brand column with enhanced styling */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <Code size={16} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-200">
                  Shabeer
                </h2>
              </div>
              <p className="text-slate-300 max-w-xs leading-relaxed">
                Full Stack & React Native Developer crafting seamless digital experiences for web and mobile platforms.
              </p>
            </div>

            {/* Social icons with enhanced styling */}
            <div className="flex space-x-3">
              {footerLinks[1].links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target={link.href.startsWith("http") || link.href.startsWith("mailto") ? "_blank" : undefined}
                  className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-300"
                >
                  {link.icon && <link.icon size={18} />}
                </Link>
              ))}
            </div>

            <Button
              onClick={scrollToTop}
              size="sm"
              className="bg-slate-800/80 hover:bg-slate-700 backdrop-blur-sm text-white border border-slate-700/50 rounded-full shadow-lg px-4 py-2 transition-all duration-300 hover:-translate-y-1 group"
            >
              <ArrowUp size={16} className="mr-2 group-hover:-translate-y-1 transition-transform duration-300" />
              Back to top
            </Button>
          </motion.div>

          {/* Links columns with enhanced styling */}
          {footerLinks.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              variants={itemVariants}
              className="md:ml-auto"
            >
              <h3 className="font-medium text-white mb-6 flex items-center">
                <span className="inline-block w-6 h-px bg-gradient-to-r from-blue-500 to-purple-500 mr-2"></span>
                {group.title}
              </h3>
              <ul className="space-y-4">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 group"
                      target={link.href.startsWith("http") || link.href.startsWith("mailto") ? "_blank" : undefined}
                    >
                      {link.icon && <link.icon size={16} className="text-slate-400 group-hover:text-blue-400 transition-colors" />}
                      <span className="relative">
                        {link.name}
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                      {(link.href.startsWith("http") || link.href.startsWith("mailto")) && 
                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      }
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <Separator className="bg-slate-800/50 mb-8" />

        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-slate-400">
            © {currentYear} Shabeer. All rights reserved.
          </p>
          
          {/* <div className="flex items-center gap-2 text-sm text-slate-500">
            <Rocket size={14} className="text-purple-400" />
            <span>Made with modern web technologies</span>
          </div> */}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;