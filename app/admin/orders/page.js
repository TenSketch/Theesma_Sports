'use client';

import { useEffect, useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreHorizontal,
  Package,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const statusColors = {
  'Pending': 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
  'Processing': 'text-brand-blue bg-brand-blue/10 border-brand-blue/20',
  'Shipped': 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  'Delivered': 'text-green-500 bg-green-500/10 border-green-500/20',
  'Cancelled': 'text-brand-orange bg-brand-orange/10 border-brand-orange/20',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        // Direct fetch to orders API instead of waiting for stats first
        const res = await fetch('/api/orders'); 
        const data = await res.json();
        
        if (data.success) {
          setOrders(data.data || []);
        } else {
          setError(data.error || "Failed to retrieve acquisition logs.");
        }
      } catch (e) {
        console.error("Failed to fetch orders for admin", e);
        setError("System link failure. Check database connection.");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(o => 
    o._id?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 space-y-4">
       <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent animate-spin rounded-full" />
       <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] animate-pulse">Syncing logistics data...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center py-32 space-y-6 max-w-sm mx-auto text-center">
       <div className="p-4 bg-red-500/10 rounded-full text-red-500">
          <AlertCircle size={32} />
       </div>
       <h3 className="text-xl font-bold font-outfit">Logistics Error</h3>
       <p className="text-sm text-gray-500 leading-relaxed">{error}</p>
       <button onClick={() => window.location.reload()} className="text-[10px] text-brand-blue font-black uppercase tracking-widest border border-brand-blue/20 px-6 py-2 rounded-full hover:bg-brand-blue hover:text-white transition-all">Retry Sync</button>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white font-outfit">Order Pipeline.</h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-2 italic flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live logistics monitoring
          </p>
        </div>
        
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-blue transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search manifests..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors rounded-xl"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredOrders.map((order) => (
          <div key={order._id} className="glass p-6 group hover:border-brand-blue/20 transition-all flex flex-col lg:flex-row lg:items-center gap-8 rounded-2xl">
            
            {/* ID & Date */}
            <div className="flex-shrink-0 lg:w-48">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-brand-blue/10 rounded-lg text-brand-blue">
                     <Package size={16} />
                  </div>
                  <p className="text-xs font-black text-white uppercase tracking-tighter">Manifest #{order._id.slice(-6).toUpperCase()}</p>
               </div>
               <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                 {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
               </p>
            </div>

            {/* User & Items Summary */}
            <div className="flex-grow">
               <p className="text-[10px] text-brand-blue font-bold uppercase tracking-widest mb-1 underline underline-offset-4">Internal Node: {order.user?.slice(-6) || "ID-MOCK"}</p>
               <p className="text-sm text-white font-medium max-w-md">
                 {order.orderItems?.length || 0} performance assets: {order.orderItems?.map(item => item.name).join(', ').slice(0, 45)}...
               </p>
            </div>

            {/* Financial & Logistics */}
            <div className="flex lg:flex-col lg:items-end justify-between items-center lg:justify-center gap-2 lg:w-40 border-t lg:border-t-0 lg:border-l border-white/5 pt-4 lg:pt-0 lg:pl-8">
               <p className="text-xl font-black text-white">₹{order.totalPrice?.toLocaleString()}</p>
               <span className={`px-3 py-1 border text-[8px] font-black uppercase tracking-[0.2em] rounded-full inline-flex items-center gap-2 ${statusColors[order.status] || 'text-gray-500 border-white/10'}`}>
                 <div className="w-1 h-1 rounded-full bg-current" />
                 {order.status}
               </span>
            </div>

            <div className="flex justify-between items-center lg:block lg:border-l border-white/5 lg:pl-8">
               <button className="h-12 w-12 bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-brand-blue/40 transition-all rounded-xl flex items-center justify-center">
                  <MoreHorizontal size={20} />
               </button>
            </div>

          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-3xl opacity-30">
            <AlertCircle className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest italic">No active logistics logs detected in the current filter stack.</p>
          </div>
        )}
      </div>
    </div>
  );
}
