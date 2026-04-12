'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const categories = [
  {
    name: 'Badminton',
    slug: 'Badminton',
    image: '/img/badminton.png',
    fallback: '/img/training.png',
    accent: '#0070f3',
    stat: '12+ Products',
  },
  {
    name: 'Cricket',
    slug: 'Cricket',
    image: '/img/gear.png',
    fallback: '/img/gear.png',
    accent: '#ff4d00',
    stat: '18+ Products',
  },
  {
    name: 'Shoes',
    slug: 'Running',
    image: '/img/hero.png',
    fallback: '/img/hero.png',
    accent: '#d4af37',
    stat: '8+ Products',
  },
  {
    name: 'Football',
    slug: 'Football',
    image: '/img/tournament.png',
    fallback: '/img/tournament.png',
    accent: '#00dfd8',
    stat: '10+ Products',
  },
];

export default function CategoryShowcase() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section className="py-28 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.6em] text-brand-blue mb-3">Your Arena</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
              Elite <span className="text-white/20">Categories</span>
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mt-3">Built for your game</p>
          </div>
          <Link
            href="/products"
            className="text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-white border-b border-white/10 hover:border-white pb-1 transition-all self-end"
          >
            View All Gear →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?cat=${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all duration-700"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                  isMobile
                    ? 'scale-100' // mobile: always colored, no grayscale
                    : 'grayscale scale-100 group-hover:scale-105 group-hover:grayscale-0'
                }`}
                onError={(e) => { e.target.src = cat.fallback; }}
              />

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                style={{ background: `linear-gradient(135deg, ${cat.accent}40, transparent)` }}
              />

              {/* Hover tilt — desktop only */}
              <div className="absolute inset-0 group-hover:-translate-y-1 group-hover:rotate-1 transition-transform duration-500 md:block hidden" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span
                  className="text-[8px] font-black uppercase tracking-widest mb-2 transition-colors"
                  style={{ color: cat.accent }}
                >
                  {cat.stat}
                </span>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white mb-1">
                  {cat.name}
                </h3>
                <div className="flex items-center gap-2 text-white/0 group-hover:text-white/60 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <span className="text-[8px] font-bold uppercase tracking-widest">Explore</span>
                  <span className="text-xs">→</span>
                </div>
              </div>

              {/* Corner accent bar */}
              <div
                className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] transition-all duration-700"
                style={{ background: `linear-gradient(90deg, ${cat.accent}, transparent)` }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
