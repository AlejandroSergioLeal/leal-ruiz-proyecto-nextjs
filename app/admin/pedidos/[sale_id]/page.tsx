import { fetchSaleDetail } from "@/lib/dao"
import notFound from "../../../not-found";
import { formatDate } from "@/lib/utils";
import { Detail } from "@/lib/definitions";

export default async function DetailPage({ params }: { params: { sale_id: number } }) {
    const sale_id = params.sale_id;
    const detail: Detail[] = await fetchSaleDetail(sale_id);
    if (detail.length === 0) {
        console.log("vacio")
        notFound();
    }

    const calcularTotal = () => {
        let total = 0;
        detail.forEach((item: Detail) => {
            total += Number(item.subtotal);
        });
        return total
    }
    const total = calcularTotal();
    const fecha = formatDate(detail[0].date);
    return (
        <div className="flex flex-col  mx-auto p-4 items-center">
            <h1 className="text-2xl font-bold mb-4">Detalle de Pedido #{detail[0].sale_id}</h1>
            <div className="flex flex-row items-center">
                <div className="flex flex-col m-5">
                    <h1 className="font-bold">Fecha: </h1>
                    <p className="mb-3">{fecha}</p>
                    <h1 className="font-bold">E-Mail: </h1>
                    <p className="mb-3">{detail[0].person_email}</p>
                    <h1 className="font-bold">Estado: </h1>
                    <p className="mb-3">{detail[0].completed ? "Completo" : "Incompleto"}</p>
                    <h1 className="font-bold">Monto: </h1>
                    <p className="mb-3">${total}</p>
                    <h1 className="font-bold">Id de pago: </h1>
                    <p className="mb-3">{detail[0].t_id_mp ? `${detail[0].t_id_mp}` : "-"}</p>
                </div>
                <div className="border rounded-md p-5 m-5 overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detail.map((item: Detail, index: number) => (
                                <tr key={index} className="hover">
                                    <td>{item.product_name}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}