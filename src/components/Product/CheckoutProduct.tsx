import React from "react";
import { NumericFormat } from "react-number-format";
import { motion } from "framer-motion";
import Link from "next/link";
import useCartStore from "@/store/useCartStore";
import { SquarePen, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

function CheckoutProduct({
  item,
  key,
  idx,
  canEdit = true,
}: {
  item: any;
  key: string;
  idx: number;
  canEdit?: boolean;
}) {
  const { addItem, removeItem } = useCartStore();

  return (
    <div
      className="product border-b md:flex justify-between py-4 last:border-none"
      key={key}
    >
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
                {Math.round(item.variant.price) + "VND"} x {item.quantity}
              </li>
              {item.product.discountPrice && (
                <li className="text-gray font-medium line-through">
                  {item.product.price}
                </li>
              )}
            </ul>
          </div>
        </div>
      </Link>

      <div className="flex flex-col justify-between py-1 gap-2 item-center">
        {canEdit && (
          <div className="flex gap-2 items-center justify-end">
            <Button variant="ghost" size="icon" asChild id="js-update-item">
              {/* Conditional rendering based on loadingMakeChange */}
              <Link href={"/cart"}>
                <SquarePen size={20} />
              </Link>
            </Button>
            {
              //   <span
              //   id="js-update-item"
              //   className="cursor-pointer flex items-center gap-1 text-sm"
              // >
              //   {/* Conditional rendering based on loadingMakeChange */}
              //   <Trash size={16} />
              // </span>
            }
          </div>
        )}
        <NumericFormat
          value={item.variant.price * item.quantity}
          displayType={"text"}
          thousandSeparator={true}
          fixedDecimalScale={true}
          decimalScale={0}
          suffix={" VND"}
          renderText={(value) => (
            <p className="text-base text-right font-bold text-primary-price uppercase mt-auto">
              {value}
            </p>
          )}
        />
      </div>
    </div>
  );
}

export default CheckoutProduct;
