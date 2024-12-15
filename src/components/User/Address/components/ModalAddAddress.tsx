import React, { useCallback, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { createSelectors } from '@/lib/auto-genarate-selector';
import { useUserStore } from '@/store/user/user.store';
import AddressForm from '@/components/forms/address-form';
type TModalProp = {
  isOpen: boolean;
  setIsOpenModal: (value: boolean) => void;
};
const ModalAddAddress = ({ isOpen = false, setIsOpenModal }: TModalProp) => {
  const userStore = createSelectors(useUserStore);
  const setAddressId = userStore.use.setAddressId();
  const addressId = userStore.use.addressId();

  const [resetForm, setResetForm] = useState<() => void>(() => () => {});

  const handleModal = useCallback(
    (value: boolean) => {
      if (!value) {
        setAddressId(null);
        resetForm(); // Reset the form when closing the modal
      }
      setIsOpenModal(value);
    },
    [resetForm, setAddressId, setIsOpenModal]
  );
  return (
    <Dialog
      onOpenChange={(value) => {
        handleModal(value);
      }}
      open={isOpen}
    >
      <DialogContent className="sm:max-w-[425px] mt-10">
        <DialogHeader>
          <DialogTitle>
            {!addressId ? 'Add new address' : 'Update address'}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <AddressForm setIsOpenModal={setIsOpenModal}></AddressForm>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddAddress;
