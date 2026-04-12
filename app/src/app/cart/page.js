'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="bg-brand-black min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-500">
          <ShoppingBag size={40} />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 text-white">Your Arsenal is Empty.</h1>
        <p className="text-gray-500 mb-10 max-w-xs uppercase tracking-widest text-[10px] font-bold">
          The field is waiting. Acquire your gear to dominate the game.
        </p>
        <Link href="/products" className="bg-brand-blue px-12 py-5 text-sm font-black uppercase tracking-widest transition-transform hover:scale-105">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-black min-h-screen pt-12 pb-24 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16 text-white">
          Review <span className="text-brand-blue">Arsenal.</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Cart Items List */}
          <div className="flex-grow space-y-8">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-white/5 group">
                {/* Image */}
                <div className="w-full sm:w-32 aspect-square bg-white/5 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>

                {/* Info */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-xl font-black uppercase tracking-tighter">{item.name}</h3>
                       <button 
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-gray-600 hover:text-brand-orange transition-colors"
                       >
                         <Trash2 size={16} />
                       </button>
                    </div>
                    <p className="text-[10px] text-brand-blue font-bold uppercase tracking-widest mb-4">Size: {item.size}</p>
                  </div>

                  <div className="flex justify-between items-end">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-white/10">
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="p-2 hover:bg-white/5 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="p-2 hover:bg-white/5 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="text-xl font-black">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <aside className="w-full lg:w-96">
            <div className="bg-white/5 p-8 border border-white/10 sticky top-32">
              <h4 className="text-sm font-black uppercase tracking-widest mb-8 border-b border-white/10 pb-4">Order Summary</h4>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-xs uppercase tracking-widest text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs uppercase tracking-widest text-gray-400">
                  <span>Shipping</span>
                  <span className="text-brand-blue font-bold italic font-mono">FREE (PROMO)</span>
                </div>
                <div className="flex justify-between text-xs uppercase tracking-widest text-gray-400">
                  <span>Taxes</span>
                  <span className="text-white font-bold">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-white/10 pt-6 mb-10">
                <span className="text-xs font-black uppercase tracking-widest">Total</span>
                <span className="text-3xl font-black text-brand-blue">₹{subtotal.toLocaleString()}</span>
              </div>

              <Link 
                href="/checkout"
                className="w-full bg-white text-black py-5 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-brand-blue hover:text-white"
              >
                Assemble Orders <ArrowRight size={16} />
              </Link>

              <div className="mt-8 flex items-center gap-3 grayscale opacity-30">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="Paypal" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
