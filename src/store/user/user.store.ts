import { IProfileResponse } from "@/types/user";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface UserState {
  user: IProfileResponse;
  addressId: string | null;
}

interface UserAction {
  setUser: (user: IProfileResponse) => void;
  setAddressId: (addressId: string | null) => void;
}

export const useUserStore = create<UserState & UserAction>()(
  persist(
    (set) => ({
      user: {} as IProfileResponse,
      addressId: "",
      setUser: (user) => set({ user }),
      setAddressId: (addressId) => set({ addressId }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
