"use client";

import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex ">
      <div className="flex flex-col justify-between w-1/6 mr-4 h-[500px]">
        {items?.map((item: any, i: number) => (
          <div
            className="h-32 relative mb-4 cursor-pointer"
            key={item.id}
            onClick={() => setIndex(i)}
          >
            <Image
              src={item.upload.path}
              alt=""
              fill
              sizes="30vw"
              className={`object-cover rounded-md ${
                index === i ? "border-2 border-primary" : ""
              }`}
            />
          </div>
        ))}
      </div>
      <div className="h-[500px] w-5/6 relative">
        <Image
          src={items?.[index]?.upload?.path}
          alt=""
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
    </div>
  );
};

export default ProductImages;
