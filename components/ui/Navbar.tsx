import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { Icons } from '../../app/ui/Icons'
import { ShoppingCart, UserRound, LogOut, LucideLogOut } from 'lucide-react'
import { signOut } from '@/auth';

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
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <div className='flex items-center space-x-4'>
            <Link href='/' className='flex z-40 font-semibold items-center '>
              <Icons.logo className='w-8 h-8 ' />
              vinyl <span className='text-light-custom-blue-500'> paradise </span>
            </Link>
          </div>
          <div className='flex items-center space-x-4 md:mr-0 md:ml-auto'>
            <Link href='/login' className='flex items-center gap-1 mr-10 '>
              <UserRound className='w-5 h-5 transform transition-transform duration-200 hover:scale-110' />
            </Link>
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button>
                <LogOut className='w-5 h-5 transform transition-transform duration-200 hover:scale-110' />
              </button>
            </form>
            <Link href='/shopping-cart' className='flex items-center space-x-4 '>
              <ShoppingCart className='w-5 h-5 transform transition-transform duration-200 hover:scale-110' />
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
