"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React, { useCallback, useMemo, useState } from "react";
import ModalAddAddress from "./components/ModalAddAddress";

const AddressBook = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

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
      <CardContent className="py-4"></CardContent>
      {modalComponent}
    </Card>
  );
};

export default AddressBook;
