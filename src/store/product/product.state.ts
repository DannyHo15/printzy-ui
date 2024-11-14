import { TProductDataResponse } from "@/types/product";

export interface IProductState {
  products: TProductDataResponse[];
  loading: boolean;
  error: string | null;
}
