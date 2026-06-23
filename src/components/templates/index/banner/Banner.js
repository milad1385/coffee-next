"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

function Banner() {
  const sliders = [
    { id: 1, image: "/images/slide1.jpg" },
    { id: 2, image: "/images/slide2.jpg" },
    { id: 3, image: "/images/slide3.jpg" },
    // { id: 4, image: "/images/slide4.jpg" },
    // { id: 5, image: "/images/slide5.jpg" },
  ];
  return (
    <Swiper
      rewind={true}
      navigation={true}
      loop={true}
      autoplay={{ delay: 1500 }}
      modules={[Navigation]}
      className="mySwiper home-slider"
    >
      {sliders.map((slide) => (
        <SwiperSlide key={slide.id}>
          <Image
            width={1920}
            height={1080}
            src={slide.image}
            alt={slide.image}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Banner;
