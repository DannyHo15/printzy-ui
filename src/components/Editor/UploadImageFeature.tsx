import { Editor } from "@/types/editor";
import { useCallback } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";
interface IUploadImageFeatureProps {
  editor: Editor;
}
export default function UploadImageFeature({
  editor,
}: IUploadImageFeatureProps) {
  const onDrop = useCallback((acceptedFiles: any) => {
    editor.addImageForFile(acceptedFiles[0]);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    noClick: true,
    multiple: false,
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"], // Added file type restrictions
    },
  });
  return (
    <div className="flex h-full w-full relative">
      <div {...getRootProps()} className="h-full w-full">
        <input {...getInputProps()} />

        <Button onClick={open} className="w-full text-base ">
          Upload image
        </Button>
        {isDragActive && (
          <div className="absolute inset-0 z-50  w-full h-full bg-white  flex items-center justify-center">
            <Upload size={48} />
            <p className="text-lg">Drop the files here ...</p>
          </div>
        )}
      </div>
    </div>
  );
}
