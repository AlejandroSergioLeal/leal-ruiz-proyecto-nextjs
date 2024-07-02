'use server'
import { MercadoPagoConfig, Payment } from "mercadopago";
import * as dao from "@/lib/dao"
import Link from "next/link";
import CheckIcon from "../ui/CheckIcon";
import FailIcon from "../ui/FailIcon";
import { revalidatePath } from "next/cache";

interface SearchParams {
    collection_id: string;
    collection_status: string;
    payment_id: string;
    status: string;
    external_reference: string;
    payment_type: string;
    merchant_order_id: string;
    preference_id: string;

}


export default async function Page({ searchParams }: { searchParams: SearchParams }) {
    let failed = false;
    const paymentId = searchParams.payment_id;
    const client = new MercadoPagoConfig({
        accessToken: 'APP_USR-17174604455274-061114-7c71f55557e479587ad7b1948e0d03ab-569969267'
    });

    try {
        const payment = await new Payment(client).get({ id: paymentId });

        const sale_id = payment.external_reference;
        if (sale_id) {
            const sid = parseInt(sale_id, 10);
            const pid = parseInt(paymentId, 10);
            await dao.completeSale(sid, pid);
            revalidatePath(`/admin/pedido/${sale_id}`)
        }
        else {
            throw Error("no sale_id found")
        }
    }
    catch (error) {
        console.log(error);
        failed = true;
    }

    return (
        failed ?
            (
                <div className="flex flex-col items-center w-full h-screen">
                    <FailIcon />
                    <div className="flex flex-col items-center m-5">
                        <h1 className="text-2xl font-bold mb-2">Lamentamos las molestias</h1>
                        <p className="text-xl">Ocurrio un error durante la confirmacion de su compra, por favor ponganse en contacto con nosotros</p>
                    </div>

                    <Link
                        href="/"
                        className="btn btn-error text-white m-5"
                        aria-label="volver a inicio"
                    >
                        Volver al Inicio
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col items-center w-full h-screen">
                    <CheckIcon/>
                    <div className="flex flex-col items-center m-5">
                        <h1 className="text-2xl font-bold mb-2">¡Gracias por su compra!</h1>
                        <p className="text-xl">Su pago fue registrado.</p>
                    </div>

                    <Link
                        href="/"
                        className="btn btn-success text-white m-5"
                        aria-label="volver a inicio"

                    >
                        Volver al Inicio
                    </Link>
                </div>
            )
    )
}