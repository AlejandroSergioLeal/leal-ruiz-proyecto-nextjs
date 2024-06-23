import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <h1 className="mx-auto text-5xl text-center mt-20 mb-10"> Panel de Administración </h1>
            <div className="shadow-md sm:m-2 border rounded-lg">
            <Link href="/admin/productos" className="btn btn-ghost m-2">
                Productos
            </Link>
            <Link href="/admin/pedidos" className="btn btn-ghost m-2">
                Pedidos
            </Link>
            </div>
            <div className="shadow-lg sm:m-2 border p-5 rounded-lg">
                {children}
            </div>
        </div>
    );
}