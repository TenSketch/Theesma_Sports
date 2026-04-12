'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loading() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const dotRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in the overlay
      gsap.to(containerRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });

      // Running dot across the track — athletic sprint effect
      gsap.fromTo(dotRef.current,
        { left: '0%' },
        {
          left: '100%',
          duration: 1.1,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
        }
      );

      // Progress bar pulsing glow sweep
      gsap.fromTo(progressRef.current,
        { scaleX: 0, opacity: 0.8 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          repeat: -1,
          repeatDelay: 0.3,
          yoyo: true,
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center gap-10 opacity-0"
    >

      {/* Central Brand Mark */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-[9px] font-black uppercase tracking-[0.6em] text-brand-blue">
          Theesma Sports
        </span>
        <h2 className="text-4xl font-black uppercase tracking-tighter text-white italic leading-none">
          Loading<span className="text-brand-blue">.</span>
        </h2>
      </div>

      {/* Athletic Track — Sprint Animation */}
      <div className="w-64 flex flex-col gap-3">
        {/* Track Lanes */}
        <div ref={trackRef} className="relative h-[2px] w-full bg-white/5 rounded-full overflow-visible">
          {/* Glow Sweep */}
          <div
            ref={progressRef}
            className="absolute inset-0 bg-gradient-to-r from-brand-blue via-white/60 to-transparent origin-left rounded-full"
            style={{ boxShadow: '0 0 16px 4px rgba(0, 112, 243, 0.4)' }}
          />
          {/* Running Dot */}
          <div
            ref={dotRef}
            className="absolute top-1/2 -translate-y-1/2 -ml-1.5 w-3 h-3 rounded-full bg-white shadow-[0_0_8px_rgba(0,112,243,0.9)]"
          />
        </div>

        {/* Status line */}
        <div className="flex justify-between items-center">
          <span className="text-[8px] font-mono uppercase tracking-widest text-white/25 italic">
            Syncing Athletic Arsenal...
          </span>
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
      </div>

      {/* EKG Heartbeat line — performance pulse */}
      <svg
        viewBox="0 0 200 40"
        className="w-40 opacity-20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          className="text-brand-blue"
          d="M0 20 L30 20 L38 5 L46 35 L54 5 L62 35 L70 20 L200 20"
          strokeDasharray="300"
          strokeDashoffset="300"
          style={{
            animation: 'ekg 1.5s ease-in-out infinite',
          }}
        />
      </svg>

      {/* Tactical corner brackets */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-white/10" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-white/10" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-white/10" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-white/10" />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-blue/5 blur-[100px] rounded-full" />
      </div>

      <style jsx global>{`
        @keyframes ekg {
          0% { stroke-dashoffset: 300; opacity: 0.2; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
