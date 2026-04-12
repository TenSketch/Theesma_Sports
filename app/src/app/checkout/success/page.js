'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  CheckCircle2, 
  Package, 
  ArrowRight, 
  Truck, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');

  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center pt-32 pb-24 px-6 text-white font-inter">
      <div className="max-w-2xl w-full text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Animated Icon Check */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-brand-blue/20 blur-3xl rounded-full scale-150" />
          <div className="relative bg-brand-blue/10 border border-brand-blue/30 w-24 h-24 rounded-full flex items-center justify-center text-brand-blue mx-auto mb-8">
             <CheckCircle2 size={48} />
          </div>
        </div>

        <div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight font-outfit mb-4">
             Acquisition <span className="text-brand-blue">Sync'd</span>.
          </h1>
          <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.4em] italic">
             Manifest #{orderId?.slice(-6).toUpperCase() || "SYNC-ERROR"} Confirmed
          </p>
        </div>

        <div className="glass p-10 rounded-[32px] space-y-8 text-left border-brand-blue/10">
           <div className="flex items-start gap-4">
              <div className="p-3 bg-brand-blue/10 rounded-2xl text-brand-blue">
                 <Truck size={20} />
              </div>
              <div>
                 <h4 className="font-bold text-white mb-1">Standard Dispatch Protocol</h4>
                 <p className="text-sm text-gray-400">Your performance gear is being prepared for synchronization. Expected transit arrival: 3-5 business days.</p>
              </div>
           </div>

           <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="space-y-1">
                 <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Global Order ID</p>
                 <p className="text-sm font-mono text-brand-blue">{orderId || "PENDING_SYNC"}</p>
              </div>
              <Link href={`/admin/orders`} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white hover:text-brand-blue transition-colors">
                 Manage Manifest <ExternalLink size={14} />
              </Link>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
           <Link href="/products" className="btn-premium flex items-center gap-3 w-full sm:w-auto">
              Return to Arsenal <ArrowRight size={18} />
           </Link>
           <Link href="/" className="text-sm font-bold text-white/70 hover:text-white transition-colors flex items-center gap-2">
              Base Station
           </Link>
        </div>

        {/* Support Link */}
        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-12">
          Sync issues? <Link href="/contact" className="text-brand-blue underline underline-offset-4">Establish contact with logistics team</Link>
        </p>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent animate-spin rounded-full" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
