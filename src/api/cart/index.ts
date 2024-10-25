import { SCHEMA } from "@/constant/schema";
import axios from "axios";
import Cookies from "js-cookie";

const getBearerToken = () => {
  return Cookies.get("printzy_ac_token"); // Replace with your actual cookie name
};

export const getList = async () => {
  const res = await axios({
    method: "GET",
    url: `${SCHEMA.API_BASE}/cart`,
    headers: {
      Authorization: `Bearer ${getBearerToken()}`,
    },
  });
  return res;
};

export const add = async (
  productId: number,
  customizeUploadId: number,
  quantity: number
) => {
  const res = await axios({
    method: "POST",
    url: `${SCHEMA.API_BASE}/cart/add`,
    data: { productId, customizeUploadId, quantity },
    headers: {
      Authorization: `Bearer ${getBearerToken()}`,
    },
  });
  return res;
};

export const update = async (
  productId: number,
  variantId: number,
  quantity: number
) => {
  const res = await axios({
    method: "PUT",
    url: `${SCHEMA.API_BASE}/cart/update`,
    data: { productId, variantId, quantity },
    headers: {
      Authorization: `Bearer ${getBearerToken()}`,
    },
  });
  return res;
};

export const remove = async (productId: number, variantId: number) => {
  const res = await axios({
    method: "DELETE",
    url: `${SCHEMA.API_BASE}/cart/remove`,
    data: { productId, variantId },
    headers: {
      Authorization: `Bearer ${getBearerToken()}`,
    },
  });
  return res;
};

export const clear = async () => {
  const res = await axios({
    method: "DELETE",
    url: `${SCHEMA.API_BASE}/cart/clear`,
    headers: {
      Authorization: `Bearer ${getBearerToken()}`,
    },
  });
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
