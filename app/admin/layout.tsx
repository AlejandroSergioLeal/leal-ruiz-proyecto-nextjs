export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <h1 className="mx-auto text-5xl text-center mt-20 mb-10"> Panel de Administración </h1>
            <div role="tablist" className="tabs tabs-lifted tabs-lg shadow-lg sm:m-2">
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Productos" checked />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    {children}
                </div>
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Pedidos" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 2</div>
            </div>
        </div>
    );
}