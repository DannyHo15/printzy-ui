import categoriesService from '@/api/categories';
import Image from 'next/image';
import Link from 'next/link';

const CategoryList = async () => {
  const categories = await categoriesService.getList();

  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {categories?.data?.data.map((item: any) => (
          <Link
            href={`/list?cat=${item.slug}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/3"
            key={item.id}
          >
            <div className="relative w-full h-64">
              <Image
                src={
                  item.upload?.path ||
                  'https://static.wixstatic.com/media/22e53e_1addd1e1b4c64c9abd47dbc5f36d4b01~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg'
                }
                alt=""
                fill
                sizes="20vw"
                className="object-cover rounded-2xl"
              />
            </div>
            <h1 className="mt-8 font-light text-xl tracking-wide">
              {item.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
