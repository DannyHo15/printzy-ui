import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import useOptions from '@/hooks/useOptions';

function SideCategory({ typesData, categories }: any) {
  const router = useRouter();
  const options = useOptions();

  const categoryRef = useRef<HTMLInputElement[]>([]);
  const priceRef = useRef<HTMLInputElement[]>([]);
  const [filter, setFilter] = useState<any>({});
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [checkedFilters, setCheckedFilters] = useState<{
    [key: string]: Set<string>;
  }>({});

  const [selectedCategory, setSelectedCategory] = useState<any>();

  const handleSearchParams = (type: string, value: string) => {
    if (!type || !value) return;

    const lowercaseType = type.toLowerCase();
    const params = new URLSearchParams(window.location.search);

    const currentValues = params.get(lowercaseType);

    if (currentValues && type !== 'category' && type !== 'price') {
      const valuesArray = currentValues.split(',');

      if (valuesArray.includes(value.toString())) {
        const newValues = valuesArray.filter((v) => v != value);
        if (newValues.length > 0) {
          params.set(lowercaseType, newValues.join(','));
        } else {
          params.delete(lowercaseType);
        }
      } else {
        valuesArray.push(value);
        params.set(lowercaseType, valuesArray.join(','));
      }
    } else {
      params.set(lowercaseType, value);
    }

    router.push(`?${params.toString()}`);
  };

  const toggleFilter = (filterType: string, value: string) => {
    setFilter({ ...filter, [filterType]: value });
    handleSearchParams(filterType, value);
  };
  const toggleFilterDynamic = (filterType: string, value: string) => {
    setCheckedFilters((prev) => {
      const newSet = new Set(prev[filterType] || []);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return { ...prev, [filterType]: newSet };
    });
    handleSearchParams(filterType, value);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prevSections) =>
      prevSections.includes(section)
        ? prevSections.filter((s) => s !== section)
        : [...prevSections, section]
    );
  };

  const isSectionExpanded = (section: string) =>
    expandedSections.includes(section);

  const clearAllFilters = () => {
    setCheckedFilters({});
    setFilter({});

    const params = new URLSearchParams();

    router.push(`?${params.toString()}`);

    categoryRef.current.forEach((input) => {
      if (input) input.checked = false;
    });
    priceRef.current.forEach((input) => {
      if (input) input.checked = false;
    });
  };

  return (
    <div className="bg-white rounded-3xl px-5 py-6 shadow-lg w-2/3 md:w-1/2 lg:w-full overflow-y-auto max-h-full">
      <div>
        <div className="breadcrumb-link">
          <a
            href="http://localhost:3000/shop"
            className="text-blue-500 text-sm"
          >
            All Categories
          </a>
          {selectedCategory && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="currentColor"
                className="bi bi-chevron-right inline-block mx-1"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                ></path>
              </svg>
              <a
                href={`http://localhost:3000/shop?category=${selectedCategory.id}`}
                className="text-blue-500 text-sm"
              >
                {selectedCategory?.name}
              </a>
            </>
          )}
        </div>
        <div className="category-item-rating flex items-center gap-1">
          <span className="rating-star">⭐</span>
          <span className="rating-star">⭐</span>
          <span className="rating-star">⭐</span>
          <span className="rating-star">⭐</span>
          <span className="rating-star">⭐</span>
        </div>
        <small className="text-gray-600">
          4.9/5 stars (<span className="cate-rating-count">146</span> votes)
        </small>
        {/* Category Section */}{' '}
        <div className="border-b border-slate-400 py-6">
          <h3 className="-my-3 flow-root">
            <button
              type="button"
              className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
              aria-controls="filter-section-1"
              aria-expanded={isSectionExpanded('category')}
              onClick={() => toggleSection('category')}
            >
              <span className="font-medium text-cusblack text-base">
                Category
              </span>
              <span className="ml-6 flex items-center">
                {isSectionExpanded('category') ? (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5.23 12.79a.75.75 0 0 0 1.06 0L10 9.06l3.71 3.73a.75.75 0 0 0 1.06-1.06l-4.24-4.25a.75.75 0 0 0-1.06 0L5.23 11.73a.75.75 0 0 0 0 1.06Z" />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5.23 7.21a.75.75 0 0 1 1.06 0L10 10.94l3.71-3.73a.75.75 0 0 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.23 8.27a.75.75 0 0 1 0-1.06Z" />
                  </svg>
                )}
              </span>
            </button>
          </h3>
          {isSectionExpanded('category') && (
            <div className="pt-6" id="filter-section-1">
              <div className="space-y-4">
                {categories?.map((category: any, index: any) => (
                  <div
                    className="flex items-center"
                    key={`category-box-${category.id}`}
                  >
                    <input
                      id={`filter-category-${category.id}`}
                      name="category[]"
                      value={category.id}
                      type="radio"
                      onChange={() => {
                        toggleFilter('category', category.id);
                        setSelectedCategory(category);
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-primary"
                      ref={(el: any) => (categoryRef.current[index] = el!)}
                    />
                    <label
                      htmlFor={`filter-category-${category.id}`}
                      className="ml-3 text-sm text-primary hover:text-secondary hover:underline"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Collect Section */}
        <div className="border-b border-slate-400 py-6">
          <h3 className="-my-3 flow-root">
            <button
              type="button"
              className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
              aria-controls="filter-section-0"
              aria-expanded={isSectionExpanded('price')}
              onClick={() => toggleSection('price')}
            >
              <span className="font-medium text-cusblack text-base">Price</span>
              <span className="ml-6 flex items-center">
                {isSectionExpanded('price') ? (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentprice"
                  >
                    <path d="M5.23 12.79a.75.75 0 0 0 1.06 0L10 9.06l3.71 3.73a.75.75 0 0 0 1.06-1.06l-4.24-4.25a.75.75 0 0 0-1.06 0L5.23 11.73a.75.75 0 0 0 0 1.06Z" />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentprice"
                  >
                    <path d="M5.23 7.21a.75.75 0 0 1 1.06 0L10 10.94l3.71-3.73a.75.75 0 0 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.23 8.27a.75.75 0 0 1 0-1.06Z" />
                  </svg>
                )}
              </span>
            </button>
          </h3>
          {isSectionExpanded('price') && (
            <div className="pt-6" id="filter-section-0">
              <div className="space-y-4">
                {[
                  { label: 'Under 100.000₫', value: '0-100000' },
                  { label: 'From 100.000₫ - 200.000₫', value: '100000-200000' },
                  { label: 'From 300.000₫ - 500.000₫', value: '300000-500000' },
                  {
                    label: 'From 500.000₫ - 1.000.000₫',
                    value: '500000-1000000',
                  },
                  {
                    label: 'From 1.000.000₫ - 3.000.000₫',
                    value: '1000000-3000000',
                  },
                ].map((price, index: any) => (
                  <div className="flex items-center" key={price.value}>
                    <input
                      id={`filter-price-${price.value}`}
                      name="price[]"
                      value={price.value}
                      type="radio"
                      onChange={() => toggleFilter('price', price.value)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      ref={(el: any) => (priceRef.current[index] = el!)}
                    />
                    <label
                      htmlFor={`filter-price-${price.value}`}
                      className="ml-3 text-sm text-gray-600 text-primary hover:text-secondary hover:underline"
                    >
                      {price.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {options?.map((option: any, index: number) => (
          <div key={index} className="border-b border-slate-400 py-6">
            <h3 className="-my-3 flow-root">
              <button
                type="button"
                className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                aria-controls="filter-section-0"
                aria-expanded={isSectionExpanded(option.name)}
                onClick={() => toggleSection(option.name)}
              >
                <span className="font-medium text-cusblack text-base">
                  {option.name}
                </span>
                <span className="ml-6 flex items-center">
                  {isSectionExpanded(option.name) ? (
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentprice"
                    >
                      <path d="M5.23 12.79a.75.75 0 0 0 1.06 0L10 9.06l3.71 3.73a.75.75 0 0 0 1.06-1.06l-4.24-4.25a.75.75 0 0 0-1.06 0L5.23 11.73a.75.75 0 0 0 0 1.06Z" />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentprice"
                    >
                      <path d="M5.23 7.21a.75.75 0 0 1 1.06 0L10 10.94l3.71-3.73a.75.75 0 0 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.23 8.27a.75.75 0 0 1 0-1.06Z" />
                    </svg>
                  )}
                </span>
              </button>
            </h3>
            {isSectionExpanded(option.name) && (
              <div className="pt-6" id="filter-section-0">
                <div className="space-y-4">
                  {option?.optionValues.map((optionValue: any, index: any) => (
                    <div className="flex items-center" key={optionValue.value}>
                      <input
                        id={`filter-${optionValue.value}`}
                        name={`${option.name}'[]'`}
                        value={optionValue.id}
                        type="checkbox"
                        onChange={() =>
                          toggleFilterDynamic(option.name, optionValue.id)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={
                          checkedFilters[option.name]?.has(optionValue.id) ||
                          false
                        }
                      />
                      <label
                        htmlFor={`filter-${optionValue.value}`}
                        className="ml-3 text-sm text-gray-600 text-primary hover:text-secondary hover:underline"
                      >
                        {optionValue.value}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="w-full flex justify-end mt-4">
          <button className="text-sm underline" onClick={clearAllFilters}>
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideCategory;
