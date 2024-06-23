'use client'
import ProductCreationForm from "./ProductCreationForm";
export default function ProductCreationPage() {
    return (
        <>
            <h1 className="text-center text-3xl mt-12 mb-4">
                Agregue un nuevo producto
            </h1>
            <div className="flex flex-row items-center justify-center space-x-20">
                <ProductCreationForm />
            </div>
        </>
    )
}
