'use client';

import { Mail, Phone, MapPin, Send, Instagram, Twitter, Youtube } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-brand-black min-h-screen pt-32 pb-24 px-6 text-white font-inter">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        
        {/* Info Column */}
        <div className="lg:w-1/3">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight font-outfit mb-8">
            Sync <span className="text-brand-blue">Directly</span>.
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-12">
            Connect with our performance engineering team for bulk acquisitions, sponsorship sync, or logistics support.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6">
               <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-blue">
                  <Mail size={20} />
               </div>
               <div>
                  <p className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-1">Email Pipeline</p>
                  <p className="text-sm font-bold">sync@theesmasports.com</p>
               </div>
            </div>
            <div className="flex items-center gap-6">
               <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-orange">
                  <Phone size={20} />
               </div>
               <div>
                  <p className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-1">Voice Protocol</p>
                  <p className="text-sm font-bold">+91 (800) THEESMA</p>
               </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="flex-grow">
          <form className="glass p-12 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">Full Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-brand-blue outline-none transition-colors rounded-lg" placeholder="John Athlete" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">Contact Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-brand-blue outline-none transition-colors rounded-lg" placeholder="john@sync.com" />
             </div>
             <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">Direct Signal (Message)</label>
                <textarea rows={6} className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-brand-blue outline-none transition-colors rounded-lg" placeholder="Describe your performance requirement..." />
             </div>
             <button type="button" className="btn-premium flex items-center justify-center gap-3 md:col-span-1">
                Establish Sync <Send size={18} />
             </button>
          </form>
        </div>

      </div>
    </div>
  );
}
