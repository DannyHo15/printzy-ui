import React, { useMemo, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { motion } from 'framer-motion';
import Link from 'next/link';
import useCartStore from '@/store/useCartStore';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { ProductPriceService } from '@/services/ProductPriceService';
import PreviewCustomize from '../PreviewCustomize';
function CartProduct({
  item,
  key,
  idx,
}: {
  item: any;
  key: string;
  idx: number;
}) {
  const { removeItem, updateItem } = useCartStore();
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const totalPrice = useMemo(() => {
    return ProductPriceService.calculateTotalPrice(
      item.variant.price,
      item.quantity,
      item.product.discountPercent
    );
  }, [item.variant.price, item.quantity, item.product.discountPercent]);

  const openZoomedImage = (imageUrl: string) => {
    setZoomedImage(imageUrl);
  };

  const closeZoomedImage = () => {
    setZoomedImage(null);
  };
  console.log(item);
  return (
    <div className="product md:flex gap-4 justify-between mb-6" key={key}>
      <div
        className="image md:flex cursor-pointer"
        onClick={() =>
          openZoomedImage(
            item?.customizeUpload?.path || item.variant.upload.path
          )
        }
      >
        <motion.div
          initial={{ scale: 1.5, x: 50, y: -50, opacity: 0 }}
          animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
        >
          <Image
            className="w-full md:w-24 h-24 object-cover rounded-xl"
            src={item?.customizeUpload?.path || item.variant.upload.path}
            alt="image product"
            width={128}
            height={128}
          />
        </motion.div>
        <div className="ml-3 flex flex-col justify-start">
          <Link href={item.product.slug}>
            <p className="font-medium text-primary text-lg">
              {item.product.name}
            </p>
          </Link>
          <ul className="text-md leading-relaxed text-gray-400">
            <li>Design ID: {item.variant?.sku}</li>
            <li>
              Options:{' '}
              {item.variant.variantOptionValues.map(
                (optionValue: any, index: number) => (
                  <span key={index}>
                    {optionValue.optionValue.value}
                    {index < item.variant.variantOptionValues.length - 1
                      ? ', '
                      : ''}
                  </span>
                )
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

      <div className="flex flex-col justify-end py-1 gap-2 item-center">
        <NumericFormat
          value={totalPrice}
          displayType={'text'}
          thousandSeparator={true}
          fixedDecimalScale={true}
          decimalScale={2}
          suffix={' VND'}
          renderText={(value) => (
            <p className="text-base font-bold text-primary-price uppercase">
              {value}
            </p>
          )}
        />

        <div className="flex ml-auto text-cusblack mt-1 md:mt-0">
          <button
            onClick={() => {
              if (item.quantity > 1) updateItem(idx, -1);
            }}
            className="border border-cusblack active:bg-gray-800 rounded-sm p-1 hover:bg-cusblack hover:text-white duration-100"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={() => updateItem(idx, 1)}
            className="border border-cusblack active:bg-gray-800 rounded-sm p-1 hover:bg-cusblack hover:text-white duration-100 mx-1"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={() => removeItem(idx)}
            className="border border-cusblack active:bg-gray-800 rounded-sm p-1 hover:bg-cusblack hover:text-white duration-100 text-xs px-2 font-medium"
          >
            REMOVE
          </button>
        </div>
      </div>
      {zoomedImage && (
        <PreviewCustomize
          imageUrl={zoomedImage}
          openZoomedImage={closeZoomedImage} // Pass closeZoomedImage to allow closing
        />
      )}
    </div>
  );
}

export default CartProduct;
