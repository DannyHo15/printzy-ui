import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { NumericFormat } from "react-number-format";
import { motion } from "framer-motion";
import Link from "next/link";
import { useWishlistStore } from "@/store/useWishList";

function ProductCard({ item }: any) {
  const { addWishList } = useWishlistStore();
  const router = useRouter();

  const handleAddWishList = (id: string) => {
    const isLoggedIn = Cookies.get("printzy_ac_token");
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      addWishList(item.id);
    }
  };

  return (
    <div className="rounded-xl cursor-pointer">
      <div className="overflow-hidden cursor-default rounded-xl relative group">
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
              sizes="25vw"
              className="absolute object-cover rounded-2xl"
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
              <svg
                className="w-6 m-auto h-6 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
          <div className="flex cursor-pointer mr-2">
            <div className="p-4 bg-secondary rounded-full text-[15px] font-semibold text-white w-[50px] h-[50px] flex justify-center items-center">
              {Math.round(
                ((item.price - item.discountPrice) / item.price) * 100
              )}
              % OFF
            </div>
          </div>
        </div>
      </div>
      <Link href={"/" + item.slug} key={item._id} className="mt-0.5">
        <p className="text-sm line-clamp-1 text-primary font-semibold">
          {item.name}
        </p>
        <div className="flex gap-2 items-center">
          <NumericFormat
            value={item.discountPrice}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            renderText={(value) => (
              <p className="text-base font-bold text-primary-price uppercase ">
                {value}
              </p>
            )}
          />
          <NumericFormat
            value={item.price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            renderText={(value) => (
              <p className="text-sm text-darkness line-through">{value}</p>
            )}
          />
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
