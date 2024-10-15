import { motion } from "framer-motion";
import Skeleton from "../Skeleton";
import useProducts from "@/hooks/useProducts";
import Link from "next/link";
import Image from "next/image";
import useAllProductReviews from "@/hooks/useAllProductReviews";

const PRODUCT_PER_PAGE = 8;

const ReviewProductList = ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const products = useProducts({ limit: limit || 0, skip: 0 });
  const reviews = useAllProductReviews({ limit: 10, skip: 0 });
  console.log("reviews", reviews);

  return (
    <div className="mt-12 grid gap-x-8 gap-y-16 justify-between grid-cols-5">
      {products ? (
        <>
          {products.map((product: any) => (
            <div key={product.id}>
              <div className="rounded-xl cursor-pointer">
                <div className="overflow-hidden cursor-default rounded-xl relative group">
                  <motion.div
                    initial={{ scale: 1, x: 50, opacity: 0 }}
                    animate={{ scale: 1, x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative w-full h-56"
                  >
                    <Link href={"/" + product.slug}>
                      <Image
                        alt=""
                        fill
                        sizes="25vw"
                        className="absolute object-cover rounded-2xl"
                        src={product?.upload?.path}
                      />
                    </Link>
                  </motion.div>
                </div>
                <div className="inline-flex items-center gap-1 mt-4">
                  <img
                    src="https://printblur.com/assets/images/verified-box.svg"
                    width="20"
                    height="20"
                    alt="Verified"
                  />
                  <p className="text-sm font-medium text-successful-dk">
                    Jimmy
                  </p>
                </div>
                <Link
                  href={"/" + product.slug}
                  key={product._id}
                  className="px-2 py-2"
                >
                  <p className="text-sm line-clamp-1 text-primary font-semibold">
                    {`conforms to the description given :)`}
                  </p>
                  <p className="text-sm line-clamp-1 text-primary italic">
                    {`amazing`}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default ReviewProductList;
