import useCategories from "@/hooks/useCategories";
import Image from "next/image";
import Link from "next/link";

const CategoryList = () => {
  const categories = useCategories();

  return (
    <div className="px-4">
      <div className="grid grid-cols-3 gap-4">
        {categories.map((item: any) => (
          <Link
            href={`/list?cat=${item.slug}`}
            className="w-full "
            key={item.id}
          >
            <div className="relative w-full h-64">
              <Image
                src={
                  item.upload?.path ||
                  "https://static.wixstatic.com/media/22e53e_1addd1e1b4c64c9abd47dbc5f36d4b01~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg"
                }
                alt=""
                fill
                sizes="20vw"
                className="object-cover rounded-2xl hover:shadow-xl"
              />
              <button className="absolute left-1/2 transform -translate-x-1/2 bottom-4 rounded-full bg-white text-black hover:text-secondary py-2 px-4 flex gap-2 items-center justify-center shadow-xl">
                <span>{item.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path
                    fillRule="evenodd"
                    d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                  ></path>{" "}
                </svg>
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
