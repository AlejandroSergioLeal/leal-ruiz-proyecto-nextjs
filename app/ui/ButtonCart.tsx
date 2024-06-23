'use client'

import { Button, buttonVariants } from '@/app/ui/button'
import { Product } from '@/lib/definitions'
import { useAppContext } from '@/app/context/cart'
import { cn } from '@/lib/utils'

interface ButtonProps{
    product: Product
}

function CartButton({product}: ButtonProps) {
    const {addToCart} = useAppContext()

    const handleClick = () => {
    addToCart(product);
};

return (
    <Button
        className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
        onClick={handleClick}
        aria-label= "agregar este producto al carrito"
    >
        Agregar al carrito
    </Button>
);
}

export default CartButton