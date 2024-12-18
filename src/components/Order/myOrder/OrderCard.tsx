"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import CheckoutProduct from "@/components/Product/CheckoutProduct";
import { getPurChaseByOrderId } from "@/api/purchase";
import Link from "next/link";
import {
  Check,
  Hourglass,
  ReceiptText,
  RefreshCw,
  Truck,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useOrder } from "@/store/order/useOrder";

export enum OrderStatus {
  PROCESSING = "processing",
  DELIVERY = "delivery",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  REQUEST_CANCEL = "request-cancel",
}

const getStatusAttributes = (status: OrderStatus) => {
  const statusMap = {
    [OrderStatus.PROCESSING]: {
      colorClass: "bg-yellow-200 text-yellow-800",
      icon: <Hourglass size={18} />,
    },
    [OrderStatus.DELIVERY]: {
      colorClass: "bg-blue-200 text-blue-800",
      icon: <Truck size={18} />,
    },
    [OrderStatus.COMPLETED]: {
      colorClass: "bg-green-200 text-green-800",
      icon: <Check />,
    },
    [OrderStatus.CANCELLED]: {
      colorClass: "bg-red-200 text-red-800",
      icon: <X size={18} />,
    },
    [OrderStatus.REFUNDED]: {
      colorClass: "bg-purple-200 text-purple-800",
      icon: <RefreshCw size={18} />,
    },
    [OrderStatus.REQUEST_CANCEL]: {
      colorClass: "bg-red-200 text-red-800",
      icon: <X size={18} />,
    },

    default: {
      colorClass: "bg-gray-200 text-gray-800",
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
    },
  };

  return statusMap[status] || statusMap.default;
};
const OrderCard = ({
  order,
  handleRequestCancel,
}: {
  order: any;
  handleRequestCancel?: (id: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [purchase, setPurchase] = useState<any>();

  const { requestCancelMutate } = useOrder("processing");
  useEffect(() => {
    const fetchPurchase = async () => {
      const purchase = await getPurChaseByOrderId(order.id);
      setPurchase(purchase);
    };
    fetchPurchase();
  }, [order]);

  const { colorClass, icon } = getStatusAttributes(order?.status);
  const date = new Date(order?.updatedAt);
  const expectedDate = new Date(date.getTime() + 5 * 24 * 60 * 60 * 1000);
  const formattedDate = format(date, "dd MMM yyyy");
  const formattedExpectedDate = format(expectedDate, "dd MMM yyyy");

  const handleConfirm = (id: string) => {
    // Add your confirm logic here
    handleRequestCancel?.(id);
    setOpenDialog(false);
  };

  return (
    <Card className="p-4 w-full mb-4">
      <div className="w-full">
        <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
          <div className="flex flex-wrap gap-4 mb-4 items-center">
            <h3 className="text-lg font-semibold">
              Order ID: <span className="text-black">{order?.orderNumber}</span>
            </h3>

            {purchase?.status === "Pending" && (
              <span className="flex items-center gap-1 p-1 rounded-md text-sm uppercase bg-gray-200">
                Unpaid
              </span>
            )}
            {purchase?.status === "Completed" && (
              <span
                className={`flex items-center gap-1 p-1 rounded-md text-sm uppercase ${colorClass}`}
              >
                {icon}
                <span>{order?.status}</span>
              </span>
            )}

            <span className="flex items-center gap-1 p-1 rounded-md text-sm uppercase bg-green-200 text-green-800">
              <span>{+order?.total + +order.shippingFee} VND</span>
            </span>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" size="sm" onClick={() => setOpen(!open)}>
              <ReceiptText size={18} className="mr-2" />
              Order Detail
            </Button>
          </div>
        </div>
        <Separator className="mb-2" />

        {open && (
          <div className="flex flex-col">
            <span className="text-base font-semibold mb-4">Order Detail</span>
            {order?.orderItems?.map((orderItem: any, idx: number) => (
              <CheckoutProduct
                idx={idx}
                key={orderItem?.id}
                item={orderItem}
                canEdit={false}
              />
            ))}
            {order?.status === OrderStatus.PROCESSING && (
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-secondary-dk self-end">
                    Request cancel
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Confirm request</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-2 justify-between items-center space-x-2 relative">
                    <span>
                      Are you sure you want to request to cancel this order{" "}
                      <b>{order?.orderNumber}</b>?
                    </span>
                    <div className="grid flex-1 gap-2 w-full">
                      <Label htmlFor="link">Reason</Label>
                      <Textarea className="resize-none" rows={4} id="link" />
                    </div>
                  </div>
                  <DialogFooter className="sm:justify-end">
                    <Button
                      variant="secondary"
                      onClick={() => handleConfirm(order?.id)}
                    >
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          <h4>
            Order date:{" "}
            <span className="text-black font-semibold">{formattedDate}</span>
          </h4>
          <h4>
            Phone:{" "}
            <span className="text-black font-semibold">
              (+84) {order?.address?.phone}
            </span>
          </h4>
          <h4>
            Payment method:{" "}
            <span className="text-black font-semibold">VNPay</span>
          </h4>
        </div>
        <div>
          <h4>
            Address:{" "}
            <span className="text-black font-semibold">{`${order?.address?.addressDetail}, ${order?.address?.ward.name}, ${order?.address?.district.name}, ${order?.address?.province.name}`}</span>
          </h4>
        </div>
        <div className="mt-2 rounded-md bg-lime-100">
          <span className="text-sm p-2 flex gap-2 items-center">
            <svg
              className="me-2"
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
                d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
              ></path>
            </svg>
            Expected delivery on Monday {formattedExpectedDate}
          </span>
        </div>
        {purchase?.status === "Pending" && (
          <div className="w-full flex items-center justify-end">
            <Link href={`/checkout/${order?.id}`}>
              <Button className="w-36 mt-2 bg-secondary-dk">Pay</Button>
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
};

export default OrderCard;
