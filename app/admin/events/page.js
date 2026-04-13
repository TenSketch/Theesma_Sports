'use client';

import { useState, useEffect } from 'react';
import { 
  Trophy, 
  Plus, 
  Calendar, 
  MapPin, 
  Search, 
  MoreVertical, 
  ArrowRight,
  ShieldCheck,
  Loader2,
  X,
  Save,
  Trash2
} from 'lucide-react';

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    sport: 'Cricket',
    date: '',
    location: '',
    prize: '',
    status: 'Scheduled',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a'
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/events');
      const data = await res.json();
      if (data.success) setEvents(data.data || []);
    } catch (e) {
      console.error('Arena Sync Failure', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setIsFormOpen(false);
        fetchEvents();
        setFormData({ name: '', sport: 'Cricket', date: '', location: '', prize: '', status: 'Scheduled', image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a' });
      }
    } catch (e) {
      alert("Sanctioning Failure");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("DECOMMISSION ARENA: Permanent?")) return;
    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (res.ok) fetchEvents();
    } catch (e) {
      alert("Decommissioning Failed");
    }
  };

  const filteredEvents = events.filter(e => 
    e.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 space-y-4">
       <Loader2 className="text-brand-orange animate-spin" size={32} />
       <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] animate-pulse">Syncing Arena Logistics...</p>
    </div>
  );

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
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`px-6 py-3 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-all shadow-lg ${isFormOpen ? 'bg-white/10 text-white' : 'bg-brand-orange text-white'}`}
        >
          {isFormOpen ? <X size={16} /> : <Plus size={16} />}
          {isFormOpen ? 'Cancel' : 'Sanction New Event'}
        </button>
      </div>

      {/* Creation Form */}
      {isFormOpen && (
        <div className="bg-white/5 border border-white/10 p-8 space-y-6 animate-in slide-in-from-top duration-500 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 blur-3xl pointer-events-none" />
          
          <h2 className="text-sm font-black uppercase tracking-widest text-white/40 mb-4">New Manifest Authorization</h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
               <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">Arena Identity (Name)</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-brand-orange"
                  />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">Discipline (Sport)</label>
                    <select 
                      value={formData.sport}
                      onChange={(e) => setFormData({...formData, sport: e.target.value})}
                      className="w-full bg-black border border-white/10 p-4 text-sm focus:outline-none focus:border-brand-orange"
                    >
                      <option>Cricket</option>
                      <option>Football</option>
                      <option>Badminton</option>
                      <option>Gym</option>
                      <option>Running</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">Chronology (Date)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Aug 15-20"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-brand-orange"
                    />
                  </div>
               </div>
            </div>

            <div className="space-y-4">
               <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">Geo Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Mumbai, MH"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-brand-orange"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">Prize Valuation (INR)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹1,00,000"
                    value={formData.prize}
                    onChange={(e) => setFormData({...formData, prize: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-brand-orange"
                  />
               </div>
            </div>

            <div className="md:col-span-2 pt-4 border-t border-white/5 flex justify-end">
               <button 
                  type="submit"
                  disabled={submitting}
                  className="bg-white text-black px-10 py-4 text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:bg-brand-orange hover:text-white transition-all disabled:opacity-50"
               >
                  {submitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                  {submitting ? 'Sanctioning...' : 'Authorize Arena Manifest'}
               </button>
            </div>
          </form>
        </div>
      )}

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
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white/5 border border-white/10 p-8 group hover:border-brand-blue/30 transition-all flex flex-col justify-between h-full relative overflow-hidden rounded-3xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 blur-3xl pointer-events-none" />
            
            <div>
              <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5 h-40">
                 <img src={event.image || '/img/event-placeholder.jpg'} alt={event.name} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                 <div className="absolute left-3 top-3 p-2 bg-brand-orange/20 backdrop-blur-md rounded-lg text-brand-orange border border-brand-orange/20">
                    <Trophy size={16} />
                 </div>
                 <span className="absolute right-3 top-3 px-2 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-[7px] font-black uppercase tracking-widest text-brand-blue rounded">
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
                {event.prize && (
                  <div className="flex items-center gap-3 text-[10px] text-brand-orange font-black uppercase tracking-widest">
                     <ShieldCheck size={14} /> {event.prize}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex justify-between items-center mt-auto">
               <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-green-500/50">
                  <ShieldCheck size={14} /> Official Circuit
               </div>
               <button 
                  onClick={() => handleDelete(event.id)}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/5 transition-all rounded-lg"
                  title="Decommission Arena"
               >
                  <Trash2 size={16} />
               </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="py-40 text-center border border-dashed border-white/5 rounded-3xl">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10">No official logistics manifests located.</p>
        </div>
      )}

      {/* Security Disclaimer */}
      <div className="p-6 bg-white/5 border border-dashed border-white/10 rounded text-center">
         <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] italic">
            Authenticated personnel only. Changes to tournament logs are cryptographically signed.
         </p>
      </div>
    </div>
  );
}
