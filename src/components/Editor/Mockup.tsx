import Image from 'next/image';
import React, { useEffect, ReactNode, useState } from 'react';
interface IMockupProps {
  mockupPath?: string;
  children?: ReactNode;
}
export default function Mockup({ mockupPath, children }: IMockupProps) {
  const [path, setPath] = useState('');
  useEffect(() => {
    if (mockupPath) setPath(mockupPath);
  }, [mockupPath]);

  return (
    <div className="w-full top-7 flex justify-center">
      {mockupPath && (
        <Image
          src={path}
          width={600}
          // style={{
          //   backgroundColor: color,
          // }}
          height={800}
          alt={'mockup'}
          crossOrigin="anonymous"
        ></Image>
      )}
      <div className="absolute top-0 left-0 w-full h-full">{children}</div>
    </div>
  );
}
