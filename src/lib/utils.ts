import { IName } from '@/types/address';
import { IDistrictDataResponse } from '@/types/district';
import { IProvinceDataResponse, IProvinceResponse } from '@/types/province';
import { IWardDataResponse } from '@/types/ward';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAddress = (
  addressDetail: string,
  province: IName,
  district: IName,
  ward: IName
) => {
  return `${addressDetail}, ${ward.name}, ${district.name}, ${province.name}`;
};

export const generateRandomName = (length: number = 8): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
