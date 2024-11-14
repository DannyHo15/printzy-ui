import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { Navigation, Pagination } from "swiper/modules";
import ProductCard from "./ProductCard"; // Adjust the path according to your file structure

interface Props {
  items: any[];
  slidesPerView: number;
}

const ProductSlide = (props: Props) => {
  const { items, slidesPerView } = props;
  return (
    <div className="my-6">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={slidesPerView}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 1,
            pagination: { clickable: true },
          },
          768: {
            slidesPerView: 3,
            pagination: false,
          },
          1024: {
            slidesPerView: slidesPerView,
            pagination: false,
          },
        }}
      >
        {items?.map((item) => (
          <SwiperSlide key={`product-${item.id}`}>
            <ProductCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlide;
