import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
  const day = String(date.getDate()).padStart(2, '0');

  return `${day}-${month}-${year}`;
}

export const generatePagination = (currentPage: number, totalPages: number) => {
 
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }


  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export function systemDate() {
  const fechaActual = new Date();
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1; // Los meses empiezan desde 0
  const año = fechaActual.getFullYear();

  // Formatea el día y el mes para mostrarlos con dos dígitos
  const diaFormateado = dia < 10 ? "0" + dia : dia;
  const mesFormateado = mes < 10 ? "0" + mes : mes;

  // Devuelve la fecha en formato YYYY-MM-DD
  return año + "-" + mesFormateado + "-" + diaFormateado;
}

export function delay(segs : number) {
  return new Promise(resolve => setTimeout(resolve, segs * 1000));
}