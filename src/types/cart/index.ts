import { TProductDataResponse } from "../product";
import { IProfileResponse } from "../user";
import { IVariant } from "../variant";

export interface ICartsDataResponse {
  id: number;
  user: IProfileResponse;
  userId: number;
  cartItems: ICartItemsResponse[];
}

export interface ICartItemsResponse {
  id: number;
  productId: number;
  product: TProductDataResponse;
  variant: IVariant;
  quantity: number;
}
