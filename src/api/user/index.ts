import axiosInstance from "@/lib/axiosConfig";
import { IProfileResponse } from "@/types/user";

export const getProfile = async (id: string) => {
  try {
    const res = await axiosInstance.get<IProfileResponse>(`/users/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (
  id: string,
  updatedData: Partial<IProfileResponse>,
): Promise<IProfileResponse> => {
  try {
    const response = await axiosInstance.patch(`/users/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
