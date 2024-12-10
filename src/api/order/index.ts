import axiosInstance from '@/lib/axiosConfig';

export const createOrder = async (data: any) => {
  try {
    const res = await axiosInstance.post<any>('/orders', data);
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

export const getAllOrder = async () => {
  try {
    const res = await axiosInstance.get<any>(`/orders`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
