export enum EPaymentMethod {
  VNPAY = "vnpay",
  MOMO = "momo",
}

export const EDeliveryMethod = {
  COD: "cod",
  GHTK: "ghtk",
};

export interface IVnpayPayload {
  sum: number;
  orderId: number;
  tokenId: string;
  clientId: number;
  method: EPaymentMethod;
}

export interface IVnpayResponse {
  data: {
    vnpUrl: string;
  };
}
