"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import * as fabric from "fabric";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import {
  BuildEditorProps,
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  Editor,
  EditorHookProps,
  FILL_COLOR,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  isTextType,
  JSON_KEYS,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TEXT_OPTIONS,
  TRIANGLE_OPTIONS,
} from "@/types/editor";
import { useAutoResize } from "./useAutoResize";
import useHotkeys from "./useHotkeys";
import { useCanvasEvents } from "./useCanvasEvent";
import useSnapping from "./useSnapping";
import useClipboard from "./useClipboard";
import useHistory from "./useHistory";
import { downloadFile, transformText } from "@/components/utils";

const buildEditor = ({
  canvas,
  fillColor,
  strokeColor,
  strokeWidth,
  fontFamily,
  strokeDashArray,
  selectedObjects,
  setFillColor,
  setStrokeColor,
  setStrokeDashArray,
  setFontFamily,
  setStrokeWidth,
  autoZoom,
  copy,
  paste,
}: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    return canvas.getObjects().find((object) => {
      return object.get("name") === "clip";
    });
  };
  const generateSaveOptions = () => {
    const { width, height, left, top } = getWorkspace() as fabric.Rect;
    return {
      name: "Image",
      format: "png" as fabric.ImageFormat,
      multiplier: 1,
      quality: 1,
      width: width - 4,
      height: height - 4,
      left: left + 2,
      top: top + 2,
    };
  };
  const center = (object: fabric.Object) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();
    if (!center) return;

    // @ts-ignore
    canvas._centerObject(object, center);
  };
  const addToCanvas = (object: fabric.Object) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  const saveJson = async () => {
    const dataJSON = canvas.toJSON();
    transformText(dataJSON.objects);
    const fileString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataJSON, null, "\t"),
    )}`;
    downloadFile(fileString, "json");
  };

  const savePng = () => {
    canvas.discardActiveObject();
    let node = document.getElementById("workspace");
    console.log(node);
    htmlToImage
      .toPng(node!)
      .then(function (dataUrl) {
        download(dataUrl, "my-image.png");
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
    // const options = generateSaveOptions();
    // canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    // const dataUrl = canvas.toDataURL(options);
    // downloadFile(dataUrl, "png");
    // autoZoom();
  };
  return {
    saveJson,
    getWorkspace,
    savePng,
    canvas,
    autoZoom,
    selectedObjects,
    onCopy: () => copy(),
    onPaste: () => paste(),
    addImage: (value: any) => {
      // fabric.Image.fromURL(
      //   value,
      //   (image:any) => {
      //     const workspace = getWorkspace();
      //
      //     image.scaleToWidth(workspace?.width || 0);
      //     image.scaleToHeight(workspace?.height || 0);
      //   },
      //   {
      //     crossOrigin: "anonymous",
      //   },
      // );
    },

    addImageForFile: (file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === "string") {
          const imageElement = document.createElement("img");
          imageElement.src = result;
          imageElement.onload = () => {
            const image = new fabric.Image(imageElement);
            const workspace = getWorkspace();
            if (workspace) {
              image.scaleToWidth(workspace.width);
              image.scaleToHeight(workspace.height);
              addToCanvas(image);
            }
          };
        }
      };
      reader.readAsDataURL(file);
    },
    addInverseTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
        angle: 180,
      });
      addToCanvas(object);
    },
    delete: () => {
      canvas.getActiveObjects().forEach((object) => canvas.remove(object));
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
        rx: 15,
        ry: 15,
      });
      addToCanvas(object);
    },
    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToCanvas(object);
    },
    addDiamond: () => {
      const HEIGHT = DIAMOND_OPTIONS.height;
      const WIDTH = DIAMOND_OPTIONS.width;
      const object = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        {
          ...DIAMOND_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        },
      );
      addToCanvas(object);
    },
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToCanvas(object);
    },
    addText: (value, options) => {
      const object = new fabric.Textbox(value, {
        ...TEXT_OPTIONS,
        fill: fillColor,
        ...options,
      });
      addToCanvas(object);
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToCanvas(object);
    },
    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return fillColor;
      }
      const value = selectedObject.get("fill") || fillColor;
      // Currently, gradients & patterns are not supported
      return value as string;
    },
    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeColor;
      }
      const value = selectedObject.get("stroke") || strokeColor;
      return value;
    },
    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return strokeWidth;
      }
      const value = selectedObject.get("strokeWidth") || strokeWidth;
      return value;
    },
    getActiveStrokeDashArray: () => {
      return strokeDashArray;
    },

    getActiveOpacity: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return 1;
      }
      const value = selectedObject.get("opacity") || 1;
      return value;
    },
    getActiveFontSize: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return FONT_SIZE;
      }
      const value = selectedObject.get("fontSize") || FONT_SIZE;
      return value;
    },

    getActiveTextAlign: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return TEXT_OPTIONS.align;
      }
      const value = selectedObject.get("textAlign") || "left";
      return value;
    },
    getActiveFontUnderline: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return false;
      }
      const value = selectedObject.get("underline") || false;
      return value;
    },
    getActiveFontLinethrough: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return false;
      }
      const value = selectedObject.get("linethrough") || false;
      return value;
    },
    getActiveFontStyle: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return "normal";
      }
      const value = selectedObject.get("fontStyle") || "normal";
      return value;
    },
    getActiveFontWeight: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return FONT_WEIGHT;
      }
      const value = selectedObject.get("fontWeight") || FONT_WEIGHT;
      return value;
    },
    getActiveFontFamily: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return fontFamily;
      }
      const value = selectedObject.get("fontFamily") || fontFamily;
      return value;
    },
    changeFontFamily: (value: string) => {
      setFontFamily(value);
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          // Faulty TS library, fontFamily exists.
          object.set({ fontFamily: value });
        }
      });
      canvas.renderAll();
    },
    changeFontWeight: (value: number) => {
      selectedObjects.forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          // Faulty TS library, fontWeight exists.
          object.set({ fontWeight: value });
        }
      });
      canvas.renderAll();
    },
    changeFontStyle: (value: string) => {
      selectedObjects.forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          // Faulty TS library, fontStyle exists.
          object.set({ fontStyle: value });
        }
      });
      canvas.renderAll();
    },
    changeFontUnderline: (value: boolean) => {
      selectedObjects.forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          // Faulty TS library, underline exists.
          object.set({ underline: value });
        }
      });
      canvas.renderAll();
    },
    changeFontLinethrough: (value: boolean) => {
      selectedObjects.forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          // Faulty TS library, linethrough exists.
          object.set({ linethrough: value });
        }
      });
      canvas.renderAll();
    },
    changeTextAlign: (value: string) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          // Faulty TS library, textAlign exists.
          object.set({ textAlign: value });
        }
      });
      canvas.renderAll();
    },

    changeFontSize: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          // Faulty TS library, fontSize exists.
          object.set({ fontSize: value });
        }
      });
      canvas.renderAll();
    },

    changeOpacity: (opacity: number) => {
      selectedObjects.forEach((object) => {
        object.set("opacity", opacity);
      });
      canvas.renderAll();
    },
    changeFillColor: (color: string) => {
      setFillColor(color);
      selectedObjects.forEach((object) => {
        object.set("fill", color);
      });
      canvas.renderAll();
    },
    changeStrokeColor: (color: string) => {
      setStrokeColor(color);
      selectedObjects.forEach((object) => {
        object.set("stroke", color);
      });
      canvas.renderAll();
    },
    changeStrokeWidth: (width: number) => {
      setStrokeWidth(width);
      selectedObjects.forEach((object) => {
        object.set("strokeWidth", width);
      });
      canvas.renderAll();
    },
    changeStrokeDashArray: (dashArray: number[]) => {
      setStrokeDashArray(dashArray);
      selectedObjects.forEach((object) => {
        object.set("strokeDashArray", dashArray);
      });
      canvas.renderAll();
    },
  };
};

export const useEditor = ({
  defaultHeight,
  defaultWidth,
  clearSelectionCallback,
  saveCallback,
}: EditorHookProps) => {
  const initialHeight = useRef(defaultHeight);
  const initialWidth = useRef(defaultWidth);

  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fontFamily, setFontFamily] = useState(FONT_FAMILY);
  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] =
    useState<number[]>(STROKE_DASH_ARRAY);

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      fabric.Object.prototype.set({
        cornerColor: "#823891",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      });
      initialCanvas.setWidth(initialContainer.offsetWidth, { cssOnly: true });
      initialCanvas.setHeight(initialContainer.offsetHeight, {
        cssOnly: true,
      });
      // fabric.FabricImage.fromURL("/photo.png").then((img) => {
      //   img.selectable = true;
      //   img.backgroundColor = "#000";
      //   initialCanvas.add(img);
      //   initialCanvas.centerObject(img);
      //   initialCanvas.sendObjectToBack(img);
      //   initialCanvas.renderAll();
      // });
      const initialWorkspace = new fabric.Rect({
        width: initialWidth.current,
        height: initialHeight.current,
        name: "clip",
        fill: "transparent",
        stroke: "#ccc",
        strokeDashArray: [5, 5],
        strokeWidth: 3,
        selectable: false,
        hasControls: false,
      });
      const blackStrokeRectangle = new fabric.Rect({
        width: initialWidth.current,
        height: initialHeight.current,
        fill: "transparent",
        stroke: "#000",
        strokeDashArray: [5, 5],

        selectable: false,
        hasControls: false,
        evented: false,
      });

      // Create the white stroke rectangle
      const whiteStrokeRectangle = new fabric.Rect({
        width: initialWidth.current && initialWidth.current - 4, // Adjust to fit inside the black stroke

        height: initialHeight.current && initialHeight.current - 4, // Adjust to fit inside the black stroke
        fill: "transparent",
        stroke: "#fff",
        strokeDashArray: [5, 5],
        strokeWidth: 2, // Adjust the stroke width as needed
        selectable: false,
        hasControls: false,
        evented: false,
      });

      initialCanvas.clipPath = initialWorkspace;
      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.add(blackStrokeRectangle);
      initialCanvas.centerObject(blackStrokeRectangle);

      // Add and center the white stroke rectangle
      initialCanvas.add(whiteStrokeRectangle);
      initialCanvas.centerObject(whiteStrokeRectangle);

      setCanvas(initialCanvas);
      setContainer(initialContainer);
      // const currentState = JSON.stringify(
      //   initialCanvas.toJSON(JSON_KEYS)
      // );
    },
    [container],
  );

  useHotkeys({ canvas });
  const { autoZoom } = useAutoResize({ canvas, container });
  useCanvasEvents({
    canvas,
    setSelectedObjects,
    clearSelectionCallback,
    save: () => {},
  });

  const { copy, paste } = useClipboard({ canvas });
  const { save } = useHistory({ canvas, saveCallback: () => {} });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        fillColor,
        strokeWidth,
        autoZoom,
        strokeColor,
        setFillColor,
        setStrokeColor,
        setStrokeWidth,
        strokeDashArray,
        setStrokeDashArray,
        fontFamily,
        setFontFamily,
        selectedObjects,
        copy,
        paste,
      });
    }

    return undefined;
  }, [
    copy,
    paste,
    autoZoom,
    canvas,
    fillColor,
    strokeWidth,
    strokeColor,
    selectedObjects,
    strokeDashArray,
    fontFamily,
  ]);
  useSnapping({ canvas, editor, selectedObjects });

  return {
    init,
    editor,
  };
};
