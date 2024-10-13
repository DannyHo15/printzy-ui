import { SCHEMA } from "@/constant/schema";
import axios from "axios";

export const getList = async (productId: string) => {
  const res = await axios({
    method: "GET",
    url: `${SCHEMA.API_BASE}/products/${productId}/variants`,
  });
  return res;
};

const variantsService = {
  getList,
};

export default variantsService;
