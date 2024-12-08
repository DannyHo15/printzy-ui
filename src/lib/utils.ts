import { IName } from "@/types/address";
import { IDistrictDataResponse } from "@/types/district";
import { IProvinceDataResponse, IProvinceResponse } from "@/types/province";
import { IWardDataResponse } from "@/types/ward";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAddress = (
  addressDetail: string,
  province: IName,
  district: IName,
  ward: IName,
) => {
  return `${addressDetail}, ${ward.name}, ${district.name}, ${province.name}`;
};
