export enum EditorSidebarItemsEnum {
  AddText = 1,
  Graphics = 2,
  Shape = 3,
  Shutterstock = 4,
  Upload = 5,
}

export type EditorSidebarItem = {
  id: EditorSidebarItemsEnum;
  name: string;
  icon: React.ReactNode;
};
