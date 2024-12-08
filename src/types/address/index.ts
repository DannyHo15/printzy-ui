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
  isDefault: boolean;
}

export interface IShippingFeeParams {
  pick_province: string;
  pick_district: string;
  province: string;
  district: string;
  weight: number;
  value: number;
}

export interface IShippingFeeResponse {
  success: boolean;
  fee: {
    name: string;
    fee: number;
    insurance_fee: number;
    include_vat: number;
    cost_id: number;
    delivery_type: string;
    a: number;
    dt: string;
    extFees: {
      display: string;
      title: string;
      amount: number;
      type: string;
    }[];
    promotion_key: string;
    delivery: boolean;
    ship_fee_only: number;
    distance: number;
    options: {
      name: string;
      title: string;
      shipMoney: number;
      shipMoneyText: string;
      vatText: string;
      desc: string;
      coupon: string;
      maxUses: number;
      maxDates: number;
      maxDateString: string;
      content: string;
      activatedDate: string;
      couponTitle: string;
      discount: string;
    };
  };
}
