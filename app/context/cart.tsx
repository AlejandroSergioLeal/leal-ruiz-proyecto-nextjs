'use client'

import { Product } from '@/lib/definitions';
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface CartItem extends Product {
  id: number;
  quantity: number;
}

export const CartContext = createContext<any>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedCartItems = localStorage.getItem('cartItems');
      return storedCartItems ? JSON.parse(storedCartItems) as CartItem[] : [];
    }
    return [];
  });

  const addToCart = (item: Product) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.product_id);

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.product_id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, id: item.product_id, quantity: 1 }]);
    }
  };

  const removeFromCart = (item: Product) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.product_id);

    if (isItemInCart && isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.product_id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.product_id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useAppContext() {
  return useContext(CartContext);
}
