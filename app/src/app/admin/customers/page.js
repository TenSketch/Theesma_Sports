'use client';

import { Users, Search, MoreHorizontal, Mail, ShieldCheck, MailPlus } from 'lucide-react';

export default function AdminCustomersPage() {
  const customers = [
    { name: "Arjun Sharma", email: "arjun@gear.com", spent: "₹12,499", orders: 3, status: "Pro" },
    { name: "Priya Varma", email: "priya@sync.com", spent: "₹8,900", orders: 2, status: "Active" },
    { name: "Rahul Das", email: "rahul@pro.com", spent: "₹24,000", orders: 5, status: "Elite" }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white font-outfit">Member Directory.</h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-2 italic">
            Management of elite performance athletes
          </p>
        </div>
        
        <div className="flex gap-4">
           <div className="relative w-64 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input type="text" placeholder="Search squadron..." className="w-full bg-white/5 border border-white/10 p-3 pl-12 text-xs text-white focus:outline-none focus:border-brand-blue transition-colors rounded-xl" />
          </div>
          <button className="bg-brand-blue text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
             <MailPlus size={16} /> Invite
          </button>
        </div>
      </div>

      <div className="glass rounded-3xl overflow-hidden border border-white/5">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <tr>
              <th className="px-8 py-6">Athlete Info</th>
              <th className="px-8 py-6">Tier Status</th>
              <th className="px-8 py-6">Total Valuation</th>
              <th className="px-8 py-6">Orders</th>
              <th className="px-8 py-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {customers.map((c, i) => (
              <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                <td className="px-8 py-6">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-black text-xs">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                         <p className="text-sm font-bold text-white">{c.name}</p>
                         <p className="text-[10px] text-gray-500 font-medium">{c.email}</p>
                      </div>
                   </div>
                </td>
                <td className="px-8 py-6">
                   <span className="px-3 py-1 bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-brand-orange rounded-full">
                      {c.status} Grade
                   </span>
                </td>
                <td className="px-8 py-6 text-sm font-bold font-mono">{c.spent}</td>
                <td className="px-8 py-6 text-sm font-bold text-gray-400">{c.orders} Manifests</td>
                <td className="px-8 py-6">
                   <button className="text-gray-500 hover:text-white transition-colors">
                      <MoreHorizontal size={18} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
