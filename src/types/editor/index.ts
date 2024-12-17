import * as fabric from 'fabric';
import { Variable } from 'lucide-react';
export type EditorSidebarItem = {
  id: ActiveTool;
  name: string;
  icon: React.ReactNode;
};
export const JSON_KEYS = [
  'name',
  'gradientAngle',
  'selectable',
  'hasControls',
  'linkData',
  'editable',
  'extensionType',
  'extension',
];
export const FILL_COLOR = 'rgba(0,0,0,1)';
export const STROKE_COLOR = 'rgba(0,0,0,1)';
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];
export const FONT_FAMILY = 'Arial';
export const FONT_SIZE = 32;
export const FONT_WEIGHT = 400;

export enum ActiveTool {
  Select = 'select',
  Shapes = 'shapes',
  Text = 'text',
  Images = 'images',
  Draw = 'draw',
  Fill = 'fill color',
  StrokeColor = 'stroke color',
  StrokeOptions = 'stroke options',
  Font = 'font',
  Opacity = 'opacity',
  Filter = 'filter',
  Settings = 'settings',
  AI = 'ai',
  RemoveBg = 'remove-bg',
  Templates = 'templates',
  Graphics = 'graphics',
  Upload = 'upload',
  Export = 'export',
}

const DEFAULT_OPTIONS = {
  cornerStrokeColor: '#0b5179',
  cornerStyle: 'circle' as 'circle' | 'rect',
  cornerColor: '#fff',
  transparentCorners: false,
};

export const CIRCLE_OPTIONS = {
  radius: 100,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  ...DEFAULT_OPTIONS,
};

export const RECTANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 200,
  height: 200,
  angle: 0,
  ...DEFAULT_OPTIONS,
};

export const DIAMOND_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 200,
  height: 200,
  angle: 0,
  ...DEFAULT_OPTIONS,
};

export const TRIANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 200,
  height: 200,
  angle: 0,
  ...DEFAULT_OPTIONS,
};

export const TEXT_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  fontSize: FONT_SIZE,
  align: 'left',
  fontFamily: FONT_FAMILY,
  ...DEFAULT_OPTIONS,
};

export const colors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#607d8b',
  'transparent',
];
export const fonts = [
  {
    name: 'Arial',
    variable: 'arial',
  },
  {
    name: 'Arial Black',
  },
  {
    name: 'Verdana',
  },
  {
    name: 'Helvetica',
  },
  {
    name: 'Tahoma',
  },
  {
    name: 'Trebuchet MS',
  },
  {
    name: 'Times New Roman',
  },
  {
    name: 'Georgia',
  },
  {
    name: 'Garamond',
  },
  {
    name: 'Courier New',
  },
  {
    name: 'Brush Script MT',
  },
  {
    name: 'Poppins',
    variable: 'poppins',
  },
  {
    name: 'Roboto',
    variable: 'roboto',
  },
  {
    name: 'Inter',
    variable: 'inter',
  },
  {
    name: 'Edu Australia VIC WA NT Hand Arrows',
    variable: 'edu-arrow',
  },
];

export type BuildEditorProps = {
  // undo: () => void;
  // redo: () => void;
  // save: (skip?: boolean) => void;
  // canUndo: () => boolean;
  // canRedo: () => boolean;
  autoZoom: () => void;
  copy: () => void;
  paste: () => void;
  canvas: fabric.Canvas;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  selectedObjects: fabric.Object[];
  strokeDashArray: number[];
  fontFamily: string;
  setStrokeDashArray: (value: number[]) => void;
  setFillColor: (value: string) => void;
  setStrokeColor: (value: string) => void;
  setStrokeWidth: (value: number) => void;
  setFontFamily: (value: string) => void;
};
export const selectionDependentTools = [
  'fill',
  'font',
  'filter',
  'opacity',
  'remove-bg',
  'stroke-color',
  'stroke-width',
];

export interface Editor {
  savePng: () => void;
  // saveJpg: () => void;
  // saveSvg: () => void;
  saveJson: () => void;
  getCustomize: (name: string) => Promise<File | undefined>;
  getCustomizePrint: (name: string) => Promise<File | undefined>;
  // loadJson: (json: string) => void;
  // onUndo: () => void;
  // onRedo: () => void;
  // canUndo: () => boolean;
  // canRedo: () => boolean;
  autoZoom: () => void;
  // zoomIn: () => void;
  // zoomOut: () => void;
  getWorkspace: () => fabric.Object | undefined;
  // changeBackground: (value: string) => void;
  // changeSize: (value: { width: number; height: number }) => void;
  // enableDrawingMode: () => void;
  // disableDrawingMode: () => void;
  onCopy: () => void;
  onPaste: () => void;
  // changeImageFilter: (value: string) => void;
  addImage: (value: string) => void;
  addImageForFile: (file: File) => void;
  delete: () => void;
  changeFontSize: (value: number) => void;
  getActiveFontSize: () => number;
  changeTextAlign: (value: string) => void;
  getActiveTextAlign: () => string;
  changeFontUnderline: (value: boolean) => void;
  getActiveFontUnderline: () => boolean;
  changeFontLinethrough: (value: boolean) => void;
  getActiveFontLinethrough: () => boolean;
  changeFontStyle: (value: string) => void;
  getActiveFontStyle: () => string;
  changeFontWeight: (value: number) => void;
  getActiveFontWeight: () => number;
  getActiveFontFamily: () => string;
  changeFontFamily: (value: string) => void;
  addText: (value: string, options?: fabric.IText) => void;
  getActiveOpacity: () => number;
  changeOpacity: (value: number) => void;
  // bringForward: () => void;
  // sendBackwards: () => void;
  changeStrokeWidth: (value: number) => void;
  changeFillColor: (value: string) => void;
  changeStrokeColor: (value: string) => void;
  changeStrokeDashArray: (value: number[]) => void;
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  canvas: fabric.Canvas;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];
  selectedObjects: fabric.Object[];
}

export interface EditorHookProps {
  defaultState?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultDesignPath?: string;
  clearSelectionCallback?: () => void;
  saveCallback?: (values: {
    json: string;
    height: number;
    width: number;
  }) => void;
}
export function isTextType(type: string | undefined) {
  return type === 'text' || type === 'i-text' || type === 'textbox';
}
