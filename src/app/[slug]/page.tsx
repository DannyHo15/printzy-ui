'use client';

import CustomizeProducts from '@/components/DetailProduct/CustomizeProducts';
import DescriptionProduct from '@/components/DetailProduct/DescriptionProduct';
import DetailProductReviews from '@/components/DetailProduct/DetailProductReviews';
import ProductSlide from '@/components/Product/ProductSlide';
import ProductImages from '@/components/Product/ProductImages';
import useProducts from '@/hooks/useProducts';
import { Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { notFound } from 'next/navigation';
import BreadcrumbComponent from '@/components/BreadCrumb';
import ActionGroup from '@/components/DetailProduct/ActionGroup';
import { createSelectors } from '@/lib/auto-genarate-selector';
import { useProductStore } from '@/store/product/product.store';

const SinglePage = ({ params }: { params: { slug: string } }) => {
  const productStore = createSelectors(useProductStore);
  const getProductDetail = productStore.use.getProduct();
  const product = productStore.use.product();
  const isLoadingProductDetail = productStore.use.loading();

  const { products, loading } = useProducts({ limit: 5, skip: 0 });

  const [selectedVariant, setSelectedVariant] = useState<any>({});

  const categories = [
    {
      name: product?.categoryProducts[0]?.category.name ?? '',
      href: `/shop?category=${product?.categoryProducts[0]?.id}`,
    },
    {
      name: product?.collection?.name ?? '',
      href: `/shop?category=${product?.categoryProducts[0]?.id}&collection=${product?.collection?.id}`,
    },
  ];

  useLayoutEffect(() => {
    getProductDetail(params.slug);
  }, []);

  useEffect(() => {
    if (!product && !isLoadingProductDetail) {
      notFound();
    }
  }, [product, isLoadingProductDetail]);

  return (
    <div className="px-4 md:px-8 lg:px-10 xl:px-20 2xl:px-32  space-y-10">
      {/* IMG */}
      <BreadcrumbComponent categories={categories} />
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="w-full flex lg:flex-row flex-col gap-9  h-max">
          <ProductImages
            items={product?.photos}
            primaryUpload={selectedVariant?.upload}
          />
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <h1 className="text-2xl font-medium">{product?.name}</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="24"
                height="24"
                x="0"
                y="0"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
              >
                <path
                  d="M406 332c-29.641 0-55.761 14.581-72.167 36.755L191.99 296.124c2.355-8.027 4.01-16.346 4.01-25.124 0-11.906-2.441-23.225-6.658-33.636l148.445-89.328C354.307 167.424 378.589 180 406 180c49.629 0 90-40.371 90-90S455.629 0 406 0s-90 40.371-90 90c0 11.437 2.355 22.286 6.262 32.358l-148.887 89.59C156.869 193.136 132.937 181 106 181c-49.629 0-90 40.371-90 90s40.371 90 90 90c30.13 0 56.691-15.009 73.035-37.806l141.376 72.395C317.807 403.995 316 412.75 316 422c0 49.629 40.371 90 90 90s90-40.371 90-90-40.371-90-90-90z"
                  fill="#19124f"
                  data-original="#000000"
                ></path>
              </svg>
            </div>

            <div className="h-[2px] bg-gray-100" />
            {!product?.discountPercent ? (
              <h2 className="font-medium text-xl">${product?.price}</h2>
            ) : (
              <div>
                <div className="flex items-center gap-2">
                  <NumericFormat
                    value={
                      +product?.price * (1 - product?.discountPercent / 100)
                    }
                    displayType={'text'}
                    thousandSeparator={true}
                    fixedDecimalScale={true}
                    decimalScale={0}
                    suffix={' VND'}
                    renderText={(value) => (
                      <p className="text-xl text-right font-bold text-primary-price uppercase mt-auto">
                        {value}
                      </p>
                    )}
                  />
                  <NumericFormat
                    value={product?.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    fixedDecimalScale={true}
                    decimalScale={0}
                    suffix={' VND'}
                    renderText={(value) => (
                      <p className="text-md text-gray-500 line-through">
                        {value}
                      </p>
                    )}
                  />
                </div>
                <p className="text-pr-color-success-500 font-semibold text-sm">
                  Free returns
                </p>
              </div>
            )}
            <div className="h-[2px] bg-gray-100" />
            {product && (
              <>
                <CustomizeProducts
                  product={product}
                  productOptions={product?.productOptions}
                  setVariant={(variant) => setSelectedVariant(variant)}
                />
                <ActionGroup
                  selectedVariant={selectedVariant}
                  slug={params.slug}
                  product={product}
                />
              </>
            )}
          </div>
        </div>
        {/* TEXTS */}
      </div>
      <DescriptionProduct
        product={product}
        categories={categories}
        variant={selectedVariant}
      />
      <div className="mt-10">
        <h1 className="text-2xl text-primary">Reviews</h1>
        <Suspense fallback="Loading...">
          <DetailProductReviews productId={product?.id} />
        </Suspense>
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
