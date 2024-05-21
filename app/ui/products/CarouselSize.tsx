import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import { CarouselSizeProps} from "@/lib/definitions";



export function CarouselSize({products}: CarouselSizeProps) {
  return (
    <Carousel className="w-full ">
      <CarouselContent className="mb-2">
        {products.map((product, index) => (
          <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
            <div className="p-0 h-full flex">
              <ProductCard product={product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default CarouselSize;
