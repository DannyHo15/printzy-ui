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

  return (
    <div className="mt-12 grid gap-x-8 gap-y-16 justify-between grid-cols-5">
      {products ? (
        <>
          {reviews.map((review: any) => (
            <div key={review?.id}>
              <div className="rounded-xl cursor-pointer">
                <div className="overflow-hidden cursor-default rounded-xl relative group">
                  <motion.div
                    initial={{ scale: 1, x: 50, opacity: 0 }}
                    animate={{ scale: 1, x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative w-full h-56"
                  >
                    <Link href={"/" + review?.product.slug}>
                      <Image
                        alt=""
                        fill
                        sizes="25vw"
                        className="absolute object-cover rounded-2xl"
                        src={review?.product?.upload?.path}
                      />
                    </Link>
                  </motion.div>
                </div>
                <div className=" w-full flex justify-between items-center mt-2">
                  <div className="inline-flex items-center gap-1">
                    <img
                      src="https://printblur.com/assets/images/verified-box.svg"
                      width="20"
                      height="20"
                      alt="Verified"
                    />
                    <p className="text-sm font-medium text-successful-dk">
                      {review?.user?.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: review?.rating || 0 }, (_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <Link href={"/" + review?.product.slug}>
                  <p className="text-sm line-clamp-1 text-primary font-semibold">
                    {review?.title}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm line-clamp-1 text-primary italic w-40">
                      {review?.review}
                    </p>
                    <p className="text-sm line-clamp-1 text-primary italic">
                      More
                    </p>
                  </div>
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
