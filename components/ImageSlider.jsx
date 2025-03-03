"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/autoplay";
import technologies from "@/constants/technologies";

const ImageSlider = () => {
  return (
    <div className="w-full  mx-auto py-6 bg-gradient-to-r from-[#1c1c1c] via-[#161616] to-[#1c1c1c] rounded-lg shadow-lg">
     
      <Swiper
        spaceBetween={20}
        slidesPerView={4} // Adjust slides per view
        loop={true}
        autoplay={{
          delay: 2000, // Auto-slide every 2 seconds
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {technologies.map((tech) => (
          <SwiperSlide key={tech.id} className="flex justify-center items-center">
            <div className="p-4 flex flex-col items-center gap-2">
              <Image
                src={tech.image}
                alt={tech.title}
                width={60}
                height={60}
                className="object-contain"
              />
              <p className="text-center text-sm mt-2 text-color">{tech.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
