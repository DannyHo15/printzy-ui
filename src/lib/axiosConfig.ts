import axios from 'axios';
import Cookies from 'js-cookie';
import { SCHEMA } from '@/constant/schema';
import { toast } from 'react-toastify';
import { logout } from '@/api/auth';
export const isClient = () => typeof window !== 'undefined';
const getBearerToken = () => {
  if (isClient()) {
    const sessionToken = localStorage.getItem('token');
    return sessionToken;
  }
  return '';
};

const axiosInstance = axios.create({
  baseURL: `${SCHEMA.API_BASE}`, // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request here
    config.headers['Authorization'] = `Bearer ${getBearerToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const response = error?.response;
    if (response?.status === 401) {
      logout();
    }
    if (response?.config.method === 'get') {
      toast(response?.data?.message, { type: 'error' });
    }
    return Promise.reject(error?.response?.data ?? 'Something went wrong!');
  }
);
export default axiosInstance;
