import axiosInstance from '@/lib/axiosConfig';

export const uploadCustomizeFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axiosInstance.post('/customize-uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const uploadCustomizePrintFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axiosInstance.post('/customize-uploads/print', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
