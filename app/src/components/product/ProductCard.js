import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function ProductCard({ product }) {
  // Curiosity Mode: No price, no add to cart
  return (
    <div className="group block h-full bg-brand-black/50 border border-white/5 hover:border-brand-blue/30 transition-all duration-500 overflow-hidden rounded-2xl">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image 
          src={product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'} 
          alt={product.name}
          fill
          className="object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-brand-blue text-[8px] font-bold uppercase tracking-widest text-white rounded-full">
            {product.tag || 'Elite Series'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold tracking-tight text-white mb-2 group-hover:text-brand-blue transition-colors font-outfit">
          {product.name}
        </h3>
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
          {product.category || 'Special Edition'}
        </p>
        
        <Link 
          href={`/products/${product.slug || 'sample-product'}`}
          className="inline-flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-widest hover:gap-4 transition-all"
        >
          View Technical Specs <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
