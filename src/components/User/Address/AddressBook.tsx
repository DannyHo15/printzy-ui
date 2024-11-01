"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React, { useCallback, useMemo, useState } from "react";
import ModalAddAddress from "./components/ModalAddAddress";
import { useAddress, useAllAddresses } from "@/store/user/useAddress";
import { Edit, Trash } from "lucide-react";
import { createSelectors } from "@/lib/auto-genarate-selector";
import { useUserStore } from "@/store/user/user.store";
import AlertDialogComponent from "@/components/utils/AlertDialog";

const AddressBook = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const { isLoadingAddresses, listAddress } = useAllAddresses();
  const { deleteAddress } = useAddress();
  const userStore = createSelectors(useUserStore);
  const setAddressId = userStore.use.setAddressId();

  const toggleModal = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, []);
  const handleDelete = useCallback((addressId: string) => {
    setSelectedAddressId(addressId);
    setIsAlertDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    // deleteAddress(selectedAddressId);
    deleteAddress(selectedAddressId ?? "");
    setIsAlertDialogOpen(false);
  }, [selectedAddressId]);

  const ModalComponent = useMemo(
    () => (
      <ModalAddAddress setIsOpenModal={setIsOpenModal} isOpen={isOpenModal} />
    ),
    [isOpenModal],
  );

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Address</CardTitle>
        <Button className="" onClick={toggleModal}>
          Add New
        </Button>
      </CardHeader>
      <Separator />
      <CardContent className="py-5">
        {isLoadingAddresses ? (
          <div>Loading...</div>
        ) : (
          <div className="">
            {listAddress?.map((address) => (
              <div
                className="flex justify-between py-5 gap-5 border-b-gray border-b"
                key={address.id}
              >
                <div>
                  <div>{address.fullName}</div>
                  <div>{address.phone}</div>
                  <div>{`${address.addressDetail}, ${address.ward.name}, ${address.district.name}, ${address.province.name}`}</div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={"ghost"}
                    className="p-0 cursor-pointer"
                    asChild
                    onClick={() => {
                      setAddressId(address.id);
                      toggleModal();
                    }}
                  >
                    <Edit size={20} className="h-5 w-5 text-primary-dk" />
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="p-0 cursor-pointer"
                    asChild
                    onClick={() => {
                      handleDelete(address.id);
                    }}
                  >
                    <Trash size={20} className="h-5 w-5 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        <AlertDialogComponent
          open={isAlertDialogOpen}
          onConfirm={handleConfirmDelete}
          title={"Address delete"}
          content="Are you sure you want to delete this address?"
          onOpenChange={() => setIsAlertDialogOpen(!isAlertDialogOpen)}
        />
      </CardContent>
      {ModalComponent}
    </Card>
  );
};

export default AddressBook;
