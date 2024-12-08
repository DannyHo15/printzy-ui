import { Editor } from '@/types/editor';
import { useCallback, useState } from 'react';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';

interface IUploadImageFeatureProps {
  editor: Editor;
}

const uploadOptions = [
  { key: 'None', value: 'none' },
  { key: 'Remove background', value: 'remove-background' },
];

export default function GraphicFeature({ editor }: IUploadImageFeatureProps) {
  const [option, setOption] = useState('none');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');

  const generateGraphic = async (prompt: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://api.openai.com/v1/images/generations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer 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`,
          },
          body: JSON.stringify({
            prompt: prompt,
            n: 1,
            size: '256x256',
            response_format: 'b64_json',
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate graphic');
      }

      const data = await response.json();
      const base64Image = data.data[0].b64_json;

      // Convert the Base64 string to a Blob
      const byteCharacters = atob(base64Image);
      const byteNumbers = Array.from(
        { length: byteCharacters.length },
        (_, i) => byteCharacters.charCodeAt(i)
      );
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' });

      // Create a File object
      const generatedFile = new File([blob], 'generated-image.png', {
        type: blob.type,
      });

      // Add the generated image to the editor
      editor.addImageForFile(generatedFile);
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating the graphic');
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = async () => {
    await generateGraphic(prompt);
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

          {/* <Select value={option} onValueChange={(value) => setOption(value)}>
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
          </Select> */}

          <Button
            className="w-full text-base"
            onClick={handleButtonClick}
            disabled={loading || (option === 'generate-graphic' && !prompt)}
          >
            {loading ? 'Processing...' : 'Generate Graphic'}
          </Button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
}
