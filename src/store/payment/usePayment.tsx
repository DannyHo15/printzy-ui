import { createVnpayUrl } from "@/api/payment";
import { IVnpayPayload } from "@/types/payment";
import { useMutation } from "@tanstack/react-query";

export enum EPaymentMethod {
  VNPAY = "vnpay",
  MOMO = "momo",
}

export const EDeliveryMethod = {
  COD: "cod",
  GHTK: "ghtk",
};

export const usePayment = () => {
  const { mutate: createVnpayUrlMutation } = useMutation({
    mutationKey: ["/payments/vnpay/create_payment_url"],
    mutationFn: (data: IVnpayPayload) => createVnpayUrl(data),
    onSuccess: ({ data }) => {
      window.location.href = data.vnpUrl;
    },
  });
  return { createVnpayUrl: createVnpayUrlMutation };
};
