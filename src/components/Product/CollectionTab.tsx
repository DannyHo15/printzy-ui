import { Suspense, useState } from "react";
import Skeleton from "../Skeleton";
import ProductList from "./ProductList";
import Link from "next/link";
import useCollections from "@/hooks/useCollections";

export default function CollectionTabs() {
  const collections = useCollections();
  const [activeTab, setActiveTab] = useState("event-tab-5");
  const [selectedCollectionId, setSelectedCollectionI] = useState<
    number | null
  >(null);

  const openTabEvent = (tabId: any) => {
    setActiveTab(tabId);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4 mb-4 overflow-hidden rounded-lg">
        {collections?.slice(0, 4)?.map((collection, index: number) => (
          <button
            type="button"
            className={`flex-1 bg-gray-200 rounded-xl p-3 text-lg font-medium text-secondary ${
              activeTab === `event-tab-${index}`
                ? "bg-secondary text-white"
                : "bg-slate-100"
            }`}
            onClick={() => {
              openTabEvent(`event-tab-${index}`);
              setSelectedCollectionI(collection.id);
            }}
          >
            {collection.name}
          </button>
        ))}
      </div>
      <Suspense fallback={<Skeleton />}>
        <ProductList
          categoryId={process.env.FEATURED_PRODUCTS_FEATURED_CATEGORY_ID!}
          limit={10}
          searchParams={{ collectionId: selectedCollectionId }}
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
