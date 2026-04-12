import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function EventCard({ event }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="group relative w-full aspect-[4/5] overflow-hidden bg-black border border-white/5 hover:border-white/20 transition-all duration-700">
      <img
        src={event.image || '/img/tournament.png'}
        alt={event.title}
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
           isMobile ? 'grayscale-0' : 'grayscale group-hover:scale-110 group-hover:grayscale-0'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="mb-4">
          <span className="px-3 py-1 bg-brand-blue text-[7px] font-black uppercase tracking-widest text-white">
            {event.type || 'Championship'}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {event.title}
        </h3>

        {/* Meta stats */}
        {event.meta && (
          <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40 mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
            {event.meta}
          </p>
        )}

        <div className="flex items-center gap-8 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <div>
            <p className="text-[7px] text-white/40 uppercase font-black mb-1">Impact</p>
            <p className="text-sm font-bold text-white">{event.stats?.stat1 || '4M+ Views'}</p>
          </div>
          <div>
            <p className="text-[7px] text-white/40 uppercase font-black mb-1">Elite Count</p>
            <p className="text-sm font-bold text-white">{event.stats?.stat2 || '128 Athletes'}</p>
          </div>
        </div>

        <Link 
          href={`/events/${event.id}`}
          className="inline-flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest group/btn translate-y-10 group-hover:translate-y-0 transition-all duration-500 delay-200"
        >
          View Case Study <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
