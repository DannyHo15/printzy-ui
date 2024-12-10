import axiosInstance from '@/lib/axiosConfig';

export const getPurChaseByOrderId = async (orderId: number) => {
  try {
    const res = await axiosInstance.get<any>(`/purchases/order/${orderId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
