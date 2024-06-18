import {MercadoPagoConfig, Payment} from "mercadopago";
import { NextRequest } from "next/server";


const client = new MercadoPagoConfig({ accessToken: 'TEST-17174604455274-061114-3b85e204615d83600f92b14dc57416cc-569969267' });
async function POST(request:NextRequest) {
    const body = await request.json().then(data => data as {data: {id: string}});
    console.log(body);

    const payment = await new Payment(client).get({id: body.data.id});
    return Response.json({success: true});

    const sale = {
        transaction_id_MP : payment.id,
        email : payment.payer?.email,
    }
   

    return new Response('OK', { status: 200 });
}