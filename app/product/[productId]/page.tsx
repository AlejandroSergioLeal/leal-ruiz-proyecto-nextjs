
import { Button, buttonVariants } from '@/app/ui/button'
import MaxWidthWrapper from '@/app/ui/MaxWidthWrapper'
import * as dao from '@/lib/dao'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import CartButton from '@/app/ui/ButtonCart'


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
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 bg-gray-100 dark:bg-gray-800 shadow-lg mt-5 mb-5">
        <div className="flex justify-center items-center">
          <div className="relative w-[500px] h-[500px]">
            <Image
              src={producto.image}   //Tamaño imagenes de 500x500 y remover BG
              layout="fill"
              objectFit="contain"
              alt="Product Image"
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h1 className="text-4xl font-bold text-black dark:text-white">{producto.name}</h1>
            <h2 className="text-2xl text-gray-800 dark:text-gray-200">${producto.price}</h2>
            <p className="text-gray-800 dark:text-gray-400 font-bold">{producto.artist}</p>
          </div>
          <div className="grid gap-2 mt-4">
            <CartButton product={producto}></CartButton>
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
