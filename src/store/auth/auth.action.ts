import { ILoginPayload, IRegisterPayload } from "@/types/auth";

export interface IAuthAction {
  login: (payload: ILoginPayload) => void;
  register: (payload: IRegisterPayload) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: boolean) => void;
}
