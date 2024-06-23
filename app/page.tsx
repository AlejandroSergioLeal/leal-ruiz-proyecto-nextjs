import * as dao from "@/lib/dao"
import ProductsSection from "./ui/ProductsSection";
import HeroSection from "./ui/HeroSection";
import AdvantagesSection from "./ui/AdvantagesSection";

const bestSellersFetch = dao.getProductsByMaxSales;
const mostRecentFetch = dao.getMostRecentProducts;

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductsSection title="Productos Destacados" subtitle="Nuestros Best-Sellers" productFetch={bestSellersFetch} />
      <ProductsSection title="Nuevos Lanzamientos" subtitle="Recién Añadidos" productFetch={mostRecentFetch} />
      <AdvantagesSection />
    </>
  );
}
