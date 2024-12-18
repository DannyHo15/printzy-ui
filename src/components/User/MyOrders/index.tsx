"use client";
import React, { useEffect, useState } from "react";
import { useUserProfile } from "@/store/user/useUser";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSelectors } from "@/lib/auto-genarate-selector";
import { useUserStore } from "@/store/user/user.store";
import OrderCard from "@/components/Order/myOrder/OrderCard";
import { getAllOrder } from "@/api/order";
import { useOrder } from "@/store/order/useOrder";

const MyOrders = () => {
  const { userId: paramUserId } = useParams();
  const userId = Array.isArray(paramUserId)
    ? paramUserId[0]
    : (paramUserId ?? "");

  const userStore = createSelectors(useUserStore);
  const [orders, setOrders] = useState<any>();
  const [statusActive, setStatusActive] = useState("All");
  const setUser = userStore.use.setUser();
  const { data, isLoading, isError, error } = useUserProfile(userId);
  const { getOrders, requestCancelMutate } = useOrder(statusActive);

  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  const getCurrentOrder = async () => {
    setOrders(getOrders);
  };

  useEffect(() => {
    getCurrentOrder();
  }, [getOrders]);

  const handleStatusClick = (status: string) => {
    setStatusActive(status);
    // Filter logic for orders based on status can be added here
  };
  const handleRequestCancel = (id: string) => {
    if (!id) return;
    requestCancelMutate(id);
    // Request cancel logic can be added here
  };

  if (isError) {
    return <div>Error loading profile: {error?.message}</div>;
  }

  const statusList = [
    "All",
    "Unpaid",
    "Processing",
    "Delivery",
    "Completed",
    "Request-cancel",
    "Cancelled",
    "Refunded",
  ];

  return (
    <Card>
      <CardHeader className="justify-center">
        <CardTitle>My Orders</CardTitle>
      </CardHeader>
      <Separator />
      <div className="my-4 mx-6 sm:mb-0">
        <ul className="flex flex-wrap -m-1">
          {statusList.map((status) => (
            <li key={status} className="m-1">
              <button
                onClick={() => handleStatusClick(status)}
                className={`inline-flex items-center justify-center px-3 py-1 text-sm font-medium leading-5 transition rounded-full shadow-sm ${
                  statusActive === status
                    ? "bg-primary text-white border-blue-500"
                    : "bg-white text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                {status}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <CardContent className="py-4">
        {orders?.data?.map((order: any) => (
          <OrderCard
            handleRequestCancel={(id: string) => handleRequestCancel(id)}
            key={order.id}
            order={order}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default MyOrders;
