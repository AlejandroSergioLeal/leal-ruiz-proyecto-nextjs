"use client"
import { useState, useEffect, useContext } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../context/cart';
import { Product } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from './button';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

export type CartItem = Product & {
  quantity: number
}

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
  const [isMounted, setIsMounted] = useState(false);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [btnPressed,setBtnPressed] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsClient(true);
    initMercadoPago('TEST-84bc3f3d-cb17-4365-ab52-f47a1a133378', { locale: 'es-AR' });
  }, []);

  if (!isClient) {
    return null;
  }

  const handleClick = async () => {
    if(btnPressed)
      return;
    setBtnPressed(true);
    try {
      const email = prompt('Por favor, ingrese su email:');
      const response = await fetch('/api/preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems, email }),
      });
      const data = await response.json();
      setPreferenceId(data.preferenceId);

    } catch (error) {
      console.error('Error creating preference:', error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger className='group -m-2 flex items-center p-2'>
        <ShoppingCart
          aria-hidden='true'
          className='w-5 h-5 transform transition-transform duration-200 hover:scale-110'
        />
        <span className='ml-2 text-sm font-medium text-gray-700'>
          {isMounted ? cartItems.length : '...'}
        </span>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg z-[150] p-6 shadow-lg rounded-lg bg-gray-50'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle>Items({isMounted ? cartItems.length : '...'})</SheetTitle>
        </SheetHeader>
        <div className={`flex-1 flex flex-col items-center ${isMounted && cartItems.length === 0 ? 'justify-center' : 'justify-start'} gap-8 text-black text-sm`}>
          {isMounted && cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full">
              <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío :(</h1>
              <p className="mb-8">Hora de seguir comprando!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 w-full h-[80vh] overflow-y-auto">
              {cartItems.map((item: CartItem) => (
                <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-md" key={item.product_id}>
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <div className = "flex flex-row items-center">
                        <h1 className="text-lg font-bold">${item.name}</h1>
                        <h2 className= "text-md ml-3">{(item.quantity > 1)? (`(x${item.quantity})`) : ""}</h2>
                      </div>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      className="px-4 py-2 bg-black text-white text-xs font-bold uppercase rounded hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
                      onClick={() => {addToCart(item)}}
                    >
                      +
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-600 text-white text-xs font-bold uppercase rounded hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
                      onClick={() => removeFromCart(item)}
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex flex-col justify-between items-center w-full mt-8">
                <h1 className="text-lg font-bold">Total: ${getCartTotal().toFixed(2)}</h1>
                <Button
                  className={cn(buttonVariants({ variant: 'destructive' }), 'px-4 py-2 mt-4')}
                  onClick={clearCart}
                >
                  Vaciar carrito
                </Button>
                {isMounted && cartItems.length > 0 && (
                  <Button
                    className={cn(buttonVariants({ variant: 'default' }), 'px-4 py-2 mt-4')}
                    onClick={handleClick} disabled = {btnPressed}
                  >
                    Procesar pedido
                  </Button>
                )}
                {preferenceId && <Wallet initialization={{ preferenceId }} />}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}


export default Cart;
