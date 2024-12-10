import React from 'react';
import Add from '../Add';
import { Button } from '../ui/button';
import Link from 'next/link';
import { TProductDataResponse } from '@/types/product';
interface IActionGroupProps {
  product: TProductDataResponse;
  selectedVariant: any;
  slug: string;
}
export default function ActionGroup({
  product,
  selectedVariant,
  slug,
}: IActionGroupProps) {
  return (
    <div className="flex flex-col gap-4">
      <Add
        product={product}
        variantId={selectedVariant?.id}
        customUploadId={selectedVariant?.upload?.id}
        stockNumber={selectedVariant?.stock?.quantity}
      />
      <Link href={`/editor/${slug ?? 'new'}`}>
        <Button
          variant="outline"
          className="w-48 p-0 text-primary-dk after:text-primary-dk text-base flex gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-magic"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0v1.829Zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707L14 2.707ZM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707L7.293 4Zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1h1.829Zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1h1.829ZM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707L13.293 10ZM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0v1.829Zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0L8.354 9.06Z"></path>
          </svg>
          Go to customize
        </Button>
      </Link>
    </div>
  );
}
