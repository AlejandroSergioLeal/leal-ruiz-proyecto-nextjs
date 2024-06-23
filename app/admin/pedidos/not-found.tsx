import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
 
export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center min-h-screen">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-center text-4xl">404 Not Found</h2>
      <p className="text-center text-xl text-gray-500">No pudimos encontrar el pedido.</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-light-custom-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-light-custom-blue-400"
      >
        Volver al Inicio
      </Link>
    </main>
  );
}