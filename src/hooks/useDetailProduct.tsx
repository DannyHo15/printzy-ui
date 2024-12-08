import productsService from "@/api/products";
import { useState, useEffect, useLayoutEffect } from "react";

// Custom hook to fetch product by slug and SKU
const useDetailProduct = (slug: string | string[] | undefined) => {
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (typeof slug === "string") {
          const result = await productsService.getOneBySlugAndSKU(slug);
          setProduct(result?.data);
        } else {
          throw new Error("Invalid slug or SKU");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  return {
    product,
    loading,
    error,
  };
};

export default useDetailProduct;
