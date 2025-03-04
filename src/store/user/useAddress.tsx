import {
  createAddress,
  deleteAddress,
  getAddressById,
  getAddresses,
  getShippingfee,
  updateAddress,
} from "@/api/address";
import { getDistrictsByProvinceId } from "@/api/district";
import { getProvinces } from "@/api/province";
import { getWardsByDistrict } from "@/api/ward";
import {
  IAddressDataResponse,
  IAddressPayload,
  IShippingFeeParams,
  IShippingFeeResponse,
} from "@/types/address";
import { IDistrictDataResponse } from "@/types/district";
import { IProvinceDataResponse } from "@/types/province";
import { IWardDataResponse } from "@/types/ward";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
const STALE_TIME = 1000 * 60 * 60 * 24;
const formatQueryResult = (
  queryResult: UseQueryResult<
    IProvinceDataResponse[] | IDistrictDataResponse[] | IWardDataResponse[]
  >,
) => ({
  data: queryResult.data,
  error: queryResult.error,
  isLoading: queryResult.isLoading,
  isError: queryResult.isError,
});

export const useProvinces = () => {
  const queryResult = useQuery<IProvinceDataResponse[]>({
    queryKey: ["province"],
    queryFn: () => getProvinces(),
  });
  return formatQueryResult(queryResult);
};

export const useDistricts = (provinceId: string) => {
  const queryResult = useQuery<IDistrictDataResponse[]>({
    queryKey: ["district", provinceId],
    queryFn: () => getDistrictsByProvinceId(provinceId),
    enabled: !!provinceId,
  });
  return formatQueryResult(queryResult);
};

export const useWards = (districtId: string) => {
  const queryResult = useQuery<IWardDataResponse[]>({
    queryKey: ["ward", districtId],
    queryFn: () => getWardsByDistrict(districtId),
    enabled: !!districtId,
  });
  return formatQueryResult(queryResult);
};

export const useAllAddresses = () => {
  const { data, isLoading } = useQuery<IAddressDataResponse[]>({
    queryKey: ["getAllAddresses"],
    queryFn: () => getAddresses(),
  });

  return {
    listAddress: data,
    isLoadingAddresses: isLoading,
  };
};

export const useAddress = (id?: string) => {
  const queryClient = useQueryClient();
  //Query
  const { data: addressDetail, isLoading: isLoadingAddressDetail } =
    useQuery<IAddressDataResponse>({
      queryKey: ["addresses", id],
      queryFn: () => getAddressById(id!),
      enabled: !!id,
    });

  //mutation
  const { mutate: updateAddressMutate, status: updateAddressStatus } =
    useMutation({
      mutationFn: ({ id, address }: { id: string; address: IAddressPayload }) =>
        updateAddress(id, address),

      onError: (error) => {
        toast.error("Update address failed:" + error.message);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["getAllAddresses"],
        });
        toast.success("Update address successfully");
      },
    });
  const {
    mutate,
    error,
    isSuccess,
    isError,
    status,
    data: newAddress,
  } = useMutation({
    mutationFn: (address: IAddressPayload) => createAddress(address),
    onError: (error) => {
      toast.error("Create address failed:" + error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllAddresses"],
      });
      toast.success("Create address successfully");
    },
  });

  const { mutate: deleteAddressMutate } = useMutation({
    mutationFn: (id: string) => deleteAddress(id),
    onError: (error) => {
      toast.error("Delete address failed:" + error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllAddresses"],
      });
      toast.success("Delete address successfully");
    },
  });

  return {
    createAddress: mutate,
    createAddressStatus: status,
    newAddress,
    createAddressErrorDetail: error,
    createAddressSuccess: isSuccess,
    createAddressError: isError,
    updateAddress: updateAddressMutate,
    getAddressDetail: addressDetail,
    isLoadingAddressDetail,
    updateAddressStatus,
    deleteAddress: deleteAddressMutate,
  };
};

export const useShippingFee = (payload: IShippingFeeParams) => {
  const { data, isFetching, isLoading, isError } =
    useQuery<IShippingFeeResponse>({
      queryKey: ["shippingFee", payload],
      queryFn: () => getShippingfee(payload),
      enabled: !!payload.pick_province,
    });

  return {
    shippingFee: data,
    isFetching,
    isLoading,
    isError,
  };
};
