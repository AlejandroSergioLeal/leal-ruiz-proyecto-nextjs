import {  Product} from "@/lib/definitions";
import ProductCard from "./ProductCard";
import * as dao from '@/lib/productDAO';



export default async function ProductsWrapper({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const productos= await dao.fetchFilteredProducts(query, currentPage);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productos.map((product) => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  );
};
