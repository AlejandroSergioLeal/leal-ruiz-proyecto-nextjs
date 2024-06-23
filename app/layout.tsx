import '@/app/ui/globals.css';
import {montserrat} from '@/app/ui/fonts';
import Footer from './ui/Footer';
import Navbar from '../components/ui/Navbar';
import { CartProvider } from './context/cart';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <CartProvider>
   <html lang="en" className="h-full">
    <title> Vinyl Paradise - Tienda de vinilos</title>
      <body className= {`${montserrat.className} antialiased `}>
        <main className= 'relative flex flex-col min-h-screen'>
          <div className='flex-grow flex-1'>
            <Navbar/>
            {children}
            <Footer/>
          </div>
        </main>
        <Toaster/>
      </body>
    </html>
   </CartProvider>
  );
}
 