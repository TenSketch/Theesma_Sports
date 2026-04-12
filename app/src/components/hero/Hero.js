'use client';

import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const splineRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    // Entrance Animation
    const tl = gsap.timeline();
    tl.fromTo(textRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out', delay: 0.5 }
    );

    // Scroll Interaction for the whole Hero container
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      opacity: 0,
      y: -100,
      scale: 0.95
    });

  }, [isLoaded]);

  function onLoad(spline) {
    splineRef.current = spline;
    setIsLoaded(true);
  }

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-brand-black overflow-hidden flex items-center justify-center">
      {/* 3D Spline Scene - Full Screen Background */}
      <div className="absolute inset-0 z-0">
        <Spline 
          scene="https://prod.spline.design/6Wq1Q7YGyWf8Z92v/scene.splinecode" 
          onLoad={onLoad}
          className={`w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Fallback & Overlay Gradient */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-black">
             <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent animate-spin rounded-full" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/20 via-transparent to-brand-black z-10 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl px-6" ref={textRef}>
        <p className="text-brand-blue font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
          Elite Athletic Equipment
        </p>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white mb-8 leading-[0.9]">
          Engineering the <span className="text-gradient-blue italic">Future</span> of Performance.
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-medium max-w-xl mx-auto mb-10 leading-relaxed">
          Theesma Sports brings professional-grade gear to every athlete. Science-backed, competition-proven.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/products" className="btn-premium flex items-center gap-3">
             Explore collection <ArrowRight size={18} />
          </Link>
          <Link href="/events" className="text-white/70 hover:text-white font-semibold text-sm transition-colors flex items-center gap-2">
            View tournaments
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/30 animate-bounce">
         <span className="text-[8px] font-black uppercase tracking-[0.3em]">Vertical Scroll</span>
         <ChevronDown size={14} />
      </div>

      {/* Side Brand Tag */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 vertical-rl hidden lg:flex items-center gap-4 text-white/10 select-none">
         <span className="h-20 w-[1px] bg-white/10" />
         <span className="text-[10px] font-black uppercase tracking-[0.5em]">Theesma Sports Engineering</span>
      </div>
    </section>
  );
}
