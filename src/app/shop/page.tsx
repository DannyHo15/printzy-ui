"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import ProductCard from "@/components/Product/ProductCard";
import useProducts from "@/hooks/useProducts";
import useCategories from "@/hooks/useCategories";
import { useSearchParams } from "next/navigation";
import useCollections from "@/hooks/useCollections";
import { Badge } from "@/components/ui/badge";
import Skeleton from "@/components/Skeleton";

export default function Home() {
  const [sort, setSort] = useState(0);
  const [filter, setFilter] = useState<any>({});
  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const collectionId = searchParams.get("collection");
  const categoryId = searchParams.get("category");
  const price = searchParams.get("price");
  const color = searchParams.get("color");
  const style = searchParams.get("style");
  const size = searchParams.get("size");

  useEffect(() => {
    setFilter({
      ...filter,
      name,
      collectionId,
      categoryId,
      price,
      color,
      style,
      size,
      sort,
    });
  }, [name, collectionId, categoryId, price, color, style, size, sort]);

  const categories = useCategories();

  const collections = useCollections();

  const { products, loading } = useProducts(filter);

  return (
    <>
      <Card
        categories={categories}
        collections={collections}
        setSort={setSort}
        sort={sort}
      >
        {loading ? (
          <div className="col-span-full mx-auto text-sm text-gray-400">
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
          </div>
        ) : products?.length < 1 ? (
          <p className="col-span-full mx-auto text-sm text-gray-400">
            No item found
          </p>
        ) : (
          products?.map((item: any) => (
            <ProductCard key={item.slug} item={item} />
          ))
        )}
      </Card>
    </>
  );
}
