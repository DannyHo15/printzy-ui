import { Editor, STROKE_DASH_ARRAY, STROKE_WIDTH } from "@/types/editor";
import React from "react";
import { Minus } from "lucide-react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

interface IStrokeWidthProps {
  editor: Editor;
}
export default function StrokeOptions({ editor }: IStrokeWidthProps) {
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const typeValue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;
  const handleChangeStrokeWidth = (value: number) => {
    editor.changeStrokeWidth(value);
  };
  const handleChangeStrokeType = (strokeType: string) => {
    if (!strokeType) return;
    editor.changeStrokeDashArray(JSON.parse(strokeType));
  };
  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Stroke width</h3>
        <div className="p-4 border rounded-md">
          <Slider
            min={0}
            max={100}
            step={1}
            value={[widthValue]}
            onValueChange={(value) => handleChangeStrokeWidth(value[0])}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Stroke type</h3>
        <ToggleGroup
          className="flex-col gap-4"
          variant="outline"
          value={JSON.stringify(typeValue)}
          onValueChange={(value) => handleChangeStrokeType(value)}
          size="lg"
          type="single"
        >
          <ToggleGroupItem
            value="[]"
            className="w-full hover:border-primary-dk"
            aria-label="linear"
          >
            <div className="w-full border-black rounded-full border-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="w-full hover:border-primary-dk"
            value="[5,5]"
            aria-label="Dash"
          >
            <div className="w-full border-black rounded-full border-4 border-dashed" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
