"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import Image from "next/image";
import styles from "./gallery.module.css";
import Breadcrumb from "./Breadcrumb";
const Gallery = ({ images, title }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <section className={styles.left}>
      <Breadcrumb title={title} isMobile />
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 gallery-slider"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <Image src={img} alt={img} width={500} height={450} />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="gallery-slider-2"
        >
          {images.map((img) => (
            <SwiperSlide key={Math.random()}>
              <Image src={img} alt={img} width={500} height={450} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default Gallery;
