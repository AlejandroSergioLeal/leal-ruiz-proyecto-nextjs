import Link from "next/link";
import Pagination from "../products/ui/Pagination";
import SearchBar from "../products/ui/search";
import ProductTable from "./ProductTable";
import * as dao from '@/lib/dao'

export default async function AdminPage({
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
        <>
            <h1 className="mx-auto text-5xl text-center mt-20 mb-10"> Panel de Administración </h1>
            <div role="tablist" className="tabs tabs-lifted tabs-lg shadow-lg sm:m-2">
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Productos" checked />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <div className="sm:px-5">
                        <div className="flex flex-row mx-auto mb-6">
                            <SearchBar placeholder="Search..." />
                            <Link href={`admin/create`}>
                                <button className="btn btn-success text-white ml-2">
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
                </div>
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Pedidos" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 2</div>
            </div>
        </>
    )
}