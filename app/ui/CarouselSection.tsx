import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import MaxWidthWrapper from "@/app/ui/MaxWidthWrapper";

export default function CarouselSection() {
  return (
    <MaxWidthWrapper className="bg-zinc-50 dark:bg-zinc-900 py-12">
      <Carousel className="w-full">
        <CarouselContent className="mb-2">
          {["/Brucecarousel.png", "/billiecarousel.png", "/david_bowiecarousel.png"].map((src, index) => (
            <CarouselItem key={index} className="md:w-1/3 lg:w-1/4">
              <div className="p-0 h-full flex items-start md:items-center">
                <Link href="/products">
                  <Image src={src} height={500} width={1800} alt={`Carousel Image ${index + 1}`} />
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </MaxWidthWrapper>
  );
}
