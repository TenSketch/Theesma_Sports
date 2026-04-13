'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import gsap from 'gsap';

export default function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || isMobile) return;

    const onMouseEnter = () => {
      gsap.to(card, {
        rotateY: 8,
        rotateX: -4,
        scale: 1.02,
        duration: 0.5,
        ease: 'power2.out',
        perspective: 1000
      });
    };

    const onMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mouseleave', onMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', onMouseEnter);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isMobile]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Load wishlist state from localStorage on mount
  useEffect(() => {
    try {
      const wl = JSON.parse(localStorage.getItem('theesma_wishlist') || '[]');
      setWishlisted(wl.includes(product.id || product._id));
    } catch {}
  }, [product.id, product._id]);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const wl = JSON.parse(localStorage.getItem('theesma_wishlist') || '[]');
      const id = product.id || product._id;
      const next = wishlisted ? wl.filter(i => i !== id) : [...wl, id];
      localStorage.setItem('theesma_wishlist', JSON.stringify(next));
      setWishlisted(!wishlisted);
    } catch {}
  };

  return (
    <div 
      ref={cardRef}
      className="group relative bg-[#0a0a0a] border border-white/5 hover:border-brand-blue/20 transition-all duration-700 overflow-hidden hover:shadow-[0_0_40px_rgba(0,112,243,0.08)] transform-gpu"
    >
      {/* Image */}
      <Link href={`/products/${product.slug || 'product'}`} className="relative aspect-[4/5] overflow-hidden block">
        <Image
          src={product.images?.[0] || '/img/gear.png'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-50 group-hover:opacity-20 transition-opacity duration-700" />
      </Link>

        {/* Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-2 py-1 bg-white/10 backdrop-blur-md text-[7px] font-black uppercase tracking-widest text-white/60 border border-white/10">
            {product.tag || 'Elite Series'}
          </span>
        </div>

        {/* Wishlist */}
        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur-md border border-white/10 hover:border-brand-orange/50 transition-all duration-300 group/btn"
          aria-label="Wishlist"
        >
          <Heart
            size={14}
            className={`transition-all duration-300 ${
              wishlisted
                ? 'fill-brand-orange text-brand-orange scale-110'
                : 'text-white/40 group-hover/btn:text-white'
            }`}
          />
        </button>

      {/* Content */}
      <div className="p-6 relative z-10 bg-[#0a0a0a]">
        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">
          {product.category || 'Special Edition'}
        </p>
        <h3 className="text-lg font-black tracking-tighter text-white mb-3 group-hover:text-brand-blue transition-colors font-outfit uppercase leading-tight">
          {product.name}
        </h3>

        {/* Price */}
        {product.price && (
          <p className="text-sm font-black text-white/60 mb-5">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
        )}

        <Link
          href={`/products/${product.slug || 'product'}`}
          className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.25em] text-white group/link"
        >
          <span className="border-b border-white/20 pb-0.5 group-hover/link:border-brand-blue group-hover/link:text-brand-blue transition-all duration-300">
            Explore Gear
          </span>
          <span className="group-hover/link:translate-x-1 transition-transform duration-300 text-white/40 group-hover/link:text-brand-blue">→</span>
        </Link>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-brand-blue to-transparent transition-all duration-700" />
    </div>
  );
}
