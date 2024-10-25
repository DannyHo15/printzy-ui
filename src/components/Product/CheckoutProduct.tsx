import React from "react";
import { NumericFormat } from "react-number-format";
import { motion } from "framer-motion";
import Link from "next/link";
import useCartStore from "@/store/useCartStore";

function CheckoutProduct({
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
              <li>
                {item.variant.variantOptionValues.map(
                  (optionValue: any, index: number) => (
                    <span key={index}>
                      {optionValue.optionValue.value}
                      {index < item.variant.variantOptionValues.length - 1
                        ? ", "
                        : ""}
                    </span>
                  )
                )}
              </li>

              <li className="flex gap-1 items-center">
                <span
                  id="js-update-item"
                  className="mr-4 cursor-pointer flex items-center gap-1 text-sm"
                >
                  {/* Conditional rendering based on loadingMakeChange */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 512 511"
                    className=""
                  >
                    <g>
                      <path
                        d="M405.332 256.484c-11.797 0-21.332 9.559-21.332 21.332v170.668c0 11.754-9.559 21.332-21.332 21.332H64c-11.777 0-21.332-9.578-21.332-21.332V149.816c0-11.754 9.555-21.332 21.332-21.332h170.668c11.797 0 21.332-9.558 21.332-21.332 0-11.777-9.535-21.336-21.332-21.336H64c-35.285 0-64 28.715-64 64v298.668c0 35.286 28.715 64 64 64h298.668c35.285 0 64-28.714 64-64V277.816c0-11.796-9.54-21.332-21.336-21.332zm0 0"
                        fill="#019adc"
                      ></path>
                      <path
                        d="M200.02 237.05a10.793 10.793 0 0 0-2.922 5.438l-15.082 75.438c-.703 3.496.406 7.101 2.922 9.64a10.673 10.673 0 0 0 7.554 3.114c.68 0 1.387-.063 2.09-.211l75.414-15.082c2.09-.43 3.988-1.43 5.461-2.926l168.79-168.79-75.415-75.41zM496.383 16.102c-20.797-20.801-54.633-20.801-75.414 0l-29.524 29.523 75.414 75.414 29.524-29.527C506.453 81.465 512 68.066 512 53.816s-5.547-27.648-15.617-37.714zm0 0"
                        fill="#019adc"
                      ></path>
                    </g>
                  </svg>
                  Edit
                </span>
                <span
                  id="js-update-item"
                  className="mr-4 cursor-pointer flex items-center gap-1 text-sm"
                >
                  {/* Conditional rendering based on loadingMakeChange */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    ></path>
                  </svg>
                  Remove
                </span>
              </li>

              <li className="text-primary font-medium">
                ${item.variant.price} x {item.quantity}
              </li>
              <li className="text-gray font-medium line-through">
                ${item.product.discountPrice}
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
          prefix={"$"}
          renderText={(value) => (
            <p className="text-base font-bold text-primary-price uppercase">
              {value}
            </p>
          )}
        />
      </div>
    </div>
  );
}

export default CheckoutProduct;
