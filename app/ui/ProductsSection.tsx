import React from 'react';
import CarouselSize from './CarouselSize';
import { Product } from '@/lib/definitions'; 
import MaxWidthWrapper from '@/app/ui/MaxWidthWrapper';

interface ProductsSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ title, subtitle, products }) => {
  return (
    <section className="md:py-12 py-5 bg-gray-200">
      <div className="max-w-6xl mx-auto">
        <MaxWidthWrapper className="py-2 md:py-10 lg:py-10 mt-5">
          <h1 className="text-center text-lg text-black mb-4">{title}</h1>
          <h2 className="text-center text-4xl mb-4 font-bold tracking-tighter sm:text-4xl md:text-5xl">{subtitle}</h2>
          <CarouselSize products={products} />
        </MaxWidthWrapper>
      </div>
    </section>
  );
};

export default ProductsSection;
