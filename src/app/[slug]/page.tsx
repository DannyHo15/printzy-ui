"use client";

import CustomizeProducts from "@/components/DetailProduct/CustomizeProducts";
import DescriptionProduct from "@/components/DetailProduct/DescriptionProduct";
import DetailProductReviews from "@/components/DetailProduct/DetailProductReviews";
import ProductSlide from "@/components/Product/ProductSlide";
import ProductImages from "@/components/Product/ProductImages";
import useDetailProduct from "@/hooks/useDetailProduct";
import useOptions from "@/hooks/useOptions";
import useProducts from "@/hooks/useProducts";

import { Suspense, useState } from "react";

const SinglePage = ({ params }: { params: { slug: string } }) => {
  const product = useDetailProduct(params?.slug);
  const products = useProducts({ limit: 5, skip: 0 });
  const options = useOptions(product?.id);

  const [selectedVariant, setSelectedVariant] = useState({});

  const categories = [
    { name: "Clothing", href: "https://printblur.com/group/clothing" },
    { name: "T-Shirts", href: "https://printblur.com/shop/t-shirts" },
    {
      name: "Custom T-Shirts",
      href: "https://printblur.com/shop/custom-t-shirts",
    },
  ];
  const reviewsData = [
    {
      title: "Great Product!",
      comment: "I loved using this product.",
      rating: 5,
      progress: 80,
    },
    {
      title: "Decent",
      comment: "It was okay, but could be better.",
      rating: 3,
      progress: 60,
    },
    {
      title: "Not worth it",
      comment: "I had high expectations, but it didn’t meet them.",
      rating: 1,
      progress: 20,
    },
  ];

  return (
    <div className="px-4 md:px-8 lg:px-10 xl:px-20 2xl:px-32 mt-10">
      {/* IMG */}
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-7/12 lg:sticky top-20 h-max">
          <ProductImages items={product?.photos} />
          <div className="mt-10">
            <h1 className="text-2xl text-primary">Reviews</h1>
            <Suspense fallback="Loading...">
              <DetailProductReviews />
            </Suspense>
          </div>
          <div className="mt-10">
            <h1 className="text-xl text-primary">You may also like</h1>
            <Suspense fallback="Loading...">
              <ProductSlide items={products} slidesPerView={4} />
            </Suspense>
          </div>
        </div>
        {/* TEXTS */}
        <div className="w-full lg:w-5/12 flex flex-col gap-2">
          <h1 className="text-2xl font-medium">{product?.name}</h1>

          <div className="h-[2px] bg-gray-100" />
          {product?.price === product?.discountedPrice ? (
            <h2 className="font-medium text-xl">${product?.price}</h2>
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-medium text-xl text-secondary">
                  ${product?.price}
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
            productId={product?.id}
            options={options}
            setVariant={(variant) => setSelectedVariant(variant)}
          />
          <div className="h-[2px] bg-gray-100" />
          <div>
            <DescriptionProduct
              product={product}
              options={options}
              categories={categories}
              variant={selectedVariant}
            />
          </div>
          <div className="h-[2px] bg-gray-100" />
        </div>
      </div>

      <div className="mt-10 ">
        <h1 className="text-xl text-primary">Because you viewed</h1>
        <Suspense fallback="Loading...">
          <ProductSlide items={products} slidesPerView={6} />
        </Suspense>
      </div>
    </div>
  );
};

export default SinglePage;
