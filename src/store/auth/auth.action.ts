import {
  ILoginPayload,
  IRegisterPayload,
  IResetPasswordConfirmPayload,
  IResetPasswordPayload,
} from '@/types/auth';

export interface IAuthAction {
  login: (payload: ILoginPayload) => void;
  register: (payload: IRegisterPayload) => void;
  reset: (payload: IResetPasswordPayload) => void;
  resetConfirm: (payload: IResetPasswordConfirmPayload) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: boolean) => void;
}
