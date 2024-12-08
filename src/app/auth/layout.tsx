import { Button } from "@/components/ui/button";
import React from "react";
interface ILayoutProps {
  children: React.ReactNode;
  params?: any;
}
export default function layout({ children }: ILayoutProps) {
  return (
    <div className="max-w-screen-sm pt-28 flex flex-col items-center justify-center m-auto">
      {children}
    </div>
  );
}
