'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const slides = [
  { src: '/img/badminton1.png', label: 'Badminton' },
  { src: '/img/cricket.png',    label: 'Cricket'   },
  { src: '/img/shoes.png',      label: 'Footwear'  },
  { src: '/img/football.png',   label: 'Football'  },
  // Duplicated for seamless loop
  { src: '/img/badminton1.png', label: 'Badminton' },
  { src: '/img/cricket.png',    label: 'Cricket'   },
  { src: '/img/shoes.png',      label: 'Footwear'  },
  { src: '/img/football.png',   label: 'Football'  },
];

export default function SportsMarquee() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);

    const track = trackRef.current;
    if (!track) return;

    // Total width of ONE set (half the strip)
    const totalWidth = track.scrollWidth / 2;

    // Start from 0, animate to -totalWidth, then instantly reset — creating infinite loop
    tweenRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: 24,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    // Pause on hover for a more intentional feel
    const pause  = () => tweenRef.current?.pause();
    const resume = () => tweenRef.current?.resume();
    track.parentElement?.addEventListener('mouseenter', pause);
    track.parentElement?.addEventListener('mouseleave', resume);

    return () => {
      tweenRef.current?.kill();
      track.parentElement?.removeEventListener('mouseenter', pause);
      track.parentElement?.removeEventListener('mouseleave', resume);
      window.removeEventListener('resize', check);
    };
  }, []);

  return (
    <section className="py-20 bg-black border-y border-white/5 overflow-hidden">
      {/* Section label */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <p className="text-[9px] font-black uppercase tracking-[0.6em] text-white/25">
          Gear in Action
        </p>
      </div>

      {/* Marquee strip */}
      <div className="relative w-full overflow-hidden cursor-default" aria-hidden="true">
        {/* Left fade edge */}
        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #000 0%, transparent 100%)' }}
        />
        {/* Right fade edge */}
        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #000 0%, transparent 100%)' }}
        />

        <div ref={trackRef} className="flex gap-4 w-max will-change-transform">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-[280px] md:w-[380px] aspect-[4/5] overflow-hidden group"
            >
              <img
                src={slide.src}
                alt={slide.label}
                className={`w-full h-full object-cover object-center transition-all duration-700 ${
                  isMobile ? 'grayscale-0 scale-100' : 'grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100'
                }`}
                draggable={false}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

              {/* Label */}
              <div className="absolute bottom-5 left-5">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/50 group-hover:text-white transition-colors duration-500">
                  {slide.label}
                </span>
              </div>

              {/* Hover top accent line */}
              <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] bg-brand-blue transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
