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
import { deleteSale } from "@/lib/actions"
import { useState } from "react";

export default function DeleteButton({ nro }: { nro: number}) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const elim = async () => {
        if (!isDeleting) {
            setIsDeleting(true)
            await deleteSale(nro)
            setIsDeleting(false)
            setIsOpen(false)
        }
    }
    const handleTrigger = () => {
        setIsOpen(true)
    }
    const handleCancel = () => {
        if (!isDeleting)
            setIsOpen(false)
    }

    return (

        <AlertDialog open={isOpen}>
            <AlertDialogTrigger className="btn btn-xs sm:btn-sm btn-outline ml-2 btn-error" onClick={handleTrigger}>
                Eliminar
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar pedido?</AlertDialogTitle>
                    <AlertDialogDescription>
                        El pedido #{nro} se eliminará del sistema, esta acción es irreversible.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel} className = {`${isDeleting? "hidden" : ""}`}>
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={elim}>
                       {!isDeleting? "Continuar": "Eliminando..."} 
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}