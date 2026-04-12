'use client';

import { useState } from 'react';
import { Settings as SettingsIcon, Shield, Eye, Database, Globe, Bell, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const [curiosityMode, setCuriosityMode] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-white font-outfit">System Settings.</h1>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-2 italic">
           Global configuration for Theesma Sports logic
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Experience Settings */}
        <div className="glass p-8 rounded-3xl space-y-8">
           <div className="flex items-center gap-4 mb-4">
              <Eye className="text-brand-blue" size={20} />
              <h3 className="text-lg font-bold font-outfit">Experience Engine</h3>
           </div>

           {/* Curiosity Mode Toggle */}
           <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
              <div>
                 <p className="text-sm font-bold text-white mb-1">Curiosity Mode</p>
                 <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Hide pricing on listing cards</p>
              </div>
              <button 
                onClick={() => setCuriosityMode(!curiosityMode)}
                className={`w-12 h-6 rounded-full transition-all relative ${curiosityMode ? 'bg-brand-blue' : 'bg-gray-800'}`}
              >
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${curiosityMode ? 'left-7' : 'left-1'}`} />
              </button>
           </div>

           <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
              <div>
                 <p className="text-sm font-bold text-white mb-1">Maintenance Mode</p>
                 <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Public access block with banner</p>
              </div>
              <button 
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`w-12 h-6 rounded-full transition-all relative ${maintenanceMode ? 'bg-brand-orange' : 'bg-gray-800'}`}
              >
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${maintenanceMode ? 'left-7' : 'left-1'}`} />
              </button>
           </div>
        </div>

        {/* Sync Settings */}
        <div className="glass p-8 rounded-3xl space-y-8">
           <div className="flex items-center gap-4 mb-4">
              <Database className="text-brand-orange" size={20} />
              <h3 className="text-lg font-bold font-outfit">Database Synchronicity</h3>
           </div>

           <div className="space-y-4">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <Globe size={18} className="text-gray-500" />
                    <span className="text-xs font-bold text-white">Global CDN Endpoint</span>
                 </div>
                 <span className="text-[10px] text-brand-blue font-black tracking-widest uppercase">theesma-core-01</span>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <Bell size={18} className="text-gray-500" />
                    <span className="text-xs font-bold text-white">Logistics Alerts</span>
                 </div>
                 <span className="text-[10px] text-green-500 font-black tracking-widest uppercase">ACTIVE</span>
              </div>
           </div>
        </div>
      </div>

      <div className="flex justify-end">
         <button className="btn-premium flex items-center gap-3">
            Save System State <Save size={18} />
         </button>
      </div>
    </div>
  );
}
