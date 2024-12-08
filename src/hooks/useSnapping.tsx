import React from "react";
import * as fabric from "fabric";
import { Editor } from "@/types/editor";
interface IUseSnappingProps {
  canvas: fabric.Canvas | null;
  editor: Editor | undefined;
  selectedObjects: fabric.Object[];
}
export default function useSnapping({
  canvas,
  editor,
  selectedObjects,
}: IUseSnappingProps) {}
