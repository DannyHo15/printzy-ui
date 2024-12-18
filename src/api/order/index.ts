import axiosInstance from "@/lib/axiosConfig";

export const createOrder = async (data: any) => {
  try {
    const res = await axiosInstance.post<any>("/orders", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderById = async (id: number) => {
  try {
    const res = await axiosInstance.get<any>(`/orders/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllOrder = async (filter: any) => {
  let query: any = {};
  if (filter.status) {
    query.status = filter.status;
  }
  try {
    const res = await axiosInstance.get<any>(`/orders`, {
      params: query,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const requestCancelOrder = async (orderId: string) => {
  try {
    const res = await axiosInstance.put<any>(
      `/orders/request-cancel/${orderId}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
