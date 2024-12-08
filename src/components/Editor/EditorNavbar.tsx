import {
  ActiveTool,
  Editor,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  isTextType,
} from "@/types/editor";
import React, { useEffect, useState } from "react";
import { Hint } from "../ui/Hint";
import { Button } from "../ui/button";
import { RxTransparencyGrid } from "react-icons/rx";
import { BsBorderWidth, BsX } from "react-icons/bs";
import { cn } from "@/lib/utils";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Square,
  Strikethrough,
  Trash,
  Underline,
} from "lucide-react";
import { IoDuplicate } from "react-icons/io5";
import { FontSizeInput } from "./FontSizeInput";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
interface IEditorNavbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const EditorNavbar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: IEditorNavbarProps) => {
  const [properties, setProperties] = useState({
    fillColor: editor?.getActiveFillColor(),
    strokeColor: editor?.getActiveStrokeColor(),
    fontWeight: editor?.getActiveFontWeight() || FONT_WEIGHT,
    fontStyle: editor?.getActiveFontStyle(),
    fontLinethrough: editor?.getActiveFontLinethrough(),
    fontUnderline: editor?.getActiveFontUnderline(),
    textAlign: editor?.getActiveTextAlign(),
    fontSize: editor?.getActiveFontSize() || FONT_SIZE,
    fontFamily: editor?.getActiveFontFamily() || FONT_FAMILY,
  });

  const selectedObject = editor?.selectedObjects[0];
  const selectedObjectType = editor?.selectedObjects[0]?.type;

  const isText = isTextType(selectedObjectType);
  const isImage = selectedObjectType === "image";

  useEffect(() => {
    setProperties({
      fillColor: editor?.getActiveFillColor(),
      strokeColor: editor?.getActiveStrokeColor(),
      fontWeight: editor?.getActiveFontWeight() || FONT_WEIGHT,
      fontStyle: editor?.getActiveFontStyle(),
      fontLinethrough: editor?.getActiveFontLinethrough(),
      fontUnderline: editor?.getActiveFontUnderline(),
      textAlign: editor?.getActiveTextAlign(),
      fontSize: editor?.getActiveFontSize() || FONT_SIZE,
      fontFamily: editor?.getActiveFontFamily() || FONT_FAMILY,
    });
  }, [selectedObject, editor]);

  const updateEditorAndState = (
    updateFn: (editor: Editor) => void,
    newState: Partial<typeof properties>,
  ) => {
    if (!selectedObject) {
      return;
    }
    updateFn(editor!);
    setProperties((current) => ({
      ...current,
      ...newState,
    }));
  };
  const handleDeleteSelectedObjects = () => editor?.delete();
  const onChangeFontSize = (value: number) => {
    updateEditorAndState((editor) => editor.changeFontSize(value), {
      fontSize: value,
    });
  };

  const handleDuplicateSelectedObjects = () => {
    editor?.onCopy();
    editor?.onPaste();
  };

  const handleChangeTextAlign = (value: string) => {
    updateEditorAndState((editor) => editor.changeTextAlign(value), {
      textAlign: value,
    });
  };

