import React from "react";
import { NumericFormat } from "react-number-format";
import { motion } from "framer-motion";
import Link from "next/link";
import useCartStore from "@/store/useCartStore";

function CartProduct({
  item,
  key,
  idx,
}: {
  item: any;
  key: string;
  idx: number;
}) {
  const { addItem, removeItem } = useCartStore();

  return (
    <div className="product md:flex justify-between mb-6" key={key}>
      <Link href={"/product/" + item.slug}>
        <div className="image md:flex cursor-pointer">
          <motion.div
            initial={{ scale: 1.5, x: 50, y: -50, opacity: 0 }}
            animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
          >
            <img
              className="w-full md:w-32 h-32 object-cover rounded-xl"
              src={item.product.upload.path}
              alt=""
            />
          </motion.div>
          <div className="ml-3 flex flex-col justify-start">
            <p className="font-medium text-primary text-lg">
              {item.product.name}
            </p>
            <ul className="text-base leading-relaxed text-gray-400">
              <li>Design ID: {item.variant.sku}</li>
              <li>
                Options:{" "}
                {item.variant.variantOptionValues.map(
                  (optionValue: any, index: number) => (
                    <span key={index}>
                      {optionValue.optionValue.value}
                      {index < item.variant.variantOptionValues.length - 1
                        ? ", "
                        : ""}
                    </span>
                  ),
                )}
              </li>
              {/* 

                <li>Size: {item.selectedSizeProp}</li> */}
              <li className="text-secondary font-medium">
                Quantity: {item.quantity}
              </li>
            </ul>
          </div>
        </div>
      </Link>
      <div className="flex flex-col justify-end py-1 gap-2 item-center">
        <NumericFormat
          value={item.variant.price * item.quantity}
          displayType={"text"}
          thousandSeparator={true}
          fixedDecimalScale={true}
          decimalScale={2}
          suffix={" VND"}
          renderText={(value) => (
            <p className="text-lg font-bold text-primary-price uppercase">
              {value}
            </p>
          )}
        />

        <div className="flex ml-auto text-cusblack mt-1 md:mt-0">
          <button
            onClick={() => {
              if (item.quantity > 1) addItem(idx, -1);
            }}
            className="border border-cusblack active:bg-gray-800 rounded-sm p-1 hover:bg-cusblack hover:text-white duration-100"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>
          <button
            onClick={() => addItem(idx, 1)}
            className="border border-cusblack active:bg-gray-800 rounded-sm p-1 hover:bg-cusblack hover:text-white duration-100 mx-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
          <button
            onClick={() => removeItem(idx)}
            className="border border-cusblack active:bg-gray-800 rounded-sm p-1 hover:bg-cusblack hover:text-white duration-100 text-xs px-2 font-medium"
          >
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
