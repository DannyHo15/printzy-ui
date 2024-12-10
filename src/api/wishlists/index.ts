import { SCHEMA } from '@/constant/schema';
import axiosInstance from '@/lib/axiosConfig';
import axios from 'axios';
import Cookies from 'js-cookie';

const getBearerToken = () => {
  return Cookies.get('printzy_ac_token'); // Replace with your actual cookie name
};

export const getList = async () => {
  const res = await axiosInstance.get('wishlists');
  return res;
};

export const add = async (productId: string) => {
  const res = await axiosInstance.post('wishlists/add', { productId });
  return res;
};

export const remove = async (productId: string) => {
  const res = await axiosInstance.delete(`wishlists/remove/${productId}`);
  return res;
};

const wishlistsService = {
  getList,
  add,
  remove,
};

export default wishlistsService;
