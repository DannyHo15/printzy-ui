import { getProfile, updateProfile } from "@/api/user";
import { IProfileResponse } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useUserProfile = (id: string) => {
  const queryClient = useQueryClient();

  const fetchProfile = useCallback(async () => {
    try {
      return await getProfile(id);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }, [id]);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["users/profile", id],
    queryFn: fetchProfile,
  });

  const mutation = useMutation({
    mutationFn: async (updatedData: Partial<IProfileResponse>) => {
      try {
        return await updateProfile(id, updatedData);
      } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users/profile", id],
      });
    },
  });

  return {
    data,
    error,
    isLoading,
    isError,
    updateProfile: mutation.mutate,
    updateProfileSuccess: mutation.isSuccess,
    updateProfileError: mutation.isError,
    updateProfileMessage: mutation.error?.message,
  };
};
