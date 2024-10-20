import { Suspense, useState } from "react";
import Skeleton from "../Skeleton";
import ProductList from "./ProductList";
import Link from "next/link";

export default function CollectionTabs() {
  const [activeTab, setActiveTab] = useState("event-tab-5");

  const openTabEvent = (tabId: any) => {
    setActiveTab(tabId);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4 mb-4 overflow-hidden rounded-lg">
        <button
          type="button"
          className={`flex-1 bg-gray-200 rounded-xl p-3 text-lg font-medium text-secondary ${
            activeTab === "event-tab-1"
              ? "bg-secondary text-white"
              : "bg-slate-100"
          }`}
          onClick={() => openTabEvent("event-tab-1")}
        >
          Trending T-Shirts
        </button>
        <button
          type="button"
          className={`flex-1 bg-gray-200 rounded-xl p-3 text-lg font-medium text-secondary ${
            activeTab === "event-tab-2"
              ? "bg-secondary text-white"
              : "bg-slate-100"
          }`}
          onClick={() => openTabEvent("event-tab-2")}
        >
          Hawaiians
        </button>
        <button
          type="button"
          className={`flex-1 bg-gray-200 rounded-xl p-3 text-lg font-medium text-secondary ${
            activeTab === "event-tab-3"
              ? "bg-secondary text-white"
              : "bg-slate-100"
          }`}
          onClick={() => openTabEvent("event-tab-3")}
        >
          Clogs
        </button>
        <button
          type="button"
          className={`flex-1 bg-gray-200 rounded-xl p-3 text-lg font-medium text-secondary ${
            activeTab === "event-tab-4"
              ? "bg-secondary text-white"
              : "bg-slate-100"
          }`}
          onClick={() => openTabEvent("event-tab-4")}
        >
          Baseball Jersey
        </button>
        <button
          type="button"
          className={`flex-1 bg-gray-200 rounded-xl p-3 text-lg font-medium text-secondary ${
            activeTab === "event-tab-5"
              ? "bg-secondary text-white"
              : "bg-slate-100"
          }`}
          onClick={() => openTabEvent("event-tab-5")}
        >
          Leather Bags
        </button>
      </div>
      <Suspense fallback={<Skeleton />}>
        <ProductList
          categoryId={process.env.FEATURED_PRODUCTS_FEATURED_CATEGORY_ID!}
          limit={10}
        />
      </Suspense>
      <div className="flex justify-center w-full">
        <Link
          href={"/shop"}
          className="rounded-lg px-14 py-2 text-lg font-medium bg-secondary text-white"
        >
          See All
        </Link>
      </div>
    </div>
  );
}
