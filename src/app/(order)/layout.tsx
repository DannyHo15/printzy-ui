import Stepper from "@/components/Order/Stepper";
import React from "react";
type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Stepper />
      {children}
    </div>
  );
};

export default Layout;
