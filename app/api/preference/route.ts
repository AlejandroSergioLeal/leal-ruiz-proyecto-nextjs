import { CartItem } from '@/app/ui/Cart';
import { sql } from '@vercel/postgres';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextRequest, NextResponse } from 'next/server';

const client = new MercadoPagoConfig({ accessToken: 'TEST-17174604455274-061114-3b85e204615d83600f92b14dc57416cc-569969267' });

export async function POST(request: NextRequest) {
  try {
    const { items, email } = await request.json();

   
    const { rows } = await sql`
      INSERT INTO sales (date, t_ID_MP, person_email) 
      VALUES (NOW(), 1, ${email}) 
      RETURNING sale_id
    `;
    
    console.log("sale_id:", rows[0].sale_id);
    const sale_id = rows[0].sale_id;
 
    for (const item of items) {
     
          await sql`
            INSERT INTO sales_details
              (price, quantity, subtotal, sale_id, product_id) 
            VALUES (${item.price}, ${item.quantity}, ${item.price * item.quantity}, ${sale_id}, ${item.product_id})
          `;
        
    }

    // Crea la preferencia en MercadoPago
    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        external_reference: sale_id,
        items: items.map((item: CartItem) => ({
          title: item.name,
          quantity: item.quantity,
          unit_price: Number(item.price),
        }))
      }
    });

    return NextResponse.json({ preferenceId: response.id, sale_id });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}