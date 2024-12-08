import axios from "axios";
import Cookies from "js-cookie";
import { SCHEMA } from "@/constant/schema";
import { toast } from "react-toastify";
import { logout } from "@/api/auth";
const getBearerToken = () => {
  return Cookies.get("printzy_ac_token"); // Replace with your actual cookie name
};

const axiosInstance = axios.create({
  baseURL: `${SCHEMA.API_BASE}`, // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request here
    // config.headers["Authorization"] = `Bearer ${getBearerToken()}`;
    config.headers["Authorization"] =
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzM1OTk2ODYsImV4cCI6MTczMzYwMzI4Niwic3ViIjoiMjEifQ._UhHd3igV0OZ5f98WKgDANHlusD4NuYL6ffj2b3zOxo`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error, "error");
    const response = error?.response;
    if (response?.status === 401) {
      logout();
    }
    if (response?.config.method === "get") {
      toast(response?.data?.message, { type: "error" });
    }
    return Promise.reject(error?.response?.data ?? "Something went wrong!");
  },
);
export default axiosInstance;
