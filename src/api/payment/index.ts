import axiosInstance from "@/lib/axiosConfig";
import { IVnpayPayload, IVnpayResponse } from "@/types/payment";

export const createVnpayUrl = async (data: IVnpayPayload) => {
  try {
    const res = await axiosInstance.post<IVnpayResponse>(
      "/payments/vnpay/create_payment_url",
      data,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
