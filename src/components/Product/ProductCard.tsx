"use client";
import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { NumericFormat } from "react-number-format";
import { motion } from "framer-motion";
import Link from "next/link";
import { useWishlistStore } from "@/store/useWishList";
import { Heart } from "lucide-react";

function ProductCard({ item }: any) {
  const { addWishList } = useWishlistStore();
  const handleAddWishList = (id: string) => {
    addWishList(item.id);
  };

  return (
    <div className="rounded-xl cursor-pointer border overflow-hidden">
      <div className="overflow-hidden cursor-default  relative group">
        <motion.div
          initial={{ scale: 1, x: 50, opacity: 0 }}
          animate={{ scale: 1, x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-full h-64"
        >
          <Link href={"/" + item.slug}>
            <Image
              alt=""
              fill
              loading="lazy"
              sizes="100%"
              className="object-cover "
              src={item?.upload?.path}
            />
          </Link>
        </motion.div>
        <div className="absolute w-full bg-gray-500 top-0 flex justify-between place-items-start z-10 mt-2">
          <div className="flex cursor-pointer ml-2">
            <button
              onClick={() => handleAddWishList(item.id)}
              className="p-2 bg-white hover:bg-gray-100 active:bg-gray-200 rounded-full "
            >
              <Heart size={24} className="text-secondary-dk" />
            </button>
          </div>
          {item.discountPercent > 0 && (
            <div className="flex mr-2">
              <div className="p-4 bg-secondary rounded-full text-[15px] font-semibold text-white w-[50px] h-[50px] flex justify-center items-center">
                {item.discountPercent}% OFF
              </div>
            </div>
          )}
        </div>
      </div>
      <Link
        href={"/" + item.slug}
        key={item.id}
        className="mt-0.5 p-4 flex flex-col"
      >
        <p className="text-sm line-clamp-1 text-primary font-semibold">
          {item.name}
        </p>
        <div className="flex w-full gap-2 items-center">
          <NumericFormat
            value={item.price - (item.price * item.discountPercent) / 100}
            displayType={"text"}
            thousandSeparator={true}
            fixedDecimalScale={true}
            decimalScale={0}
            suffix={" VND"}
            renderText={(value) => (
              <p className="text-base font-bold text-primary-price uppercase ">
                {value}
              </p>
            )}
          />
          {item.discountPercent > 0 && (
            <NumericFormat
              value={item.price}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" VND"}
              fixedDecimalScale={true}
              decimalScale={0}
              renderText={(value) => (
                <p className="text-sm text-darkness line-through">{value}</p>
              )}
            />
          )}
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
