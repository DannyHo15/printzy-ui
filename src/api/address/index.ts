import axiosInstance from "@/lib/axiosConfig";
import {
  IAddressDataResponse,
  IAddressPayload,
  IAddressResponse,
  IShippingFeeParams,
} from "@/types/address";
import queryString from "query-string";

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

export const getShippingfee = async (payload: IShippingFeeParams) => {
  try {
    const res = await axiosInstance.get(
      `/shipping/calculate-fee?${queryString.stringify(payload)}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAddressById = async (id: string) => {
  try {
    const res = await axiosInstance.get<IAddressDataResponse>(
      `/addresses/${id}`,
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

export const deleteAddress = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/addresses/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
