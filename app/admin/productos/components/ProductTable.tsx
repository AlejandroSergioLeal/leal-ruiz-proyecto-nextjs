import * as dao from '@/lib/dao';
import Link from 'next/link';

export default async function ProductTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const products = await dao.fetchFilteredProductsForAdminTable(query, currentPage);
    return (
        <>
            <div>
                <table className="mx-auto table border">
                    <thead>
                        <tr>
                            <th>Album</th>
                            <th className="hidden sm:table-cell">Artista</th>
                            <th className="hidden sm:table-cell">Precio</th>
                            <th>Habilitado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((prod) => (
                                <tr key={prod.product_id}>
                                    <td>{prod.name}</td>
                                    <td className="hidden sm:table-cell">{prod.artist}</td>
                                    <td className="hidden sm:table-cell">{prod.price}</td>
                                    <td>
                                        {prod.state ? (<p>Si</p>) : (<p>No</p>)}
                                    </td>
                                    <td className="flex justify-end space-x-2">
                                        <Link href={`productos/edit/${prod.product_id}`} aria-label={`editar producto ${prod.name}`}>
                                            <button className="btn btn-xs sm:btn-sm btn-outline ml-2 btn-neutral" aria-label={`editar producto ${prod.name}`}>
                                                Editar
                                            </button>
                                        </Link>  
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}