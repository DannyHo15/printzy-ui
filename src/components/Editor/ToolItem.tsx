import React from "react";
import { Button } from "../ui/button";
interface IToolItemProps {
  children: React.ReactNode;
  action: () => void;
}
function ToolItem({ children, action }: IToolItemProps) {
  return (
    <Button
      className="aspect-square p-4 h-full"
      variant="outline"
      onClick={action}
    >
      {children}
    </Button>
  );
}

export default ToolItem;
