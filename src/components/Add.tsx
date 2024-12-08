"use client";

import { createSelectors } from "@/lib/auto-genarate-selector";
import useCartStore from "@/store/useCartStore";
import { TProductDataResponse } from "@/types/product";
import { useState } from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import Cookies from "js-cookie";
import { useWishlistStore } from "@/store/useWishList";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Add = ({
  product,
  variantId,
  stockNumber,
  customUploadId,
}: {
  product: TProductDataResponse;
  variantId: number;
  stockNumber: number;
  customUploadId: number;
}) => {
  const [quantity, setQuantity] = useState(1);
  const cartStore = createSelectors(useCartStore);
  const addItemAction = cartStore.use.addItem();
  const { addWishList } = useWishlistStore();
  const router = useRouter();

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
    addItemAction(product.id, +variantId, quantity, customUploadId);
  };

  const handleAddWishList = (id: string) => {
    addWishList(id);
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4 w-full">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex gap-4 items-center justify-between w-fit">
            <Button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-70 bg-light-gray disabled:bg-transparent"
              onClick={() => handleQuantity("d")}
              disabled={quantity === 1}
              variant="ghost"
            >
              -
            </Button>
            {quantity}
            <Button
              className="cursor-pointer text-xl disabled:bg-transparent disabled:cursor-not-allowed disabled:opacity-70 bg-light-gray"
              onClick={() => handleQuantity("i")}
              disabled={quantity === stockNumber}
              variant="ghost"
            >
              +
            </Button>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-4">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
        <Button
          variant="ghost"
          onClick={() => handleAddWishList(product.id.toString())}
          className="p-2 bg-light-gray rounded-full "
        >
          <Heart size={26} className="text-secondary-dk" />
        </Button>
      </div>
    </div>
  );
};

export default Add;
