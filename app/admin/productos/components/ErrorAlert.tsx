'use client'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from "next/link";
import { useState } from "react";


export default function ErrorAlert({ title, desc }: { title: string, desc: string }) {

    return (
        <AlertDialog open = {true}>
            <AlertDialogContent className="flex flex-col items-center">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center text-2xl">{title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-lg mb-5">
                        {desc}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Link href="/admin/productos" className="btn btn-error text-white" aria-label = "aceptar">
                        Aceptar
                    </Link>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}