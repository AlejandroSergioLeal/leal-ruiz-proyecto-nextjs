import { Product } from "@/lib/definitions";
import ProductEditForm from "./ProductEditForm"
import * as dao from "@/lib/dao"
import { notFound } from "next/navigation";

export default async function ProductEditPage({ params }: { params: { id: number } }) {
    const pId = params.id;
    console.log(pId);
    const producto: Product = await dao.getProductById(pId);

    if(!producto){
        notFound();        
    }
    return (
        <>
            <h1 className="text-center text-3xl mt-12 mb-4">
                Editar producto
            </h1>
            <div className="flex flex-row items-center justify-center space-x-20">
                <ProductEditForm product={producto} />
            </div>
        </>
    )
}