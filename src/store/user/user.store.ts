import { logout } from "@/api/auth";
import { IProfileResponse } from "@/types/user";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface UserState {
  user: IProfileResponse;
  addressId: string | null;
}

interface UserAction {
  setUser: (user: IProfileResponse) => void;
  setAddressId: (addressId: string | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState & UserAction>()(
  persist(
    (set) => {
      return {
        user: {} as IProfileResponse,
        addressId: "",
        setUser: (user) => set({ user }),
        setAddressId: (addressId) => set({ addressId }),
        logout: () => {
          logout();
          set({ user: {} as IProfileResponse });
        },
      };
    },
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
