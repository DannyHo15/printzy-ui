import { z } from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string(),
  NEXT_PUBLIC_NEXT_SERVER: z.string(),
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_NEXT_SERVER: process.env.NEXT_PUBLIC_NEXT_SERVER,
});

const envConfig = configProject.data;

export default envConfig;
