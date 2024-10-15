import { useState, useEffect } from "react";
import reviewsService from "@/api/reviews";

interface useAllProductReviewsParams {
  [key: string]: any;
}

const useAllProductReviews = ({ limit, skip }: useAllProductReviewsParams) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllProductReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        const query: any = {};

        if (limit !== undefined) query.$limit = limit;
        if (skip !== undefined) query.$skip = skip;

        const response = await reviewsService.getList(query);
        setReviews(response?.data?.data || []);
      } catch (err) {
        setError("Failed to fetch reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProductReviews();
  }, [limit, skip]);

  return reviews;
};

export default useAllProductReviews;
