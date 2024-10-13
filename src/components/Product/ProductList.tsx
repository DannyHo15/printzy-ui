import ProductCard from "./ProductCard";
import useProducts from "@/hooks/useProducts";

const PRODUCT_PER_PAGE = 8;

const ProductList = ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const products = useProducts({ limit: limit || 0, skip: 0 });
  return (
    <div className="mt-12 grid gap-x-8 gap-y-16 justify-between grid-cols-5">
      {products.map((product: any) => (
        <div key={product.id}>
          <ProductCard item={product} key={product.id} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
