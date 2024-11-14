export interface IVnpayPayload {
  sum: number;
  orderId: number;
  tokenId: string;
  clientId: number;
}

export interface IVnpayResponse {
  data: {
    vnpUrl: string;
  };
}
