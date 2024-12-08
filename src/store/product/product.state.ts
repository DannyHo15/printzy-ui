import { TProductDataResponse } from "@/types/product";

export interface IProductState {
  products: TProductDataResponse[];
  product: TProductDataResponse | null;
  loading: boolean;
  error: string | null;
}
