import { EditorSidebarItem, EditorSidebarItemsEnum } from "@/types/editor";
import { Flower2, Image, TextIcon, Type, Upload } from "lucide-react";
import React from "react";
import SubContent from "./SubContent";

const EditorSidebarItems: EditorSidebarItem[] = [
  {
    id: EditorSidebarItemsEnum.AddText,
    name: "Add text",
    icon: <Type size={24} />,
  },
  {
    id: EditorSidebarItemsEnum.Graphics,
    name: "Graphics",
    icon: <Flower2 size={24} />,
  },
  {
    id: EditorSidebarItemsEnum.Shape,
    name: "Shape",
    icon: <TextIcon size={24} />,
  },
  {
    id: EditorSidebarItemsEnum.Shutterstock,
    name: "Shutterstock",
    icon: <Image size={24} />,
  },
  {
    id: EditorSidebarItemsEnum.Upload,
    name: "Upload",
    icon: <Upload size={24} />,
  },
];
const EditorSidebar = () => {
  const [currentItem, setCurrentItem] = React.useState<EditorSidebarItem>();
  return (
    <div className="h-full max-w-24 bg-background flex flex-col px-2">
      {EditorSidebarItems.map((item) => (
        <div
          key={item.id}
          className="p-4 flex items-center justify-center cursor-pointer hover:text-dark"
          onClick={() => setCurrentItem(item)}
        >
          <div className="flex flex-col gap-1 justify-center items-center">
            {item.icon}
            <div className="text-xs">{item.name}</div>
          </div>
        </div>
      ))}
      <SubContent isOpen={!!currentItem} title={currentItem?.name ?? ""}>
        <div>{}</div>
      </SubContent>
    </div>
  );
};

export default EditorSidebar;
