import { z } from "zod";

export interface IProfileResponse {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  gender?: GenderEnum | null;
}

export const GENDER_ENUM = z.enum(["male", "female", "other"]);
export type GenderEnum = z.infer<typeof GENDER_ENUM>;
