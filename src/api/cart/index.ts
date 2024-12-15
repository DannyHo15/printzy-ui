import { SCHEMA } from '@/constant/schema';
import axiosInstance from '@/lib/axiosConfig';
import axios from 'axios';
import Cookies from 'js-cookie';

const getBearerToken = () => {
  return Cookies.get('printzy_ac_token'); // Replace with your actual cookie name
};

export const getList = async () => {
  const res = await axiosInstance.get(`${SCHEMA.API_BASE}/cart`);
  return res;
};

export const add = async (
  productId: number,
  variantId: number,
  quantity: number,
  customizeUploadId?: number,
  customizePrintId?: number
) => {
  const res = await axiosInstance.post(`${SCHEMA.API_BASE}/cart/add`, {
    productId,
    customizeUploadId,
    customizePrintId,
    quantity,
    variantId,
  });
  return res.data;
};

export const update = async (
  productId: number,
  variantId: number,
  quantity: number
) => {
  const res = await axiosInstance.put(`${SCHEMA.API_BASE}/cart/update`, {
    productId,
    variantId,
    quantity,
  });
  return res;
};

export const remove = async (productId: number, variantId: number) => {
  const res = await axiosInstance.delete(`${SCHEMA.API_BASE}/cart/remove`, {
    params: { productId, variantId },
  });
  return res;
};

export const clear = async () => {
  const res = await axiosInstance.delete(`${SCHEMA.API_BASE}/cart/clear`);
  return res;
};

const cartService = {
  getList,
  add,
  update,
  remove,
  clear,
};

export default cartService;
