import { TCategoryDataResponse } from "../catefory";
import { TCollectionDataResponse } from "../collection";
import { TOption, TOptionValue } from "../option";
import { TPhoto, TUploadDataResponse } from "../upload";
export type TCategoryProduct = {
  id: number;
  category: TCategoryDataResponse;
};
export type TProductOptionValue = {
  id: number;
  optionValue: TOptionValue;
};

export type TProductOption = {
  id: number;
  option: TOption;
  productOptionValues: TProductOptionValue[];
};

export type TProductDataResponse = {
  id: number;
  price: string;
  discountPercent: number;
  name: string;
  description: string;
  slug: string;
  sku: string;
  isAvailable: boolean;
  collectionId: number;
  uploadId: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  collection: TCollectionDataResponse;
  categoryProducts: TCategoryProduct[];
  productOptions: TProductOption[];
  upload: TUploadDataResponse;
  photos: TPhoto[];
};
