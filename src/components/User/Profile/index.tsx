"use client";
import React, { useEffect, useState } from "react";
import { useUserProfile } from "@/store/user/useUser";
import { useParams } from "next/navigation";
import { IProfileResponse } from "@/types/user";
import { Separator } from "@/components/ui/separator";
import ProfileForm from "@/components/forms/profile-forms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSelectors } from "@/lib/auto-genarate-selector";
import { useUserStore } from "@/store/user/user.store";
interface ProfileProps {
  userId: string;
}
const Profile = () => {
  const { userId: paramUserId } = useParams();
  const userId = Array.isArray(paramUserId)
    ? paramUserId[0]
    : (paramUserId ?? "");

  const userStore = createSelectors(useUserStore);
  const setUser = userStore.use.setUser();
  const { data, isLoading, isError, error } = useUserProfile(userId);
  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  if (isError) {
    return <div>Error loading profile: {error?.message}</div>;
  }
  return (
    <Card>
      <CardHeader className="justify-center">
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="py-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ProfileForm
            initialData={data ?? ({} as IProfileResponse)}
            userId={userId}
          />
        )}
      </CardContent>
    </Card>
  );
};
export default Profile;
