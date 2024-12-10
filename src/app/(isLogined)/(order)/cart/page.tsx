'use client';

import React, { useEffect, useMemo } from 'react';

import Link from 'next/link';
import useCartStore from '@/store/useCartStore';
import CartProduct from '@/components/Product/CartProduct';
import { NumericFormat } from 'react-number-format';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ICartItemsResponse } from '@/types/cart';
import { ProductPriceService } from '@/services/ProductPriceService';

function Cart() {
  const { cart, getCart, isLoading } = useCartStore();
  const totalPrice = useMemo(() => {
    return cart?.cartItems?.reduce(
      (total: number, item: ICartItemsResponse) => {
        return (
          total +
          ProductPriceService.calculateTotalPrice(
            item.variant.price,
            item.quantity,
            item.product.discountPercent
          )
        );
      },
      0
    );
  }, [cart?.cartItems]);
  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <div className="w-full min-h-screen relative pb-10">
        {/* <Header /> */}
        <div className="max-w-6xl mx-auto px-10">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-4">
            <div className="md:col-span-2 md:mr-5">
              <div className="">
                <div className="shadow-lg rounded-xl bg-primary text-white px-5 py-3">
                  <h1 className="font-semibold text-lg md:text-xl mb-1">
                    GET FREE SHIPPING WITH MEMBER+ ON EVERY ORDER
                  </h1>
                  <p className="text-xs mb-1 text-gray-100">
                    Non member receive free-shipping for purchases 1,500,000₫ or
                    more
                  </p>
                </div>
                <div className="rounded-xl bg-white px-5 pt-5 mt-5 shadow-lg min-h-96 overflow-hidden">
                  <p>Your Cart ({cart?.cartItems?.length})</p>
                  <div className="pt-5 pb-2">
                    {cart?.cartItems?.length > 0 &&
                      cart?.cartItems?.map((item: any, idx: number) => (
                        <CartProduct
                          idx={idx}
                          key={item?.variant?.sku ?? idx}
                          item={item}
                        />
                      ))}
                    {cart?.cartItems?.length === 0 && (
                      <div className="text-gray-400 text-sm mb-10">
                        <Image
                          className="mx-auto"
                          width={200}
                          height={200}
                          loading="eager"
                          src="/empty-cart.png"
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
                <h2 className="text-cusblack font-bold text-md">SUMMARY</h2>
                <div className="text-sm pt-1 font-semibold pb-2 border-b border-cusblack flex justify-between place-items-center">
                  <p className="">TOTAL</p>
                  <NumericFormat
                    value={totalPrice}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={'VND'}
                    renderText={(value) => (
                      <p className="text-lg font-bold text-primary-price uppercase">
                        {value}
                      </p>
                    )}
                  />
                </div>
                {
                  // <div className="my-3 border-b border-cusblack pb-2">
                  //   {items.map((item, idx) => (
                  //     <div
                  //       key={idx}
                  //       className="flex justify-between place-items-center text-sm mb-1"
                  //     >
                  //       <p className="pr-3">{item.name}</p>
                  //       <NumberFormat
                  //         value={item.price * item.quantity}
                  //         displayType={"text"}
                  //         thousandSeparator={true}
                  //         prefix={"Rp"}
                  //         renderText={(value, props) => <p {...props}>{value}</p>}
                  //       />
                  //     </div>
                  //   ))}
                  //   <div className="flex justify-between place-items-center text-sm mb-1">
                  //     <p>Shipping fee</p>
                  //     <p>FREE</p>
                  //   </div>
                  // </div>
                }

                {/*                   <div className="flex justify-between place-items-center font-semibold">
                  <p>TOTAL</p>
                  <NumericFormat
                    value={cart?.cartItems?.reduce(
                      (total: number, item: any) =>
                        total + item.variant?.price * item.quantity,
                      0,
                    )}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"VND"}
                    renderText={(value) => (
                      <p className="text-lg font-bold text-primary-price uppercase">
                        {value}
                      </p>
                    )}
                  />
                </div>
 */}
                <Button
                  disabled={!cart?.cartItems?.length}
                  // onClick={createCheckoutSession}
                  className="py-2 px-3 disabled:cursor-not-allowed text-white w-full mt-6 rounded-lg bg-secondary hover:bg-secondary/90 "
                >
                  {!isLoading ? (
                    <Link href={'/order-summary'}>
                      <span className="flex justify-center place-items-center">
                        Place Order
                      </span>
                    </Link>
                  ) : (
                    <img
                      className="w-6 h-6 mx-auto"
                      src="https://i.ibb.co/pL1TJSg/Rolling-1s-200px-2.gif"
                      alt=""
                    />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
