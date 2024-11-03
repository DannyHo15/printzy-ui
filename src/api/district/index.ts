import axiosInstance from "@/lib/axiosConfig";
import { IDistrictDataResponse } from "@/types/district";

export const getDistrictsByProvinceId = async (provinceId: string) => {
  try {
    const res = await axiosInstance.get<IDistrictDataResponse[]>(
      `/district/province?province_id=${provinceId}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
