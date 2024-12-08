import * as fabric from "fabric";
import { useEffect } from "react";

interface UseCanvasEventsProps {
  save: () => void;
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  clearSelectionCallback?: () => void;
}

export const useCanvasEvents = ({
  save,
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (!canvas) return;

    const handleObjectEvent = () => save();
    const handleSelectionCreatedOrUpdated = (e: any) => {
      setSelectedObjects(e.selected || []);
    };
    const handleSelectionCleared = () => {
      setSelectedObjects([]);
      clearSelectionCallback?.();
    };

    canvas.on("object:added", handleObjectEvent);
    canvas.on("object:removed", handleObjectEvent);
    canvas.on("object:modified", handleObjectEvent);
    canvas.on("selection:created", handleSelectionCreatedOrUpdated);
    canvas.on("selection:updated", handleSelectionCreatedOrUpdated);
    canvas.on("selection:cleared", handleSelectionCleared);

    return () => {
      canvas.off("object:added", handleObjectEvent);
      canvas.off("object:removed", handleObjectEvent);
      canvas.off("object:modified", handleObjectEvent);
      canvas.off("selection:created", handleSelectionCreatedOrUpdated);
      canvas.off("selection:updated", handleSelectionCreatedOrUpdated);
      canvas.off("selection:cleared", handleSelectionCleared);
    };
  }, [save, canvas, setSelectedObjects, clearSelectionCallback]);
};
