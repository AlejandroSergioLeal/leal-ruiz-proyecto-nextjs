import { CartItem } from '@/app/ui/Cart';
import { createSale } from '@/lib/dao';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const client = new MercadoPagoConfig({ accessToken: 'APP_USR-17174604455274-061114-7c71f55557e479587ad7b1948e0d03ab-569969267' });

export async function POST(request: NextRequest) {
  try {
    const { items, email } = await request.json();
    const sale_id = await createSale(email,items)
    revalidatePath("/admin/pedidos")
    // Crea la preferencia en MercadoPago
    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        external_reference: sale_id,
        back_urls: {
          success: 'https://leal-ruiz-proyecto-nextjs.vercel.app/pay/success',
          failure: 'https://leal-ruiz-proyecto-nextjs.vercel.app/pay/failed'
        },
        auto_return: 'approved',
        items: items.map((item: CartItem) => ({
          title: item.name,
          quantity: item.quantity,
          unit_price: Number(item.price),
        }))
      }
    });

    return NextResponse.json({ preferenceId: response.id, sale_id});
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}