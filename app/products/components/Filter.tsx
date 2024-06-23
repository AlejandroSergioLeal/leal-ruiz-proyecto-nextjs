"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Filter() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    
    const generos = [
        "Todos",
        "Rock",
        "Pop",
        "Hip-Hop",
        "Indie",
        "Otros"
    ];

   
    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term && term !== 'Todos') {
          params.set('query', term);
        } else {
          params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
      }, 300);

    return (
        <div className="flex flex-col md:flex-row gap-8 px-5 py-2 mb-5 rounded bg-white shadow-md">
            <div className='flex flex-col text-center w-full'>
                <div className='flex flex-wrap justify-center gap-4'>
                    {generos.map((genre) => (
                        <button
                            key={genre}
                            className='p-2 bg-white rounded-lg shadow-md cursor-pointer'
                            onClick={() => handleSearch(genre)}
                            aria-label = {`discos del genero ${genre}`}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
