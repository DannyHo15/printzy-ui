import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TProductDataResponse } from "@/types/product";
import CustomizeProducts from "../DetailProduct/CustomizeProducts";
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
    <Popover defaultOpen={true}>
      <PopoverTrigger asChild>
        <Button variant="outline">Variant</Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 bg-background">
        <CustomizeProducts
          productOptions={productOptions}
          product={product}
          initialOptions={variant}
          setVariant={setVariant}
          setColor={setColor}
        />
      </PopoverContent>
    </Popover>
  );
}
