import CategoryList from "@/components/Category/CategoryList";
import PerfectFitGuarantee from "@/components/PerfectFitGuarantee";
import CollectionTabs from "@/components/Product/CollectionTab";
import ProductList from "@/components/Product/ProductList";
import ReviewProductList from "@/components/Product/ReviewProductList";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Slider />
      <div className="mt-24 md:px-32 ">
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-32">
        <div>
          <CollectionTabs />
        </div>
      </div>
      <div className="mt-24 px-4 md:px-32">
        <h1 className="text-xl text-primary font-semibold border-l-8 border-secondary">
          <span className="ml-2">Featured Products</span>
        </h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_FEATURED_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-32">
        <h1 className="text-xl text-primary font-semibold border-l-8 border-secondary">
          <span className="ml-2">New Products</span>
        </h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_NEW_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
      <PerfectFitGuarantee />
      <div className="mt-24 px-4 md:px-32">
        <h1 className="text-xl  border-l-8 border-secondary">
          <div className="ml-2 text-primary font-semibold">
            Our Happy & Growing Customers
          </div>
          <div className="ml-2 text-sm text-secondary">
            See why people love Printblur
          </div>
        </h1>
        <Suspense fallback={<Skeleton />}>
          <ReviewProductList
            categoryId={process.env.FEATURED_PRODUCTS_NEW_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-32">
        <h1 className="text-xl text-primary font-semibold border-l-8 border-secondary">
          <span className="ml-2">Because you viewed</span>
        </h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_NEW_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
    </>
  );
}
