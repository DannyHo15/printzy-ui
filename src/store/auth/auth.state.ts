import { create } from "zustand";
import { IAuthAction } from "./auth.action";
import { IProfileResponse } from "@/types/user";
import {
  login as loginApi,
  setCookietsNextServer,
  register as registerApi,
  logoutNextServer,
} from "@/api/auth";
import { toast } from "react-toastify";
import { useUserStore } from "../user/user.store";

interface AuthState {
  user?: IProfileResponse;
  token?: string;
  accessToken?: string;
  isSuccess: boolean;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = create<AuthState & IAuthAction>((set) => ({
  isAuthenticated: false,
  loading: false,
  isSuccess: false,
  error: null,
  login: async (payload) => {
    try {
      set({ loading: true });
      const res = await loginApi(payload);
      toast.success("Login successful");
      const resFormNextServer = await setCookietsNextServer({
        data: {
          token: res.payload.accessToken,
          refreshToken: res.payload.refreshToken,
        },
      });
      localStorage.setItem("token", resFormNextServer.data.accessToken);
      set({ user: res.user, loading: false, isSuccess: true });
      useUserStore.getState().setUser(res.user);
    } catch (error: any) {
      set({ error: error?.message ?? "Failed to login", loading: false });
      toast.error(useAuthStore.getState().error);
    }
  },
  register: async (payload) => {
    set({ loading: true });
    try {
      // Register user
      const res = await registerApi(payload);
      set({ user: res.user, loading: false, isSuccess: true });
      toast.success("Register successful");
    } catch (error: any) {
      set({ error: error?.message ?? "Failed to register", loading: false });
      toast.error(useAuthStore.getState().error);
    }
  },
  logout: () => {
    logoutNextServer({ data: { force: true } });
  },
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  setSuccess: (success: boolean) => set({ isSuccess: success }),
}));
