import { getAllOrder, requestCancelOrder } from "@/api/order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useOrder = (status?: string) => {
  const queryClient = useQueryClient();
  const { mutate: requestCancelMutate, isSuccess: requestCancelSuccess } =
    useMutation({
      mutationKey: ["/orders/request-cancel"],
      mutationFn: (orderId: string) => requestCancelOrder(orderId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["/orders", status],
        });
        toast.success("Request cancel success");
      },
      onError: (error) => {
        toast.error(`Request cancel fail: ${error.message}`);
      },
    });

  const { data: getOrders } = useQuery({
    queryKey: ["/orders", status],
    queryFn: () => {
      const statusFilter = status === "All" ? "" : status?.toLowerCase();

      return getAllOrder({ status: statusFilter });
    },
    enabled: !!status,
    staleTime: 0,
  });
  return { requestCancelMutate, requestCancelSuccess, getOrders };
};
