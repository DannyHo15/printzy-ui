import axiosInstance from "@/lib/axiosConfig";
import {
  IAddressDataResponse,
  IAddressPayload,
  IAddressResponse,
} from "@/types/address";

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

export const getAddressById = async (id: string) => {
  try {
    const res = await axiosInstance.get<IAddressDataResponse>(
      `/addresses?id=${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateAddress = async (id: string, address: IAddressPayload) => {
  try {
    const res = await axiosInstance.patch(`/addresses/${id}`, address);
    return res.data;
  } catch (error) {
    throw error;
  }
};
