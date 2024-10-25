import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddressForm from "@/components/forms/address-form";
import { DialogDescription } from "@radix-ui/react-dialog";
type TModalProp = {
  isOpen: boolean;
  setIsOpenModal: (value: boolean) => void;
};
const ModalAddAddress = ({ isOpen = false, setIsOpenModal }: TModalProp) => {
  return (
    <Dialog onOpenChange={(value) => setIsOpenModal(value)} open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new address</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <AddressForm></AddressForm>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddAddress;
