'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { usePayment } from '@/store/payment/usePayment';
import { EPaymentMethod } from '@/types/payment';
import { getOrderById } from '@/api/order';
import CheckoutProduct from '@/components/Product/CheckoutProduct';
import { toast } from 'react-toastify';

const CheckoutPage = ({ params }: { params: { orderId: string } }) => {
  const { createVnpayUrl } = usePayment();
  const [order, setOrder] = useState<any>();

  const onSubmit = (data: any) => {
    if (!order) {
      toast.error('Fail to pay');
    }
    createVnpayUrl({
      sum: +order.total + +order.shippingFee,
      orderId: order.orderNumber,
      clientId: order.client.id,
      tokenId: '123123',
      method: EPaymentMethod.VNPAY,
    });
  };

  const getCurrentOrder = async () => {
    const orderData = await getOrderById(+params.orderId);
    setOrder(orderData);
  };

  useEffect(() => {
    getCurrentOrder();
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
                  <span className="font-medium">#{order?.orderNumber}</span>
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
              <h2 className="text-xl font-semibold mb-4">Information</h2>
              <address className="not-italic">
                <div className="font-medium">{order?.address?.fullName}</div>
                <div className="text-gray-500">
                  {order?.address.addressDetail}
                </div>
                <div className="text-gray-500">
                  {order?.address?.province?.name}
                  {' - '}
                  {order?.address?.district?.name}
                  {' - '}
                  {order?.address?.ward?.name}
                </div>
                <div className="text-gray-500">
                  Phone: (+84) {order?.address.phone}
                </div>
              </address>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              {order?.orderItems?.map((orderItem: any, idx: number) => (
                <CheckoutProduct
                  idx={idx}
                  key={orderItem?.id}
                  item={orderItem}
                  canEdit={false}
                />
              ))}

              <div className="mt-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <NumericFormat
                    value={order?.total}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={' VND'}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>{order?.shippingFee} VND</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <NumericFormat
                    value={+order?.total + +order?.shippingFee}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={' VND'}
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
