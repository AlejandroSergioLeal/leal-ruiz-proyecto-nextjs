'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../context/cart'
import { Product } from '@/lib/definitions'

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)
  return (
    <Sheet>
    <SheetTrigger className='group -m-2 flex items-center p-2'>
      <ShoppingCart
        aria-hidden='true'
        className='w-5 h-5 transform transition-transform duration-200 hover:scale-110'
      />
      <span className='ml-2 text-sm font-medium text-gray-700 '>{cartItems.length}</span>
    </SheetTrigger>
    <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg z-[150]'>
      <SheetHeader className='space-y-2.5 pr-6'>
        <SheetTitle>Cart ({cartItems.length})</SheetTitle>
      </SheetHeader>
      <div className="flex-col flex items-center bg-white gap-8 p-10 text-black text-sm">
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="flex flex-col gap-4">
          {cartItems.map((item: Product) => (
            <div className="flex justify-between items-center" key={item.product_id}>
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold">{item.name}</h1>
                  <p className="text-gray-600">{item.price}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    addToCart(item)
                  }}
                >
                  +
                </button>
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    removeFromCart(item)
                  }}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length > 0 ? (
          <div className="flex flex-col justify-between items-center">
            <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>
            <button
              className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              onClick={() => {
                clearCart()
              }}
            >
              Clear cart
            </button>
          </div>
        ) : (
          <h1 className="text-lg font-bold">Your cart is empty</h1>
        )}
      </div>
    </SheetContent>
  </Sheet>
)
}

export default Cart
