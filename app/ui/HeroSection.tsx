import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AuroraBackground } from "@/components/ui/aurora-background";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { buttonVariants } from "./button";


export default function HeroSection() {
  return (
    <AuroraBackground>
      <MaxWidthWrapper className="mb-1 md:mb-12 lg:mb-0 pb-20 py-20">
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl py-10 font-bold tracking-tight text-black-900 lg:text-6xl md:text-6xl">
            Tu mercado digital para tus favoritos de siempre
          </h1>
          <p className="mt-6 text-lg max-w-prose text-black-900 lg:text-xl md:text-xl">
            Bienvenido a Vinyl Paradise. Encontrá y disfrutá tu música con la mejor calidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-12 sm:mt-6 py-10 ">
            <Link href="/products" className={cn(buttonVariants(), "pointer-events-auto")}>
              Compra ahora!
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </AuroraBackground>
  );
}
