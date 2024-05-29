import { Button, buttonVariants } from '@/app/ui/button'
import MaxWidthWrapper from '@/components/ui/MaxWidthWrapper'
import * as dao from '@/lib/productDAO'
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'


const pruebaTracklist = [
"Turkish Cotton",
"89 Earthquake",
"Solid Plan (feat. Action Bronson)",
"Palisades, CA (feat. Big Sean)",
"Summer Reign (feat. Ty Dolla $ign)",
"Orange Village (feat. Slum Village)",
"Porsches in Spanish"
];

export default async function ProductPage({ params }: { params: { productId: number } }) {
  const pId = params.productId;
  const producto = await dao.getProductById(pId);
  

  return (
    <MaxWidthWrapper>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 rounded bg-gray-100 dark:bg-gray-100 shadow mt-5 mb-5">
        <div className="grid gap-6">
          <Image
            src={producto.image} /* Asegúrate de que la URL de la imagen sea correcta */
            height={1946}
            width={1946}
            alt="Product Image"
          />
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h1 className="text-4xl font-bold text-black dark:text-white mt-5">{producto.name}</h1>
            <h2 className="text-2xl mt-2 text-gray-800 dark:text-gray-200">${producto.price}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{producto.artist}</p>
            <Button className={cn(buttonVariants({ variant: 'destructive' }), 'mt-4')}>Añadir al carrito</Button>
          </div>
          <div className="grid gap-2 mt-4">
            <h3 className="text-xl font-semibold underline text-gray-800 dark:text-gray-200">Descripción:</h3>
            <p className="text-gray-600 dark:text-gray-400">{producto.description}</p>
          </div>
          <div className="grid gap-2 mt-4">
            <h3 className="text-xl font-semibold underline text-gray-800 dark:text-gray-200">Género:</h3>
            <p className="text-gray-600 dark:text-gray-400">{producto.genre}</p>
          </div>
          <div className="grid gap-2 mt-4">
            <h3 className="text-xl font-semibold underline text-gray-800 dark:text-gray-200">Formato:</h3>
            <p className="text-gray-600 dark:text-gray-400">{producto.format}</p>
          </div>
          <div className="grid gap-2 mt-4">
            <h3 className="text-xl font-semibold underline text-gray-800 dark:text-gray-200">Tracklist:</h3>
            <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400">
              {pruebaTracklist.map((track, index) => (
                <li key={index}>{track}</li>
              ))} 
            </ol>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}


