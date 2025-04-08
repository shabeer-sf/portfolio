"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import technologies from "@/constants/technologies";
import { motion } from "framer-motion";

const ImageSlider = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visible after component mounts for animation
    setIsVisible(true);
    
    // Handle responsive slidesPerView
    const handleResize = () => {
      // Logic handled by Swiper breakpoints
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mx-auto"
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl">
        {/* Optional Title */}
        <div className="text-center pt-4 pb-2">
          <p className="text-sm text-slate-400 uppercase tracking-wider font-medium">Technologies & Tools</p>
        </div>
        
        {/* Tech stack slider */}
        <Swiper
          spaceBetween={10}
          slidesPerView={2}
          breakpoints={{
            // When window width is >= 640px
            640: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            // When window width is >= 768px
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            // When window width is >= 1024px
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          loop={true}
          speed={800}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
          className="py-4"
        >
          {technologies.map((tech) => (
            <SwiperSlide key={tech.id} className="flex justify-center items-center">
              <motion.div 
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="p-4 flex flex-col items-center gap-3 h-full"
              >
                <div className="relative w-16 h-16 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center p-3 transition-all duration-300 hover:border-blue-500/50 hover:shadow-md hover:shadow-blue-500/10">
                  <Image
                    src={tech.image}
                    alt={tech.title}
                    width={60}
                    height={60}
                    className="object-contain drop-shadow-lg transition-all duration-300"
                  />
                </div>
                <p className="text-center text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                  {tech.title}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Decorative elements */}
        <div className="absolute -left-4 -top-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"></div>
        
        {/* Gradient overlay for smoother edges */}
        <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-slate-900 to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-slate-900 to-transparent pointer-events-none z-10"></div>
      </div>
    </motion.div>
  );
};

export default ImageSlider;