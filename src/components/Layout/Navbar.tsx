'use client';
import { useState, useEffect } from 'react'; // Import useState and useEffect from React
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';
import Menu from './Menu';
import NavIcons from './NavIcons';
import useCategories from '@/hooks/useCategories';
import ThemeToggle from './themeToggle/theme-toggle';

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  collections: Collection[];
}

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null); // State to manage open dropdown
  const categories: Category[] = useCategories();

  const toggleDropdown = (categoryId: string) => {
    setDropdownOpen((prev) => (prev === categoryId ? null : categoryId)); // Toggle dropdown
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      setDropdownOpen(null); // Close dropdown if clicked outside
    }
  };

  useEffect(() => {
    // Add event listener to handle clicks outside dropdown
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup listener
    };
  }, []);

  return (
    <div className="h-24 relative">
      {/* MOBILE */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/">
          <div className="text-2xl tracking-wide">PRINTZY</div>
        </Link>
        <Menu />
      </div>
      {/* BIGGER SCREENS */}
      <div className="hidden md:flex items-start justify-between gap-8 h-full w-[90%] mx-auto m-5">
        {/* LEFT (Logo) */}
        <div className="w-1/2 xl:w-1/12 flex items-center justify-start m-2">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="" width={24} height={24} />
            <div className="text-2xl tracking-wide">PRINTZY</div>
          </Link>
        </div>
        {/* CENTER (SearchBar and Dropdown) */}
        <div className="w-1/2 xl:w-9/12 flex items-start justify-center h-full">
          <div className="w-full">
            <SearchBar />

            {/* Dropdowns for each category */}
            <div className="flex gap-4 justify-center mt-2">
              {categories.map((category) => (
                <div
                  className="relative dropdown-container ml-2" // Add class for dropdown container
                  key={category.id}
                >
                  <button
                    onClick={() => toggleDropdown(category.id)} // Toggle specific dropdown
                    className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 text-primary hover:text-secondary md:p-0 font-medium flex items-center justify-between"
                  >
                    {category.name} {/* Category Name */}
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  {dropdownOpen === category.id && ( // Show dropdown if it matches the open category
                    <div className="bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-4 w-44 absolute left-0">
                      <ul className="py-1">
                        {category.collections.map((collection) => (
                          <li key={collection.id}>
                            <Link
                              href={`/shop?category=${category.id}&collection=${collection.id}`}
                              onClick={() => setDropdownOpen(null)} // Close dropdown when selecting an option
                              className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 text-primary hover:text-secondary hover:underline"
                            >
                              {collection.name} {/* Collection Name */}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* RIGHT (Icons or other components) */}
        <NavIcons />
      </div>
    </div>
  );
};

export default Navbar;
