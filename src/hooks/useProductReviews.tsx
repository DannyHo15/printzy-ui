import reviewsService from "@/api/reviews";
import { useEffect, useState } from "react";

const useProductReviewsByProductId = (productId: string) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await reviewsService.getListByProductId(productId);

        setReviews(response?.data);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  return reviews;
};

export default useProductReviewsByProductId;
