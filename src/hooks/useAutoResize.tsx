import * as fabric from "fabric";
import { useCallback, useEffect } from "react";

interface UseAutoResizeProps {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
}

export const useAutoResize = ({ canvas, container }: UseAutoResizeProps) => {
  const autoZoom = useCallback(() => {
    if (!canvas || !container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;
    if (!!width && !!height) {
      canvas.setWidth(width);
      canvas.setHeight(height);
    }

    const center = canvas?.getCenter();

    const zoomRatio = 0.4;
    const localWorkspace = canvas
      .getObjects()
      .find((object) => object.get("name") === "clip");

    if (!localWorkspace) return;
    // @ts-ignore
    const scale = fabric.util.findScaleToFit(localWorkspace, {
      width: width,
      height: height,
    });

    const zoom = zoomRatio * scale;

    canvas.setViewportTransform(fabric.iMatrix.concat() as fabric.TMat2D);
    canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);

    const workspaceCenter = localWorkspace.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;

    if (
      canvas.width === undefined ||
      canvas.height === undefined ||
      !viewportTransform
    ) {
      return;
    }

    viewportTransform[4] =
      canvas.width / 2 - workspaceCenter.x * viewportTransform[0];

    viewportTransform[5] =
      canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

    canvas.setViewportTransform(viewportTransform);

    localWorkspace.clone();
  }, [canvas, container]);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;
    if (!container || !canvas) return;

    resizeObserver = new ResizeObserver(() => {
      autoZoom();
    });

    resizeObserver.observe(container);

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [canvas, container, autoZoom]);

  return { autoZoom };
};
