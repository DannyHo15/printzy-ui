import React, { useState } from "react";
import Add from "../Add";
import { Button } from "../ui/button";
import Link from "next/link";
import { TProductDataResponse } from "@/types/product";
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
    <div className="flex flex-col">
      <Add
        product={product}
        variantId={
          selectedVariant?.id || "00000000-0000-0000-0000-000000000000"
        }
        customUploadId={selectedVariant?.upload?.id}
        stockNumber={selectedVariant?.stock?.quantity || 9}
      />
      <Button
        // disabled={isLoading}
        variant="linkHover1"
        asChild
        className="w-fit p-0 text-primary-dk after:text-primary-dk"
      >
        <Link href={`/editor/${slug ?? "new"}`}>Go to customize</Link>
      </Button>
    </div>
  );
}
