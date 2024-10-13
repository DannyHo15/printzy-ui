import React from "react";

const PopularProducts = () => {
  return (
    <div className="p-4">
      <div className="completions-list-head text-xl font-semibold mb-4">
        Popular Products
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="popular-product-item bg-white shadow-md rounded-md p-4">
          <a
            href="/korn-tour-2024-merch-korn-tour-2024-tour-dates-2024-shirt-tshirt-p19714787?internal_source=popular-products"
            className="block"
          >
            <img
              className="popular-product-image w-full h-auto rounded-md"
              src="https://cdn.printblur.com/unsafe/540x540/assets.printblur.com/2024/09/26/66f4fcada36990.08020861.webp"
              alt="Korn Tour 2024 Merch, Korn Tour 2024 Tour Dates 2024 Shirt tshirt"
            />
            <div className="popular-product-detail mt-2">
              <span className="block font-medium">
                Korn Tour 2024 Merch, Korn Tour 2024 Tour Dates 2024 Shirt
                tshirt
              </span>
              <div className="popular-product-price-box mt-1">
                <span className="text-lg font-semibold">$20.95</span>
              </div>
            </div>
          </a>
        </div>

        <div className="popular-product-item bg-white shadow-md rounded-md p-4">
          <a
            href="/taco-bell-baseball-jacket-custom-taco-bell-jacket-men-taco-bell-cake-jacket-taco-bell-sauce-racing-jacket-taco-streetwear-jacket-p19718544?internal_source=popular-products"
            className="block"
          >
            <img
              className="popular-product-image w-full h-auto rounded-md"
              src="https://cdn.printblur.com/unsafe/540x540/assets.printblur.com/2024/10/08/mockup2-dj21715-taco-bell-baseball-jacket-dhn-081024-1742f8f422b618ad76c27f7c28cb9cac.jpg"
              alt="Taco Bell Baseball Jacket"
            />
            <div className="popular-product-detail mt-2">
              <span className="block font-medium">
                Taco Bell Baseball Jacket, Custom Taco Bell Jacket Men
              </span>
              <div className="popular-product-price-box mt-1">
                <span className="text-lg font-semibold">$39.95</span>
                <small className="line-through text-gray-500">$49.95</small>
              </div>
            </div>
          </a>
        </div>

        {/* Add more product items as needed */}

        <div className="popular-product-item bg-white shadow-md rounded-md p-4">
          <a
            href="/captain-marvel-costume-captain-marvel-leggings-avengers-endgame-costume-marvel-cosplay-marvel-costume-carol-danvers-leggings-for-women-p19727753?internal_source=popular-products"
            className="block"
          >
            <img
              className="popular-product-image w-full h-auto rounded-md"
              src="https://cdn.printblur.com/unsafe/540x540/assets.printblur.com/2024/10/02/66fcb71674a9c1.95893470.jpg"
              alt="Captain Marvel Costume"
            />
            <div className="popular-product-detail mt-2">
              <span className="block font-medium">
                Captain Marvel Costume, Captain Marvel Leggings
              </span>
              <div className="popular-product-price-box mt-1">
                <span className="text-lg font-semibold">$18.95</span>
              </div>
            </div>
          </a>
        </div>

        {/* Additional product items can be added here in similar fashion */}
      </div>
    </div>
  );
};

export default PopularProducts;
