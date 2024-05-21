import ProductsWrapper from '../ui/products/ProductsWrapper';
import Pagination from '@/app/ui/Pagination'
import Sidebar from '../ui/products/Sidebar';
import MaxWidthWrapper from '../ui/MaxWidthWrapper';


const TrendingProducts= [{
   name: 'Gangsta 7" Vinyl',
   artist: 'Free Nationals',
   price: 22.99,
   image: '/free_1.png'
}, {
   name: 'FAMILY LP',
   artist: 'DJ Scheme',
   price: 20.99,
   image: '/Scheme_1.png'
}
, {
   name: 'Wont He Do It Vinyl (Bone)',
   artist: 'Conway the Machine',
   price: 24.99,
   image: '/ConwaytheMachine_1.png'
}
, {
  name: 'Glockoma 2 Vinyl (Deluxe)',
  artist: 'Key Glock',
  price: 23.99,
  image: '/Key_1.png'
}
, {
  name: 'You Only Live 2wice Vinyl',
  artist: 'Freddie Gibbs',
  price: 23.99,
  image: '/FreddieGibbs_1.png'
}
, {
  name: 'U Wasnt There',
  artist: 'Camron & A-Trak',
  price: 23.99,
  image: '/Camron_1.png'
}, {
    name: 'Gangsta 7" Vinyl',
    artist: 'Free Nationals',
    price: 22.99,
    image: '/free_1.png'
 }, {
    name: 'FAMILY LP',
    artist: 'DJ Scheme',
    price: 20.99,
    image: '/Scheme_1.png'
 }
 , {
    name: 'Wont He Do It Vinyl (Bone)',
    artist: 'Conway the Machine',
    price: 24.99,
    image: '/ConwaytheMachine_1.png'
 }
 , {
   name: 'Glockoma 2 Vinyl (Deluxe)',
   artist: 'Key Glock',
   price: 23.99,
   image: '/Key_1.png'
 }
 , {
   name: 'You Only Live 2wice Vinyl',
   artist: 'Freddie Gibbs',
   price: 23.99,
   image: '/FreddieGibbs_1.png'
 }
 , {
   name: 'U Wasnt There',
   artist: 'Camron & A-Trak',
   price: 23.99,
   image: '/Camron_1.png'
 }
]


export default function ProductsPage() {
    return (
      <>
        {/* -Agregar searchbar */}
        {/* -ocultar barra filtros en mobile */}
        <div className=" bg-zinc-50 dark:bg-zinc-900 container mx-auto py-12 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
            <Sidebar />
            <ProductsWrapper products={TrendingProducts} />
          </div>
          <div className="flex justify-center my-8">
            <Pagination />
          </div>
        </div>
      </>
    );
  }
  
