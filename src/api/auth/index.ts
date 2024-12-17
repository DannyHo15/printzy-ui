import { SCHEMA } from '@/constant/schema';
import axiosInstance from '@/lib/axiosConfig';
import {
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload,
  IResetPasswordConfirmPayload,
  IResetPasswordPayload,
} from '@/types/auth';
import { IPayloadNextServer } from '@/types/utils';
import axios from 'axios';
export const login = async (data: ILoginPayload) => {
  const res = await axiosInstance.post<ILoginResponse>('/authentication', data);
  return res.data;
};

export const register = async (data: IRegisterPayload) => {
  const res = await axiosInstance.post<ILoginResponse>('/clients', data);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post(
    `${SCHEMA.NEXT_SERVER}/auth/logout`,
    {
      force: true,
    }
  );
  return res;
};

export const reset = async (data: IResetPasswordPayload) => {
  const res = await axiosInstance.post<any>(
    '/authentication/send-reset-password-email',
    data
  );
  return res.data;
};

export const resetConfirm = async (data: IResetPasswordConfirmPayload) => {
  const res = await axios.post<any>(
    `${SCHEMA.API_BASE}/authentication/reset-password`,
    { newPassword: data.password },
    {
      headers: {
        Authorization: `Bearer ${data.tokenReset}`,
      },
    }
  );
  return res.data;
};

export const setCookietsNextServer = async (
  payload: IPayloadNextServer<{ token: string; refreshToken: string }>
) => {
  const res = await axiosInstance.post(`${SCHEMA.NEXT_SERVER}/auth`, {
    token: payload.data.token,
    refreshToken: payload.data.refreshToken,
  });
  return res;
};

export const logoutNextServer = async (
  payload: IPayloadNextServer<{ force: boolean }>
) => {
  const res = await axiosInstance.post(
    `${SCHEMA.NEXT_SERVER}/auth/logout`,
    {
      force: payload.data.force,
    }
  );
  return res;
};
