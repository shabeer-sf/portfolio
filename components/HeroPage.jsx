"use client"
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Download, ChevronDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ImageSlider from "./ImageSlider";
import Link from "next/link";

const HeroPage = () => {
  return (
    <section id="hero" className="relative pt-20 sm:pt-24 md:pt-32 pb-16 flex flex-col items-center justify-center min-h-[100svh] space-y-6 sm:space-y-8 px-4 sm:px-6">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-slate-900/90 -z-10" />
      
      {/* Responsive glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-blue-600/10 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-purple-600/10 rounded-full blur-3xl opacity-20 -z-10" />
      
      {/* Profile image with optimized responsive sizing */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mt-10 sm:mt-0"
      >
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 p-1">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 animate-pulse opacity-70" />
          <div className="relative w-full h-full overflow-hidden rounded-full border-2 border-slate-800/50 backdrop-blur-sm">
            <Image
              className="rounded-full object-cover"
              src={"https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"}
              alt="Shabeer's profile"
              fill
              priority
            />
          </div>
        </div>
      </motion.div>
      
      {/* Responsive introduction text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-3 sm:space-y-4 text-center max-w-[90%] mx-auto"
      >
        <Badge variant="outline" className="bg-slate-900/50 backdrop-blur-sm text-slate-200 border-slate-700 px-4 sm:px-5 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-full">
          Hi, I'm Shabeer 👋
        </Badge>
        
        <div className="space-y-1 sm:space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-200 tracking-tight">
            Web Developer
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight">
            React Native Expert
          </h2>
        </div>
        
        <p className="text-slate-300 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto text-center mt-2 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed">
          Building beautiful, responsive, and high-performance applications for web and mobile platforms.
        </p>
        
        {/* Social links */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-full text-slate-400 hover:text-white hover:border-slate-600 transition-all duration-300 group"
          >
            <Github size={20} className="group-hover:text-white transition-colors duration-300" />
          </motion.a>
          
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-full text-slate-400 hover:text-blue-400 hover:border-blue-400/50 transition-all duration-300 group"
          >
            <Linkedin size={20} className="group-hover:text-blue-400 transition-colors duration-300" />
          </motion.a>
          
          <motion.a
            href="mailto:shabeermen@gmail.com"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-full text-slate-400 hover:text-purple-400 hover:border-purple-400/50 transition-all duration-300 group"
          >
            <Mail size={20} className="group-hover:text-purple-400 transition-colors duration-300" />
          </motion.a>
        </div>
      </motion.div>
      
      {/* Responsive buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full px-4"
      >
        <Button 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg px-4 sm:px-6 py-5 sm:py-6 text-sm sm:text-base rounded-lg w-full sm:w-auto group"
        >
          <Download size={16} className="mr-2 flex-shrink-0 group-hover:animate-bounce" />
          <span>Download Resume</span>
        </Button>
        
        <Button 
          variant="outline"
          className="bg-slate-900/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800 text-white px-4 sm:px-6 py-5 sm:py-6 text-sm sm:text-base rounded-lg w-full sm:w-auto group"
          onClick={() => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
              projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          View Projects
          <ExternalLink size={16} className="ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </motion.div>
      
      {/* Responsive image slider container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mt-4 sm:mt-6 md:mt-10"
      >
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-2 sm:p-4 shadow-xl">
          <ImageSlider />
        </div>
      </motion.div>
      
      {/* Responsive scroll indicator - hidden on very small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center hidden sm:flex"
      >
        <p className="text-slate-400 text-xs sm:text-sm mb-1 sm:mb-2">Scroll to explore</p>
        <motion.div 
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
          }}
        >
          <ChevronDown className="text-blue-400" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroPage;