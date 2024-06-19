import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MaxWidthWrapper from "@/app/ui/MaxWidthWrapper";
import { buttonVariants } from "./button";


export default function HeroSection() {
  return (
    <div className="relative bg-cover bg-center" style={{ backgroundImage: 'url(/herov.png)' }}>
      <MaxWidthWrapper className="mb-1 md:mb-12 lg:mb-0 pb-10 pt-10 py-20">
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="pt-10 text-4xl py-10 font-bold tracking-tight text-white lg:text-6xl md:text-6xl">
          Encontrá y disfrutá tus favoritos con la mejor calidad.
          </h1>
          <p className="mt-6 text-white text-lg max-w-prose text-black-900 lg:text-xl md:text-xl">
            Bienvenido a Vinyl Paradise. Tu tienda de música online. 
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-12 sm:mt-6 py-10 ">
            <Link href="/products" className={cn(buttonVariants(), "pointer-events-auto")}>
              Ver Catálogo
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
