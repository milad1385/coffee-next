"use client";
import Product from "@/components/modules/product/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const MoreProducts = ({ same, currProduct }) => {
  return (
    <div data-aos="fade-right">
      {same.filter((pro) => pro._id !== currProduct).length > 0 && (
        <>
          <section>
            <h2>محصولات مرتبط</h2>
            <div
              style={{
                height: "2px",
                width: "70px",
                background: "black",
                marginTop: "10px",
              }}
            ></div>
          </section>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            dir="rtl"
            loop={true}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper "
          >
            {same
              .filter((pro) => pro._id !== currProduct)
              .map((product) => (
                <SwiperSlide key={product._id}>
                  <Product productInfo={product} />
                </SwiperSlide>
              ))}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default MoreProducts;
