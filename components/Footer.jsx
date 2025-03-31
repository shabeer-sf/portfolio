"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, ArrowUp, Github, Linkedin, Instagram, Mail } from "lucide-react";

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
        { name: "Email", href: "mailto:shabeersggs@gmail.com", icon: Mail },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/mohammed-shabeer-1a4869221", icon: Linkedin },
        { name: "Instagram", href: "https://instagram.com/", icon: Instagram },
        { name: "GitHub", href: "https://github.com/", icon: Github },
      ],
    },
  ];

  return (
    <footer className="relative pt-16 pb-8 border-t border-slate-800 bg-gradient-to-b from-black to-[#1a1a1a]">
      {/* Background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex flex-col space-y-2">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Shabeer
              </h2>
              <p className="text-sm text-slate-400 max-w-xs">
                Full Stack & React Native Developer crafting seamless digital experiences for web and mobile platforms.
              </p>
            </div>

            <Button
              onClick={scrollToTop}
              size="sm"
              className="bg-[#1a1a1a] hover:bg-slate-800 text-white border border-gray-800 shadow-md"
            >
              <ArrowUp size={16} className="mr-2" />
              Back to top
            </Button>
          </motion.div>

          {/* Links columns */}
          {footerLinks.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * groupIndex }}
            >
              <h3 className="font-medium text-white mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                      target={link.href.startsWith("http") || link.href.startsWith("mailto") ? "_blank" : undefined}
                    >
                      {link.icon && <link.icon size={16} />}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <Separator className="bg-slate-800 mb-8" />

        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm text-slate-500"
          >
            © {currentYear} Shabeer.. All rights reserved.
          </motion.p>

        
        </div>
      </div>
    </footer>
  );
};

export default Footer;