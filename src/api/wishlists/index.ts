import { SCHEMA } from '@/constant/schema';
import axios from 'axios';
import Cookies from 'js-cookie';

const getBearerToken = () => {
  return Cookies.get('printzy_ac_token'); // Replace with your actual cookie name
};

export const getList = async () => {
  const res = await axios({
    method: 'GET',
    url: `${SCHEMA.API_BASE}/wishlists`,
    headers: {
      Authorization: `Bearer ${getBearerToken()}`,
    },
  });
  return res;
};

export const add = async (productId: string) => {
  const res = await axios({
    method: 'POST',
    url: `${SCHEMA.API_BASE}/wishlists/add`,
    data: { productId },
    headers: {
      Authorization: `Bearer ${getBearerToken()}`,
    },
  });
  return res;
};

export const remove = async (productId: string) => {
  const res = await axios({
    method: 'DELETE',
    url: `${SCHEMA.API_BASE}/wishlists/remove`,
    data: { productId },
    headers: {
      Authorization: `Bearer ${getBearerToken()}`,
    },
  });
  return res;
};

const wishlistsService = {
  getList,
  add,
  remove,
};

export default wishlistsService;
