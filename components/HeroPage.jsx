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
    <section id="hero" className="relative pt-24 pb-16 flex flex-col items-center justify-center min-h-[90vh] space-y-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 -z-10" />
      
      {/* Animated glow effect */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl opacity-20 -z-10" />
      
      {/* Profile image with animated border */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-r from-gray-700 via-slate-600 to-gray-700">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-800 via-slate-700 to-gray-800 animate-pulse opacity-60" />
          <div className="relative w-full h-full overflow-hidden rounded-full border-2 border-slate-800">
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
      
      {/* Introduction text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-3"
      >
        <Badge variant="outline" className="text-stone-400 border-stone-700 px-4 py-1 text-sm font-normal">
          Hi, I'm Shabeer 👋
        </Badge>
        
        <div className="space-y-2 text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Web Developer &
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            React Native Expert
          </h2>
        </div>
        
        <p className="text-slate-400 max-w-md mx-auto text-center mt-4">
          Building beautiful, responsive, and high-performance applications for web and mobile platforms.
        </p>
      </motion.div>
      
      {/* Resume button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Button 
          className="bg-[#1a1a1a] hover:bg-slate-800 text-white border border-gray-800 shadow-lg flex items-center gap-2 px-6 py-6"
        >
          <Download size={18} />
          Download Resume
        </Button>
      </motion.div>
      
      {/* Image slider */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="w-full mt-10"
      >
        <ImageSlider />
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="text-slate-400 animate-bounce" size={24} />
      </motion.div>
    </section>
  );
};

export default HeroPage;