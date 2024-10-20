"use client";

import { useEffect, useState } from "react";
import useProductVariants from "@/hooks/useVariants";
import Add from "../Add";

const CustomizeProducts = ({
  productId,
  productOptions,
  setVariant,
}: {
  productId: string;
  productOptions: any[];
  setVariant: (variant: any) => void;
}) => {
  const [selectedVariant, setSelectedVariant] = useState<any>();

  const variants = useProductVariants(productId);

  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  useEffect(() => {
    const variant = variants.find((v) => {
      const variantChoices = v?.variantOptionValues;

      if (!variantChoices) return false;
      const isMatching = variantChoices.every((choice: any) => {
        const valueToCheck = choice.optionValueId;
        return Object.values(selectedOptions).includes(valueToCheck);
      });

      return isMatching;
    });

    setVariant(variant);
    setSelectedVariant(variant);
  }, [selectedOptions]);

  useEffect(() => {
    if (variants && variants.length > 0) {
      setSelectedOptions(
        Object.fromEntries(
          productOptions?.map(({ option, productOptionValues }: any) => [
            option.id,
            productOptionValues[0].optionValue.id,
          ])
        )
      );
    }
  }, [variants]);

  const handleOptionSelect = (optionType: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  return (
    <div className="flex flex-col gap-4">
      {productOptions?.map((option: any) => (
        <div className="flex flex-col gap-4" key={option.option.name}>
          <h4 className="font-medium">Choose a {option.option.name}</h4>
          <ul className="flex items-center gap-3">
            {option.productOptionValues?.map((optionValue: any) => {
              // const disabled = !isVariantInStock({
              //   ...selectedOptions,
              //   [option.name!]: choice.description!,
              // });

              const disabled = false;

              const selected =
                selectedOptions[optionValue.optionValue.optionId] ===
                optionValue.optionValue.id;

              const clickHandler = disabled
                ? undefined
                : () =>
                    handleOptionSelect(
                      optionValue.optionValue.optionId,
                      optionValue.optionValue.id
                    );

              return option.option.name === "Color" ? (
                <li
                  className="relative inline-block group"
                  key={optionValue.optionValue.value}
                >
                  <div
                    className="w-8 h-8 rounded-full ring-1 ring-gray-300 relative"
                    style={{
                      backgroundColor: optionValue.optionValue.value,
                      cursor: disabled ? "not-allowed" : "pointer",
                    }}
                    onClick={clickHandler}
                  >
                    {selected && (
                      <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                    {disabled && (
                      <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-auto p-1 text-sm text-white bg-black rounded opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
                    {optionValue.optionValue?.value}
                  </div>
                </li>
              ) : (
                <li
                  className="ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm"
                  style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    backgroundColor: selected
                      ? "#f35c7a"
                      : disabled
                      ? "#FBCFE8"
                      : "white",
                    color: selected || disabled ? "white" : "#f35c7a",
                    boxShadow: disabled ? "none" : "",
                  }}
                  key={optionValue.optionValue.value}
                  onClick={clickHandler}
                >
                  {optionValue.optionValue.value}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <Add
        productId={productId}
        variantId={
          selectedVariant?._id || "00000000-0000-0000-0000-000000000000"
        }
        stockNumber={selectedVariant?.stock?.quantity || 0}
      />
      {/* COLOR */}
      {/* 
          <ul className="flex items-center gap-3">
            <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-500">
              <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </li>
            <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-blue-500"></li>
            <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-not-allowed relative bg-green-500">
              <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </li>
          </ul> */}
      {/* OTHERS */}
      {/* <h4 className="font-medium">Choose a size</h4>
      <ul className="flex items-center gap-3">
        <li className="ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm cursor-pointer">
          Small
        </li>
        <li className="ring-1 ring-lama text-white bg-lama rounded-md py-1 px-4 text-sm cursor-pointer">
          Medium
        </li>
        <li className="ring-1 ring-pink-200 text-white bg-pink-200 rounded-md py-1 px-4 text-sm cursor-not-allowed">
          Large
        </li>
      </ul> */}
    </div>
  );
};

export default CustomizeProducts;
