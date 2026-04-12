'use client';

import { Truck, MapPin, Globe, Clock, ShieldCheck } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="bg-brand-black min-h-screen pt-32 pb-24 px-6 text-white font-inter">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight font-outfit mb-12">
          Shipping <span className="text-brand-blue">Logistics</span>.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass p-8 rounded-2xl">
             <Truck className="text-brand-blue mb-4" size={24} />
             <h3 className="text-xl font-bold font-outfit mb-2">Standard Protocol</h3>
             <p className="text-gray-500 text-sm leading-relaxed">Delivery within 3-5 business days across local zones. Real-time tracking included.</p>
          </div>
          <div className="glass p-8 rounded-2xl">
             <Globe className="text-brand-orange mb-4" size={24} />
             <h3 className="text-xl font-bold font-outfit mb-2">Global Transit</h3>
             <p className="text-gray-500 text-sm leading-relaxed">International shipping to over 20 countries. Delivery varies by region (7-14 days).</p>
          </div>
        </div>

        <div className="space-y-8">
           <div className="flex items-start gap-6 border-l-2 border-brand-blue pl-8 py-4">
              <Clock className="text-brand-blue flex-shrink-0" size={20} />
              <div>
                 <h4 className="font-bold text-white mb-1">Dispatch Synchronization</h4>
                 <p className="text-xs text-gray-500">Orders placed before 2:00 PM are synched and dispatched within the same cycle.</p>
              </div>
           </div>
           <div className="flex items-start gap-6 border-l-2 border-brand-blue pl-8 py-4">
              <ShieldCheck className="text-brand-blue flex-shrink-0" size={20} />
              <div>
                 <h4 className="font-bold text-white mb-1">Secure Packaging</h4>
                 <p className="text-xs text-gray-500">Pro-grade gear is shipped in impact-resistant, weather-sealed industrial containers.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
