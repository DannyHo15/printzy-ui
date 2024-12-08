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

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0];

      if (option === 'remove-background') {
        removeBackground(file);
      } else {
        editor.addImageForFile(file);
      }
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
      const response = await fetch(
        'https://8403-2405-4802-915d-3f40-ec5c-27ee-b0ae-40e3.ngrok-free.app/remove-background',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to remove background');
      }

      const blob = await response.blob();
      const processedFile = new File([blob], 'processed-image.png', {
        type: blob.type,
      });

      // Thêm ảnh đã xử lý vào editor
      editor.addImageForFile(processedFile);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full relative gap-4">
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

        {isDragActive && (
          <div className="absolute inset-0 z-50 w-full h-full bg-white flex items-center justify-center">
            <Upload size={48} />
            <p className="text-lg">Drop the files here ...</p>
          </div>
        )}
      </div>

      {imageUrl && !loading && (
        <div className="flex justify-center mt-4">
          <img
            src={imageUrl}
            alt="Processed image"
            className="max-w-full h-auto"
          />
        </div>
      )}
    </div>
  );
}
