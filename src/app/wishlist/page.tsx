"use client";
import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import Header from "../components/header";
// import WishProduct from "../components/wishproduct";
// import { selectWishItems } from "../slices/wishlistSlice";
import Head from "next/head";
import { useWishlistStore } from "@/store/useWishList";
import WishlistProduct from "@/components/WishlistProduct";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function WishList() {
  const router = useRouter();

  const isLoggedIn = Cookies.get("printzy_ac_token");

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);
  const { wishlist } = useWishlistStore();
  return (
    <>
      <Head>
        <title>Printzy | Wishlist</title>
      </Head>
      <div className="w-full min-h-screen relative  pb-10">
        <div className="max-w-6xl mx-auto pt-20 px-5 min-h-screen">
          <div className="bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-3 md:py-6 md:px-6 pb-3">
            <div className="col-span-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2 px-4 md:px-0">
              {wishlist.length > 0 ? (
                wishlist.map((item: any, idx: number) => (
                  <div key={`wishlist-${idx}`}>
                    <WishlistProduct item={item} />
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-400 col-span-2 md:col-span-3 lg:col-span-4 flex justify-center place-items-center">
                  Your wishlist is empty
                </div>
              )}
            </div>

            <div className="overflow-hidden md:pl-10 row-start-1 md:col-start-3 mb-6 md:mb-0 h-48 md:h-full">
              <div className="relative">
                <div className="text-white flex justify-center place-items-center text-2xl absolute w-full rounded-xl bg-gray-600 ml-10 bg-opacity-60 font-bold right-0 top-0 h-48 md:h-full">
                  <h1>WISHLIST</h1>
                </div>
                <img
                  src="https://i.ibb.co/N23Cxhz/8b683a2f7a998bdd6df80046dc1f5292.jpg"
                  className="object-cover rounded-xl w-full"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WishList;