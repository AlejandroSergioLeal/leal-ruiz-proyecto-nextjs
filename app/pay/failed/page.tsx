import { MercadoPagoConfig, Payment } from "mercadopago";
import * as dao from "@/lib/dao"
import Link from "next/link";
import FailIcon from "../ui/FailIcon";

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

    return (
        <div className="flex flex-col items-center w-full h-screen m-5">
            <FailIcon />
            <div className="flex flex-col items-center m-5">
                <h1 className="text-2xl font-bold mb-2">¡Su pago fue rechazado!</h1>
                <p className="text-xl">Por favor intentelo más tarde.</p>
            </div>

            <Link
                href="/"
                className="btn btn-error text-white m-5"
                aria-label="volver a inicio"
            >
                Volver al Inicio
            </Link>
        </div>
    )
}