import {  Product} from "@/lib/definitions";
import ProductCard from "./ProductCard";


interface ProductWrapperProps{
  products: Product[];
}  


export default function ProductsWrapper({ products }: ProductWrapperProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.product_name} product={product} />
      ))}
    </div>
  );
};
