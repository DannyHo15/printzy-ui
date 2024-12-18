import { Editor } from "@/types/editor";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import usePrintzyImageGenerateHistory from "@/store/generateImageHistory/generateImageHistory";

interface IUploadImageFeatureProps {
  editor: Editor;
}

const uploadOptions = [
  { key: "None", value: "none" },
  { key: "Remove background", value: "remove-background" },
];

export default function GraphicFeature({ editor }: IUploadImageFeatureProps) {
  const [option, setOption] = useState("none");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");

  const { images, addImage } = usePrintzyImageGenerateHistory();

  const generateGraphic = async (prompt: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            prompt: prompt,
            n: 1,
            size: "256x256",
            response_format: "b64_json",
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to generate graphic");
      }

      const data = await response.json();
      const base64Image = data.data[0].b64_json;

      // Convert the Base64 string to a Blob
      const byteCharacters = atob(base64Image);
      const byteNumbers = Array.from(
        { length: byteCharacters.length },
        (_, i) => byteCharacters.charCodeAt(i),
      );
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });

      // Create a File object
      const generatedFile = new File([blob], "generated-image.png", {
        type: blob.type,
      });

      if (option === "none") {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;

          // Lưu ảnh đã xử lý dưới dạng base64 và Blob
          addImage({
            file: generatedFile,
            name: generatedFile.name,
            url: base64, // Lưu base64 để hiển thị ảnh
          });

          // Thêm ảnh đã xử lý vào editor
          editor.addImageForFile(generatedFile);
        };
        reader.readAsDataURL(blob);
      } else {
        removeBackground(generatedFile);
      }
      // Add the generated image to the editor
    } catch (err: any) {
      setError(err.message || "An error occurred while generating the graphic");
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = async () => {
    await generateGraphic(prompt);
  };

  const removeBackground = async (file: File) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://8076-2405-4802-9010-a1a0-c078-9606-163e-1593.ngrok-free.app/remove-background",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to remove background");
      }

      const blob = await response.blob();
      const processedFile = new File([blob], "processed-image.png", {
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
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = async (image: any) => {
    let blob;

    // Nếu image.url là base64, chuyển thành Blob
    if (image.url.startsWith("data:image")) {
      const base64 = image.url.split(",")[1]; // Loại bỏ header base64
      const binary = atob(base64); // Giải mã base64
      const array = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
      }
      blob = new Blob([array], { type: "image/png" }); // Tạo Blob
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
    <div className="flex h-full w-full relative gap-4">
      <div className="h-full w-full">
        <div className="flex-col flex gap-4">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your creative prompt"
          />

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

          <Button
            className="w-full text-base"
            onClick={handleButtonClick}
            disabled={loading || (option === "generate-graphic" && !prompt)}
          >
            {loading ? "Processing..." : "Generate Graphic"}
          </Button>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="mt-8">
            <h3 className="text-sm font-semibold">Generated Images</h3>
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
                        usePrintzyImageGenerateHistory
                          .getState()
                          .removeImage(index)
                      }
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
