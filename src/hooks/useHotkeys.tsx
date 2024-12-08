import * as fabric from "fabric";
import { useEvent } from "react-use";
import React, { KeyboardEvent } from "react";
interface IUseHotkeysProps {
  canvas: fabric.Canvas | null;
}
export default function useHotkeys({ canvas }: IUseHotkeysProps) {
  useEvent("keydown", (event: KeyboardEvent) => {
    const isBackspace = event.key === "Backspace";
    const isInput = ["INPUT", "TEXTAREA"].includes(
      (event.target as HTMLElement).tagName,
    );

    if (isInput) return;
    if (isBackspace) {
      canvas?.remove(...canvas.getActiveObjects());
      canvas?.discardActiveObject();
    }
    console.log(event);
  });
}
