import Link from "next/link";
import Pagination from "../../products/components/Pagination";
import * as dao from '@/lib/dao'
import SalesTable from "./components/SalesTable";

export default async function PedidosPage({
    searchParams
}: {
    searchParams?: {
        query?: string
        page?: string
    }
}) {
    const query = searchParams?.query || ''
    const currentPage = Number(searchParams?.page) || 1

    const totalPages = await dao.fetchTotalSalesPages();
    return (
        <div className="sm:px-5">
            {totalPages > 0 ? (
                <div>
                    <SalesTable currentPage={currentPage} />
                    <div className="flex justify-center my-8">
                        <Pagination totalPages={totalPages} />
                    </div></div>
            ) :
                (<div className="text-center mb-10"> No hay pedidos </div>)}
        </div>
    )
}