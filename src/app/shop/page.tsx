"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import ProductCard from "@/components/Product/ProductCard";
import useProducts from "@/hooks/useProducts";
import useCategories from "@/hooks/useCategories";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [sort, setSort] = useState(0);
  const [filter, setFilter] = useState<any>({});
  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const collectionId = searchParams.get("collection");
  const categoryId = searchParams.get("category");
  const price = searchParams.get("price");

  useEffect(() => {
    setFilter({ ...filter, name, collectionId, categoryId, price });
  }, [name, collectionId, categoryId, price]);

  const categories = useCategories();

  const [loading, setLoading] = useState(false);

  const products = useProducts(filter);

  return (
    <>
      <Card categories={categories} setSort={setSort}>
        {!loading ? (
          products?.length < 1 ? (
            <p className="col-span-full mx-auto text-sm text-gray-400">
              No item found
            </p>
          ) : (
            products?.map((item: any) => (
              <ProductCard key={item.slug} item={item} />
            ))
          )
        ) : (
          <>
            {/* <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton /> */}
          </>
        )}
      </Card>
    </>
  );
}
