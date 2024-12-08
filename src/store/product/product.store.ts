import { create } from "zustand";
import { TProductAction } from "./product.action";
import { IProductState } from "./product.state";
import productsService, { getOneBySlugAndSKU } from "@/api/products";

export type TProductStore = IProductState & TProductAction;

export const useProductStore = create<TProductAction & IProductState>()(
  (set) => ({
    products: [],
    product: null,
    error: "",
    loading: true,
    getProducts: () => {
      set({
        loading: true,
        error: "",
      });
    },
    getProduct: async (slug: string) => {
      try {
        set({
          loading: true,
          error: "",
        });
        if (typeof slug === "string") {
          const result = await getOneBySlugAndSKU(slug);
          set({
            product: result?.data,
          });
        } else {
          throw new Error("Invalid slug or SKU");
        }
      } catch (err: any) {
        set({
          loading: false,
          error: err.message || "Something went wrong",
        });
      } finally {
        set({
          loading: false,
          error: "",
        });
      }
    },
  }),
);
