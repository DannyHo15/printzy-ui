import Image from 'next/image';
import React, { useEffect } from 'react';
interface IMockupProps {
  color: string;
  mockupPath?: string;
}
export default function Mockup({ color, mockupPath }: IMockupProps) {
  useEffect(() => {}, [color]);

  return (
    <div className="absolute w-full top-7 flex justify-center">
      <Image
        src={mockupPath ? mockupPath : '/photo.png'}
        width={600}
        style={{
          backgroundColor: color,
        }}
        height={800}
        alt={'mockup'}
      ></Image>
    </div>
  );
}