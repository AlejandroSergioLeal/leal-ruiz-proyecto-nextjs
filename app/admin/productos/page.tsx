
import Link from "next/link";
import Pagination from "../../products/components/Pagination";
import SearchBar from "../../products/components/search";
import ProductTable from "./components/ProductTable";
import * as dao from '@/lib/dao'

export default async function AdmProdsPage({
    searchParams
}: {
    searchParams?: {
        query?: string
        page?: string
    }
}) {
    const query = searchParams?.query || ''
    const currentPage = Number(searchParams?.page) || 1

    const totalPages = await dao.fetchTotalPages(query);
    /* AGREGAR SUSPENSE*/
    return (
        <div className="sm:px-5">
            <div className="flex flex-row mx-auto mb-6">
                <SearchBar placeholder="Search..." />
                <Link href="productos/create" aria-label="crear un nuevo producto">
                    <button className="btn btn-success text-white ml-2" aria-label="crear un nuevo producto">
                        <span className="hidden sm:inline">+ Crear Producto</span>
                        <span className="sm:hidden">+</span>
                    </button>
                </Link>
            </div>
            {totalPages > 0 ? (
                <div>
                    <ProductTable query={query} currentPage={currentPage} />
                    <div className="flex justify-center my-8">
                        <Pagination totalPages={totalPages} />
                    </div></div>
            ) :
                (<div className="text-center mb-10"> No hay resultados </div>)}
        </div>
    )
}