import React, { useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Editor, fonts } from "@/types/editor";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
interface IFontFamilySidebarProps {
  editor: Editor;
}

function FontFamilySidebar({ editor }: IFontFamilySidebarProps) {
  const [currentFont, setCurrentFont] = useState(editor.getActiveFontFamily());
  const handleChangeFont = (value: string) => {
    editor.changeFontFamily(value);
    setCurrentFont(value);
  };
  return (
    <div className="flex w-full max-h-[calc(100%-200px)] px-2 overflow-y-auto">
      <div className="flex flex-col w-full">
        {fonts.map((font, index) => (
          <>
            <Button
              key={font.name + index}
              className={cn(
                " justify-start flex w-full text-lg",
                font.name === currentFont && " border-2 border-primary-dk",
              )}
              style={{
                fontFamily: `${font?.variable ? `var(--font-${font.variable})` : font.name}`,
              }}
              variant="outline"
              onClick={() => handleChangeFont(font.name)}
            >
              <div className="w-full pr-4 truncate"> {font.name}</div>
            </Button>
            <Separator className="my-2 last:hidden" />
          </>
        ))}
      </div>
    </div>
  );
}

export default FontFamilySidebar;
