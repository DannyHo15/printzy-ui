import React, { useCallback } from "react";
import * as fabric from "fabric";
interface IUserClipboardProps {
  canvas: fabric.Canvas | null;
}
export default function useClipboard({ canvas }: IUserClipboardProps) {
  const currentClipboard = React.useRef<any | null>(null);

  const copy = useCallback(async () => {
    if (!canvas) return;
    await canvas
      .getActiveObject()
      ?.clone()
      .then((cloned) => {
        currentClipboard.current = cloned;
      });
  }, [canvas]);

  const paste = useCallback(async () => {
    if (currentClipboard.current === null || !canvas) return;
    const clonedObj = await currentClipboard.current.clone();
    canvas?.discardActiveObject();
    clonedObj.set({
      left: clonedObj.left! + 10,
      top: clonedObj.top! + 10,
      evented: true,
    });
    if (clonedObj instanceof fabric.ActiveSelection) {
      clonedObj.canvas = canvas;
      clonedObj.forEachObject((obj) => {
        canvas.add(obj);
      });
      clonedObj.setCoords();
    } else {
      canvas.add(clonedObj);
    }
    currentClipboard.current.top += 10;
    currentClipboard.current.left += 10;
    canvas.setActiveObject(clonedObj);
    canvas.requestRenderAll();
  }, [canvas]);
  return { copy, paste };
}
