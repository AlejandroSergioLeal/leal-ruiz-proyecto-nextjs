
import React from 'react';
import ProductsWrapper from '../ui/products/ProductsWrapper';
import Pagination from '@/components/ui/Pagination';
import Sidebar from '../ui/products/Sidebar';
import * as dao from '@/lib/productDAO';
import SearchBar from '../ui/search';

const TrendingProducts2 = await dao.getAllProducts();
console.log(`total de productos en bd: ${TrendingProducts2.length}`);

export default function ProductsPage({
  searchParams
}: {
    searchParams?:{
    query?: string
    page?:string
  }
}) {
  
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1
  return (
    <>
      <div className="bg-zinc-50 dark:bg-zinc-900 container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          <Sidebar />
          <div className="mt-4 flex flex-col gap-2 md:mt-8">
              <div className="mb-6">
                <SearchBar placeholder="Search..." />
              </div>
              <ProductsWrapper query={query} currentPage={currentPage}/>
          </div>
        </div>
        <div className="flex justify-center my-8">
          <Pagination />
        </div>
      </div>
    </>
  );
}
