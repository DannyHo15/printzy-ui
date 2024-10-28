import { createAddress, getAddresses } from "@/api/address";
import { getDistrictsByProvinceId } from "@/api/district";
import { getProvinces } from "@/api/province";
import { getWardsByDistrict } from "@/api/ward";
import { IAddressDataResponse, IAddressPayload } from "@/types/address";
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
const createQueryResult = (
  queryResult: UseQueryResult<
    IProvinceDataResponse[] | IDistrictDataResponse[] | IWardDataResponse[]
  >,
) => ({
  data: queryResult.data,
  error: queryResult.error,
  isLoading: queryResult.isLoading,
  isError: queryResult.isError,
});

export const useProvince = () => {
  const queryResult = useQuery<IProvinceDataResponse[]>({
    queryKey: ["province"],
    queryFn: () => getProvinces(),
    staleTime: STALE_TIME,
  });
  return createQueryResult(queryResult);
};

export const useDistrict = (provinceId: string) => {
  const queryResult = useQuery<IDistrictDataResponse[]>({
    queryKey: ["district", provinceId],
    queryFn: () => getDistrictsByProvinceId(provinceId),
    enabled: !!provinceId,
    staleTime: STALE_TIME,
  });
  return createQueryResult(queryResult);
};

export const useWard = (districtId: string) => {
  const queryResult = useQuery<IWardDataResponse[]>({
    queryKey: ["ward", districtId],
    queryFn: () => getWardsByDistrict(districtId),
    enabled: !!districtId,
    staleTime: STALE_TIME,
  });
  return createQueryResult(queryResult);
};

export const useAddress = () => {
  const queryClient = useQueryClient();
  const { mutate, error, isSuccess, isError } = useMutation({
    mutationFn: (address: IAddressPayload) => createAddress(address),
    onError: (error) => {
      toast.error("Create address failed:" + error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
      toast.success("Create address successfully");
    },
  });

  const { data, isLoading } = useQuery<IAddressDataResponse[]>({
    queryKey: ["addresses"],
    queryFn: () => getAddresses(),
  });

  return {
    createAddress: mutate,
    createAddressErrorDetail: error,
    createAddressSuccess: isSuccess,
    createAddressError: isError,
    listAddress: data,
    isLoadingAddresses: isLoading,
  };
};
