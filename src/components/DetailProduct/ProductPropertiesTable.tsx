import useOptions from "@/hooks/useOptions";
import Link from "next/link";

const ProductPropertiesTable = ({
  product,
  options,
  categories,
  variant,
}: {
  product: any;
  options: any[];
  categories: any;
  variant: any;
}) => {
  return (
    <table className="w-full mt-4 border-collapse ">
      <tbody>
        <tr>
          <td className="font-bold p-2 border border-gray">Categories</td>
          <td className="p-2 border border-gray">
            {categories.map((category: any, index: number) => (
              <span key={index}>
                <Link href={""}>
                  <span className="text-blue-500 hover:underline">
                    {category.name}
                  </span>
                </Link>
                {index < categories.length - 1 && " / "}
              </span>
            ))}
          </td>
        </tr>
        <tr>
          <td className="font-bold p-2 border border-gray">SKU</td>
          <td className="p-2 border border-gray">
            {product?.name + " / " + variant?.sku}
          </td>
        </tr>
        {options?.map((option: any, index: any) => (
          <tr key={option.id}>
            <td className="font-bold p-2 border border-gray">{option.name}</td>
            <td className="p-2 border border-gray">
              {option.optionValues.map((item: any) => item.value).join(", ")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductPropertiesTable;
