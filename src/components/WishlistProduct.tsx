import Link from "next/link";
import React from "react";
import { NumericFormat } from "react-number-format";
import { motion } from "framer-motion";
import { useWishlistStore } from "@/store/useWishList";

function WishlistProduct({ item }: any) {
  const { removeWishList } = useWishlistStore();
  return (
    <div className="mb-4 overflow-hidden">
      <motion.div
        initial={{ scale: 1.5, x: 100, y: -100, opacity: 0 }}
        animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
      >
        <img
          className="h-36 rounded-lg object-cover w-full"
          src={item?.product?.upload?.path}
          alt=""
        />
      </motion.div>
      <div className="px-2 py-1 text-cusblack">
        <p className="text-sm line-clamp-1">{item.name}</p>
        <NumericFormat
          value={item.price}
          className="text-sm font-semibold text-cusblack"
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          renderText={(value) => (
            <p className="text-base font-bold text-red-600 uppercase ">
              {value}
            </p>
          )}
        />
        <Link href={"/" + item.product.slug + "-" + item.product.sku}>
          <button className="text-white bg-secondary border border-cusblack py-1 text-xs w-full rounded-lg">
            View product
          </button>
        </Link>
        <button
          onClick={() => removeWishList(item?.product.id)}
          className="text-cusblack mt-1.5 bg-white border border-secondary py-1 text-xs w-full rounded-lg"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default WishlistProduct;
