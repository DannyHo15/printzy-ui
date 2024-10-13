"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const slides = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "/home/Destop_Merry_Christmas_1600x.webp",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "/home/home-1_1600x.webp",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "/home/Halloween-Destop_031c3611-2e01-4342-8b73-dcb7c0864a7f_1600x.webp",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

const Slider = () => {
  return (
    <div className="h-[calc(90vh-80px)] w-[90%] mx-auto mt-10 overflow-hidden rounded-xl">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        navigation
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`${slide.bg} w-full h-full flex flex-col gap-8 md:gap-16 xl:flex-row`}
            >
              <div className="w-full h-full relative">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                  className="w-full h-full top-0 left-0 object-cover rounded-2xl"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
