import { IMetaPagination } from "..";

export interface IProvinceDataResponse {
  name: string;
  id: string;
  code: string;
}

export interface IProvinceResponse {
  data: IProvinceDataResponse[];
  meta: IMetaPagination;
}
