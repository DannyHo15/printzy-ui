import React from "react";

interface Category {
  name: string;
  href: string;
}

const Breadcrumb = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="breadcrumb-link mb-4">
      <a
        href="/"
        className="text-primary hover:text-secondary hover:underline text-sm"
      >
        Home
      </a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        fill="currentColor"
        className="bi bi-chevron-right inline-block mx-1"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        ></path>
      </svg>
      <a
        href="/shop"
        className="text-primary hover:text-secondary hover:underline text-sm"
      >
        All Categories
      </a>
      {categories?.map((category: any) => (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            fill="currentColor"
            className="bi bi-chevron-right inline-block mx-1"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            ></path>
          </svg>
          <a
            href={category.href}
            className="text-primary hover:text-secondary hover:underline text-sm"
          >
            {category.name}
          </a>
        </>
      ))}
    </div>
  );
};

export default Breadcrumb;
