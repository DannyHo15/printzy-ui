import axiosInstance from "@/lib/axiosConfig";
import { IProvinceResponse } from "@/types/province";

export const getProvinces = async () => {
  try {
    const res = await axiosInstance.get<IProvinceResponse>("/province");
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
