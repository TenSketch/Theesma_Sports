'use client';

import { useState } from 'react';
import { 
  Trophy, 
  Plus, 
  Calendar, 
  MapPin, 
  Search, 
  MoreVertical, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';

export default function AdminEventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for events
  const events = [
    { id: 1, name: "Theesma Smash Open", date: "2024-08-15", location: "Chennai", status: "Open", image: "/img/event-1.jpg" },
    { id: 2, name: "Iron Grip Push", date: "2024-09-02", location: "Mumbai", status: "Open", image: "/img/event-2.jpg" },
    { id: 3, name: "Vanquish Cup Season 4", date: "2024-10-12", location: "Bangalore", status: "Coming Soon", image: "/img/event-3.jpg" }
  ];

  return (
    <div className="space-y-8 text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Arena Logistics</h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 italic">
            Management of official tournament circuits
          </p>
        </div>
        <button className="bg-brand-orange px-6 py-3 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-orange-600 transition-all shadow-lg shadow-orange-900/20">
          <Plus size={16} /> Sanction New Event
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search events, locations, or dates..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-sm focus:outline-none focus:border-brand-blue"
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white/5 border border-white/10 p-8 group hover:border-brand-blue/30 transition-all">
            <div className="relative mb-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5 h-48">
             <img src={event.image || '/img/event-placeholder.jpg'} alt={event.name} className="h-full w-full object-cover" />
             <div className="absolute inset-0 bg-black/40" />
             <div className="absolute left-4 top-4 p-3 bg-brand-orange/10 rounded-full text-brand-orange">
                <Trophy size={20} />
             </div>
             <span className="absolute right-4 top-4 px-3 py-1 bg-white/10 border border-white/10 text-[8px] font-black uppercase tracking-widest text-brand-blue">
                {event.status}
             </span>
          </div>

            <h3 className="text-xl font-black uppercase tracking-tighter mb-6 group-hover:text-brand-blue transition-colors leading-tight">
              {event.name}
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                 <Calendar size={14} className="text-brand-orange" /> {event.date}
              </div>
              <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                 <MapPin size={14} className="text-brand-orange" /> {event.location}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex justify-between items-center">
               <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-green-500">
                  <ShieldCheck size={14} /> Official Circuit
               </div>
               <button className="text-gray-500 hover:text-white transition-colors">
                  <MoreVertical size={16} />
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Security Disclaimer */}
      <div className="p-6 bg-white/5 border border-dashed border-white/10 rounded text-center">
         <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] italic">
            Authenticated personnel only. Changes to tournament logs are cryptographically signed.
         </p>
      </div>
    </div>
  );
}
