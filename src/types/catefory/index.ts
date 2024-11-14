import { TUploadDataResponse } from "../upload";

export type TCategoryDataResponse = {
  id: number;
  name: string;
  description: string;
  uploadId: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  upload: TUploadDataResponse;
};
