import React, { useCallback, useRef, useState } from "react";
import * as fabric from "fabric";
import { JSON_KEYS } from "@/types/editor";
interface IUseHistoryProps {
  canvas: fabric.Canvas | null;
  saveCallback?: (value: {
    json: string;
    height: number;
    width: number;
  }) => void;
}
export default function useHistory({ canvas, saveCallback }: IUseHistoryProps) {
  const [historyIndex, setHistoryIndex] = useState(0);
  const skipSave = useRef(false);
  const canvasHistory = useRef<string[]>([]);
  const save = useCallback(
    (skip = false) => {
      if (!canvas) return;
      const currentState = canvas.toJSON();
      const json = JSON.stringify(currentState, JSON_KEYS);
      if (!skip && !skipSave.current) {
        canvasHistory.current.push(json);
        setHistoryIndex(canvasHistory.current.length - 1);
      }
      const workspace = canvas
        .getObjects()
        .find((object) => object.get("name") === "clip");
      const height = workspace?.height || 0;
      const width = workspace?.width || 0;
      saveCallback?.({ json, height, width });
    },
    [canvas, saveCallback],
  );
  return {
    save,
  };
}
