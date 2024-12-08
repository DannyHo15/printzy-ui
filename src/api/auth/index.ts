import { SCHEMA } from "@/constant/schema";
import axiosInstance from "@/lib/axiosConfig";
import { ILoginPayload, ILoginResponse, IRegisterPayload } from "@/types/auth";
import { IPayloadNextServer } from "@/types/utils";
export const login = async (data: ILoginPayload) => {
  const res = await axiosInstance.post<ILoginResponse>("/authentication", data);
  return res.data;
};

export const register = async (data: IRegisterPayload) => {
  const res = await axiosInstance.post<ILoginResponse>("/clients", data);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post(
    `${SCHEMA.NEXT_SERVER}/api/auth/logout`,
    {
      force: true,
    },
  );
  return res;
};

export const setCookietsNextServer = async (
  payload: IPayloadNextServer<{ token: string; refreshToken: string }>,
) => {
  const res = await axiosInstance.post(`${SCHEMA.NEXT_SERVER}/api/auth`, {
    token: payload.data.token,
    refreshToken: payload.data.refreshToken,
  });
  return res;
};

export const logoutNextServer = async (
  payload: IPayloadNextServer<{ force: boolean }>,
) => {
  const res = await axiosInstance.post(
    `${SCHEMA.NEXT_SERVER}/api/auth/logout`,
    {
      force: payload.data.force,
    },
  );
  return res;
};
