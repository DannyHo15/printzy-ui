import React from 'react';
import { X } from 'lucide-react';
interface Props {
  children: React.ReactNode;
  title: string;
  description?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const SubContent = ({
  children,
  title,
  description,
  isOpen,
  setIsOpen,
}: Props) => {
  return (
    isOpen && (
      <div className="w-80 h-full flex flex-col bg-background border-y border-r shadow-lg divide-y">
        <div className="flex h-12 justify-between items-center p-2 ">
          <h2 className="font-bold capitalize text-lg">{title}</h2>
          <p>{description}</p>
          <X
            size={20}
            onClick={() => setIsOpen(false)}
            className="cursor-pointer hover:text-primary-dk"
          />
        </div>
        <div className="p-4 h-full flex flex-col border-b">{children}</div>
      </div>
    )
  );
};

export default SubContent;
