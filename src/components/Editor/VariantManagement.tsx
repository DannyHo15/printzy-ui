import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TProductDataResponse } from '@/types/product';
import CustomizeProducts from '../DetailProduct/CustomizeProducts';
interface IVariantManagementProps {
  product: TProductDataResponse;
  productOptions: any[];
  variant: any;
  setVariant: (variant: any) => void;
  setColor: (option: any) => void;
}
export default function VariantManagement({
  product,
  productOptions,
  setVariant,
  setColor,
  variant,
}: IVariantManagementProps) {
  return (
    // <Popover defaultOpen={true}>
    //   <PopoverTrigger asChild>
    //     {/* <Button variant="outline">Variant</Button> */}
    //   </PopoverTrigger>
    //   <PopoverContent align="end" className="w-80 bg-background">
    <div className="w-72 rounded-md border bg-white p-4 text-popover-foreground shadow-md outline-none">
      <CustomizeProducts
        productOptions={productOptions}
        product={product}
        initialOptions={variant}
        setVariant={setVariant}
        setColor={setColor}
      />
      <Button
        variant="secondary"
        className="flex-1 mt-10 w-full rounded-lg"
        // onClick={handleAddToCart}
      >
        Confirm & Add to cart
      </Button>
    </div>
    //   </PopoverContent>
    // </Popover>
  );
}
