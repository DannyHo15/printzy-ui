'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;

    if (name) {
      router.push(`/list?name=${name}`);
    }
  };

  return (
    <form
      className="flex items-center justify-between gap-4 border-secondary border-2 p-2 rounded-full flex-1 w-full"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="name"
        placeholder="What are you looking for?"
        className="flex-1 bg-transparent outline-none"
      />
      <button className="cursor-pointer">
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
  );
};

export default SearchBar;
