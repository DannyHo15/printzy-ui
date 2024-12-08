import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { createSelectors } from "@/lib/auto-genarate-selector";
import { useAllAddresses } from "@/store/user/useAddress";
import { useUserStore } from "@/store/user/user.store";
import { IAddressDataResponse } from "@/types/address";
import { Plus } from "lucide-react";
import React, { useCallback } from "react";

type TListAddressProp = {
  setIsCreate: (value: boolean) => void;
};

const ListAddress = ({ setIsCreate }: TListAddressProp) => {
  const { isLoadingAddresses, listAddress } = useAllAddresses();
  const userStore = createSelectors(useUserStore);
  const setAddressId = userStore.use.setAddressId();
  const addressId = userStore.use.addressId();
  const getReceiverAddress = useCallback((address: IAddressDataResponse): string => {
    if (!address) return '';
    const { addressDetail, ward, district, province } = address;
    return `${addressDetail ?? ""} - ${ward?.name ?? ""} - ${district?.name ?? ""} - ${province?.name ?? ""}`;
  }, []);

  const getReceiverContact = useCallback((address: IAddressDataResponse) => {
    if (!address) return null;
    return (
      <div className="font-medium">
        <span className="font-bold">{address.fullName}</span>
        {address.phone && ` - ${address.phone}`}
      </div>
    );
  }, []);
  
  const handleCreateAddress = () => {
    setIsCreate(true);
    setAddressId(null);
  };
  return (
    <>
      <RadioGroup
        defaultValue={addressId ?? ""}
        onValueChange={setAddressId}
      >
        {isLoadingAddresses ? (
          <Skeleton className="h-16"></Skeleton>
        ) : (
          listAddress &&
          listAddress.map((address, index) => (
            <div
              key={address.id}
              className="flex items-start gap-4 border-b pb-2"
            >
              <RadioGroupItem
                value={address.id}
                id={address.id}
                className="mt-2"
              />
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <span> {getReceiverContact(address)}</span>
                  {address.isDefault && (
                    <Badge variant="default" className="h-full">
                      Default
                    </Badge>
                  )}
                </div>
                <div className="mt-2">{getReceiverAddress(address)}</div>
              </div>
            </div>
          ))
        )}
      </RadioGroup>
      <Button
        variant="outline"
        className="w-fit"
        onClick={() => handleCreateAddress()}
      >
        <Plus size={16} className="mr-2" />
        Add new address
      </Button>
    </>
  );
};

export default ListAddress;
