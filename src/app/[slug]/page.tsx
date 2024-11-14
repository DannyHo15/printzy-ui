"use client";

import CustomizeProducts from "@/components/DetailProduct/CustomizeProducts";
import DescriptionProduct from "@/components/DetailProduct/DescriptionProduct";
import DetailProductReviews from "@/components/DetailProduct/DetailProductReviews";
import ProductSlide from "@/components/Product/ProductSlide";
import ProductImages from "@/components/Product/ProductImages";
import useDetailProduct from "@/hooks/useDetailProduct";
import useProducts from "@/hooks/useProducts";

import { Suspense, useState } from "react";
import Breadcrumb from "@/components/BreadCrumb";

const SinglePage = ({ params }: { params: { slug: string } }) => {
  const product = useDetailProduct(params?.slug);

  const { products, loading } = useProducts({ limit: 5, skip: 0 });

  const [selectedVariant, setSelectedVariant] = useState<any>({});

  const categories = [
    {
      name: product?.category?.name,
      href: `/shop?category=${product?.category?.id}`,
    },
    {
      name: product?.collection?.name,
      href: `/shop?category=${product?.category?.id}&collection=${product?.collection?.id}`,
    },
  ];

  return (
    <div className="px-4 md:px-8 lg:px-10 xl:px-20 2xl:px-32 mt-10">
      {/* IMG */}
      <Breadcrumb categories={categories} />
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-7/12 lg:sticky top-20 h-max">
          <ProductImages
            items={product?.photos}
            primaryUpload={selectedVariant?.upload}
          />
          <div className="mt-10">
            <h1 className="text-2xl text-primary">Reviews</h1>
            <Suspense fallback="Loading...">
              <DetailProductReviews productId={product?.id} />
            </Suspense>
          </div>
        </div>
        {/* TEXTS */}
        <div className="w-full lg:w-5/12 flex flex-col gap-2">
          <h1 className="text-2xl font-medium">{product?.name}</h1>

          <div className="h-[2px] bg-gray-100" />
          {!product?.discountPercent ? (
            <h2 className="font-medium text-xl">${product?.price}</h2>
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-medium text-xl text-secondary">
                  ${product?.price * (1 - product?.discountPercent / 100)}
                </h2>
                <h3 className="text-md text-gray-500 line-through">
                  ${product?.price}
                </h3>
              </div>
              <p className="text-pr-color-success-500 font-semibold text-sm">
                FREE returns
              </p>
            </div>
          )}
          <div className="h-[2px] bg-gray-100" />
          <CustomizeProducts
            product={product}
            productOptions={product?.productOptions}
            setVariant={(variant) => setSelectedVariant(variant)}
          />
          <div className="h-[2px] bg-gray-100" />
          <div>
            <DescriptionProduct
              product={product}
              categories={categories}
              variant={selectedVariant}
            />
          </div>
          <div className="h-[2px] bg-gray-100" />
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-xl text-primary">You may also like</h1>
        <Suspense fallback="Loading...">
          <ProductSlide items={products} slidesPerView={4} />
        </Suspense>
      </div>

      <div className="mt-10 ">
        <h1 className="text-xl text-primary">Because you viewed</h1>
        <Suspense fallback="Loading...">
          <ProductSlide items={products} slidesPerView={4} />
        </Suspense>
      </div>
    </div>
  );
};

export default SinglePage;
