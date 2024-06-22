import Image from "next/image";
import MaxWidthWrapper from "./ui/MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import * as dao from "@/lib/dao"
import ProductsSection from "./ui/ProductsSection";
import HeroSection from "./ui/HeroSection";
import AdvantagesSection from "./ui/AdvantagesSection";
import ArtistSection from "./ui/ArtistSection";

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
