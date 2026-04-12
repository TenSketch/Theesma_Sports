'use client';

import { useEffect, useRef } from 'react';
import Hero from '@/components/hero/Hero';
import ProductCard from '@/components/product/ProductCard';
import { SAMPLE_PRODUCTS } from '@/lib/sampleData';
import { ArrowRight, Zap, Trophy, ShieldCheck, Activity } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: 'Cricket', count: '12 Items', color: 'from-blue-600 to-cyan-500' },
  { name: 'Football', count: '8 Items', color: 'from-orange-600 to-yellow-500' },
  { name: 'Badminton', count: '5 Items', color: 'from-purple-600 to-pink-500' },
  { name: 'Gym', count: '15 Items', color: 'from-green-600 to-emerald-500' }
];

export default function Home() {
  const categoryRef = useRef(null);

  useEffect(() => {
    // Reveal categories on scroll
    gsap.fromTo(categoryRef.current.children, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: categoryRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <main className="bg-brand-black min-h-screen">
      <Hero />

      {/* Categories Grid - NEW SECTION */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight font-outfit text-white mb-4">
               Elite <span className="text-brand-blue">Categories</span>.
            </h2>
            <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.4em] font-inter">
               Gear optimized for your specific arena
            </p>
          </div>
          <Link href="/products" className="text-white font-bold text-sm border-b-2 border-brand-blue pb-1 hover:text-brand-blue transition-colors mb-2">
             All disciplines
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" ref={categoryRef}>
          {categories.map((cat) => (
            <Link key={cat.name} href={`/products?cat=${cat.name}`} className="group relative aspect-[3/4] overflow-hidden rounded-2xl glass p-8 flex flex-col justify-end hover:border-brand-blue/30 transition-all">
               <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
               <div className="relative z-10">
                  <span className="text-brand-blue font-black text-[10px] uppercase tracking-widest mb-2 block">{cat.count}</span>
                  <h3 className="text-2xl font-black text-white font-outfit">{cat.name}</h3>
                  <div className="mt-4 flex items-center gap-2 text-white/40 group-hover:text-white transition-all">
                     <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0">Enter Gear</span>
                     <ArrowRight size={14} />
                  </div>
               </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Reveal */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
             <h2 className="text-4xl md:text-5xl font-black tracking-tight font-outfit text-white mb-6">Featured <span className="text-brand-orange">Arsenal</span>.</h2>
             <div className="w-20 h-1 bg-brand-orange mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {SAMPLE_PRODUCTS.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Performance Trust Section */}
      <section className="py-32 px-6 bg-white/5 border-y border-white/5 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 blur-[120px] rounded-full translate-x-1/2 translate-y-[-1/2]" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="space-y-4">
              <Zap className="text-brand-blue" size={32} />
              <h4 className="text-xl font-bold font-outfit">Reactive Tech</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Gear that adapts to your environment and movement intensity in real-time.</p>
           </div>
           <div className="space-y-4">
              <Trophy className="text-brand-orange" size={32} />
              <h4 className="text-xl font-bold font-outfit">Tournament Grade</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Officially sanctioned equipment tested by international performance labs.</p>
           </div>
           <div className="space-y-4">
              <ShieldCheck className="text-brand-blue" size={32} />
              <h4 className="text-xl font-bold font-outfit">Elite Protection</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Maximum durability guaranteed for high-intensity competitive scenarios.</p>
           </div>
        </div>
      </section>
    </main>
  );
}
