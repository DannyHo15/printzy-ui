import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerOverlay,
  DrawerClose,
} from "../ui/drawer";
interface Props {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
}
const SubContent = ({ children, title, isOpen }: Props) => {
  return (
    <div className="w-60 h-full">
      <Drawer shouldScaleBackground={false} direction="left" open={isOpen}>
        <DrawerContent>
          <DrawerOverlay className="bg-transparent inset-1" />
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          {children}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SubContent;
