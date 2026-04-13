'use client';

import { useEffect, useRef, useState } from 'react';
import Hero from '@/components/hero/Hero';
import CategoryShowcase from '@/components/product/CategoryShowcase';
import SportsMarquee from '@/components/ui/SportsMarquee';
import ProductCard from '@/components/product/ProductCard';
import EventCard from '@/components/events/EventCard';
import { ArrowRight, Quote, Loader2 } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);
  const storyRef = useRef(null);
  const splitSectionRef = useRef(null);
  const splitParallaxRefs = useRef([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Fetch featured products
        const prodRes = await fetch('/api/products?featured=true');
        const prodData = await prodRes.json();
        if (prodData.success) {
           setFeaturedProducts(prodData.data?.slice(0, 4) || []);
        }

        // Fetch events
        const eventRes = await fetch('/api/events');
        const eventData = await eventRes.json();
        if (eventData.success) {
           setEvents(eventData.data?.slice(0, 2) || []);
        }
      } catch (e) {
        console.error('Home Data Sync Failure', e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll Storytelling
      const sections = storyRef.current?.querySelectorAll('.story-section') || [];
      sections.forEach((section) => {
        const image = section.querySelector('.story-image');
        const text = section.querySelector('.story-content');

        if (image) {
          gsap.fromTo(image,
            { scale: 1.15, opacity: 0 },
            {
              scale: 1, opacity: 1, duration: 1.5,
              scrollTrigger: { trigger: section, start: 'top 85%', end: 'top 30%', scrub: true },
            }
          );
        }
        if (text) {
          gsap.fromTo(text,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: section, start: 'top 75%' } }
          );
        }
      });

      // Split Section parallax — use refs, not class selectors
      if (splitSectionRef.current && splitParallaxRefs.current.length > 0) {
        splitParallaxRefs.current.forEach((el) => {
          if (!el) return;
          gsap.to(el, {
            yPercent: -15,
            ease: 'none',
            scrollTrigger: { trigger: splitSectionRef.current, scrub: true },
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-black text-white">

      {/* ─────────── HERO ─────────── */}
      <Hero />

      {/* ─────────── TRUST STRIP ─────────── */}
      <section className="py-5 border-b border-white/5 bg-black relative z-30">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8">
          {[
            { dot: 'bg-brand-blue', label: 'Player Tested' },
            { dot: 'bg-brand-orange', label: 'Tournament Proven' },
            { dot: 'bg-white', label: 'Built for Performance' },
          ].map(({ dot, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className={`w-1.5 h-1.5 rounded-full ${dot} animate-pulse`} />
              <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/35">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────── CATEGORY SHOWCASE ─────────── */}
      <CategoryShowcase />

      {/* ─────────── SPORTS MARQUEE ─────────── */}
      <SportsMarquee />

      {/* ─────────── FEATURED PRODUCTS ─────────── */}
      <section className="py-28 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.6em] text-brand-orange mb-3">Arsenal Picks</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white italic">
                Featured <span className="text-white/20">Gear</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-white border-b border-white/10 hover:border-white pb-1 transition-all self-end"
            >
              Full Arsenal →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {featuredProducts.length === 0 && !loading && (
            <div className="py-20 text-center border border-dashed border-white/5 opacity-30">
               <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest italic">Awaiting featured arsenal synchronization...</p>
            </div>
          )}
        </div>
      </section>

      {/* ─────────── SCROLL STORYTELLING ─────────── */}
      <section ref={storyRef} className="bg-black border-t border-white/5">
        {[
          {
            phase: '01', accent: 'brand-blue', accentHex: '#0070f3',
            title: 'The', highlight: 'Arsenal', image: '/img/gear.png',
            body: "Our gear isn't just equipment — it's an extension of your ambition. Every fiber engineered for the split second that defines victory.",
            cta: 'Experience Gear', href: '/products', flip: false,
          },
          {
            phase: '02', accent: 'brand-orange', accentHex: '#ff4d00',
            title: 'The', highlight: 'Grit', image: '/img/training.png',
            body: "Excellence is forged in the shadows. We give you the tools for the grind — the sweat, the failure, the refusal to stay down.",
            cta: 'Enter The Lab', href: '/play', flip: true,
          },
          {
            phase: '03', accent: 'white', accentHex: '#ffffff',
            title: 'The', highlight: 'Glory', image: '/img/tournament.png',
            body: "The stadium honors those who dared. Our equipment has been proven on the world stage, in the heat of championship competition.",
            cta: 'View Victories', href: '/events', flip: false,
          },
        ].map(({ phase, accent, accentHex, title, highlight, image, body, cta, href, flip }) => (
          <div
            key={phase}
            className={`story-section min-h-screen flex flex-col ${flip ? 'md:flex-row-reverse' : 'md:flex-row'} items-center border-b border-white/5`}
          >
            <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 overflow-hidden">
              <img
                src={image}
                className="story-image w-full h-full object-cover"
                alt={highlight}
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="story-content w-full md:w-1/2 p-10 md:p-28 flex flex-col justify-center">
              <span className={`text-${accent} font-black text-[9px] uppercase tracking-[0.6em] mb-4`}>Phase {phase}</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 italic leading-none">
                {title} <span style={{ color: accentHex }}>{highlight}</span>.
              </h2>
              <p className="text-white/40 max-w-md mb-12 uppercase text-[10px] font-bold tracking-widest leading-loose">
                {body}
              </p>
              <Link href={href} className="group inline-flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] w-fit">
                <span className="border-b-2 pb-1 text-white transition-all" style={{ borderColor: accentHex }}>
                  {cta}
                </span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" style={{ color: accentHex }} />
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* ─────────── SPLIT: COMPETE / PERFORM ─────────── */}
      <section ref={splitSectionRef} className="relative min-h-[80vh] flex flex-col md:flex-row overflow-hidden border-y border-white/5">
        {[
          { label: 'Compete.', desc: 'Sign up for elite events and measure your grit against the best in the game.', cta: 'Tournaments', href: '/events', img: '/img/tournament.png', btnClass: 'btn-outline', border: 'border-r border-white/5' },
          { label: 'Perform.', desc: 'Equip yourself with technical arsenal — gear that demands victory from you.', cta: 'Shop Gear', href: '/products', img: '/img/gear.png', btnClass: 'btn-premium', border: '' },
        ].map(({ label, desc, cta, href, img, btnClass, border }) => (
          <div key={label} className={`w-full md:w-1/2 relative group overflow-hidden ${border}`}>
            <div className="absolute inset-0 z-0">
              <img ref={el => splitParallaxRefs.current.push(el)} src={img} className="w-full h-[120%] object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700" alt={label} />
              <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-colors duration-700" />
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-12 py-32">
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">{label}</h3>
              <p className="max-w-xs text-[9px] font-bold uppercase tracking-widest text-white/40 mb-12 leading-loose">{desc}</p>
              <Link href={href} className={btnClass}>{cta}</Link>
            </div>
          </div>
        ))}
      </section>

      {/* ─────────── EVENTS PREVIEW ─────────── */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.6em] text-brand-blue mb-3">On The Ground</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white italic">
                <span className="text-white/20">Tournament</span> Briefs.
              </h2>
            </div>
            <Link
              href="/events"
              className="text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-white border-b border-white/10 hover:border-white pb-1 transition-all self-end"
            >
              All Case Studies →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── FINAL CTA ─────────── */}
      <section className="py-40 px-6 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-brand-orange/5" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.6em] text-white/30 mb-6">Your Move</p>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 italic leading-none">
            Step Into<br />
            <span className="text-brand-blue">The Game.</span>
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 max-w-md mx-auto mb-16 leading-loose">
            Gear engineered for champions. Events designed for the relentless.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/products" className="btn-premium">Explore Gear</Link>
            <Link href="/events" className="btn-outline">View Tournaments</Link>
          </div>
        </div>
      </section>

      {/* ─────────── FOUNDER ─────────── */}
      <section className="py-40 px-6 bg-black border-t border-white/5 relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-brand-blue/5 blur-[150px] rounded-full" />
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-20">
          <div className="w-full md:w-1/2 aspect-square overflow-hidden hover:scale-105 transition-all duration-1000">
            <img src="/img/founder.png" className="w-full h-full object-cover" alt="Founder" />
          </div>
          <div className="w-full md:w-1/2">
            <Quote size={48} className="text-brand-blue mb-10 opacity-15" />
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 italic">
              The Visionary <span className="text-brand-blue">Pulse</span>.
            </h2>
            <p className="text-lg font-medium leading-relaxed text-white/70 mb-10 italic">
              "We didn't start Theesma for the commerce. We started it for the roar of the crowd, the sweat on the brow, and the relentless pursuit of perfection. This is for those who play not to participate — but to dominate."
            </p>
            <div className="flex flex-col gap-1">
              <span className="text-base font-black uppercase tracking-tighter">Ayush Singh</span>
              <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.4em]">Founder & Creative Director</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
