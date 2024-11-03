'use client';

import React, { useEffect } from 'react';
import Head from 'next/head';

import Link from 'next/link';
import useCartStore from '@/store/useCartStore';
import CartProduct from '@/components/Product/CartProduct';
import { NumericFormat } from 'react-number-format';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';

function Cart() {
  const { cart, getCart, isLoading } = useCartStore();
  const router = useRouter();

  const isLoggedIn = Cookies.get('printzy_ac_token');

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
    getCart();
  }, []);

  return (
    <>
      <Head>
        <title>wefootwear | Basket</title>
      </Head>
      <div className="w-full min-h-screen relative pb-10">
        {/* <Header /> */}
        <div className="max-w-6xl mx-auto pt-20 px-5">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-4">
            <div className="md:col-span-2 md:mr-5">
              <div className="">
                <div className="shadow-lg rounded-xl bg-primary text-white px-5 py-3">
                  <h1 className="font-semibold text-lg md:text-xl mb-1">
                    GET FREE SHIPPING WITH MEMBER+ ON EVERY ORDER
                  </h1>
                  <p className="text-xs mb-1 text-gray-100">
                    Non member receive free-shipping for purchases Rp 1,500,000
                    or more
                  </p>
                </div>
                <div className="rounded-xl bg-white px-5 pt-5 mt-5 shadow-lg overflow-hidden">
                  <p>Your Cart ({cart?.cartItems?.length})</p>
                  <div className="pt-5 pb-2">
                    {cart?.cartItems?.length > 0 &&
                      cart?.cartItems?.map((item: any, idx: number) => (
                        <CartProduct
                          idx={idx}
                          key={item?.variant?.sku}
                          item={item}
                        />
                      ))}
                    {cart?.cartItems?.length === 0 && (
                      <div className="text-gray-400 text-sm mb-10">
                        <img
                          className="md:w-1/3 object-cover w-full mx-auto"
                          src="https://i.ibb.co/hWZhd6F/empty-cart-4a7779da-Convert-Image.png"
                          alt=""
                        />
                        <p className="text-center">
                          Your basket is empty,
                          <br />
                          to start shopping click{' '}
                          <span className="underline">
                            <Link href="/shop">here</Link>
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 md:mt-0 col-span-1">
              <div className="rounded-xl bg-white shadow-lg py-6 px-5">
                <h1 className="text-cusblack font-bold text-md">SUMMARY</h1>
                {/* <div className="px-4 py-3 text-xs font-medium flex place-items-center text-gray-400 border border-gray-200 rounded-md my-4">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                    />
                  </svg>
                  DO YOU HAVE PROMO CODE?
                </div> */}

                <div className="text-sm pt-1 font-semibold pb-2 border-b border-cusblack flex justify-between place-items-center">
                  <p className="">SUBTOTAL</p>
                  <NumericFormat
                    value={cart?.cartItems?.reduce(
                      (total: number, item: any) =>
                        total + item.variant.price * item.quantity,
                      0
                    )}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    renderText={(value) => (
                      <p className="text-lg font-bold text-primary-price uppercase">
                        {value}
                      </p>
                    )}
                  />
                </div>

                <div className="my-3 border-b border-cusblack pb-2">
                  {/* {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between place-items-center text-sm mb-1"
                    >
                      <p className="pr-3">{item.name}</p>
                      <NumberFormat
                        value={item.price * item.quantity}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp"}
                        renderText={(value, props) => <p {...props}>{value}</p>}
                      />
                    </div>
                  ))} */}
                  <div className="flex justify-between place-items-center text-sm mb-1">
                    <p>Shipping fee</p>
                    <p>FREE</p>
                  </div>
                </div>

                <div className="flex justify-between place-items-center font-semibold">
                  <p>TOTAL</p>
                  <NumericFormat
                    value={cart?.cartItems?.reduce(
                      (total: number, item: any) =>
                        total + item.variant.price * item.quantity,
                      0
                    )}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    renderText={(value) => (
                      <p className="text-lg font-bold text-primary-price uppercase">
                        {value}
                      </p>
                    )}
                  />
                </div>

                <button
                  disabled={!cart?.cartItems?.length}
                  // onClick={createCheckoutSession}
                  className="py-2 px-3 disabled:cursor-not-allowed text-white w-full mt-6 rounded-lg bg-secondary "
                >
                  {!isLoading ? (
                    <Link href={'/checkout'}>
                      <span className="flex justify-center place-items-center">
                        CHECKOUT
                        <svg
                          className="ml-2 w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </span>
                    </Link>
                  ) : (
                    <img
                      className="w-6 h-6 mx-auto"
                      src="https://i.ibb.co/pL1TJSg/Rolling-1s-200px-2.gif"
                      alt=""
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
