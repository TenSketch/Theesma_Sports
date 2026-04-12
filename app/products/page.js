'use client';

import { useState } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { SAMPLE_PRODUCTS } from '@/lib/sampleData';
import { Filter, X, ChevronRight } from 'lucide-react';

export default function ProductsPage() {
  const [selectedSport, setSelectedSport] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = selectedSport === 'All' 
    ? SAMPLE_PRODUCTS 
    : SAMPLE_PRODUCTS.filter(p => p.category === selectedSport);

  const sports = ['All', 'Cricket', 'Football', 'Badminton', 'Gym', 'Running'];

  return (
    <div className="bg-brand-black min-h-screen pt-24 pb-24 px-6 font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-2 font-outfit">
              The <span className="text-brand-blue">Arsenal</span>.
            </h1>
            <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.3em] font-inter">
              Science-backed gear for global athletes
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-black uppercase tracking-widest text-white/30 hidden md:block italic">Filter by discipline</span>
             <div className="flex gap-2 bg-white/5 p-1 rounded-full border border-white/5">
                {sports.map((sport) => (
                  <button
                    key={sport}
                    onClick={() => setSelectedSport(sport)}
                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                      selectedSport === sport 
                      ? 'bg-brand-blue text-white shadow-lg shadow-blue-500/20' 
                      : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    {sport}
                  </button>
                ))}
             </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className=" py-32 text-center border border-dashed border-white/10 opacity-30">
             <p className="text-sm font-bold text-gray-400 uppercase tracking-widest italic">No logistics matches for this discipline.</p>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:row items-center justify-between gap-8">
           <div className="flex items-center gap-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">Sync complete</span>
              <div className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
           </div>
           <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] italic max-w-sm text-center md:text-right">
              All performance gear is tested in extreme climate-controlled environments for maximum durability.
           </p>
        </div>
      </div>
    </div>
  );
}
