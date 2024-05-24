import Image from "next/image";
import MaxWidthWrapper from "../components/ui/MaxWidthWrapper";
import Link from "next/link";
import {  buttonVariants } from "./ui/button";
import { Music, ShieldCheck, Truck } from "lucide-react";
import CarouselSize from "./ui/products/CarouselSize";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { cn } from "@/lib/utils";
import CustomDivider from "@/components/ui/CustomDivider";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const ventajas = [
  {
    name:'Entrega inmediata',
    Icon: Truck,
    description:'Recibí tus pedidos en tu domicilio en menos de 24 horas y de manera gratuita.'
  },
  {
    name:'Variedad de épocas y estilos',
    Icon: Music,
    description:'Encontrarás una amplia variedad de música que abarca todas las épocas y géneros musicales. Desde los clásicos más icónicos hasta las últimas tendencias.'
  },
   
  {
    name:'Calidad superior',
    Icon: ShieldCheck,
    description:'Descubrí nuestra selección de discos de vinilo de alta calidad, preservados para ofrecerte una experiencia auditiva excepcional.'
  }
]

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
}
]

const ClassicProducts= [{
  name: 'Live at BBC Special Edition',
  artist: 'Pink Floyd',
  price: 22.99,
  image: '/pink_floyd_1.png'
}, {
  name: 'Nevermind Deluxe Edition',
  artist: 'Nirvana',
  price: 20.99,
  image: '/nirvana_1.png'
}
, {
  name: 'Appetite for Destruction',
  artist: 'Guns N’ Roses',
  price: 24.99,
  image: '/guns_1.png'
}
, {
 name: 'Live at Racket,NYC: Limited',
 artist: 'The Rolling Stones',
 price: 23.99,
 image: '/Rstones-1.png'
}
]


export default function Home() {
  return (
    <>
        <AuroraBackground >
        <MaxWidthWrapper className="mb-1 md:mb-12 lg:mb-0 pb-20 py-20">
          <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
            <h1 className='text-4xl py-10 font-bold tracking-tight text-black-900 lg:text-6xl md:text-6xl'>
              Tu mercado digital para tus {' '}
              <span className='text-light-custom-blue-500'> favoritos de siempre</span>
            </h1>
            <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
              Bienvenido a Vinyl Paradise. Encontrá y disfrutá tu música con la mejor calidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-12 sm:mt-6 py-10 ">
            <Link href="/products" className={cn(buttonVariants(), "pointer-events-auto")}>
                Compra ahora!
            </Link>
            </div>
          </div>
        </MaxWidthWrapper>
        </AuroraBackground>
      
  <MaxWidthWrapper> 
  <Carousel className="w-full">
  <CarouselContent className="mb-2">
    <CarouselItem className="md:w-1/3 lg:w-1/4">
      <div className="p-0 h-full flex">
      <Link href="/products">
        <Image
          src="/Brucecarousel.png"
          height={500}
          width={1800}
          alt="Carousel Image"
          layout="responsive"
          className="object-cover"
        />
      </Link>  
      </div>
    </CarouselItem>
    <CarouselItem className="md:w-1/3 lg:w-1/4">
      <div className="p-0 h-full flex">
      <Link href="/products">
      <Image
           src="/billiecarousel.png"
           height={500}
           width={1800}
           alt="Carousel Image"
           />
      </Link>  
      </div>
    </CarouselItem>
    <CarouselItem className="md:w-1/3 lg:w-1/4">
      <div className="p-0 h-full flex">
      <Link href="/products">
      <Image
           src="/Amycarousel.png"
           height={500}
           width={1800}
           alt="Carousel Image"
           />
      </Link>     
      </div>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
      
</MaxWidthWrapper>     

  
      <section className="md:py-12 py-5 mt-0 ">
        <div className="max-w-6xl mx-auto">
          <MaxWidthWrapper className="py-2 md:py-10 lg:py-10">
            <h1 className="text-center text-lg text-gray-500 mb-4">Nuestros Best-Sellers</h1>
            <h2 className="text-center text-4xl mb-4 font-bold tracking-tighter sm:text-4xl md:text-5xl">Productos Destacados</h2>
            <CarouselSize products={ClassicProducts} />
          </MaxWidthWrapper>
          <CustomDivider></CustomDivider>
          <MaxWidthWrapper className="py-2 md:py-10 lg:py-10">
            <h1 className="text-center text-lg text-gray-500 mb-4">Recien Añadidos</h1>
            <h2 className="text-center text-3xl mb-4 font-bold tracking-tighter sm:text-4xl md:text-5xl">Nuevos Lanzamientos</h2>
            <CarouselSize products={TrendingProducts} />
          </MaxWidthWrapper>
        </div>
      </section>

            
       <section className='border-t border-gray-200 bg-gray-100'>
        <MaxWidthWrapper className='py-2'>
          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-1 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
            {ventajas.map((ventaja) => (
              <div
                key={ventaja.name}
                className='text-center md:block md:text-center lg:block lg:text-center'>
                <div className='md:flex-shrink-0 flex justify-center'>
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<ventaja.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">{ventaja.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{ventaja.description}</p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
