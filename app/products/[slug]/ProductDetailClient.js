'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Ruler, 
  ShieldCheck, 
  Zap, 
  ChevronRight 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function ProductDetailClient({ product }) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || product.image || '/img/gear.png');
  const { addToCart, setCartOpen } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize);
    setCartOpen(true);
  };

  return (
    <div className="bg-brand-black min-h-screen text-white pt-24 pb-24 px-6 font-inter">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-12">
           <Link href="/" className="hover:text-white transition-colors">Base</Link>
           <ChevronRight size={12} />
           <Link href="/products" className="hover:text-white transition-colors">Arsenal</Link>
           <ChevronRight size={12} />
           <span className="text-white">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Product Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square bg-white/5 overflow-hidden group rounded-3xl border border-white/5">
              <Image 
                src={selectedImage}
                alt={product.name}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105 hover:scale-110"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="px-3 py-1 bg-brand-orange text-[8px] font-bold uppercase tracking-widest text-white rounded-full">
                  Elite Grade
                </span>
                <span className="px-3 py-1 bg-white text-black text-[8px] font-bold uppercase tracking-widest font-mono rounded-full">
                  {product.tag}
                </span>
              </div>
            </div>
            
            {/* Product Thumbnails */}
            {product.images?.length > 1 && (
              <div className="mt-6 flex items-center gap-3 overflow-x-auto custom-scrollbar custom-scrollbar-horizontal py-2">
                {product.images.map((image, index) => (
                  <button
                    key={image + index}
                    onClick={() => setSelectedImage(image)}
                    className={`h-20 w-20 rounded-3xl overflow-hidden border ${selectedImage === image ? 'border-brand-blue' : 'border-white/10'} transition-all duration-300`}
                  >
                    <img src={image} alt={`${product.name} angle ${index + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Engineering Specs Peek */}
            <div className="grid grid-cols-2 gap-4 mt-6">
               <div className="glass p-6 rounded-2xl">
                  <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest mb-1">Stock Level</p>
                  <p className="text-xs font-bold text-white uppercase tracking-tight">{product.stock} Units Sync'd</p>
               </div>
               <div className="glass p-6 rounded-2xl">
                  <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest mb-1">Category</p>
                  <p className="text-xs font-bold text-brand-blue uppercase tracking-tight">{product.category}</p>
               </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-8 font-outfit">
              {product.name}
            </h1>
            
            <div className="mb-10 flex items-center gap-6">
              <span className="text-4xl font-black text-white">₹{product.price.toLocaleString()}</span>
              <div className="h-8 w-[1px] bg-white/10" />
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">Theesma Performance Tier 01</p>
            </div>

            <p className="text-gray-400 leading-relaxed mb-10 text-sm max-w-xl font-medium">
              {product.description}
            </p>

            {/* Scale/Size Selector */}
            <div className="mb-10">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-6 flex items-center gap-2">
                Configure Arena Scale <span className="text-gray-700 font-bold">/ International Standard</span>
              </h4>
              <div className="flex gap-4">
                {['S', 'M', 'L', 'XL'].map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-xs font-black transition-all ${selectedSize === size ? 'bg-brand-blue text-white shadow-xl shadow-blue-500/20' : 'bg-white/5 text-gray-500 hover:text-white border border-white/5 hover:border-white/20'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Battle Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={handleAddToCart}
                className="flex-grow btn-premium flex items-center justify-center gap-3 transition-all"
              >
                <ShoppingCart size={18} />
                Synchronise Gear
              </button>

              <button className="px-8 py-5 glass rounded-full hover:border-brand-blue/30 transition-all flex items-center justify-center">
                <Heart size={18} className="text-white/60" />
              </button>
            </div>

            {/* Combat Certifications */}
            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-blue/5 border border-brand-blue/10 rounded-2xl text-brand-blue">
                   <Zap size={18} />
                </div>
                <div>
                  <h5 className="text-[10px] uppercase font-bold tracking-widest text-white/50 mb-1 font-outfit">Reactive Tech</h5>
                  <p className="text-gray-500 text-[9px] font-bold uppercase tracking-tighter italic">Optimized for explosive movement.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-orange/5 border border-brand-orange/10 rounded-2xl text-brand-orange">
                   <ShieldCheck size={18} />
                </div>
                <div>
                  <h5 className="text-[10px] uppercase font-bold tracking-widest text-white/50 mb-1 font-outfit">Elite Protection</h5>
                  <p className="text-gray-500 text-[9px] font-bold uppercase tracking-tighter italic">Certified for high-intensity impact.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
