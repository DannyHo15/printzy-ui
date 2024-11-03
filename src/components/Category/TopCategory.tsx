import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

function TopCategory({ collections }: any) {
  const [isActive, setIsActive] = useState('/shop');

  const router = useRouter();
  const pathname = usePathname();

  let temp = collections;

  const handleClick = (path: string, collectionName: string) => {
    setIsActive(path);
    const params = new URLSearchParams(window.location.search);
    params.set('collection', collectionName);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full px-1 md:px-0">
      <div className="mx-auto max-w-6xl">
        <div className="category overflow-x-auto whitespace-nowrap py-2">
          <button
            className={`${
              isActive === `/shop`
                ? `bg-cusblack text-white shadow-lg`
                : `bg-cusgray text-primary hover:text-secondary`
            } py-2.5 px-6 rounded-3xl text-xs mr-3 mb-2 md:mb-0 font-semibold`}
            onClick={() => handleClick('/shop', '')}
          >
            All items
          </button>
          {temp?.map((collection: any, idx: any) => (
            <button
              key={collection.name}
              className={`${
                isActive === `/shop/${collection.name}`
                  ? `bg-cusblack text-white shadow-lg`
                  : `bg-cusgray text-primary hover:text-secondary`
              } py-2.5 px-6 rounded-3xl text-xs mr-3 mb-2 md:mb-0 font-semibold`}
              onClick={() =>
                handleClick(`/shop/${collection.name}`, collection.id)
              }
            >
              {collection.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopCategory;
