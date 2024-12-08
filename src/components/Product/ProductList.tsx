"use client";
import { cn } from "@/lib/utils";
import Skeleton from "../Skeleton";
import ProductCard from "./ProductCard";
import useProducts from "@/hooks/useProducts";
import { useEffect, useState } from "react";

const PRODUCT_PER_PAGE = 8;

const ProductList = ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const [grid, setGrid] = useState("grid-cols-4");
  const { products, loading } = useProducts({
    limit: limit || 0,
    skip: 0,
    ...searchParams,
  });
  useEffect(() => {
    if (limit && limit <= 4) {
      setGrid(`grid-cols-${limit}`);
    } else {
      setGrid("grid-cols-5");
    }
    console.log("limit", grid);
  }, [limit]);

  return (
    <div
      className={cn("mt-12 grid gap-x-8 gap-y-16 justify-between", {
        [grid]: true,
      })}
    >
      {products ? (
        <>
          {products.map((product: any) => (
            <div key={product.id}>
              <ProductCard item={product} key={product.id} />
            </div>
          ))}
        </>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default ProductList;
