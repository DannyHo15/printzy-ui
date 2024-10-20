import { useState, useEffect } from "react";
import cartService from "@/api/cart";

const useCart = () => {
  const [cart, setCart] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await cartService.getList();
        setCart(response?.data || {});
      } catch (err) {
        setError("Failed to fetch cart data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // return { cart, loading, error };
  return cart;
};

export default useCart;
