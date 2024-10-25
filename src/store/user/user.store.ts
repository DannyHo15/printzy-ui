import { IProfileResponse } from "@/types/user";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface UserState {
  user: IProfileResponse;
}

interface UserAction {
  setUser: (user: IProfileResponse) => void;
}

export const useUserStore = create<UserState & UserAction>()(
  persist(
    (set) => ({
      user: {} as IProfileResponse,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
