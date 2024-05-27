import { Button } from '@/components/ui/button'
import MaxWidthWrapper from '@/components/ui/MaxWidthWrapper'
import { fetchProductById } from '@/lib/datafetch'
import React from 'react'
import Image from 'next/image'



export default async function ProductPage({ params }: { params: { productId: string } }) {
    const pId = params.productId
    const producto = await fetchProductById(pId)
    console.log(producto)
    return (
    <MaxWidthWrapper>
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4">
      <div className="grid gap-6">
            <Image
                src="/Brucecarousel.png" /* Reemplazar con la URL de la imagen */
                height={500}
                width={1800}
                alt="Product Image"
              />
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">{producto.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {producto.artist}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold">${producto.price}</div>
          <Button size="lg">Add to Cart</Button>
        </div>
      </div>
    </div>
    </MaxWidthWrapper>
  )
}


