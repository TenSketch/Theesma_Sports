'use client';

import { useState, useEffect } from 'react';
import { Trophy, Calendar, MapPin, Users, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const res = await fetch('/api/events');
        const data = await res.json();
        if (data.success) {
           setUpcomingEvents(data.data || []);
        }
      } catch (e) {
        console.error('Arena Sync Failure', e);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="bg-brand-black min-h-screen flex flex-col items-center justify-center space-y-4">
         <Loader2 className="text-brand-blue animate-spin" size={32} />
         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 animate-pulse">Establishing Arena Uplink...</p>
      </div>
    );
  }

  return (
    <div className="bg-brand-black min-h-screen pt-12 pb-24 px-6 text-white font-inter">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-20">
          <p className="text-brand-blue font-bold text-[10px] uppercase tracking-[0.4em] mb-4">Official Calendars</p>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            BATTLE <br />
            <span className="text-gradient-orange italic">ARENAS.</span>
          </h1>
          <p className="text-gray-500 max-w-2xl text-sm leading-relaxed uppercase tracking-widest font-bold">
            We don't just build gear. We build the stages where legends are forged. Register for upcoming tournaments and prove your grit.
          </p>
        </div>

        {/* Featured Event Hero */}
        <div className="relative w-full h-[600px] bg-white/5 border border-white/10 mb-24 overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1400" 
            className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
            alt="Main Event"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          
          <div className="absolute bottom-12 left-12 max-w-xl">
             <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1 bg-brand-orange text-[10px] font-black uppercase tracking-widest">Mega Event</span>
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                   <Calendar size={14} className="text-brand-blue" /> November 2024
                </span>
             </div>
             <h2 className="text-5xl font-black uppercase tracking-tighter mb-6">
                THEESMA WORLD <br /> DISCIPLINE GAMES
             </h2>
             <p className="text-gray-400 text-sm mb-8 font-medium">
                The ultimate gathering of athletes across 5 disciplines. 3 days of high-intensity competition. Registration starting soon.
             </p>
             <button className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-brand-blue hover:text-white transition-all">
                Get Notified
             </button>
          </div>
        </div>

        {/* Upcoming Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white/5 border border-white/10 hover:border-brand-blue/40 transition-all p-8 group">
              <div className="flex justify-between items-start mb-8">
                 <div className="p-3 bg-brand-blue/10 rounded-full text-brand-blue">
                    <Trophy size={20} />
                 </div>
                 <div className="text-right">
                    <p className="text-brand-orange font-black text-xl leading-none">{event.prize}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Prize Pool</p>
                 </div>
              </div>

              <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-6 leading-tight group-hover:text-brand-blue transition-colors">
                {event.name}
              </h3>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-xs text-gray-400 uppercase tracking-widest font-bold">
                   <MapPin size={14} className="text-brand-blue" /> {event.location}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400 uppercase tracking-widest font-bold">
                   <Calendar size={14} className="text-brand-blue" /> {event.date}
                </div>
                <div className="flex items-center gap-3 text-xs text-brand-blue uppercase tracking-widest font-black italic">
                   # {event.sport}
                </div>
              </div>

              <Link href="#" className="flex items-center justify-between group/link">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-black bg-gray-600 flex items-center justify-center text-[8px] font-bold">P{i}</div>
                   ))}
                   <div className="w-8 h-8 rounded-full border-2 border-brand-black bg-brand-blue flex items-center justify-center text-[8px] font-bold">+45</div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover/link:gap-4 transition-all">
                   Join Rank <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
