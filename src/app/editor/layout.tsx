"use client";
import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import EditorSidebar from "@/components/Editor/EditorSidebar";
interface Props {
  children: React.ReactNode;
}
const layout = ({ children }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState(null);
  useEffect(() => {
    const options = {
      width: window.innerWidth - 96, // Adjust width based on sidebar width
      height: window.innerHeight - 96,
    };
    if (canvasRef.current) {
      const initCanvas = new fabric.Canvas(canvasRef.current, options);
      initCanvas.backgroundColor = "#f5f5f0";
      initCanvas.renderAll();
      return () => {
        initCanvas.dispose();
      };
    }
  }, []);
  return (
    <div className="flex min-h-screen">
      <EditorSidebar />
      <div className="flex-1 relative ">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
        <div className="absolute m-auto origin-center top-1/2 left-1/2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
