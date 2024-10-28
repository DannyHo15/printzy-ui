import axiosInstance from "@/lib/axiosConfig";
import { IAddressPayload, IAddressResponse } from "@/types/address";

export const createAddress = async (address: IAddressPayload) => {
  try {
    const res = await axiosInstance.post("/addresses", address);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAddresses = async () => {
  try {
    const res = await axiosInstance.get<IAddressResponse>("/addresses");
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
