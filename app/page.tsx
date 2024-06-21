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
      <section >
        <MaxWidthWrapper className="py-2 md:py-5 lg:py-10 ">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between mt-10">
            <div className="flex-1 text-center md:text-left md:mb-0 mb-4">
              <h1 className=" md:mt-0 text-3xl font-bold tracking-tighter sm:text-xl md:text-4xl">
                Descubrí nuestra colección exclusiva
              </h1>
              <h2 className="text-lg text-black mt-4">
                Títulos exclusivos solo en VinylParadise
              </h2>
              <Link href="/products" className={cn(buttonVariants({ variant: 'destructive' }), "pointer-events-auto mt-8")}>
                Ver todos
              </Link>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/pruebadiv.png"
                height={500}
                width={500}
                alt="Carousel Image"
                className="object-right mt-10"
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <ProductsSection title="Nuevos Lanzamientos" subtitle="Recién Añadidos" productFetch={mostRecentFetch} />

      <ArtistSection />

      <AdvantagesSection />
    </>
  );
}
