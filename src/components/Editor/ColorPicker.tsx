"use client";
import {
  ActiveTool,
  colors,
  Editor,
  FILL_COLOR,
  STROKE_COLOR,
} from "@/types/editor";
import React, { useEffect, useState } from "react";
import { RgbaObjToString } from "../utils/rgbaObjToString";
import { ChromePicker, CirclePicker, ColorResult } from "react-color";
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
  }, [activeTool, editor]);
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
      <div className="border rounded-lg overflow-hidden w-full">
        <ChromePicker
          color={color}
          onChange={(color: ColorResult) => {
            const formartedColor = RgbaObjToString(color.rgb);
            setColor(formartedColor);
          }}
          onChangeComplete={handleChangeComplete}
        />
      </div>
      <div className="w-full justify-between">
        <CirclePicker
          circleSize={30}
          color={color}
          colors={colors}
          onChange={(color: ColorResult) => {
            const formartedColor = RgbaObjToString(color.rgb);
            setColor(formartedColor);
          }}
          onChangeComplete={handleChangeComplete}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
