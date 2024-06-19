import { sql } from "@vercel/postgres";
import {MercadoPagoConfig, Payment} from "mercadopago";
import type { NextRequest } from "next/server";


const client = new MercadoPagoConfig({ accessToken: 'TEST-17174604455274-061114-3b85e204615d83600f92b14dc57416cc-569969267' });

export async function POST(request: NextRequest) {
    const body = await request.json().then((data) => data as {data: {id:string}});
    
    const payment = await new Payment(client).get({id:body.data.id});
  
    console.log("external_reference:", payment.external_reference);
  
    try{
      await sql`UPDATE sales SET t_ID_MP=${payment.id} WHERE sale_id=${payment.external_reference}`;
    }catch(e){
      console.error(e);
      return new Response('Internal server error', { status: 500 });
    }
  
    return new Response('OK', { status: 200 });
  }