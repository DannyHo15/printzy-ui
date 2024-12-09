import React, { useState } from 'react';
import Image from 'next/image';

interface ImageItem {
  imageUrl: string;
  openZoomedImage: (imageUrl: string) => void;
}

const PreviewCustomize: React.FC<ImageItem> = ({
  imageUrl,
  openZoomedImage,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 cursor-pointer"
      onClick={() => openZoomedImage(imageUrl)} // Call the passed function to open zoomed image
    >
      <Image
        src={imageUrl}
        alt="Zoomed image"
        width={800}
        height={600}
        className="max-w-[90vw] max-h-[90vh] object-contain"
      />
    </div>
  );
};

export default PreviewCustomize;
