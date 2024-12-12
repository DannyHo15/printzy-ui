"use client";
import { PHONE_REGEX } from "@/constant";
import { isArray } from "lodash";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  useAddress,
  useDistricts,
  useProvinces,
  useWards,
} from "@/store/user/useAddress";
import { createSelectors } from "@/lib/auto-genarate-selector";
import { useUserStore } from "@/store/user/user.store";
import { Skeleton } from "../ui/skeleton";
import { Checkbox } from "../ui/checkbox";
interface IAddressFormProps {
  setIsOpenModal: (value: boolean) => void;
  onResetForm?: (resetFn: () => void) => void;
  onCreateSuccess?: () => void;
}
const AddressForm = ({
  setIsOpenModal,
  onResetForm,
  onCreateSuccess,
}: IAddressFormProps) => {
  //STORE
  const userStore = createSelectors(useUserStore);
  const addressId = userStore.use.addressId();
  const setAddressId = userStore.use.setAddressId();
  const AddressSchema = useMemo(
    () =>
      z.object({
        fullName: z.string().min(1, "Full name is required"),
        phone: z
          .string()
          .min(1, "Phone number is required")
          .regex(new RegExp(PHONE_REGEX), "Invalid phone number"),
        province: z.string().min(1, "Province is required"),
        district: z.string().min(1, "District is required"),
        ward: z.string().min(1, "Ward is required"),
        addressDetail: z.string().min(1, "Address detail is required"),
        isDefault: z.boolean().optional(),
      }),
    [],
  );

  //Load data
  const {
    createAddress,
    createAddressError,
    createAddressSuccess,
    getAddressDetail,
    updateAddress,
    updateAddressStatus,
    newAddress,
  } = useAddress(addressId ?? "");

  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      province: "",
      district: "",
      ward: "",
      addressDetail: "",
      isDefault: false,
    },
  });
  const provinceId = form.watch("province");
  const districtId = form.watch("district");
  const { reset } = form; // Destructure reset method

  ////Mutations
  const { data: provincesData = [], isLoading: isProvinceLoading } =
    useProvinces();
  const { data: districtsData = [], isLoading: isDistrictLoading } =
    useDistricts(provinceId);
  const { data: wardsData = [], isLoading: isWardLoading } =
    useWards(districtId);

  // Load existing address details
  useEffect(() => {
    if (addressId && getAddressDetail) {
      const {
        fullName,
        phone,
        province,
        district,
        ward,
        addressDetail,
        isDefault,
      } = getAddressDetail;

      // Use reset instead of setValue for bulk updates
      form.reset({
        fullName,
        phone,
        province: province.id.toString(),
        district: district.id.toString(),
        ward: ward.id.toString(),
        addressDetail,
        isDefault,
      });
    }
  }, [addressId, getAddressDetail, form.reset]);
  //handle action result
  useEffect(() => {
    if (createAddressSuccess) {
      setAddressId(newAddress?.id);
      setIsOpenModal(false);
      if (onCreateSuccess) onCreateSuccess();
    } else if (createAddressError) {
    }
  }, [createAddressSuccess, createAddressError]);

  useEffect(() => {
    if (updateAddressStatus === "success") {
      setIsOpenModal(false);
    }
  }, [updateAddressStatus]);

  useEffect(() => {
    console.log("reset form", onResetForm);
    if (onResetForm) {
      onResetForm(() => form.reset);
    }
  }, [form.reset, onResetForm]);

  const onSubmit = async (data: z.infer<typeof AddressSchema>) => {
    const payload = {
      districtId: data.district,
      fullName: data.fullName,
      phone: data.phone,
      provinceId: data.province,
      wardId: data.ward,
      addressDetail: data.addressDetail,
      isDefault: data.isDefault,
    };
    if (addressId) {
      updateAddress({ id: addressId, address: payload });
    } else createAddress(payload);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name={"fullName"}
          control={form.control}
        ></FormField>
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="province"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province</FormLabel>
              {isProvinceLoading ? (
                <Skeleton className="w-full h-[40px] " />
              ) : (
                <Select
                  {...field}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isArray(provincesData) &&
                      provincesData.map((province) => (
                        <SelectItem
                          key={`${province.id}`}
                          value={province.id.toString()}
                        >
                          {province.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="district"
          control={form.control}
          disabled={!form.getValues("province")}
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              {isDistrictLoading ? (
                <Skeleton className="w-full h-[40px] " />
              ) : (
                <Select
                  {...field}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isArray(districtsData) &&
                      districtsData.map((district) => (
                        <SelectItem
                          key={district.id}
                          value={district.id.toString()}
                        >
                          {district.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}{" "}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="ward"
          disabled={!form.getValues("district")}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ward</FormLabel>
              {isWardLoading ? (
                <Skeleton className="w-full h-[40px] " />
              ) : (
                <Select
                  {...field}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isArray(wardsData) &&
                      wardsData.map((ward) => (
                        <SelectItem key={ward.id} value={ward.id.toString()}>
                          {ward.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}{" "}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="addressDetail"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Detail</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {addressId && (
          <FormField
            name="isDefault"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Default address
                </FormLabel>
              </FormItem>
            )}
          />
        )}

        <div className="mt-6 float-right">
          <Button type="submit">{!addressId ? "Create" : "Update"}</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddressForm;
