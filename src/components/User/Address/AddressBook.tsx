"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React, { useCallback, useMemo, useState } from "react";
import ModalAddAddress from "./components/ModalAddAddress";
import { useAddress } from "@/store/user/useAddress";
import { Edit } from "lucide-react";

const AddressBook = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { isLoadingAddresses, listAddress } = useAddress();

  console.log(listAddress);

  const toggleModal = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, []);

  const modalComponent = useMemo(
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
      <CardContent className="py-4">
        {isLoadingAddresses ? (
          <div>Loading...</div>
        ) : (
          <div className="">
            {listAddress?.map((address) => (
              <div className="flex justify-between py-4 gap-4 border-b-gray border-b">
                <div key={address.id}>
                  <div>{address.fullName}</div>
                  <div>{address.phone}</div>
                  <div>{`${address.addressDetail}, ${address.ward.name}, ${address.district.name}, ${address.province.name}`}</div>
                </div>
                <Button
                  variant={"ghost"}
                  className="p-0 cursor-pointer"
                  asChild
                >
                  <Edit size={20} className="h-6 w-6 text-primary-dk" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {modalComponent}
    </Card>
  );
};

export default AddressBook;
