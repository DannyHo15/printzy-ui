import axiosInstance from "@/lib/axiosConfig";
import { IWardDataResponse } from "@/types/ward";

export const getWardsByDistrict = async (districtId: string) => {
  try {
    const res = await axiosInstance.get<IWardDataResponse[]>(
      `/ward/district?district_id=${districtId}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
