import {
  ActiveTool,
  colors,
  Editor,
  FILL_COLOR,
  STROKE_COLOR,
} from "@/types/editor";
import React, { useEffect, useState } from "react";
import { ChromePicker, ColorResult, CirclePicker } from "react-color";
import { RgbaObjToString } from "../utils/rgbaObjToString";
interface IColorpickerProps {
  editor: Editor;
  activeTool: ActiveTool;
}

const ColorPicker = ({ editor, activeTool }: IColorpickerProps) => {
  const getInitialColor = () =>
    activeTool === ActiveTool.Fill
      ? (editor?.getActiveFillColor() ?? FILL_COLOR)
      : (editor?.getActiveStrokeColor() ?? STROKE_COLOR);

  const [color, setColor] = useState(getInitialColor());

  useEffect(() => {
    setColor(getInitialColor());
  }, [activeTool, editor, getInitialColor()]);
  const handleChangeComplete = (color: ColorResult) => {
    const formartedColor = RgbaObjToString(color.rgb);
    if (activeTool === ActiveTool.Fill) {
      editor?.changeFillColor(formartedColor);
    } else {
      editor?.changeStrokeColor(formartedColor);
    }
  };
  return (
    <div className="w-full flex flex-col gap-6">
      <ChromePicker
        color={color}
        onChange={(color) => {
          const formartedColor = RgbaObjToString(color.rgb);
          setColor(formartedColor);
        }}
        onChangeComplete={handleChangeComplete}
        className="border rounded-lg overflow-hidden w-full"
      />
      <CirclePicker
        circleSize={30}
        color={color}
        colors={colors}
        onChange={(color) => {
          const formartedColor = RgbaObjToString(color.rgb);
          setColor(formartedColor);
        }}
        onChangeComplete={handleChangeComplete}
        className="w-full justify-between"
      />
    </div>
  );
};

export default ColorPicker;
