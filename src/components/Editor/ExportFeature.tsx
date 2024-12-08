import { Editor } from '@/types/editor';
import React from 'react';
import { Button } from '../ui/button';
interface IExportFeatureProps {
  editor: Editor;
}
export default function ExportFeature({ editor }: IExportFeatureProps) {
  const handleExport = (type: 'json' | 'png') => {
    switch (type) {
      case 'json':
        editor.saveJson();
        break;
      case 'png':
        editor.savePng();
        break;

      default:
        break;
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => handleExport('json')} variant="outline">
        Json
      </Button>
      <Button onClick={() => handleExport('png')} variant="outline">
        PNG
      </Button>
    </div>
  );
}
