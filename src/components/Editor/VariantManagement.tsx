import React from 'react';
import { TProductDataResponse } from '@/types/product';
import CustomizeProducts from '../DetailProduct/CustomizeProducts';
import ConfirmAndAdd from '../ConfirmAndAdd';
import { Editor } from '@/types/editor';
interface IVariantManagementProps {
  product: TProductDataResponse;
  productOptions: any[];
  variant: any;
  editor: Editor | undefined;
  setVariant: (variant: any) => void;
}
export default function VariantManagement({
  product,
  productOptions,
  setVariant,
  variant,
  editor,
}: IVariantManagementProps) {
  return (
    <div className="w-72 rounded-md border bg-white p-4 text-popover-foreground shadow-md outline-none">
      <CustomizeProducts
        productOptions={productOptions}
        product={product}
        initialOptions={variant}
        setVariant={setVariant}
      />
      <ConfirmAndAdd
        product={product}
        variantId={variant?.id}
        isInStock={variant?.isInStock}
        editor={editor}
      />
    </div>
  );
}
