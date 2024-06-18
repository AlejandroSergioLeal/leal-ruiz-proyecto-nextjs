import { CartItem } from '@/app/ui/Cart';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextRequest, NextResponse } from 'next/server';

const client = new MercadoPagoConfig({ accessToken: 'TEST-17174604455274-061114-3b85e204615d83600f92b14dc57416cc-569969267' });

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        external_reference: '123',
        items: items.map((item: CartItem) => ({
          title: item.name,
          quantity: item.quantity,
          unit_price: Number(item.price),
        }))
      }
    });

    return NextResponse.json({ preferenceId: response.id, items });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
