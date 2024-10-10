'use client';
import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';
import Skeleton from '@/components/Skeleton';
import Slider from '@/components/Slider';
import { Suspense } from 'react';

export default function Home() {
  return (
    <>
      <Slider />
      <div className="mt-24 px-4 md:px-32">
        <h1 className="text-2xl">Featured Products</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_FEATURED_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
      <div className="mt-24 md:px-32">
        <h1 className="text-2xl px-4 mb-12">Categories</h1>
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-32">
        <h1 className="text-2xl">New Products</h1>
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
