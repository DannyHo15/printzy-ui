import { TOptionValue } from "../option";
import { TUploadDataResponse } from "../upload";

export interface IVariant {
  id: number;
  productId: number;
  price: number;
  baseCost: number;
  sku: string;
  isAvailable: boolean;
  isInStock: boolean;
  variantOptionValues: IVariantOptionValue[];
  upload: TUploadDataResponse | null;
}

export interface IVariantOptionValue {
  id: number;
  optionValue: TOptionValue;
  optionValueId: number;
}
