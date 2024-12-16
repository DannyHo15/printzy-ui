import { IProfileResponse } from '../user';

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IResetPasswordPayload {
  email: string;
}

export interface IResetPasswordConfirmPayload {
  tokenReset: string;
  password: string;
}

export interface ILoginResponse {
  user: IProfileResponse;
  payload: {
    accessToken: string;
    refreshToken: string;
  };
}
