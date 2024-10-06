import React, { Suspense, useEffect, useState } from "react";

// import "react-responsive-carousel/lib/styles/carousel.min.css";
import Skeleton from "./Skeleton";

function ShopCarousel() {
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) return <Suspense fallback={<Skeleton />} />;
  return (
    <div className="">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        <div className="relative">
          <img
            className=" bg-white h-24 object-cover md:h-64  pointer-events-none"
            loading="lazy"
            src="https://i.ibb.co/TYNgNgp/Homepage-Banner-AF1-React-170120.jpg"
          />
        </div>
        <div>
          <img
            className=" bg-white h-24 object-cover md:h-64 "
            loading="lazy"
            src="https://i.ibb.co/kHhhbbG/adidas-banner-grpn-US.jpg"
          />
        </div>
        <div>
          <img
            className=" bg-white h-24 object-cover md:h-64 "
            loading="lazy"
            src="https://i.ibb.co/WvN6bC5/PLPBanner-Converse-1920x700.png"
          />
        </div>
      </div>
    </div>
  );
}

export default ShopCarousel;
