import { CarouselSizeProps} from "@/lib/definitions";
import ProductCard from "./ProductCard";


export default function ProductsWrapper({ products }: CarouselSizeProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </div>
  );
};
