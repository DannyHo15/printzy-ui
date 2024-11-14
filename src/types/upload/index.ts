export type TUploadDataResponse = {
  id: number;
  url: string;
  name: string;
  type: string;
  size: number;
  isDeleted: boolean;
  createdAt: string;
  fileName: string;
  internalPath: string;
  mimetype: string;
  originalName: string;
  path: string;
  updatedAt: string;
};

export type TPhoto = {
  id: number;
  productId: number;
  uploadId: number;
  createdAt: string;
  updatedAt: string;
};
