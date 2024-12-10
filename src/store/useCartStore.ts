import cartService from '@/api/cart';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';

type CartState = {
  cart: any;
  isLoading: boolean;
  getCart: () => void;
  updateItem: (index: number, quantity: number) => void;
  removeItem: (index: number) => void;
  addItem: (
    productId: number,
    variantId: number,
    quantity: number,
    customizeUploadId: number
  ) => void;
  clearCart: () => void;
};

const useCartStore = create<CartState>((set) => ({
  cart: {},
  isLoading: false,
  counter: 0,

  getCart: async () => {
    set({ isLoading: true });
    try {
      const response = await cartService.getList();
      set({
        cart: response?.data || {},
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to fetch cart', error);
    } finally {
      set({ isLoading: false });
    }
  },
  addItem: async (productId, variantId, quantity, customizeUploadId) => {
    set({ isLoading: true });
    try {
      await cartService.add(productId, variantId, quantity, customizeUploadId);
      toast.success('Added to cart');
      useCartStore.getState().getCart();
      set({ isLoading: false });
    } catch (error: any) {
      toast.error(
        error.message === 'jwt malformed'
          ? 'Please login to add item to cart'
          : 'Failed to add item to cart - ' + error.message
      );
      set({ isLoading: false });
    }
  },
  updateItem: (index, quantity) => {
    try {
      set((state) => {
        const existingItem = state.cart?.cartItems[index];

        if (existingItem) {
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + quantity,
          };

          const updatedCartItems = [...state.cart.cartItems];
          updatedCartItems[index] = updatedItem;
          cartService.update(
            updatedItem.productId,
            updatedItem.variant.id,
            updatedItem.quantity
          );

          return {
            cart: {
              ...state.cart,
              cartItems: updatedCartItems,
            },
          };
        }

        return state;
      });
    } catch {
      console.error('Failed to update cart');
    }
  },

  removeItem: (index) => {
    try {
      set((state) => {
        const updatedCartItems = [...state.cart.cartItems];
        const removeCartItem = state.cart?.cartItems[index];
        updatedCartItems.splice(index, 1);
        cartService.remove(removeCartItem.productId, removeCartItem.variant.id);
        return {
          cart: {
            ...state.cart,
            cartItems: updatedCartItems,
          },
        };
      });
    } catch {
      console.error('Failed to remove cart');
    }
  },

  clearCart: () => {
    set({ cart: {} });
    cartService.clear();
  },
}));

export default useCartStore;
