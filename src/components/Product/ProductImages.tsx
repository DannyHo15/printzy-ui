'use client';

import Image from 'next/image';
import { useState } from 'react';

const ProductImages = ({
  items,
  primaryUpload,
}: {
  items: any;
  primaryUpload: any;
}) => {
  const [index, setIndex] = useState(-1);
  return (
    <div className="flex w-full">
      <div className="flex flex-col justify-between w-1/6 mr-4 h-[500px]">
        <div
          className="h-32 relative mb-4 cursor-pointer"
          onClick={() => setIndex(-1)}
        >
          <Image
            src={
              primaryUpload?.path
                ? primaryUpload?.path
                : items?.[0]?.upload?.path ?? ''
            }
            alt=""
            fill
            sizes="20vw"
            className={`object-cover rounded-md ${
              index === -1 ? 'border-2 border-primary' : ''
            }`}
          />
        </div>
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
                index === i ? 'border-2 border-primary' : ''
              }`}
            />
          </div>
        ))}
      </div>
      <div className="max-h-[500px] w-full relative">
        <Image
          src={
            index === -1
              ? primaryUpload?.path
                ? primaryUpload?.path
                : items?.[0]?.upload?.path
              : items?.[index]?.upload?.path
          }
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
