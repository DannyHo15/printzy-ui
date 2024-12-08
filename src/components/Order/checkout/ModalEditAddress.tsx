import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { createSelectors } from "@/lib/auto-genarate-selector";
import { useUserStore } from "@/store/user/user.store";
import { useAddress, useAllAddresses } from "@/store/user/useAddress";
import { IAddressDataResponse } from "@/types/address";
import { Button } from "@/components/ui/button";
import ListAddress from "./ListAddress";
import AddressForm from "@/components/forms/address-form";
import { toast } from "react-toastify";
type TModalProp = {
  isOpen: boolean;
  setIsOpenModal: (value: boolean) => void;
  setSelectedAddress?: (value: IAddressDataResponse) => void;
};
const ModalEditAddress = ({
  isOpen = false,
  setIsOpenModal,
  setSelectedAddress,
}: TModalProp) => {
  const userStore = createSelectors(useUserStore);
  const setAddressId = userStore.use.setAddressId();
  const addressId = userStore.use.addressId();
  const { isLoadingAddresses, listAddress } = useAllAddresses();

  const [isCreate, setIsCreate] = useState(false);
  const [resetForm, setResetForm] = useState<() => void>(() => {});

  const handleModal = useCallback(
    (value: boolean) => {
      console.log(value);
      if (!value) {
        setAddressId(null);
        if(resetForm) 
        resetForm(); // Reset the form when closing the modal
        setIsCreate(false);
      }
      setIsOpenModal(value);
    },
    [resetForm, setAddressId, setIsOpenModal],
  );

  const confirmChangeAddress = () => {
    const selected = listAddress?.find((item) => item.id === addressId);
    if (!selected) {
      toast.error("Please select an address");
      return;
    }
    if (setSelectedAddress) {
      setSelectedAddress(selected);
    }
    setIsOpenModal(false);
  };

  const handleCreateSuccess = () => {
    setIsCreate(false);
    setIsOpenModal(false);
  };

  return (
    <Dialog
      onOpenChange={(value) => {
        handleModal(value);
      }}
      open={isOpen}
    >
      <DialogContent className="sm:max-w-[50vw]">
        <DialogHeader className="border-b pb-2">
          <DialogTitle>
            {isCreate ? "Create address" : "My Addresses"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {isCreate ? (
          <AddressForm
            setIsOpenModal={setIsOpenModal}
            onResetForm={(resetFn) => setResetForm(resetFn)}
            onCreateSuccess={handleCreateSuccess}
          />
        ) : (
          <ListAddress setIsCreate={setIsCreate} />
        )}

        {!isCreate && (
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button onClick={confirmChangeAddress}>Save</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditAddress;
