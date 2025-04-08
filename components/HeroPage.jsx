"use client"
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ImageSlider from "./ImageSlider";

const HeroPage = () => {
  return (
    <section id="hero" className="relative pt-24 md:pt-32 pb-16 flex flex-col items-center justify-center min-h-screen space-y-8 px-4 sm:px-6">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-slate-900/90 -z-10" />
      
      {/* Improved glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl opacity-20 -z-10" />
      
      {/* Profile image with refined animated border */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 p-1">
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
      
      {/* Refined introduction text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4 text-center"
      >
        <Badge variant="outline" className="bg-slate-900/50 backdrop-blur-sm text-slate-200 border-slate-700 px-5 py-1.5 text-sm font-medium rounded-full">
          Hi, I'm Shabeer 👋
        </Badge>
        
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-200">
            Web Developer
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            React Native Expert
          </h2>
        </div>
        
        <p className="text-slate-300 max-w-lg mx-auto text-center mt-4 text-lg leading-relaxed">
          Building beautiful, responsive, and high-performance applications for web and mobile platforms.
        </p>
      </motion.div>
      
      {/* Enhanced resume button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex gap-4"
      >
        <Button 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg px-6 py-6 text-base rounded-lg"
        >
          <Download size={18} className="mr-2" />
          Download Resume
        </Button>
        
        
      </motion.div>
      
      {/* Enhanced image slider container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="w-full max-w-5xl mt-6 md:mt-10"
      >
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-4 shadow-xl">
          <ImageSlider />
        </div>
      </motion.div>
      
      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <p className="text-slate-400 text-sm mb-2">Scroll to explore</p>
        <motion.div 
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
          }}
        >
          <ChevronDown className="text-blue-400" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroPage;