import { Trophy, Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      name: "Theesma Smash Open 2024",
      sport: "Badminton",
      date: "August 15-20",
      location: "Chennai, TN",
      prize: "₹50,000",
      image: "https://images.unsplash.com/photo-1613918431208-6733f01730bb?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      name: "Iron Grip Push Invitational",
      sport: "Gym & Fitness",
      date: "September 02",
      location: "Mumbai, MH",
      prize: "₹1,00,000",
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      name: "Vanquish Cup Season 4",
      sport: "Cricket",
      date: "October 12-25",
      location: "Bangalore, KA",
      prize: "₹2,50,000",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800"
    }
  ];

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
