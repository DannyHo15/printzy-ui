import envConfig from "@/lib/config.schema";

export const SCHEMA = {
  API_BASE: envConfig?.NEXT_PUBLIC_BASE_URL,
  NEXT_SERVER: envConfig?.NEXT_PUBLIC_NEXT_SERVER,
};

export const TIME_TO_CLOSE_TOAST = 3000;
