'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2,
  Lock,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();
  const router = useRouter();
  
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    pincode: ''
  });

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.address && formData.city && formData.pincode;

  const shippingPrice = 0; // Free for now
  const total = subtotal + shippingPrice;

  const handleNextStep = () => {
    if (isFormValid) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      alert("Please fulfill all logistical data fields.");
    }
  };

  const handlePayment = async () => {
    if (!agreed) return;

    setLoading(true);
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image || item.images[0],
          price: item.price,
          product: item._id || item.id, // Support both formats
          size: item.size
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.pincode,
          country: 'India'
        },
        paymentMethod: 'Razorpay',
        itemsPrice: subtotal,
        shippingPrice,
        totalPrice: total
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();
      if (data.success) {
        clearCart();
        router.push(`/checkout/success?id=${data.data._id}`);
      } else {
        alert("Logistics Sync Failure: " + (data.error || "Unknown Error"));
      }
    } catch (err) {
      alert("System Link Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center text-center p-6">
         <h2 className="text-2xl font-black text-white font-outfit mb-4">Manifest Empty</h2>
         <p className="text-gray-500 text-sm mb-8">No equipment signals detected in your current session.</p>
         <Link href="/products" className="btn-premium">Return to Arsenal</Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-black min-h-screen pt-24 pb-24 px-6 text-white font-inter">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
           <Link href="/cart" className="p-2 bg-white/5 border border-white/10 hover:border-white/30 transition-colors">
              <ArrowLeft size={18} />
           </Link>
           <h1 className="text-4xl md:text-5xl font-black tracking-tight font-outfit">
             Secure <span className="text-brand-blue">Acquisition</span>.
           </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Checkout Flow */}
          <div className="flex-grow space-y-12">
            
            {/* Step 1: Shipping Details */}
            <div className={`transition-all duration-500 ${step !== 1 ? 'opacity-30 pointer-events-none scale-95 blur-sm' : 'opacity-100'}`}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-black text-sm">01</div>
                <h2 className="text-xl font-bold font-outfit flex items-center gap-2">
                   Logistical Detail
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="bg-white/5 border border-white/10 p-5 text-sm focus:outline-none focus:border-brand-blue transition-colors rounded-lg" 
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="bg-white/5 border border-white/10 p-5 text-sm focus:outline-none focus:border-brand-blue transition-colors rounded-lg" 
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-white/5 border border-white/10 p-5 text-sm col-span-1 md:col-span-2 focus:outline-none focus:border-brand-blue transition-colors rounded-lg" 
                />
                <input 
                  type="text" 
                  placeholder="Shipping Address" 
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="bg-white/5 border border-white/10 p-5 text-sm col-span-1 md:col-span-2 focus:outline-none focus:border-brand-blue transition-colors rounded-lg" 
                />
                <input 
                  type="text" 
                  placeholder="City" 
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="bg-white/5 border border-white/10 p-5 text-sm focus:outline-none focus:border-brand-blue transition-colors rounded-lg" 
                />
                <input 
                  type="text" 
                  placeholder="Pincode" 
                  required
                  value={formData.pincode}
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  className="bg-white/5 border border-white/10 p-5 text-sm focus:outline-none focus:border-brand-blue transition-colors rounded-lg" 
                />
                
                <button 
                  type="button"
                  onClick={handleNextStep}
                  className="mt-4 bg-white text-black py-6 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-brand-blue hover:text-white transition-all col-span-1 md:col-span-2 rounded-lg"
                >
                  Continue to Payment <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Step 2: Payment Details */}
            <div className={`transition-all duration-500 ${step !== 2 ? 'opacity-30 pointer-events-none scale-95 blur-sm' : 'opacity-100'}`}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-black text-sm">02</div>
                <h2 className="text-xl font-bold font-outfit flex items-center gap-2">
                   Payment Gateway
                </h2>
              </div>
              
              <div className="glass p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="h-10 px-4 bg-blue-600 flex items-center justify-center rounded-lg text-white font-bold italic">
                      Razorpay
                    </div>
                    <div>
                       <p className="text-sm font-bold">Secure Selection</p>
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Ready for transition</p>
                    </div>
                  </div>
                  <CheckCircle2 className="text-brand-blue" size={24} />
                </div>

                <div className="space-y-6 mb-10">
                   {/* Terms Checkbox - THE MISSING LINK */}
                   <label className="flex items-start gap-4 cursor-pointer group">
                      <div className="relative mt-1">
                        <input 
                          type="checkbox" 
                          checked={agreed}
                          onChange={() => setAgreed(!agreed)}
                          className="peer sr-only" 
                        />
                        <div className="w-5 h-5 border border-white/20 peer-checked:bg-brand-blue peer-checked:border-brand-blue transition-all" />
                        <CheckCircle2 size={12} className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100" />
                      </div>
                      <span className="text-[11px] text-gray-500 font-medium leading-relaxed group-hover:text-gray-300 transition-colors">
                        I confirm that I have read and agree to the <Link href="/faq" className="text-brand-blue underline">Theesma Sports Purchase Policy</Link> and <Link href="/shipping" className="text-brand-blue underline">Shipping Guidelines</Link> regarding precision-grade equipment.
                      </span>
                   </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <button 
                      type="button"
                      disabled={!agreed || loading}
                      onClick={handlePayment}
                      className="bg-brand-blue text-white py-6 text-xs font-black uppercase tracking-[0.2em] rounded-lg disabled:opacity-30 hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-900/40"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                      ) : (
                        <>Process Payment <Lock size={16} /></>
                      )}
                    </button>
                    
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[10px] uppercase font-bold text-gray-600 hover:text-white transition-colors tracking-widest py-6 border border-white/5 rounded-lg"
                    >
                      Return to logistics
                    </button>
                </div>
              </div>
            </div>

          </div>

          {/* Acquisition Sidebar */}
          <aside className="w-full lg:w-96">
            <div className="glass p-8 rounded-2xl sticky top-32">
              <h4 className="text-xs font-black uppercase tracking-widest mb-8 border-b border-white/10 pb-4 flex items-center gap-2">
                 Manifest Info
              </h4>
              
              <div className="max-h-60 overflow-y-auto mb-8 pr-2 custom-scrollbar space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between items-center pb-4 border-b border-white/5 last:border-0 last:mb-0">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-white uppercase tracking-tight">{item.name}</p>
                      <p className="text-[9px] text-gray-500 font-bold uppercase">SCALE: {item.size} • QTY: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold font-mono">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-8 pt-4 border-t border-white/10">
                <div className="flex justify-between text-[11px] font-bold text-gray-500">
                   <span>Unit Value</span>
                   <span className="text-white">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-gray-500">
                   <span>Logistics Sync</span>
                   <span className="text-brand-blue italic font-black text-[9px] uppercase tracking-widest">FREE ACCESS</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-6">
                <span className="text-xs font-black uppercase tracking-widest text-white/40 leading-none">Total Net Valuation</span>
                <span className="text-3xl font-black text-brand-blue leading-none">₹{total.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-brand-blue/5 border border-brand-blue/10 rounded-lg">
                 <ShieldCheck size={20} className="text-brand-blue" />
                 <p className="text-[9px] text-gray-500 uppercase font-bold tracking-tight">System Shield: Encrypted at 256-bit industrial protocol.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
