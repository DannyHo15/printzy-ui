'use client';
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import CheckoutProduct from '@/components/Product/CheckoutProduct';
import { getPurChaseByOrderId } from '@/api/purchase';
import Link from 'next/link';

export enum OrderStatus {
  PROCESSING = 'processing',
  DELIVERY = 'delivery',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

const getStatusAttributes = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PROCESSING:
      return {
        colorClass: 'bg-yellow-200 text-yellow-800',
        icon: (
          <svg
            className="me-1 Har7ksLdj_gpHuS5dC3P hDwBtOhIf4ji_OJlxtQ5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"
            ></path>
          </svg>
        ),
      };
    case OrderStatus.DELIVERY:
      return {
        colorClass: 'bg-blue-200 text-blue-800',
        icon: (
          <svg
            className="me-1 Har7ksLdj_gpHuS5dC3P hDwBtOhIf4ji_OJlxtQ5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
            ></path>
          </svg>
        ),
      };
    case OrderStatus.COMPLETED:
      return {
        colorClass: 'bg-green-200 text-green-800',
        icon: (
          <svg
            className="status-icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        ),
      };
    case OrderStatus.CANCELLED:
      return {
        colorClass: 'bg-red-200 text-red-800',
        icon: (
          <svg
            className="status-icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 6l12 12M6 18L18 6"
            />
          </svg>
        ),
      };
    case OrderStatus.REFUNDED:
      return {
        colorClass: 'bg-purple-200 text-purple-800',
        icon: (
          <svg
            className="status-icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-7 7-7-7"
            />
          </svg>
        ),
      };
    default:
      return {
        colorClass: 'bg-gray-200 text-gray-800',
        icon: (
          <svg
            className="status-icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
      };
  }
};

const OrderCard = ({ order }: { order: any }) => {
  const [open, setOpen] = useState(false);

  const [purchase, setPurchase] = useState<any>();

  const getPurchase = async (orderId: number) => {
    const purchase = await getPurChaseByOrderId(orderId);
    setPurchase(purchase);
  };

  useEffect(() => {
    getPurchase(order.id);
  }, [order]);

  const { colorClass, icon } = getStatusAttributes(order?.status);
  const date = new Date(order?.updatedAt);
  const formattedDate = format(date, 'dd MMM yyyy');
  return (
    <Card>
      <div className="p-4 w-full" key={order?.orderNumber}>
        <div className="w-full">
          <div className="flex gap-4 w-full justify-between">
            <div className="flex gap-4 items-center">
              <h3>
                Order ID:{' '}
                <span className="text-lg text-black font-semibold">
                  {order?.orderNumber}
                </span>
              </h3>

              {purchase?.status === 'Pending' && (
                <span
                  className={`flex items-center gap-1 p-1 rounded-md text-sm uppercase bg-gray`}
                >
                  <span>
                    {' '}
                    {purchase?.status === 'Pending'
                      ? 'Unpaid'
                      : purchase?.status === 'Failed'
                      ? 'Overdue'
                      : 'Paid'}
                  </span>
                </span>
              )}
              {purchase?.status === 'Completed' && (
                <span
                  className={`flex items-center gap-1 p-1 rounded-md text-sm uppercase ${colorClass}`}
                >
                  {icon}
                  <span>{order?.status}</span>
                </span>
              )}
            </div>
            <div className="flex gap-4">
              <Button variant="outline">
                <svg
                  className="track-order-icon"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z"
                  />
                </svg>
                Track order
              </Button>
              <Button variant="outline" onClick={() => setOpen(!open)}>
                <svg
                  className="additional-link-icon"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z"
                  />
                </svg>
                Order Detail
              </Button>
            </div>
          </div>

          <span className="text-base font-semibold mb-4">Order Detail</span>
          {open === true &&
            order?.orderItems?.map((orderItem: any, idx: number) => (
              <CheckoutProduct
                idx={idx}
                key={orderItem?.id}
                item={orderItem}
                canEdit={false}
              />
            ))}

          <hr className="my-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
          <div className="flex gap-6">
            <h4>
              Order date:{' '}
              <span className=" text-black font-semibold">{formattedDate}</span>
            </h4>
            <h4>
              Phone:{' '}
              <span className=" text-black font-semibold">
                (+84) {order?.address?.phone}
              </span>
            </h4>
            <h4>
              Payment method:{' '}
              <span className=" text-black font-semibold">VNPay</span>
            </h4>
          </div>
          <div>
            <h4>
              Address:{' '}
              <span className=" text-black font-semibold">{`${order?.address?.addressDetail}, ${order?.address?.ward.name}, ${order?.address?.district.name}, ${order?.address?.province.name}`}</span>
            </h4>
          </div>
          <div className="mt-2 rounded-md bg-lime-100">
            <span className="text-sm p-2 flex gap-2 items-center">
              <svg
                className="me-2 j2x7_17hqRVmwte_tWFa eVNhx7m5tjSVbfYQzDdT kbeH5ty3CtPKxXm5TXph dJBCIyiM9cLL9095_Hmw U4m6yFbNbl_ea9gVo2Uw"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                ></path>
              </svg>
              Expected delivery on Monday 16 Jul 2024
            </span>
          </div>
          {purchase?.status === 'Pending' && (
            <div className="w-full flex items-center justify-end">
              <Link href={`/checkout/${order?.id}`}>
                <Button className="w-36 mt-2 left-0 bg-secondary-dk">
                  Pay
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
export default OrderCard;
