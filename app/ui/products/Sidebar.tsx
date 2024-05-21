import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6">
    <h2 className="text-lg font-semibold mb-4 text-black">Filtros</h2> 
    <div className="space-y-8"> 
      <div>
        <h3 className="text-base font-bold mb-2 text-black">Género</h3> 
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-black"> 
            <Checkbox id="genre-rock" />
            <span>Rock</span>
          </label>
          <label className="flex items-center gap-2 text-black">
            <Checkbox id="genre-jazz" />
            <span>Jazz</span>
          </label>
          <label className="flex items-center gap-2 text-black">
            <Checkbox id="genre-pop" />
            <span>Pop</span>
          </label>
          <label className="flex items-center gap-2 text-black">
            <Checkbox id="genre-classical" />
            <span>Clasica</span>
          </label>
          <label className="flex items-center gap-2 text-black">
            <Checkbox id="genre-hiphop" />
            <span>Hip-Hop</span>
          </label>
        </div>
      </div>
      <div>
        <h3 className="text-base font-bold mb-2 text-black">Rango de Precios</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-black">
            <Checkbox id="price-under20" />
            <span>Debajo de $20</span>
          </label>
          <label className="flex items-center gap-2 text-black">
            <Checkbox id="price-20to50" />
            <span>$20 - $50</span>
          </label>
          <label className="flex items-center gap-2 text-black">
            <Checkbox id="price-50to100" />
            <span>$50 - $100</span>
          </label>
          <label className="flex items-center gap-2 text-black">
            <Checkbox id="price-over100" />
            <span>Más de $100</span>
          </label>
        </div>
      </div>
      <div>
        <h3 className="text-base font-bold mb-2 text-black">Formato</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-black">
            <Checkbox id="format-lp" />
            <span>LP</span>
          </label>
          <label className="flex items-center gap-2 text-black">
            <Checkbox id="format-ep" />
            <span>EP</span>
          </label>
          <label className="flex items-center gap-2 text-black">
            <Checkbox id="format-single" />
            <span>Single</span>
          </label>
          <label className="flex items-center gap-2 text-black">
            <Checkbox id="format-boxset" />
            <span>Box Set</span>
          </label>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Sidebar;
