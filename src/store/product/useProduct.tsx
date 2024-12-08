import { getOneBySlugAndSKU } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export const useProductQuery = (slug: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const response = await getOneBySlugAndSKU(slug);
      return response?.data || [];
    },
  });
  return { data, error, isLoading };
};
