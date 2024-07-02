import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingCart, UserRound, LogOut, LucideLogOut } from 'lucide-react'
import { auth, signOut } from '@/auth';
import Cart from '@/app/ui/Cart'
import { Icons } from '../../app/ui/Icons'
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function UserOptions() {
    const session = await auth();
    return (
        <>
            {
                session ? (
                    <AdminOptions />
                ) : (
                    <PublicOptions />
                )
            }
        </>
    )
}

function PublicOptions() {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <UserRound className='w-5 h-5 transform transition-transform duration-200 hover:scale-110' />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-4">
                    <DropdownMenuItem>
                        <Link href='/login' className='flex items-center gap-1' aria-label="loguearse">
                            Log In
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Cart />
        </>
    )
}


function AdminOptions() {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <UserRound className='w-5 h-5 transform transition-transform duration-200 hover:scale-110' />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-4">
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
                <Link href='/admin' className='flex items-center gap-1 ml-2 font-normal hover:underline' aria-label="abrir panel de administracion">
                    Panel
                </Link>
            </DropdownMenu>
        </>
    )
}