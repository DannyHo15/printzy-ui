"use client";
import { Button } from "@/components/ui/button";
import { createSelectors } from "@/lib/auto-genarate-selector";
import { useUserStore } from "@/store/user/user.store";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

function Success() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userStore = createSelectors(useUserStore);
  const user = userStore.use.user();

  const vnp_Amount = searchParams.get("vnp_Amount");
  const vnp_BankCode = searchParams.get("vnp_BankCode");
  const vnp_BankTranNo = searchParams.get("vnp_BankTranNo");
  const vnp_CardType = searchParams.get("vnp_CardType");
  const vnp_OrderInfo = searchParams.get("vnp_OrderInfo");
  const vnp_PayDate = searchParams.get("vnp_PayDate");
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  const vnp_TmnCode = searchParams.get("vnp_TmnCode");
  const vnp_TransactionNo = searchParams.get("vnp_TransactionNo");
  const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
  const vnp_TxnRef = searchParams.get("vnp_TxnRef");

  if (!vnp_OrderInfo || vnp_ResponseCode !== "00") {
    return (
      <div className="flex items-start justify-center mt-6 min-h-screen bg-gray-100">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl w-full mx-4">
          <div className="flex flex-col items-center text-center text-gray-800">
            <svg
              className="w-28 h-28 text-red-500 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <h1 className="text-3xl font-semibold mb-4">Payment Failed!</h1>
            <p className="text-lg mb-6">
              Your payment was not successful. Please try again or contact our
              support team for help.
            </p>
            <Button onClick={() => router.push("/")} variant="secondary">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-center mt-6 min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl w-full mx-4">
        <div className="flex flex-col items-center text-center text-gray-800">
          <svg
            className="w-28 h-28 text-green-500 mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
          <h1 className="text-3xl font-semibold mb-4">
            Thank You for Your Order!
          </h1>
          <p className="text-lg mb-6">
            Your order is being processed by our delivery team. You will receive
            a confirmation shortly. Click the button below to view your orders.
          </p>
          <div className="text-left w-full mb-6">
            <p className="mb-2 w-full flex justify-between">
              <strong>Order Info:</strong>
              <span>{vnp_OrderInfo}</span>
            </p>
            <p className="mb-2 flex justify-between">
              <strong>Amount:</strong> {vnp_Amount}
            </p>
            <p className="mb-2 flex justify-between">
              <strong>Bank Code:</strong> {vnp_BankCode}
            </p>
            <p className="mb-2 flex justify-between">
              <strong>Bank Transaction No:</strong> {vnp_BankTranNo}
            </p>
            <p className="mb-2 flex justify-between">
              <strong>Card Type:</strong> {vnp_CardType}
            </p>
            <p className="mb-2 flex justify-between">
              <strong>Transaction No:</strong> {vnp_TransactionNo}
            </p>
            <p className="mb-2 flex justify-between">
              <strong>Transaction Status:</strong> {vnp_TransactionStatus}
            </p>
            <p className="mb-2 flex justify-between">
              <strong>Transaction Reference:</strong> {vnp_TxnRef}
            </p>
          </div>
          <Button
            onClick={() => router.push(`/my-orders/${user.id}`)}
            variant="secondary"
          >
            See My Orders
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Success;
