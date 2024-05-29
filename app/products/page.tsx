import ProductsWrapper from '../ui/products/ProductsWrapper';
import Pagination from '@/components/ui/Pagination'
import Sidebar from '../ui/products/Sidebar';
import * as dao from '@/lib/productDAO'

const TrendingProducts2 = await dao.getAllProducts();
console.log(`total de productos en bd: ${TrendingProducts2.length}`)
/**/
export default function ProductsPage() {
    return (
      <>
        {/* -Agregar searchbar */}
        {/* -ocultar barra filtros en mobile */}
        <div className=" bg-zinc-50 dark:bg-zinc-900 container mx-auto py-12 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
            <Sidebar />
            <ProductsWrapper products={TrendingProducts2} />
          </div>
          <div className="flex justify-center my-8">
            <Pagination />
          </div>
        </div>
      </>
    );
  }
  