import Image from "next/image";
import MaxWidthWrapper from "../components/ui/MaxWidthWrapper";
import Link from "next/link";
import {  buttonVariants } from "./ui/button";
import { Music, ShieldCheck, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/definitions";
import {enBd} from '@/lib/pruebasBaseDatos'
import * as datafetch from "@/lib/datafetchs";
import CarouselSection from "./ui/CarouselSection";
import ProductsSection from "./ui/products/ProductsSection";
import HeroSection from "./ui/HeroSection";
import AdvantagesSection from "./ui/AdvantagesSection";


const BestSellers : Product[]= await datafetch.getBestSellers();
const RecentProducts: Product[]= await datafetch.getMostRecentProducts(6);

//Para hacer pruebas en la bd (temporal):
enBd()

export default function Home() {
  return (
    <>
       
    <HeroSection/>
    <ProductsSection title="Nuestros Best-Sellers" subtitle="Productos Destacados" products={BestSellers} />
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
  
    <ProductsSection title="Recién Añadidos" subtitle="Nuevos Lanzamientos" products={RecentProducts} />
      
      <section>
          <MaxWidthWrapper className="py-2 md:py-5 lg:py-10">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between">
              <div className="flex-1 text-center md:text-left md:mb-0 mb-4">
                <h1 className="mt-4 md:mt-0 text-3xl font-bold tracking-tighter sm:text-xl md:text-4xl">
                  Aca iría api externa, estoy en eso
                 </h1>
                <h2 className="text-lg text-black mt-4">
                    soundcloud api o algo asi
                </h2>
              </div>
            <div className="flex-shrink-0">
            <Image
                src="/pruebadiv.png"
                height={500}
                width={500}
                alt="Carousel Image"
                className="object-right"
             />
            </div>
         </div>
      </MaxWidthWrapper>
      </section>

      <AdvantagesSection/>
    </>
  );
}
