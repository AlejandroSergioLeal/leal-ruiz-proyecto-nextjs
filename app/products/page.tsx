
import React, { Suspense } from 'react';
import ProductsWrapper from './ui/ProductsWrapper';
import Pagination from './ui/Pagination';
import Sidebar from './ui/Sidebar';
import * as dao from '@/lib/dao';
import SearchBar from './ui/search';
import { SkeletonProductWrapper } from './ui/skeletons';

const productlist = await dao.getAllProducts();
console.log(`total de productos en bd: ${productlist.length}`);

export default async function ProductsPage({
  searchParams
}: {
    searchParams?:{
    query?: string
    page?:string
  }
}) {
  
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  const totalPages = await dao.fetchTotalPages(query);
  return (
    <>
      <div className="bg-zinc-50 container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          <Sidebar/>
          <div className="mt-4 flex flex-col gap-2 md:mt-8">
              <div className="mb-6">
                <SearchBar placeholder="Search..." />
              </div>
              <Suspense key={query + currentPage} fallback={<SkeletonProductWrapper/>}>
              <ProductsWrapper query={query} currentPage={currentPage}/>
              </Suspense>
          </div>
        </div>
        <div className="flex justify-center my-8">
            <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
