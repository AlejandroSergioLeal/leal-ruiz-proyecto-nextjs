import { ProductCard } from "@/lib/definitions";
import Image from 'next/image';

export default function Product({name,description,imageUrl,price} : ProductCard){

    return (
    <div className="card w-96 shadow m-2">
        <figure className = "p-5">
            <Image
                src={imageUrl}
                width={128}
                height={128}
                alt = "imagen del disco"
            />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>{description}</p>
            <h3>${price}</h3>
            <div className="card-actions justify-end">
                <button className="btn btn-primary">Añadir</button>
            </div>
        </div>
  </div>)
}