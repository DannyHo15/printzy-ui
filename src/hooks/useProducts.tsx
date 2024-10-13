import { useState, useEffect } from "react";
import productsService from "@/api/products";

interface UseProductsParams {
  limit?: number;
  skip?: number;
}

const useProducts = ({ limit, skip }: UseProductsParams) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsService.getList({
          $limit: limit,
          $skip: skip,
        });
        setProducts(response?.data?.data || []);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit, skip]);

  return products;
};

export default useProducts;
