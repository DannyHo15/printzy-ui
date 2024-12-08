import { Editor } from "@/types/editor";
import React from "react";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import ToolItem from "./ToolItem";
interface IShapesFeatureProps {
  editor: Editor;
}

export default function ShapesFeature({ editor }: IShapesFeatureProps) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <ToolItem
          children={<FaSquareFull fill="#000" size={40} />}
          action={editor.addRectangle}
        ></ToolItem>
        <ToolItem
          children={<FaSquare fill="#000" size={46} />}
          action={editor.addSoftRectangle}
        ></ToolItem>
        <ToolItem
          children={<FaCircle fill="#000" className="" size={46}></FaCircle>}
          action={editor.addCircle}
        ></ToolItem>
        <ToolItem
          children={
            <FaSquareFull size={40} fill="#000" className="rotate-45" />
          }
          action={editor.addDiamond}
        ></ToolItem>
        <ToolItem
          children={<IoTriangle fill="#000" size={46} />}
          action={editor.addTriangle}
        />
        <ToolItem
          children={<IoTriangle fill="#000" size={46} className="rotate-180" />}
          action={editor.addInverseTriangle}
        />
      </div>
    </div>
  );
}
