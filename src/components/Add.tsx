"use client";

import { createSelectors } from "@/lib/auto-genarate-selector";
import useCartStore from "@/store/useCartStore";
import { TProductDataResponse } from "@/types/product";
import { useState } from "react";

const Add = ({
  product,
  variantId,
  stockNumber,
}: {
  product: TProductDataResponse;
  variantId: string;
  stockNumber: number;
}) => {
  const [quantity, setQuantity] = useState(1);
  const cartStore = createSelectors(useCartStore);
  const addItemAction = cartStore.use.addItem();

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic
    console.log(product, variantId, quantity);
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("d")}
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("i")}
              disabled={quantity === stockNumber}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <button
        // disabled={isLoading}
        onClick={handleAddToCart}
        className="w-full text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-lama hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
      >
        Go to customize
      </button>
    </div>
  );
};

export default Add;
