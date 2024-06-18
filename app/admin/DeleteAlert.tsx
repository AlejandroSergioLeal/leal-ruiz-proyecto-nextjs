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
import { deleteProduct } from "@/lib/actions"
import { useState } from "react";

export default function DeleteAlert({ prod_id, name, artist }: { prod_id: number, name: string, artist: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const elim = async () => {
        if (!isDeleting) {
            setIsDeleting(true)
            await deleteProduct(prod_id)
            setIsDeleting(false)
            setIsOpen(false)
        }
    }
    const handleTrigger = () => {
        setIsOpen(true)
        console.log("trugger")
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
                    <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {name} - {artist}, se eliminará del sistema, esta acción es irreversible.
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