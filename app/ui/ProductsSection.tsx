import React, { Suspense } from 'react';
import CarouselSize from './CarouselSize';
import { Product } from '@/lib/definitions';
import MaxWidthWrapper from '@/app/ui/MaxWidthWrapper';
import { CarrouselSkeleton } from '../products/ui/skeletons';

interface ProductsSectionProps {
  title: string;
  subtitle: string;
  productFetch: () => Promise<Product[]>;
}

export default async function ProductsSection({ title, subtitle, productFetch }: ProductsSectionProps) {
  return (
    <section className="md:py-12 py-5 bg-gray-200">
      <div className="max-w-6xl mx-auto">
        <MaxWidthWrapper className="py-2 md:py-10 lg:py-10 mt-5">
          <h1 className="text-center text-4xl mb-4 font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h1>
          <h2 className="text-center text-lg text-black mb-10">{subtitle}</h2>
          <Suspense fallback={<CarrouselSkeleton />}>
            <CarouselSize productFetch = {productFetch}/>
          </Suspense>
        </MaxWidthWrapper>
      </div>
    </section>
  );
};