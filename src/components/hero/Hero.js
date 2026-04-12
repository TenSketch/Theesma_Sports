'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

const slides = [
  {
    title: "PRECISION",
    highlight: "ENGINEERING",
    sub: "Gear that demands victory in every fiber.",
    image: "/img/hero.png",
    cta: "Explore Gear",
    href: "/products"
  },
  {
    title: "STADIUM",
    highlight: "PROVEN",
    sub: "Tested on the world stage under absolute pressure.",
    image: "/img/tournament.png",
    cta: "View Events",
    href: "/events"
  },
  {
    title: "ELITE",
    highlight: "ARSENAL",
    sub: "Built by athletes, for those who refuse to settle.",
    image: "/img/gear.png",
    cta: "Shop Now",
    href: "/products"
  }
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef(null);
  // Array of refs for each slide
  const slideRefs = useRef([]);
  // Array of refs for each slide's text content
  const contentRefs = useRef([]);

  // Initial mount animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!contentRefs.current[0]) return;
      const texts = contentRefs.current[0].querySelectorAll('.reveal-text');
      if (texts.length > 0) {
        gsap.fromTo(texts,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.5 }
        );
      }
    }, containerRef);

    // Autoplay
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  // Slide transition animation — triggered when activeSlide changes
  useEffect(() => {
    const activeSlideEl = slideRefs.current[activeSlide];
    const activeContentEl = contentRefs.current[activeSlide];
    if (!activeSlideEl || !activeContentEl) return;

    const img = activeSlideEl.querySelector('img');
    const texts = activeContentEl.querySelectorAll('.reveal-text');

    const ctx = gsap.context(() => {
      // Reset z-indices using refs, not class selectors
      slideRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { zIndex: i === activeSlide ? 10 : 0 });
      });

      // Animate active slide image
      if (img) {
        gsap.fromTo(img,
          { scale: 1.1, filter: 'blur(10px)' },
          { scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }
        );
      }

      // Animate active slide text
      if (texts.length > 0) {
        gsap.fromTo(texts,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [activeSlide]);

  return (
    <section ref={containerRef} className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-black">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          ref={el => slideRefs.current[index] = el}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
            <img
              src={slide.image}
              alt={slide.title}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              className="h-full w-full object-cover grayscale opacity-60 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
          </div>

          {/* Content - Positioned Bottom */}
          <div
            ref={el => contentRefs.current[index] = el}
            className="relative z-20 h-full w-full flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-20"
          >
            <div className="max-w-4xl">
              <p className="reveal-text text-brand-blue font-black uppercase tracking-[0.6em] text-[10px] md:text-xs mb-4">
                Theesma Phase {index + 1}
              </p>
              <h1 className="reveal-text text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] text-white italic uppercase tracking-tighter mb-6">
                {slide.title} <span className="text-white/20">{slide.highlight}</span>.
              </h1>
              <p className="reveal-text max-w-xl text-white/50 font-bold uppercase tracking-[0.3em] text-[9px] md:text-xs mb-10 leading-loose">
                {slide.sub}
              </p>
              <div className="reveal-text flex flex-col sm:flex-row items-center gap-6">
                <Link href={slide.href} className="btn-premium px-10 py-5">
                  {slide.cta}
                </Link>
                <Link href="/about" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-all border-b border-white/5 hover:border-white pb-1">
                  Our Engineering →
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Progress Indicators */}
      <div className="absolute bottom-10 right-10 z-30 flex items-center gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`h-1 transition-all duration-500 rounded-full ${i === activeSlide ? 'w-12 bg-brand-blue' : 'w-4 bg-white/10'}`}
          />
        ))}
      </div>
    </section>
  );
}
