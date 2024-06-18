'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { redirectToAdmin } from "@/lib/actions";
import { useState } from "react";


export default function SuccessAlert({title,desc} : {title: string, desc: string}) {
    const [isOpen, setIsOpen] = useState(true);
    const close = async () => {
        redirectToAdmin()
        setIsOpen(false)
    }

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent className = "flex flex-col items-center">
                <AlertDialogHeader>
                    <AlertDialogTitle className = "text-center text-2xl">{title}</AlertDialogTitle>
                    <AlertDialogDescription  className = "text-center text-lg mb-5">
                        {desc}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <button className = "btn btn-error text-white" onClick={close}>
                        Aceptar
                    </button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}