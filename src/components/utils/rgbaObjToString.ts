import { RGBColor } from "react-color";

export const RgbaObjToString = (rgbaObj: RGBColor | "transparent") => {
  if (rgbaObj === "transparent") {
    return "rgba(0,0,0,0)";
  }
  const alpha = rgbaObj.a === undefined ? 1 : rgbaObj.a;
  return `rgba(${rgbaObj.r},${rgbaObj.g},${rgbaObj.b},${alpha})`;
};
