'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center min-h-screen">
      <h2 className="text-center text-4xl">Algo salió mal!</h2>
      <p className="text-gray-500 text-center text-xl">No podemos encontrar lo que buscas.</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-light-custom-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-light-custom-blue-400"
        aria-label = "volver a inicio"
      >
        Volver al Inicio
      </Link>
    </main>
  );
}