  const handleFontChange = (property: keyof typeof properties, value: any) => {
    updateEditorAndState(
      (editor) => {
        if (property === "fontStyle") editor.changeFontStyle(value);
        if (property === "fontWeight") editor.changeFontWeight(value);
        if (property === "fontUnderline") editor.changeFontUnderline(value);
        if (property === "fontLinethrough") editor.changeFontLinethrough(value);
      },
      { [property]: value },
    );
  };

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 h-12 border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    );
  }

  return (
    <div className="h-12 bg-background border-y border-r flex gap-2 items-center px-6 ">
      {!isImage && (
        <Hint label="Fill color" side="bottom">
          <Button
            onClick={() => onChangeActiveTool(ActiveTool.Fill)}
            variant="ghost"
            size="icon"
            className={cn(activeTool === ActiveTool.Fill && "bg-light-gray")}
          >
            <Square size={18} color="#ccc" fill={properties.fillColor} />
          </Button>
        </Hint>
      )}
      {!isText && (
        <Hint label="Stroke color" side="bottom">
          <Button
            onClick={() => onChangeActiveTool(ActiveTool.StrokeColor)}
            variant="ghost"
            size="icon"
            className={cn(
              activeTool === ActiveTool.StrokeColor && "bg-light-gray",
            )}
          >
            <div className="border">
              <Square
                size={18}
                color={properties.strokeColor}
                className="shadow-lg"
              />
            </div>
          </Button>
        </Hint>
      )}
      {!isText && (
        <Hint label="Stroke width" side="bottom">
          <Button
            onClick={() => onChangeActiveTool(ActiveTool.StrokeOptions)}
            variant="ghost"
            size="icon"
            className={cn(
              activeTool === ActiveTool.StrokeOptions && "bg-light-gray",
            )}
          >
            <BsBorderWidth size={18} />
          </Button>
        </Hint>
      )}
      {isText && (
        <>
          <Hint label="Bold" side="bottom">
            <Button
              onClick={() =>
                handleFontChange(
                  "fontWeight",
                  properties.fontWeight > 500 ? 500 : 700,
                )
              }
              size="icon"
              variant="ghost"
              className={cn(properties.fontWeight > 500 && "bg-light-gray")}
            >
              <Bold size={18} />
            </Button>
          </Hint>
          <Hint label="Italic" side="bottom">
            <Button
              onClick={() =>
                handleFontChange(
                  "fontStyle",
                  properties.fontStyle === "italic" ? "normal" : "italic",
                )
              }
              size="icon"
              variant="ghost"
              className={cn(
                properties.fontStyle === "italic" && "bg-light-gray",
              )}
            >
              <Italic size={18} />
            </Button>
          </Hint>
          <Hint label="Underline" side="bottom">
            <Button
              onClick={() =>
                handleFontChange("fontUnderline", !properties.fontUnderline)
              }
              size="icon"
              variant="ghost"
              className={cn(properties.fontUnderline && "bg-light-gray")}
            >
              <Underline size={18} />
            </Button>
          </Hint>
          <Hint label="Line through" side="bottom">
            <Button
              onClick={() =>
                handleFontChange("fontLinethrough", !properties.fontLinethrough)
              }
              size="icon"
              variant="ghost"
              className={cn(properties.fontLinethrough && "bg-light-gray")}
            >
              <Strikethrough size={18} />
            </Button>
          </Hint>
          <ToggleGroup
            className="gap-1"
            variant="default"
            value={properties.textAlign}
            onValueChange={(value) => handleChangeTextAlign(value)}
            size="xs"
            type="single"
          >
            <Hint label="Align left" side="bottom">
              <ToggleGroupItem
                value="left"
                className="w-full hover:border-primary-dk"
                aria-label="left"
              >
                <AlignLeft size={18} />
              </ToggleGroupItem>
            </Hint>
            <Hint label="Align center" side="bottom">
              <ToggleGroupItem
                className="w-full hover:border-primary-dk"
                value="center"
                aria-label="center"
              >
                <AlignCenter size={18} />
              </ToggleGroupItem>
            </Hint>
            <Hint label="Align right" side="bottom">
              <ToggleGroupItem
                className="w-full hover:border-primary-dk"
                value="right"
                aria-label="right"
              >
                <AlignRight size={18} />
              </ToggleGroupItem>
            </Hint>
          </ToggleGroup>
          <FontSizeInput
            value={properties.fontSize}
            onChange={onChangeFontSize}
          />
          <Hint side="bottom" label={properties.fontFamily}>
            <Button
              onClick={() => onChangeActiveTool(ActiveTool.Font)}
              variant="outline"
              size="icon"
              className={cn(
                activeTool === ActiveTool.Font && "bg-light-gray",
                " w-36 px-4",
              )}
            >
              <div className="truncate"> {properties.fontFamily}</div>
            </Button>
          </Hint>
        </>
      )}

      <Hint label="Opacity" side="bottom">
        <Button
          onClick={() => onChangeActiveTool(ActiveTool.Opacity)}
          variant="ghost"
          size="icon"
          className={cn(activeTool === ActiveTool.Opacity && "bg-light-gray")}
        >
          <RxTransparencyGrid size={16} />
        </Button>
      </Hint>
      <Hint label="Duplicate" side="bottom">
        <Button
          onClick={handleDuplicateSelectedObjects}
          variant="ghost"
          size="icon"
        >
          <IoDuplicate size={16} />
        </Button>
      </Hint>
      <Hint label="Delete" side="bottom">
        <Button
          onClick={() => handleDeleteSelectedObjects()}
          variant="ghost"
          size="icon"
        >
          <Trash color="red" size={16} />
        </Button>
      </Hint>
    </div>
  );
};
