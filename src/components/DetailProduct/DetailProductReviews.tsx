"use client";
import reviewsService from "@/api/reviews";
import useProductReviews from "@/hooks/useProductReviews";
import React, { useState } from "react";

const DetailProductReviews = ({ productId }: { productId: any }) => {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  let reviews = useProductReviews(productId);

  let reviewsData = [
    { rating: 5, percentage: "0%", count: 0 },
    { rating: 4, percentage: "0%", count: 0 },
    { rating: 3, percentage: "0%", count: 0 },
    { rating: 2, percentage: "0%", count: 0 },
    { rating: 1, percentage: "0%", count: 0 },
  ];

  reviews.forEach((review: any) => {
    const foundRating = reviewsData.find(
      (item) => item.rating === review.rating,
    );
    if (foundRating) {
      foundRating.count += 1;
    }
  });
  const totalReviews = reviews.reduce((sum: number, review: any) => sum + 1, 0);
  reviewsData = reviewsData.map((item) => {
    const percentage =
      totalReviews > 0
        ? ((item.count / totalReviews) * 100).toFixed(2) + "%"
        : "0%";
    return { ...item, percentage };
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const handleSubmit = async () => {
    setShowForm(false);
    setRating(0);
    setReviewText("");
    await reviewsService.create({
      rating,
      review: reviewText,
      productId,
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-11 pb-11 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto mt-4">
      <div className=" box flex flex-col gap-y-4 w-full">
        {reviewsData.map((review, index) => (
          <div key={index} className="flex items-center w-full">
            <p className="font-medium text-lg text-black mr-0.5">
              {review.rating}
            </p>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                  fill="#FBBF24"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <div className="h-2 w-full xl:min-w-[278px] rounded-3xl bg-amber-50 ml-5 mr-3">
              <span
                className="h-full rounded-3xl bg-amber-400 flex"
                style={{ width: review.percentage }}
              ></span>
            </div>
            <p className="font-medium text-lg text-black mr-0.5">
              {review.count}
            </p>
          </div>
        ))}
      </div>
      <div className="gap-3 pb-6">
        {reviews.map((review: any) => {
          const dateObj = new Date(review?.createdAt);
          return (
            <>
              <div className="shrink-0 space-y-2">
                <div className="space-y-0.5">
                  <div className="flex justify-between">
                    <p className="text-base font-semibold text-gray-900 ">
                      {review?.user?.name}
                    </p>
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
                </div>
              </div>
              <div className="mt-2 min-w-0 flex-1 space-y-1">
                <p className="text-base italic text-gray-400 text-primary">
                  {review?.title}
                </p>
                <p className="text-sm font-normal text-gray-400 line-clamp-1">
                  {review?.review}
                </p>
              </div>
              <div className="flex items-between justify-between gap-0.5 mt-2">
                <p className="text-[18px] font-normal text-gray-500 dark:text-gray-400">
                  {`${
                    months[dateObj.getMonth()]
                  } ${dateObj.getDate()}, ${dateObj.getFullYear()}`}
                </p>
                <div className="inline-flex items-center gap-1">
                  <svg
                    className="h-5 w-5 text-successful-dk"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <p className="text-sm font-medium text-successful-dk">
                    Verified purchase
                  </p>
                </div>
              </div>
            </>
          );
        })}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-fit mt-4 text-sm rounded-3xl ring-1 ring-secondary text-secondary py-2 px-4 hover:bg-secondary hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
          >
            + Write your review
          </button>
        )}
        {showForm && (
          <div className="mt-4">
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700"
              >
                Rating
              </label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="mt-1 block w-full p-2 bg-slate-100 rounded-xl"
                required
              >
                <option value="">Select a rating</option>
                {[1, 2, 3, 4, 5].map((rate) => (
                  <option key={rate} value={rate}>
                    {rate}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <label
                htmlFor="review"
                className="block text-sm font-medium text-gray-700"
              >
                Review
              </label>
              <textarea
                id="review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                className="mt-1 block w-full p-2 bg-slate-100 rounded-xl"
                required
              />
            </div>
            <button
              onClick={handleSubmit}
              className="mt-4 text-white bg-secondary rounded-full px-4 py-2"
            >
              Review
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 text-secondary border border-secondary rounded-full px-4 py-2 ml-2"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailProductReviews;
