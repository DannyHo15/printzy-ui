import React, { useState } from "react";

import SideCategory from "./Category/SideCategory";
import TopCategory from "./Category/TopCategory";
import { Columns3, LayoutGrid } from "lucide-react";

function Card({ children, categories, collections, setSort, sort }: any) {
  const [open, setOpen] = useState(false);
  const [grid, setGrid] = useState(4);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="w-full min-h-screen pb-10">
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-white fixed z-30 drop-shadow-2xl lg:hidden flex justify-center place-items-center bottom-0 left-0 m-5"
      >
        <svg
          className="w-6 text-cusblack h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </button>
      <div className="max-w-8xl px-4 mx-auto pt-10 md:px-20">
        <div className="grid grid-cols-4 gap-x-6">
          <div
            onClick={() => setOpen(!open)}
            className={`${
              open ? `fixed` : `hidden`
            } lg:static lg:inline bg-gray-400  h-screen bg-opacity-30 z-20 flex w-full justify-center place-items-center top-0 lg:p-4`}
          >
            <SideCategory categories={categories} />
          </div>
          <div className="col-span-4 md:col-span-4 lg:col-span-3 flex flex-col py-4 mx-2 md:mx-0">
            {/* <ShopCarousel /> */}
            <TopCategory collections={collections} />
            <div className="rounded-2xl overflow-hidden w-full bg-white mt-6 px-5 py-4">
              <div className="mb-3">
                <div className="flex justify-between place-items-center text-gray-600 text-sm relative">
                  <div className="flex">
                    <button
                      onClick={() => setGrid(2)}
                      className="p-1 relative flex justify-center items-center rounded-full hover:bg-gray-100 active:bg-gray-200 cursor-pointer duration-200"
                    >
                      <LayoutGrid size={20} />
                    </button>
                    <button
                      onClick={() => setGrid(4)}
                      className="p-1 relative flex justify-center items-center rounded-full hover:bg-gray-100 active:bg-gray-200 cursor-pointer duration-200"
                    >
                      <Columns3 size={20} />
                    </button>
                  </div>
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="flex place-items-center hover:bg-gray-100 py-1 px-2 rounded-md active:bg-gray-200"
                  >
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                      />
                    </svg>
                    Sort
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div
                    className={`${
                      sortOpen ? "absolute" : "hidden"
                    } top-7 shadow-lg rounded-md text-sm right-0 bg-white text-gray-500 z-20 px-2 py-2`}
                  >
                    <ul>
                      <li className="py-1 px-2 rounded-sm hover:bg-gray-100 active:bg-gray-200">
                        <span
                          className="w-full flex items-center gap-2"
                          onClick={() => {
                            setSort(0);
                            setSortOpen(false);
                          }}
                        >
                          <span style={{ width: "24px", height: "24px" }}>
                            {sort === 0 && (
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 12L9 16L19 6"
                                  stroke="gray"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                          Newest
                        </span>
                      </li>
                      <li className="py-1 px-2 rounded-sm hover:bg-gray-100 active:bg-gray-200">
                        <span
                          className="w-full flex items-center gap-2"
                          onClick={() => {
                            setSort(1);
                            setSortOpen(false);
                          }}
                        >
                          <span style={{ width: "24px", height: "24px" }}>
                            {sort === 1 && (
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 12L9 16L19 6"
                                  stroke="gray"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                          Price low to high
                        </span>
                      </li>
                      <li className="py-1 px-2 rounded-sm hover:bg-gray-100 active:bg-gray-200">
                        <span
                          className="w-full flex items-center gap-2"
                          onClick={() => {
                            setSort(2);
                            setSortOpen(false);
                          }}
                        >
                          <span style={{ width: "24px", height: "24px" }}>
                            {sort === 2 && (
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 12L9 16L19 6"
                                  stroke="gray"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                          Price high to low
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className={`grid grid-cols-${grid} md:grid-cols-${grid} lg:grid-cols-${grid} gap-x-4 gap-y-6`}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
