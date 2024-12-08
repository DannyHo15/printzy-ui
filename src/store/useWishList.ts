import wishlistsService from "@/api/wishlists";
import { toast } from "react-toastify";
import { create } from "zustand";

type WishListState = {
  wishlist: any;
  isLoading: boolean;
  getWishList: () => void;
  addWishList: (productId: string) => void;
  removeWishList: (productId: string) => void;
};

export const useWishlistStore = create<WishListState>((set) => ({
  wishlist: [],
  isLoading: true,
  getWishList: async () => {
    try {
      const res = await wishlistsService.getList();
      set({
        wishlist: res?.data || [],
        isLoading: false,
      });
    } catch (err) {
      set((prev) => ({ ...prev, isLoading: false }));
    }
  },
  addWishList: async (productId) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const res = await wishlistsService.add(productId);
      set((state) => ({
        wishlist: [res.data, ...(state.wishlist || [])],
        isLoading: false,
      }));
    } catch (error: any) {
      set((state) => ({ ...state, isLoading: false }));
      toast.error(error?.message ?? "Something went wrong!");
    }
  },
  removeWishList: async (productId) => {
    set((state) => ({ ...state, isLoading: true }));
    await wishlistsService.remove(productId);

    set((state) => ({
      wishlist: state.wishlist.filter(
        (item: any) => item.product.id !== productId,
      ),
      isLoading: false,
    }));
  },
}));
