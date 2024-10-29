"use client";
import { PHONE_REGEX } from "@/constant";
import { isArray, isEmpty } from "lodash";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo } from "react";
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
  useDistrict,
  useProvince,
  useWard,
} from "@/store/user/useAddress";
import { toast } from "react-toastify";
import { createSelectors } from "@/lib/auto-genarate-selector";
import { useUserStore } from "@/store/user/user.store";
interface IAddressFormProps {
  setIsOpenModal: (value: boolean) => void;
  // onReset: () => void; // Add this prop
}
const AddressForm = ({ setIsOpenModal }: IAddressFormProps) => {
  const defaultValues = useMemo(
    () => ({
      fullName: "",
      phone: "",
      province: "",
      district: "",
      ward: "",
      addressDetail: "",
    }),
    [],
  );
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
      }),
    [],
  );

  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues,
  });
  const provinceId = form.watch("province");
  const districtId = form.watch("district");
  const { reset } = form; // Destructure reset method

  //STORE
  const userStore = createSelectors(useUserStore);
  const addressId = userStore.use.addressId();

  //Load data
  const { data, isLoading: isProvinceLoading } = useProvince();
  const { data: districtData, isLoading: isDistrictLoading } =
    useDistrict(provinceId);
  const { data: wardData, isLoading: isWardLoading } = useWard(districtId);
  //Mutations
  const {
    createAddress,
    createAddressError,
    createAddressSuccess,
    getAddressDetail,
  } = useAddress(addressId ?? "");

  useEffect(() => {
    if (addressId && getAddressDetail) {
      form.setValue("fullName", getAddressDetail.fullName);
      form.setValue("phone", getAddressDetail?.phone);
      // form.setValue("province", getAddressDetail?.province.id);
      // form.setValue("district", getAddressDetail?.district.id);
      // form.setValue("ward", getAddressDetail?.ward.id);
      form.setValue("addressDetail", getAddressDetail?.addressDetail);
    }
  }, [addressId, getAddressDetail]);

  //handle action result
  useEffect(() => {
    if (createAddressSuccess) {
      setIsOpenModal(false);
    } else if (createAddressError) {
    }
  }, [createAddressSuccess, createAddressError]);

  const onSubmit = (data: z.infer<typeof AddressSchema>) => {
    const payload = {
      districtId: data.district,
      fullName: data.fullName,
      phone: data.phone,
      provinceId: data.province,
      wardId: data.ward,
      addressDetail: data.addressDetail,
    };
    createAddress(payload);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                <div>Loading...</div>
              ) : (
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue {...field} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isArray(data) &&
                      data.map((province) => (
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
                <div>Loading...</div>
              ) : (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!form.getValues("province")}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue {...field} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isArray(districtData) &&
                      districtData.map((district) => (
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
                <div>Loading...</div>
              ) : (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!form.getValues("district")}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue {...field} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isArray(wardData) &&
                      wardData.map((ward) => (
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
        <div className="mt-6 float-right">
          <Button type="submit">{!addressId ? "Create" : "Update"}</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddressForm;
