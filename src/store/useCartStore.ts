import cartService from "@/api/cart";
import { create } from "zustand";

type CartState = {
  cart: any;
  isLoading: boolean;
  getCart: () => void;
  addItem: (index: number, quantity: number) => void;
  removeItem: (index: number) => void;
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
      console.error("Failed to fetch cart", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: (index, quantity) => {
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
      console.error("Failed to update cart");
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
      console.error("Failed to remove cart");
    }
  },

  clearCart: () => {
    set({ cart: {} });
    cartService.clear();
  },
}));

export default useCartStore;
