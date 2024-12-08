import React from "react";
import { Button } from "../ui/button";
import { Editor } from "@/types/editor";
import * as fabric from "fabric";
interface IAddTextFeatureProps {
  editor: Editor;
}
const AddTextFeature = ({ editor }: IAddTextFeatureProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => editor?.addText("Text")} className="text-base">
        Add a textbox
      </Button>
      <Button
        variant="outline"
        size="xl"
        className="text-3xl  font-bold"
        onClick={() =>
          editor?.addText("Heading", {
            fontSize: 80,
            fontWeight: 700,
          } as fabric.IText)
        }
      >
        Add a heading
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="text-xl font-bold"
        onClick={() =>
          editor?.addText("Subheading", {
            fontSize: 44,
            fontWeight: 600,
          } as fabric.IText)
        }
      >
        Add a subheading
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          editor?.addText("Paragraph", {
            fontSize: 28,
          } as fabric.IText)
        }
      >
        Add a paragraph
      </Button>
    </div>
  );
};

export default AddTextFeature;
