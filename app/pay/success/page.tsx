import { MercadoPagoConfig, Payment } from "mercadopago";
import * as dao from "@/lib/dao"
import PageLoader from "next/dist/client/page-loader";

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
    const paymentId = searchParams.payment_id;
    const client = new MercadoPagoConfig({
        accessToken: 'TEST-17174604455274-061114-3b85e204615d83600f92b14dc57416cc-569969267'
    });

    try {
        const payment = await new Payment(client).get({ id: paymentId });

        const addittionalInfo = payment.additional_info!!;
        const payer = addittionalInfo.payer!!;

        const payment_id = payment.id;
        const name = payer.first_name!!;
        const lastname = payer.last_name!!;
        const sale_id = payment.external_reference;
        if(sale_id && payment_id){
            const sid = parseInt(sale_id)
            await dao.completeSale(sid,`${name} ${lastname}`,payment_id)
        }
        else
         ;//
    }
    catch(error){
        console.log("error payment");
        return(<div>error</div>)
    }
    return(

        <div>hola</div>
    )
}