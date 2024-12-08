import React, { useEffect, useMemo, useState } from "react";
import { Slider } from "../ui/slider";
import { Editor } from "@/types/editor";
import { Hint } from "../ui/Hint";
interface IOpacityFeatureProps {
  editor: Editor | null;
}
export default function OpacityFeature({ editor }: IOpacityFeatureProps) {
  const initialValue = editor?.getActiveOpacity() || 1;
  const selectedObject = useMemo(
    () => editor?.selectedObjects[0],
    [editor?.selectedObjects],
  );

  const [opacity, setOpacity] = useState(initialValue);

  useEffect(() => {
    if (selectedObject) {
      setOpacity(selectedObject.get("opacity") || 1);
    }
  }, [selectedObject]);
  const onChange = (value: number) => {
    editor?.changeOpacity(value);
    setOpacity(value);
  };
  return (
    <div className="w-full px-4 pt-2 pb-3 border">
      <div className="w-full mb-1 text-right">
        {Math.floor(opacity * 100).toFixed(0)}%
      </div>
      <Slider
        onValueChange={(values) => onChange(values[0])}
        max={1}
        min={0}
        value={[opacity]}
        step={0.01}
      />
    </div>
  );
}
