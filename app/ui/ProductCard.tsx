import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/definitions";


export default function ProductCard({product}: {product: Product})  {
  return (
    <div className="block bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 cursor-pointer flex-grow">
      <Link href={`/product/${product.product_id}`}>
        <div className="flex flex-col h-full w-full">
          <div className="p-4 flex-shrink-0">
            <div className="relative">
              <Image
                src={product.image}
                height={300}
                width={300}
                alt="Product Image"
              />
            </div>
          </div>
          <div className="flex-grow p-6 flex flex-col">
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="text-gray-500 mb-4">{product.artist}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-md font-extrabold">${product.price}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
