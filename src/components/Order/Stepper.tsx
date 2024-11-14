"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

const Stepper = () => {
  const pathname = usePathname();
  const navigate = useRouter();
  const steps = [
    { path: "/cart", label: "Cart" },
    { path: "/checkout", label: "Checkout" },
    { path: "/order-summary", label: "Order summary" },
  ];

  const isActive = (path: string) => {
    if (pathname === path) return true;
    if (
      path === "/cart" &&
      (pathname === "/checkout" || pathname === "/order-summary")
    )
      return true;
    if (path === "/checkout" && pathname === "/order-summary") return true;
    return false;
  };
  return (
    <div className="flex w-full justify-center h-16">
      <ol className="items-center justify-center flex w-full max-w-screen-lg text-center sm:text-lg text-base font-medium px-6">
        {steps.map((step) => (
          <li
            key={step.path}
            className={`after:border-1 flex items-center ${isActive(step.path) ? "text-secondary cursor-pointer" : "text-black"} after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10`}
            onClick={() => {
              if (!isActive(step.path)) return;
              navigate.replace(step.path);
            }}
          >
            <span className="flex gap-2 text-nowrap items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
              <CheckCircle2
                size={16}
                className={`after:fill-current ${
                  isActive(step.path)
                    ? "after:text-secondary"
                    : "after:text-gray-200"
                }`}
              />
              {step.label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Stepper;
