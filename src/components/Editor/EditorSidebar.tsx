import { EditorSidebarItem, ActiveTool, Editor } from "@/types/editor";
import {
  Download,
  Flower2,
  Image,
  ImageIcon,
  Shapes,
  TextIcon,
  Type,
  Upload,
} from "lucide-react";
import React from "react";
import SubContent from "./SubContent";
import { useEditor } from "@/hooks/useEditor";
import ShapesFeature from "./ShapesFeature";
import OpacityFeature from "./Opacity";
import ColorPicker from "./ColorPicker";
import StrokeOptions from "./StrokeOptions";
import AddTextFeature from "./AddTextFeature";
import FontFamilySidebar from "./FontFamilySidebar";
import UploadImageFeature from "./UploadImageFeature";
import ExportFeature from "./ExportFeature";

interface IEditorSidebarProps {
  editor: Editor;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const EditorSidebarItems: EditorSidebarItem[] = [
  {
    id: ActiveTool.Text,
    name: "Text",
    icon: <Type size={24} />,
  },

  {
    id: ActiveTool.Shapes,
    name: "Shapes",
    icon: <Shapes size={24} />,
  },
  // {
  //   id: ActiveTool.Images,
  //   name: "Shutterstock",
  //   icon: <Image size={24} />,
  // },
  {
    id: ActiveTool.Graphics,
    name: "Graphics",
    icon: <Flower2 size={24} />,
  },
  {
    id: ActiveTool.Upload,
    name: "Image",
    icon: <ImageIcon size={24} />,
  },
  {
    id: ActiveTool.Export,
    name: "Export",
    icon: <Download size={24} />,
  },
];

const EditorSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: IEditorSidebarProps) => {
  const renderSubContent = (item?: ActiveTool) => {
    switch (item) {
      case ActiveTool.Text:
        return <AddTextFeature editor={editor} />;
      case ActiveTool.Graphics:
        return <div>Feature</div>;
      case ActiveTool.Shapes:
        return <ShapesFeature editor={editor} />;
      case ActiveTool.Images:
        return <div>Shutterstock</div>;
      case ActiveTool.Opacity:
        return <OpacityFeature editor={editor} />;
      case ActiveTool.Fill:
        return <ColorPicker activeTool={activeTool} editor={editor} />;
      case ActiveTool.StrokeColor:
        return <ColorPicker activeTool={activeTool} editor={editor} />;
      case ActiveTool.StrokeOptions:
        return <StrokeOptions editor={editor} />;
      case ActiveTool.Font:
        return <FontFamilySidebar editor={editor} />;
      case ActiveTool.Upload:
        return <UploadImageFeature editor={editor} />;
      case ActiveTool.Export:
        return <ExportFeature editor={editor} />;
      default:
        return null;
    }
  };
  return (
    <div className="flex ">
      <div className="h-full border-r relative w-24 bg-background flex flex-col px-2 shadow-lg">
        {EditorSidebarItems.map((item) => (
          <div
            key={item.id}
            className="p-4 flex items-center justify-center cursor-pointer hover:text-dark"
            onClick={() => onChangeActiveTool(item.id)}
          >
            <div className="flex flex-col gap-1 justify-center items-center">
              {item.icon}
              <div className="text-xs">{item.name}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full">
        <SubContent
          isOpen={activeTool !== ActiveTool.Select}
          setIsOpen={() => onChangeActiveTool(ActiveTool.Select)}
          title={
            EditorSidebarItems.find((item) => item.id === activeTool)?.name ??
            activeTool
          }
        >
          {renderSubContent(activeTool)}
        </SubContent>
      </div>
    </div>
  );
};

export default EditorSidebar;
