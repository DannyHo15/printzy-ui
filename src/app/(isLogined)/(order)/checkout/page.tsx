"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { NumericFormat } from "react-number-format";
import useCartStore from "@/store/useCartStore";
import CheckoutProduct from "@/components/Product/CheckoutProduct";
import { usePayment } from "@/store/payment/usePayment";
import { EPaymentMethod } from "@/types/payment";

const CheckoutPage = () => {
  const { createVnpayUrl } = usePayment();
  const { cart, getCart } = useCartStore();

  const onSubmit = (data: any) => {
    console.log(data);
    createVnpayUrl({
      sum: 200000,
      orderId: 2,
      clientId: 1,
      tokenId: "123123",
      method: EPaymentMethod.VNPAY,
    });
    // Handle form submission
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <section className="bg-white antialiased">
      <div className="mx-auto max-w-screen-lg px-4 pb-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Order Details */}
          <div className="space-y-6">
            <div className="rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Order number</span>
                  <span className="font-medium">#ORDER-12345</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment method</span>
                  <span className="font-medium">VNPAY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping method</span>
                  <span className="font-medium">GHTK Express</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <address className="not-italic">
                <div className="font-medium">John Doe</div>
                <div className="text-gray-500">123 Street Name</div>
                <div className="text-gray-500">City, State, ZIP</div>
                <div className="text-gray-500">Phone: (123) 456-7890</div>
              </address>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="divide-y">
                {cart?.cartItems?.map((item: any, idx: number) => (
                  <CheckoutProduct
                    idx={idx}
                    key={item?.variant?.sku}
                    item={item}
                    canEdit={false}
                  />
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <NumericFormat
                    value={cart?.cartItems?.reduce(
                      (total: number, item: any) =>
                        total + item.variant.price * item.quantity,
                      0,
                    )}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" VND"}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>30,000 VND</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <NumericFormat
                    value={cart?.cartItems?.reduce(
                      (total: number, item: any) =>
                        total + item.variant.price * item.quantity,
                      30000,
                    )}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" VND"}
                  />
                </div>
              </div>
            </div>

            <Button variant="secondary" onClick={onSubmit} className="w-full">
              Pay
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
