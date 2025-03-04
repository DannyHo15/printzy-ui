'use client';
import { useEditor } from '@/hooks/useEditor';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import * as fabric from 'fabric';
import EditorSidebar from '@/components/Editor/EditorSidebar';
import { EditorNavbar } from '@/components/Editor/EditorNavbar';
import { ActiveTool, selectionDependentTools } from '@/types/editor';
import Mockup from '@/components/Editor/Mockup';
import { LoaderCircle } from 'lucide-react';
import VariantManagement from '@/components/Editor/VariantManagement';
import { useProductQuery } from '@/store/product/useProduct';
const Page = ({ params }: { params: { itemId: string } }) => {
  const { data: product, isLoading: isLoadingProductDetail } = useProductQuery(
    params.itemId
  );
  const [activeTool, setActiveTool] = useState<ActiveTool>(ActiveTool.Select);
  const [selectedVariant, setSelectedVariant] = useState<any>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool(ActiveTool.Select);
    }
  }, [activeTool]);
  const defaultDesignPath = selectedVariant?.variantDesign?.path;
  const { init, editor } = useEditor({
    defaultHeight: 2000,
    defaultWidth: 1800,
    defaultDesignPath,
    clearSelectionCallback: onClearSelection,
  });

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === 'draw') {
        // editor?.enableDrawingMode();
      }

      if (activeTool === ActiveTool.Draw) {
        // editor?.disableDrawingMode();
      }

      if (tool === activeTool) {
        return setActiveTool(ActiveTool.Select);
      }

      setActiveTool(tool);
    },
    [activeTool, editor]
  );

  useEffect(() => {
    if (canvasRef.current === null || containerRef.current === null) return;
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
      selectionColor: 'rgba(253, 242, 248,0.5)',
      selectionBorderColor: '#fbcfe8',
    });
    canvas.backgroundColor = 'transparent';

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });
    return () => {
      canvas.dispose();
    };
  }, [init]);

  return (
    <div className="flex max-h-screen w-screen">
      <EditorSidebar
        onChangeActiveTool={onChangeActiveTool}
        activeTool={activeTool}
        editor={editor!}
      />
      <div className="w-full flex relative">
        {isLoadingProductDetail && (
          <div className="absolute z-50 w-full h-full bg-light shadow-lg flex justify-center items-center">
            <LoaderCircle size={48} className="animate-spin" />
          </div>
        )}
        <div ref={containerRef} className="w-full h-full bg-light shadow-lg">
          <EditorNavbar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
          />
          <div className="w-full h-full relative">
            <div id="workspace" className="w-full h-full">
              <Mockup mockupPath={selectedVariant?.variantMockup?.path}>
                <canvas ref={canvasRef} className="w-full h-full"></canvas>
              </Mockup>
            </div>
            <div className="absolute right-6 top-6 z-40">
              {product && (
                <VariantManagement
                  product={product}
                  editor={editor}
                  productOptions={product?.productOptions}
                  variant={selectedVariant}
                  setVariant={(variant) => setSelectedVariant(variant)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
