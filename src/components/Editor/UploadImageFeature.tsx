import { Editor } from '@/types/editor';
import { useCallback, useState } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import { Button } from '../ui/button';
import { Upload } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import usePrintzyImageHistory from '@/store/uploadImageHistory/uploadImageHistory';

interface IUploadImageFeatureProps {
  editor: Editor;
}

const uploadOptions = [
  { key: 'None', value: 'none' },
  { key: 'Remove background', value: 'remove-background' },
];

export default function UploadImageFeature({
  editor,
}: IUploadImageFeatureProps) {
  const [option, setOption] = useState('none');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use the Zustand store to manage the image history
  const { images, addImage } = usePrintzyImageHistory();

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;

        // Tạo image object chứa base64 và Blob
        const image = {
          file: file,
          name: file.name,
          url: base64, // Lưu base64 vào url
        };

        if (option === 'remove-background') {
          removeBackground(file);
        } else {
          editor.addImageForFile(file);
          addImage(image);
        }
      };
      reader.readAsDataURL(file);
    },
    [option]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    noClick: true,
    multiple: false,
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
  });

  // Function to handle removing background
  const removeBackground = async (file: File) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/remove-background', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to remove background');
      }

      const blob = await response.blob();
      const processedFile = new File([blob], 'processed-image.png', {
        type: blob.type,
      });

      // Chuyển blob thành base64 để lưu trữ và hiển thị
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;

        // Lưu ảnh đã xử lý dưới dạng base64 và Blob
        addImage({
          file: processedFile,
          name: processedFile.name,
          url: base64, // Lưu base64 để hiển thị ảnh
        });

        // Thêm ảnh đã xử lý vào editor
        editor.addImageForFile(processedFile);
      };
      reader.readAsDataURL(blob); // Đọc blob dưới dạng base64
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = async (image: any) => {
    let blob;

    // Nếu image.url là base64, chuyển thành Blob
    if (image.url.startsWith('data:image')) {
      const base64 = image.url.split(',')[1]; // Loại bỏ header base64
      const binary = atob(base64); // Giải mã base64
      const array = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
      }
      blob = new Blob([array], { type: 'image/png' }); // Tạo Blob
    } else {
      // Nếu image.url là URL, tải về và chuyển thành Blob
      const response = await fetch(image.url);
      blob = await response.blob();
    }

    // Tạo File từ Blob
    const fileToUse = new File([blob], image.name, { type: blob.type });

    // Thêm File vào editor
    editor.addImageForFile(fileToUse);
  };

  return (
    <div className="flex flex-col h-full w-full relative gap-4">
      <div {...getRootProps()} className="h-full w-full">
        <input {...getInputProps()} />
        <div className="flex-col flex gap-4">
          <Button onClick={open} className="w-full text-base">
            Upload image
          </Button>

          <Select value={option} onValueChange={(value) => setOption(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {uploadOptions.map((opt) => (
                <SelectItem key={opt.key} value={opt.value}>
                  {opt.key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-8">
          <h3 className="text-sm font-semibold">Uploaded Images</h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.url} // Sử dụng base64 URL đã lưu
                  alt={image.name}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                  onClick={() => handleImageClick(image)}
                />
                <div className="absolute top-2 right-2 bg-white text-red-500 cursor-pointer p-1 rounded-full text-xs">
                  <button
                    onClick={() =>
                      usePrintzyImageHistory.getState().removeImage(index)
                    }
                  >
                    x
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {isDragActive && (
          <div className="absolute inset-0 z-50 w-full h-full bg-white flex items-center justify-center">
            <Upload size={48} />
            <p className="text-lg">Drop the files here ...</p>
          </div>
        )}
      </div>
    </div>
  );
}
