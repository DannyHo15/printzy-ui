import { useState, useEffect } from "react";
import variantsService from "@/api/variant";

const useProductVariants = (productId: string) => {
  const [variants, setVariants] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVariants = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await variantsService.getList(productId);
        setVariants(response.data);
      } catch (err) {
        setError("Failed to fetch variants");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchVariants();
    }
  }, [productId]);

  return variants;
};

export default useProductVariants;
