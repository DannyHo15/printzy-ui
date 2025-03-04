import { create } from 'zustand';

// Định nghĩa kiểu dữ liệu cho mỗi ảnh
interface Image {
  file: Blob;
  name: string;
  url: string; // Thêm trường URL để lưu trữ base64 hoặc URL ảnh
}

// Định nghĩa kiểu dữ liệu cho store
interface ImageStore {
  images: Image[];
  addImage: (image: Image) => void;
  removeImage: (index: number) => void;
  clearImages: () => void;
}

// Tạo store printzyImageGenerateHistory với Zustand
const usePrintzyImageGenerateHistory = create<ImageStore>((set) => ({
  images:
    typeof window !== 'undefined' &&
    localStorage.getItem('printzyImageGenerateHistory')
      ? JSON.parse(localStorage.getItem('printzyImageGenerateHistory') || '[]')
      : [], // Lấy lịch sử tải lên từ localStorage nếu có và chỉ khi chạy trên client-side
  addImage: (image) => {
    set((state) => {
      const newImages = [...state.images, image];
      if (typeof window !== 'undefined') {
        // Cập nhật lại localStorage với lịch sử mới chỉ khi chạy trên client-side
        localStorage.setItem(
          'printzyImageGenerateHistory',
          JSON.stringify(newImages)
        );
      }
      return { images: newImages };
    });
  },
  removeImage: (index) => {
    set((state) => {
      const newImages = state.images.filter((_, i) => i !== index);
      if (typeof window !== 'undefined') {
        // Cập nhật lại localStorage với danh sách mới chỉ khi chạy trên client-side
        localStorage.setItem(
          'printzyImageGenerateHistory',
          JSON.stringify(newImages)
        );
      }
      return { images: newImages };
    });
  },
  clearImages: () => {
    set({ images: [] });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('printzyImageGenerateHistory'); // Xóa lịch sử trong localStorage chỉ khi chạy trên client-side
    }
  },
}));

export default usePrintzyImageGenerateHistory;
