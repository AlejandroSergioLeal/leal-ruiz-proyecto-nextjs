
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Music, ShieldCheck, Truck } from "lucide-react";

const ventajas = [
  {
    name: 'Entrega inmediata',
    Icon: Truck,
    description: 'Recibí tus pedidos en tu domicilio en menos de 24 horas y de manera gratuita.',
  },
  {
    name: 'Variedad de épocas y estilos',
    Icon: Music,
    description: 'Encontrarás una amplia variedad de música que abarca todas las épocas y géneros musicales. Desde los clásicos más icónicos hasta las últimas tendencias.',
  },
  {
    name: 'Calidad superior',
    Icon: ShieldCheck,
    description: 'Descubrí nuestra selección de discos de vinilo de alta calidad, preservados para ofrecerte una experiencia auditiva excepcional.',
  },
];

export default function AdvantagesSection() {
  return (
    <section className="border-t border-gray-200 bg-black">
      <MaxWidthWrapper className="py-2">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-1 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
          {ventajas.map((ventaja) => (
            <div key={ventaja.name} className="text-center md:block md:text-center lg:block lg:text-center">
              <div className="md:flex-shrink-0 flex justify-center">
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gray-400 text-black">
                  {<ventaja.Icon className="w-1/3 h-1/3" />}
                </div>
              </div>
              <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-base font-medium text-white">{ventaja.name}</h3>
                <p className="mt-2 text-sm text-gray-400">{ventaja.description}</p>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
