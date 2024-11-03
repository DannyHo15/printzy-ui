'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;

    const params = new URLSearchParams(window.location.search);
    params.set('name', name);
    router.push(`/shop?${params.toString()}`);
  };

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [inputFocused, setInputFocused] = useState(false);

  const trendingSearches = [
    'Search designs and products',
    'Jesus shirts',
    'Eeyore',
    'Michael jackson jersey white and black one',
    'Jujutsu kaisen',
    'Judas priest',
    'Michael jackson',
    'Bedding set',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(
        (prevIndex) => (prevIndex + 1) % trendingSearches.length
      );
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <form
        className="relative flex items-center justify-between gap-4 border-secondary border-2 p-2 rounded-full flex-1 w-full"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          name="name"
          className="flex-1 bg-transparent outline-none px-4 z-10"
          placeholder={trendingSearches[placeholderIndex]}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
        <button className="cursor-pointer z-10">
          <svg
            className="w-5 h-5 text-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </form>
      {/* <PopularProducts /> */}
    </>
  );
};

export default SearchBar;
