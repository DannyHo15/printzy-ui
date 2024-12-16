import Image from 'next/image';
import React, { useEffect, ReactNode } from 'react';
interface IMockupProps {
  color: string;
  mockupPath?: string;
  children?: ReactNode;
}
export default function Mockup({ color, mockupPath, children }: IMockupProps) {
  useEffect(() => {}, [color]);

  return (
    <div className="w-full top-7 flex justify-center">
      {mockupPath && (
        <Image
          src={mockupPath ? mockupPath : ''}
          width={600}
          style={{
            backgroundColor: color,
          }}
          height={800}
          alt={'mockup'}
        ></Image>
      )}
      <div className="absolute top-0 left-0 w-full h-full">{children}</div>
    </div>
  );
}
