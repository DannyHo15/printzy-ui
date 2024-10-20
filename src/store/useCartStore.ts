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
    set((state) => {
      const existingItem = state.cart?.cartItems[index];

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
        };

        const updatedCartItems = [...state.cart.cartItems];
        updatedCartItems[index] = updatedItem;

        return {
          cart: {
            ...state.cart,
            cartItems: updatedCartItems,
          },
        };
      }

      return state;
    });
  },

  removeItem: (index) => {
    set((state) => {
      const updatedCartItems = [...state.cart.cartItems]; // Sao chép danh sách hiện tại
      updatedCartItems.splice(index, 1); // Xóa item tại vị trí index

      return {
        cart: {
          ...state.cart,
          cartItems: updatedCartItems, // Cập nhật lại danh sách cartItems sau khi xóa
        },
      };
    });
  },

  clearCart: () => {
    set({ cart: {} });
  },
}));

export default useCartStore;
