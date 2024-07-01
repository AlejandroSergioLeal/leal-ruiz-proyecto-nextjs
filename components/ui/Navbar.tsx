import React from 'react'
import MaxWidthWrapper from '../../app/ui/MaxWidthWrapper'
import Link from 'next/link'
import { Icons } from '../../app/ui/Icons'
import { ShoppingCart, UserRound, LogOut, LucideLogOut } from 'lucide-react'
import { signOut } from '@/auth';
import Cart from '@/app/ui/Cart'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-gray-300/55 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Link href='/' className='flex z-40 font-semibold items-center' aria-label="volver a inicio">
              <Icons.logo className='w-8 h-8' />
              vinyl <span className='text-light-custom-blue-500'>paradise</span>
            </Link>
          </div>
          <div className='flex items-center space-x-4 md:mr-0 md:ml-auto'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <UserRound className='w-5 h-5 transform transition-transform duration-200 hover:scale-110' />
              </DropdownMenuTrigger>
              <DropdownMenuContent className = "mt-4">
                <DropdownMenuItem>
                  <Link href='/login' className='flex items-center gap-1' aria-label="loguearse">
                    Log In
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <form
                    action={async () => {
                      'use server';
                      await signOut();
                    }}
                    className='flex items-center'
                  >
                    <button aria-label="cerrar sesion">
                      Log Out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Cart />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
