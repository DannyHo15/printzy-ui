import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import PreviewCustomize from '../PreviewCustomize';

function CheckoutProduct({
  item,
  key,
  idx,
}: {
  item: any;
  key: string;
  idx: number;
  canEdit?: boolean;
}) {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const openZoomedImage = (imageUrl: string) => {
    setZoomedImage(imageUrl);
  };

  const closeZoomedImage = () => {
    setZoomedImage(null);
  };
  return (
    <div
      className="product border-b md:flex justify-between py-4 last:border-none"
      key={key}
    >
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
            src={item?.customizeUpload?.path || item.variant.upload.path}
            height={135}
            width={135}
            alt=""
            className="object-cover rounded-xl"
          />
        </motion.div>
        <div className="ml-3 flex flex-col justify-start">
          <Link href={item.variant.product.slug}>
            <p className="font-medium text-primary text-base">
              {item.variant.product.name}
            </p>
          </Link>
          <ul className="text-base leading-relaxed text-secondary-dk">
            <span>{item.variant.sku}</span>

            <li className="text-primary text-sm font-medium">
              {Math.round(item.variant.price) + 'VND'} x {item.quantity}
            </li>
            {item.variant.product.discountPrice && (
              <li className="text-gray font-medium line-through">
                {item.variant.product.price}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="flex flex-col justify-between py-1 gap-2 item-center">
        <NumericFormat
          value={item.variant.price * item.quantity}
          displayType={'text'}
          thousandSeparator={true}
          fixedDecimalScale={true}
          decimalScale={0}
          suffix={' VND'}
          renderText={(value) => (
            <p className="text-base text-right font-bold text-primary-price uppercase mt-auto">
              {value}
            </p>
          )}
        />
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

export default CheckoutProduct;
