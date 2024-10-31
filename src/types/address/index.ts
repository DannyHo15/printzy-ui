import { IMetaPagination } from "..";
export interface IAddressPayload {
  fullName: string;
  phone: string;
  addressDetail: string;
  provinceId: string;
  districtId: string;
  wardId: string;
}

export interface IName {
  name: string;
  id: string;
}

export interface IAddressResponse {
  data: IAddressDataResponse[];
  meta: IMetaPagination;
}

export interface IAddressDataResponse {
  id: string;
  fullName: string;
  phone: string;
  addressDetail: string;
  province: IName;
  district: IName;
  ward: IName;
}
