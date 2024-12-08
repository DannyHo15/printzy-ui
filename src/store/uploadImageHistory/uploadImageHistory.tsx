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

// Tạo store printzyImageHistory với Zustand
const usePrintzyImageHistory = create<ImageStore>((set) => ({
  images:
    typeof window !== 'undefined' && localStorage.getItem('printzyImageHistory')
      ? JSON.parse(localStorage.getItem('printzyImageHistory') || '[]')
      : [], // Lấy lịch sử tải lên từ localStorage nếu có và chạy trên client-side
  addImage: (image) => {
    set((state) => {
      const newImages = [...state.images, image];
      if (typeof window !== 'undefined') {
        // Cập nhật lại localStorage với lịch sử mới chỉ khi chạy trên client-side
        localStorage.setItem('printzyImageHistory', JSON.stringify(newImages));
      }
      return { images: newImages };
    });
  },
  removeImage: (index) => {
    set((state) => {
      const newImages = state.images.filter((_, i) => i !== index);
      if (typeof window !== 'undefined') {
        // Cập nhật lại localStorage với danh sách mới chỉ khi chạy trên client-side
        localStorage.setItem('printzyImageHistory', JSON.stringify(newImages));
      }
      return { images: newImages };
    });
  },
  clearImages: () => {
    set({ images: [] });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('printzyImageHistory'); // Xóa lịch sử trong localStorage chỉ khi chạy trên client-side
    }
  },
}));

export default usePrintzyImageHistory;
