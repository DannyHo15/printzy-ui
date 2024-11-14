import React from "react";
import { NumericFormat } from "react-number-format";
import { motion } from "framer-motion";
import Link from "next/link";
import useCartStore from "@/store/useCartStore";
import { SquarePen, Trash } from "lucide-react";
import Image from "next/image";

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
        <div className="image md:flex cursor-pointer ">
          <motion.div
            initial={{ scale: 1.5, x: 50, y: -50, opacity: 0 }}
            animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
          >
            <Image
              src={item.product.upload.path}
              height={135}
              width={135}
              alt=""
              className="object-cover rounded-xl"
            />
          </motion.div>
          <div className="ml-3 flex flex-col justify-start">
            <p className="font-medium text-primary text-base">
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
                  ),
                )}
              </li>

              <li className="text-primary text-sm font-medium">
                ${item.variant.price} x {item.quantity}
              </li>
              {item.product.discountPrice && (
                <li className="text-gray font-medium line-through">
                  ${item.product.price}
                </li>
              )}
            </ul>
          </div>
        </div>
      </Link>

      <div className="flex flex-col justify-between py-1 gap-2 item-center">
        <li className="flex gap-2 items-center justify-end">
          <span
            id="js-update-item"
            className="cursor-pointer flex items-center gap-1 text-sm"
          >
            {/* Conditional rendering based on loadingMakeChange */}
            <SquarePen size={16} />
          </span>
          <span
            id="js-update-item"
            className="cursor-pointer flex items-center gap-1 text-sm"
          >
            {/* Conditional rendering based on loadingMakeChange */}
            <Trash size={16} />
          </span>
        </li>
        <NumericFormat
          value={item.variant.price * item.quantity}
          displayType={"text"}
          thousandSeparator={true}
          fixedDecimalScale={true}
          decimalScale={0}
          suffix={" VND"}
          renderText={(value) => (
            <p className="text-sm text-right font-bold text-primary-price uppercase">
              {value}
            </p>
          )}
        />
      </div>
    </div>
  );
}

export default CheckoutProduct;
