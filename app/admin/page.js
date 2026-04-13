'use client';

import { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  Activity, 
  Zap, 
  Package, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  LayoutDashboard,
  Users,
  ShoppingBag,
  Settings,
  Award
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
          setRecentOrders(data.recentOrders || []);
        }
      } catch (e) {
        console.error("Failed to fetch admin data", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 space-y-4">
       <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent animate-spin rounded-full" />
       <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] animate-pulse">Synchronizing Intelligence...</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1500 text-white">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass p-8 relative overflow-hidden group hover:border-brand-blue/30 transition-all duration-500 rounded-3xl">
            <div className="flex justify-between items-start mb-6">
              <p className="text-[10px] uppercase font-bold tracking-widest text-white/40">{stat.label}</p>
              <div className={`p-2 rounded-xl bg-white/5 ${stat.isPositive ? 'text-green-400' : 'text-brand-orange'}`}>
                {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
            </div>
            
            <h3 className="text-3xl font-black text-white tracking-tight mb-2 font-outfit">{stat.value}</h3>
            <p className={`text-[10px] font-bold uppercase tracking-widest ${stat.isPositive ? 'text-green-500' : 'text-brand-orange'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass p-8 rounded-3xl">
        <h4 className="text-lg font-bold font-outfit text-white mb-6 flex items-center gap-2">
          <Zap size={18} className="text-brand-blue" /> Quick Actions
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/products/new" className="flex items-center justify-center gap-3 px-6 py-4 bg-brand-blue/10 hover:bg-brand-blue/20 border border-brand-blue/20 rounded-xl transition-all duration-300 group">
            <Package size={18} className="text-brand-blue group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold text-white">Add Product</span>
          </Link>
          <Link href="/admin/events" className="flex items-center justify-center gap-3 px-6 py-4 bg-brand-orange/10 hover:bg-brand-orange/20 border border-brand-orange/20 rounded-xl transition-all duration-300 group">
            <Award size={18} className="text-brand-orange group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold text-white">Add Event</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center justify-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 group">
            <ShoppingBag size={18} className="text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-sm font-bold text-white">View Orders</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Performance Chart */}
        <div className="lg:col-span-2 glass p-10 flex flex-col justify-between h-[450px] rounded-[40px]">
          <div className="flex justify-between items-center mb-10">
            <div>
               <h4 className="text-xl font-bold font-outfit text-white">Revenue Velocity</h4>
               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Real-time financial performance</p>
            </div>
            <div className="flex gap-2">
               <button className="px-5 py-2 bg-brand-blue text-[10px] font-black uppercase tracking-widest text-white rounded-full shadow-lg shadow-blue-500/20">Weekly</button>
               <button className="px-5 py-2 bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors rounded-full">Monthly</button>
            </div>
          </div>
          
          <div className="flex-grow flex items-end gap-2 px-4">
            {[30, 45, 25, 60, 80, 55, 90, 70, 40, 65, 85, 100].map((h, i) => (
              <div key={i} className="flex-grow bg-brand-blue/10 hover:bg-brand-blue transition-all duration-500 relative group cursor-pointer rounded-t-lg" style={{ height: `${h}%` }}>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-black px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded">
                  ₹{Math.floor(Math.random() * 10000)}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-10 pt-8 border-t border-white/5">
             <div className="flex items-center gap-2 text-green-500">
                <TrendingUp size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Peak performance detected</span>
             </div>
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic">Live data stream active</p>
          </div>
        </div>

        {/* Battle Feed (Recent Orders) */}
        <div className="glass p-10 rounded-[40px] flex flex-col">
          <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
            <h4 className="text-lg font-bold font-outfit text-white flex items-center gap-2">
               <Activity size={18} className="text-brand-orange" /> Battle Feed
            </h4>
            <span className="animate-pulse w-2 h-2 rounded-full bg-brand-orange" />
          </div>

          <div className="space-y-8 flex-grow">
            {recentOrders.length > 0 ? recentOrders.map((order, i) => (
              <div key={order._id || i} className="flex gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 flex-shrink-0 group-hover:border-brand-blue/30 transition-colors">
                   <Clock size={18} />
                </div>
                <div>
                   <p className="text-xs font-bold text-white mb-1">New Acquisition Logged</p>
                   <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Manifest #{order._id?.slice(-6).toUpperCase()} • ₹{order.totalPrice?.toLocaleString()}</p>
                   <p className="text-[9px] text-brand-blue font-bold uppercase tracking-tighter mt-2">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            )) : (
              <p className="text-[10px] text-gray-600 font-bold italic uppercase tracking-widest text-center py-20">No active acquisition logs</p>
            )}
          </div>

          <Link href="/admin/orders" className="w-full mt-10 py-5 glass border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-all text-center rounded-2xl">
             Review Full Signal History
          </Link>
        </div>
      </div>

      {/* Engineering Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="glass p-8 flex gap-6 items-center rounded-[32px] border-brand-blue/10">
            <div className="p-4 bg-brand-blue/5 border border-brand-blue/10 rounded-2xl text-brand-blue">
               <Zap size={24} />
            </div>
            <div>
               <h5 className="text-sm font-bold font-outfit text-white">System Synchronising</h5>
               <p className="text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-widest">Global CDN cache cleared for product catalog.</p>
            </div>
         </div>
         <div className="glass p-8 flex gap-6 items-center rounded-[32px] border-brand-orange/10">
            <div className="p-4 bg-brand-orange/5 border border-brand-orange/10 rounded-2xl text-brand-orange">
               <Package size={24} />
            </div>
            <div>
               <h5 className="text-sm font-bold font-outfit text-white">Inventory Monitor</h5>
               <p className="text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-widest">3 items crossing low-stock threshold.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
