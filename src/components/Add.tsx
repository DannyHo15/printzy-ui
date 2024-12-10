'use client';

import { createSelectors } from '@/lib/auto-genarate-selector';
import useCartStore from '@/store/useCartStore';
import { TProductDataResponse } from '@/types/product';
import { useState } from 'react';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/useWishList';
import { useRouter } from 'next/navigation';

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

  const handleQuantity = (type: 'i' | 'd') => {
    if (type === 'd' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === 'i' && quantity < stockNumber) {
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
              onClick={() => handleQuantity('d')}
              disabled={quantity === 1}
              variant="ghost"
            >
              -
            </Button>
            {quantity}
            <Button
              className="cursor-pointer text-xl disabled:bg-transparent disabled:cursor-not-allowed disabled:opacity-70 bg-light-gray"
              onClick={() => handleQuantity('i')}
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
          className="flex-1 gap-2"
          onClick={handleAddToCart}
        >
          <svg
            fill="currentColor"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 15.96"
          >
            <path
              className="cls-1"
              d="M8,7.51A.49.49,0,0,1,8.49,8V9.47H10a.49.49,0,0,1,0,1H8.49v1.47a.49.49,0,0,1-1,0V10.45H6a.49.49,0,0,1,0-1H7.51V8A.49.49,0,0,1,8,7.51Z"
              transform="translate(-1 -0.02)"
            ></path>
            <path
              d="M11.57,3.94V3.59a3.57,3.57,0,0,0-7.14,0v.35H1v9.93A2.11,2.11,0,0,0,3.11,16h9.78A2.11,2.11,0,0,0,15,13.87V3.94ZM8,1.29a2.31,2.31,0,0,1,2.3,2.3v.35H5.7V3.59A2.31,2.31,0,0,1,8,1.29Zm4.89,13.42H3.11a.85.85,0,0,1-.84-.84V5.21H13.73v8.66A.85.85,0,0,1,12.89,14.71Z"
              transform="translate(-1 -0.02)"
            ></path>
          </svg>
          <span>Add to cart</span>
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
