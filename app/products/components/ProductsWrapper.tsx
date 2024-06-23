import { notFound } from "next/navigation";
import ProductCard from "../../ui/ProductCard";
import * as dao from '@/lib/dao';

export default async function ProductsWrapper({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const productos= await dao.fetchFilteredActiveProducts(query, currentPage);
  
  if (!productos) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productos.map((product) => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  );
};
