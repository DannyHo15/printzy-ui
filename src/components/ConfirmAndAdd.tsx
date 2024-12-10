'use client';

import { createSelectors } from '@/lib/auto-genarate-selector';
import useCartStore from '@/store/useCartStore';
import { TProductDataResponse } from '@/types/product';
import { useState } from 'react';
import { Button } from './ui/button';
import { uploadCustomizeFile } from '@/api/customizeUpload';
import { Editor } from '@/types/editor';
import { generateRandomName } from '@/lib/utils';
import { toast } from 'react-toastify';

const ConfirmAndAdd = ({
  product,
  variantId,
  isInStock,
  editor,
}: {
  product: TProductDataResponse;
  variantId: number;
  isInStock: boolean;
  editor: Editor | undefined;
}) => {
  const [quantity, setQuantity] = useState(1);
  const cartStore = createSelectors(useCartStore);
  const addItemAction = cartStore.use.addItem();

  const handleQuantity = (type: 'i' | 'd') => {
    if (type === 'd' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === 'i' && isInStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      const customizeImage = await editor?.getCustomize(generateRandomName(12));
      if (!customizeImage) return;

      const customizeUploadData = await uploadCustomizeFile(customizeImage);
      if (!customizeUploadData) return;

      addItemAction(product.id, +variantId, quantity, customizeUploadData.id);
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.message === 'jwt malformed'
          ? 'Please login to add item to cart'
          : 'Error adding to cart'
      );
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-10">
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
              disabled={isInStock === false}
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
          Confirm & Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ConfirmAndAdd;
