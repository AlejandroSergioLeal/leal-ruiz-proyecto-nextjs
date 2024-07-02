import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function SkeletonProductCard() {
  return (
    <div className="block bg-white rounded-lg shadow-lg overflow-hidden flex-grow animate-pulse">
      <div className="flex flex-col h-full w-full">
        <div className="p-4 flex-shrink-0">
          <div className="relative h-60 bg-gray-200"></div>
        </div>
        <div className="flex-grow p-6 flex flex-col">
          <div className="h-6 bg-gray-200 mb-2 rounded"></div>
          <div className="h-4 bg-gray-200 mb-4 rounded"></div>
          <div className="mt-auto">
            <div className="h-6 bg-gray-200 w-20 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}


export function SkeletonProductWrapper() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <SkeletonProductCard />
      <SkeletonProductCard />
      <SkeletonProductCard />
      <SkeletonProductCard />
      <SkeletonProductCard />
      <SkeletonProductCard />
      <SkeletonProductCard />
      <SkeletonProductCard />
      <SkeletonProductCard />
      <SkeletonProductCard />
      <SkeletonProductCard />
      <SkeletonProductCard />
    </div>
  );
}

export function CarrouselSkeleton() {
  return (
    <Carousel className="w-full ">
      <CarouselContent className="mb-2">
        <CarouselItem className=" basis-1/2 md:basis-1/3 lg:basis-1/4">
          <div className="p-0 h-full flex">
            <SkeletonProductCard />
          </div>
        </CarouselItem>
        <CarouselItem className=" basis-1/2 md:basis-1/3 lg:basis-1/4">
          <div className="p-0 h-full flex">
            <SkeletonProductCard />
          </div>
        </CarouselItem>
        <CarouselItem className=" basis-1/2 md:basis-1/3 lg:basis-1/4">
          <div className="p-0 h-full flex">
            <SkeletonProductCard />
          </div>
        </CarouselItem>
        <CarouselItem className=" basis-1/2 md:basis-1/3 lg:basis-1/4">
          <div className="p-0 h-full flex">
            <SkeletonProductCard />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}