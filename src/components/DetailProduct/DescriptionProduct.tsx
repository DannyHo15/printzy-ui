import { useState } from 'react';
import ProductPropertiesTable from './ProductPropertiesTable';

const DescriptionProduct = ({
  product,
  categories,
  variant,
}: {
  product: any;
  variant: any;
  categories: any;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded((prev) => !prev);
  };

  const description = product?.description || '';

  return (
    <>
      <h2 className="text-primary font-bold">Featured</h2>
      {/* Thiết lập opacity thành 50% khi isExpanded là false */}
      <div
        className={`transition-opacity duration-300  ${
          !isExpanded ? 'opacity-50' : 'opacity-100'
        }`}
      >
        <ProductPropertiesTable
          options={product?.productOptions}
          categories={categories}
          product={product}
          variant={variant}
        />
      </div>
      <p
        className="mt-2 text-gray-500 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: isExpanded ? description : '' }}
      ></p>

      <span
        className="relative flex items-center cursor-pointer mt-2"
        onClick={toggleContent}
      >
        {isExpanded ? (
          <span className="relative m-auto z-20 select-none bg-white p-1.5 cursor-pointer rounded-full border border-gray transition text-black inline-flex w-fit justify-center items-center text-sm">
            Less Content
          </span>
        ) : (
          <span className="relative m-auto z-20 select-none bg-white p-1.5 cursor-pointer rounded-full border border-gray transition text-black inline-flex w-fit justify-center items-center text-sm">
            More Content
          </span>
        )}
      </span>
      <div className="policies-box mt-10">
        <label htmlFor="shipping-policies" className="block cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">
              Shipping and return policies
            </span>
          </div>
        </label>

        <div className="shipping-policies-content mt-2">
          <div className="product-detail-row product-delivery flex items-start pt-2">
            <img
              className="product-row-icon w-8 h-8"
              src="https://printblur.com/modules/cart/images/shipped-printblur.svg"
              alt="Shipping Icon"
            />
            <div className="product-row-text flex flex-col ml-2">
              <span className="addition-head">
                Deliver to&nbsp;
                <span className="delivery-country-name font-bold">
                  Viet Nam
                </span>
                <a
                  href="/shipping-delivery-n7.html"
                  rel="nofollow"
                  target="_blank"
                  className="text-secondary ml-1 underline"
                >
                  Details»
                </a>
              </span>

              <div className="shipping-info-calculate mt-2">
                <p className="my-3 text-sm font-normal">
                  <span className="font-semibold">$10.95 standard</span> between
                  Oct. 21 - Nov. 22
                </p>
                <p className="my-3 text-sm font-normal">
                  <span className="font-semibold">Ready to ship in:</span> 1
                  business day
                </p>
              </div>
            </div>
          </div>

          <div className="product-row-text flex items-start mt-2">
            <img
              src="https://printblur.com/assets/images/refresh-printblur.svg"
              width="32"
              height="32"
              alt="Refresh"
              className="w-8 h-8"
            />
            <div className="ml-2">
              <span>Eligible for</span>
              <a
                href="/refund-policy-n20.html"
                rel="nofollow"
                target="_blank"
                className="text-secondary ml-1 underline"
              >
                Easy Refund
              </a>{' '}
              or
              <a
                href="/return-exchange-policy-n19.html"
                rel="nofollow"
                target="_blank"
                className="text-secondary ml-1 underline"
              >
                Return and Replacement
              </a>
              <span> within 30 days from the date of delivery</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DescriptionProduct;
