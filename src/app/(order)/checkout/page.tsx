"use client";

import useCartStore from "@/store/useCartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import CheckoutProduct from "@/components/Product/CheckoutProduct";
import {
  EDeliveryMethod,
  EPaymentMethod,
  usePayment,
} from "@/store/payment/usePayment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { NumericFormat } from "react-number-format";
import { useAllAddresses, useShippingFee } from "@/store/user/useAddress";
import { Skeleton } from "@/components/ui/skeleton";
import { IAddressDataResponse } from "@/types/address";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRightIcon, LoaderCircle } from "lucide-react";
import { createSelectors } from "@/lib/auto-genarate-selector";
import { useUserStore } from "@/store/user/user.store";
import ModalEditAddress from "@/components/Order/checkout/ModalEditAddress";

const CheckoutPage = () => {
  const CheckoutSchema = z.object({
    voucher: z.string().optional(),
    paymentMethod: z.nativeEnum(EPaymentMethod),
    deliveryMethod: z.nativeEnum(EDeliveryMethod),
  });

  const form = useForm<z.infer<typeof CheckoutSchema>>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      paymentMethod: EPaymentMethod.VNPAY,
      deliveryMethod: EDeliveryMethod.GHTK,
    },
  });
  const { isLoadingAddresses, listAddress } = useAllAddresses();
  const userStore = createSelectors(useUserStore);
  const setAddressId = userStore.use.setAddressId();
  const addressId = userStore.use.addressId();
  const { cart, getCart } = useCartStore();
  const [productCheckout, setProductCheckout] = useState<any>({});
  const [subTotal, setSubTotal] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedAddress, setSelectedAddress] =
    useState<IAddressDataResponse>();
  const router = useRouter();

  const { createVnpayUrl } = usePayment();

  const isLoggedIn = Cookies.get("printzy_ac_token");

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
    getCart();
  }, []);

  useEffect(() => {
    if (!selectedAddress && listAddress) {
      if (addressId) {
        setSelectedAddress(
          listAddress?.find((value) => value.id === addressId),
        );
      } else setSelectedAddress(listAddress?.find((value) => value.isDefault));
    } else if (selectedAddress && listAddress) {
      setSelectedAddress(listAddress?.find((value) => value.id === addressId));
    }
  }, [listAddress]);

  useEffect(() => {
    let cal = 0;
    setProductCheckout(cart);
    cart?.cartItems?.map((item: any) => {
      cal = cal + item.variant.price * item.quantity;
    });
    setSubTotal(cal);
  }, [cart]);

  const payload = {
    pick_province: selectedAddress?.province?.name || "",
    pick_district: selectedAddress?.district?.name || "",
    province: selectedAddress?.province?.name || "",
    district: selectedAddress?.district?.name || "",
    weight:
      cart?.cartItems?.reduce(
        (total: number, item: any) =>
          total + item.variant.weight * item.quantity,
        0,
      ) || 0,
    value: subTotal,
  };

  const { shippingFee, isFetching, isLoading, isError } =
    useShippingFee(payload);

  const onSubmit = (data: any) => {
    console.log(data);
    createVnpayUrl({
      sum: 200000,
      orderId: 1,
      clientId: 1,
      tokenId: "token",
    });
    // Handle form submission
  };
  const toggleModal = useCallback(() => {
    setAddressId(selectedAddress?.id ?? "");
    setIsOpenModal((prev) => !prev);
  }, [selectedAddress]);

  const ModalComponent = useMemo(
    () => (
      <ModalEditAddress
        setIsOpenModal={setIsOpenModal}
        isOpen={isOpenModal}
        setSelectedAddress={(value: IAddressDataResponse) =>
          setSelectedAddress(value)
        } // Pass the function to update the selected address
      />
    ),
    [isOpenModal],
  );

  const getReceiverAddress = () => {
    return selectedAddress
      ? `${selectedAddress.addressDetail ?? ""} - ${selectedAddress.ward?.name ?? ""} - ${selectedAddress.district?.name ?? ""} - ${selectedAddress.province?.name ?? ""}`
      : "";
  };
  const getReceiverContact = () => {
    return selectedAddress ? (
      <div className="">
        <b> {selectedAddress.fullName ?? ""}</b>
        {` - ${selectedAddress.phone ?? ""}`}
      </div>
    ) : (
      ""
    );
  };

  return (
    <section className="bg-white antialiased h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-screen-lg px-4 2xl:px-0"
        >
          <div className="lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Delivery Details
                  </h2>
                  <Button
                    variant="linkHover2"
                    type="button"
                    className="text-secondary-dk text-base after:bg-secondary-dk"
                    onClick={toggleModal}
                  >
                    Change address
                  </Button>
                </div>

                {isLoadingAddresses ? (
                  <Skeleton className="h-[54px] w-full"></Skeleton>
                ) : selectedAddress ? (
                  <div>
                    <div>{getReceiverContact()}</div>
                    <div>{getReceiverAddress()}</div>
                  </div>
                ) : (
                  <div>Address not available</div>
                )}
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Payment</h2>
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-6"
                        >
                          <FormItem className="flex items-center border border-border p-4 rounded-lg space-x-3 min-h-[100px] space-y-0">
                            <FormControl>
                              <RadioGroupItem value={EPaymentMethod.VNPAY} />
                            </FormControl>
                            <div className="flex flex-col">
                              <FormLabel className="font-normal">
                                <Image
                                  src={"/vnpay-seeklogo.svg"}
                                  alt="vnpay-logo"
                                  width={150}
                                  height={50}
                                ></Image>
                              </FormLabel>
                              <FormDescription>
                                Pay with your VNPAY e-wallet’s
                              </FormDescription>
                            </div>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Delivery method
                </h2>
                <FormField
                  control={form.control}
                  name="deliveryMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-6"
                        >
                          <FormItem className="flex items-center border border-border p-4 rounded-lg space-x-3 min-h-[100px] space-y-0">
                            <FormControl>
                              <RadioGroupItem value={EDeliveryMethod.GHTK} />
                            </FormControl>
                            <div className="flex flex-col">
                              <FormLabel className="font-normal">
                                <Image
                                  src={"/logo-ghtk.png"}
                                  alt="vnpay-logo"
                                  width={150}
                                  height={50}
                                ></Image>
                              </FormLabel>
                              <FormDescription>
                                Save time and money with GHTK
                              </FormDescription>
                            </div>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                render={({ field }) => (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormItem>
                      <FormLabel className=" text-xl font-semibold text-gray-900">
                        Voucher
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <Button className="self-end max-w-20">Apply</Button>
                  </div>
                )}
                name={"voucher"}
                control={form.control}
              ></FormField>
            </div>

            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-sm xl:max-w-md">
              <div className="rounded-xl bg-white px-5 pt-5 mt-5 shadow-lg overflow-hidden">
                <p>Order Review</p>
                <div className="pt-5 pb-2">
                  {productCheckout?.cartItems?.length > 0 ? (
                    productCheckout.cartItems.map((item: any, idx: number) => (
                      <CheckoutProduct
                        idx={idx}
                        key={item?.variant?.sku}
                        item={item}
                      />
                    ))
                  ) : (
                    <div className="text-gray-400 text-sm mb-10 min-h-[220px]">
                      <Image
                        className="mx-auto"
                        width={200}
                        height={200}
                        loading="eager"
                        src="/empty-cart.png"
                        alt="empty-cart"
                      />
                      <p className="text-center">
                        Your basket is empty,
                        <br />
                        to start shopping click{" "}
                        <span className="underline">
                          <Link href="/shop">here</Link>
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flow-root">
                <div className="-my-3 divide-y divide-cusblack">
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-semibold uppercase text-gray-500">
                      Subtotal
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      <NumericFormat
                        value={subTotal}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={" VND"}
                        renderText={(value) => (
                          <p className="text-lg font-bold text-primary-price uppercase">
                            {value}
                          </p>
                        )}
                      />
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-sm font-normal text-gray-500">
                      Shipping fee
                    </dt>
                    {isFetching || isLoading ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      <NumericFormat
                        value={shippingFee?.fee.fee}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={" VND"}
                        renderText={(value) => (
                          <p className="text-md font-bold text-black uppercase">
                            {value}
                          </p>
                        )}
                      />
                    )}
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-semibold uppercase text-gray-900">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900">
                      <NumericFormat
                        value={
                          cart?.cartItems?.reduce(
                            (total: number, item: any) =>
                              total + item.variant.price * item.quantity,
                            0,
                          ) + shippingFee?.fee.fee
                        }
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={" VND"}
                        renderText={(value) => (
                          <p className="text-lg font-bold text-primary-price uppercase">
                            {value}
                          </p>
                        )}
                      />
                    </dd>
                  </dl>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  variant="expandIcon"
                  Icon={ArrowRightIcon}
                  size="sm"
                  iconPlacement="right"
                  className="flex w-full items-center justify-center rounded-lg bg-secondary px-5 py-2.5 text-base font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300"
                >
                  Place order now
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
      {ModalComponent}
    </section>
  );
};

export default CheckoutPage;
