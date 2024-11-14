import { create } from "zustand";
import { TProductAction } from "./product.action";
import { IProductState } from "./product.state";

export type TProductStore = IProductState & TProductAction;

export const useProductStore = create<TProductAction & IProductState>()(
  (set) => ({
    products: [],
    error: "",
    loading: false,
    getProducts: () => {
      set({
        loading: true,
        error: "",
      });
    },
  }),
);
