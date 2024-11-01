"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GENDER_ENUM, IProfileResponse } from "@/types/user";
import { useUserProfile } from "@/store/user/useUser";
import { toast } from "react-toastify";
interface IProfileFormProps {
  initialData: IProfileResponse | null;
  userId: string;
}
const getDefaultValues = (initialData: IProfileResponse | null) => ({
  email: initialData?.email || "",
  firstName: initialData?.firstName || "",
  lastName: initialData?.lastName || "",
  password: "",
  newPassword: "",
  gender: initialData?.gender,
  confirmPassword: "",
});
const ProfileForm = ({ initialData, userId }: IProfileFormProps) => {
  const defaultValues = getDefaultValues(initialData);
  const [changePassword, setChangePassword] = useState(false);
  const {
    updateProfile,
    updateProfileSuccess,
    updateProfileError,
    updateProfileMessage,
  } = useUserProfile(userId);

  const toastUpdateProfile = (
    status: "error" | "success",
    message?: string,
  ) => {
    if (status === "success")
      return toast.success("Your profile has been updated successfully");
    else return toast.error(message ?? "Profile update failed");
  };

  useEffect(() => {
    if (updateProfileSuccess) {
      toastUpdateProfile("success");
    } else if (updateProfileError) {
      toastUpdateProfile("error", updateProfileMessage);
    }
  }, [updateProfileError, updateProfileSuccess]);

  const ProfileSchema = z
    .object({
      firstName: z.string().min(1, "Fisrt name is required"),
      lastName: z.string().optional(),
      email: z.string().optional(),
      gender: GENDER_ENUM.nullable(),
      ...(changePassword && {
        password: z
          .string()
          .min(8, "Password must be at least 8 characters long"),
        newPassword: z
          .string()
          .min(8, "New password must be at least 8 characters long"),
        confirmPassword: z
          .string()
          .min(8, "Confirm password must be at least 8 characters long"),
      }),
    })
    .refine(
      (data) => !changePassword || data.newPassword === data.confirmPassword,
      {
        message: "New password and confirm password must match",
        path: ["confirmPassword"],
      },
    );
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    updateProfile(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl space-y-8 m-auto"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          disabled={true}
        ></FormField>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl className="">
                <RadioGroup
                  className="flex space-x-4"
                  onValueChange={field.onChange}
                  defaultValue={field.value || ""} // Convert null to empty string
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="other" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Rather not say
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <div className="flex items-center gap-2">
          <Checkbox
            id="terms1"
            checked={changePassword}
            aria-label="Change password"
            onCheckedChange={(checked: boolean) => setChangePassword(checked)}
          />
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Change password
          </label>
        </div>
        <div
          className={`transition-all duration-500 ease-in-out ${
            changePassword
              ? "max-h-screen h-full opacity-100"
              : "max-h-0 hidden opacity-0"
          }  `}
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    value={field.value as string}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    value={field.value as string}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    value={field.value as string}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        </div>

        <Button type="submit" className="z-10">
          Update
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
