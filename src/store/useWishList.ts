import wishlistsService from '@/api/wishlists';
import { create } from 'zustand';

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
    const res = await wishlistsService.add(productId);

    set((state) => ({
      wishlist: [res.data, ...(state.wishlist || [])],
      isLoading: false,
    }));
  },
  removeWishList: async (productId) => {
    set((state) => ({ ...state, isLoading: true }));
    await wishlistsService.remove(productId);

    set((state) => ({
      wishlist: state.wishlist.filter(
        (item: any) => item.product.id !== productId
      ),
      isLoading: false,
    }));
  },
}));