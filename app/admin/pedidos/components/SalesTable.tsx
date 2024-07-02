import * as dao from '@/lib/dao';
import Link from 'next/link';
import {formatDate} from "@/lib/utils";

export default async function SalesTable({
    currentPage
}: {
    currentPage: number;
}) {
    const sales = await dao.fetchFilteredSales(currentPage);

    return (
        <>
            <div>
                <table className="mx-auto table border">
                    <thead>
                        <tr>
                            <th>Pedido Nro.</th>
                            <th>Estado</th>
                            <th className="hidden sm:table-cell">Fecha</th>
                            <th className="hidden sm:table-cell">Id. de pago</th>
                            <th>E-Mail</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sales.map((sale) => (
                                <tr key={sale.sale_id}>
                                    <td>{sale.sale_id}</td>
                                    <td>{sale.completed ? ("Completado") : ("Incompleto")}</td>
                                    <td className="hidden sm:table-cell">{formatDate(sale.date)}</td>
                                    <td className="hidden sm:table-cell">{sale.t_id_mp ? (sale.t_id_mp) : ("-")}</td>
                                    <td>
                                        {sale.person_email}
                                    </td>
                                    <td className="flex justify-end space-x-2">
                                        <Link href={`pedidos/${sale.sale_id}`}aria-label={`ver detalle del pedido numero ${sale.sale_id}`}>
                                            <button className="btn btn-xs sm:btn-sm btn-outline ml-2 btn-primary" aria-label={`ver detalle del pedido numero ${sale.sale_id}`}>
                                                Ver Detalle</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}
