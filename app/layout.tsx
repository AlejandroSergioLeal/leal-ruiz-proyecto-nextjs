import '@/app/ui/globals.css';
import {montserrat} from '@/app/ui/fonts';
import Footer from './ui/Footer';
import Navbar from './ui/Navbar';
import { AuroraBackground } from '@/components/ui/aurora-background';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className= {`${montserrat.className} antialiased bg-zinc-50 dark:bg-zinc-900`}>
        <main className= 'relative flex flex-col min-h-screen'>
          <div className='flex-grow flex-1'>
            <Navbar/>
            {children}
            <Footer/>
          </div>
        </main>
      </body>
    </html>
  );
}
 