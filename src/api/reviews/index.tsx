import { SCHEMA } from "@/constant/schema";
import axios from "axios";
import Cookies from "js-cookie";

const getBearerToken = () => {
  return Cookies.get("printzy_ac_token"); // Replace with your actual cookie name
};

export const getList = async (params: any) => {
  const res = await axios({
    method: "GET",
    url: `${SCHEMA.API_BASE}/reviews`,
    params,
  });
  return res;
};

export const getListByProductId = async (productId: string) => {
  const res = await axios({
    method: "GET",
    url: `${SCHEMA.API_BASE}/reviews/product/${productId}`,
  });
  return res;
};

export const create = async (data: any) => {
  const res = await axios({
    method: "POST",
    url: `${SCHEMA.API_BASE}/reviews`,
    headers: {
      Authorization: `Bearer ${getBearerToken()}`,
    },
    data,
  });
  return res;
};

const reviewsService = {
  getList,
  getListByProductId,
  create,
};

export default reviewsService;
