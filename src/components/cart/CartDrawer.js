'use client';

import { useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

export default function CartDrawer() {
  const { cartItems, isCartOpen, setCartOpen, removeFromCart, updateQuantity, subtotal } = useCart();
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;

    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' })
        .to(drawerRef.current, { x: 0, duration: 0.6, ease: 'expo.out' }, '-=0.3');

      // Animate children only if they exist
      if (contentRef.current && contentRef.current.children.length > 0) {
        tl.fromTo(contentRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
          '-=0.4'
        );
      }
    } else {
      document.body.style.overflow = 'auto';
      const tl = gsap.timeline();
      tl.to(drawerRef.current, { x: '100%', duration: 0.5, ease: 'expo.in' })
        .to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' }, '-=0.2');
    }
  }, [isCartOpen]);


  return (
    <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="absolute top-0 right-0 w-full max-w-md h-full bg-brand-black border-l border-white/5 shadow-2xl translate-x-full flex flex-col"
      >
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ShoppingBag size={20} className="text-brand-blue" />
            <h2 className="text-xl font-black uppercase tracking-tighter text-white italic">
              Your <span className="text-brand-blue">Arsenal</span>.
            </h2>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 text-white/40 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items List */}
        <div ref={contentRef} className="flex-grow overflow-y-auto custom-scrollbar p-8 space-y-8">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-6 group">
                {/* <div className="relative w-24 h-24 bg-white/5 rounded-xl overflow-hidden border border-white/5 shrink-0">
                  <Image 
                    src={item.image || (item.images && item.images[0]) || '/img/gear.png'} 
                    alt={item.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div> */}
                <Image
                  src={item.image || (item.images && item.images[0]) || '/img/gear.png'}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 object-cover grayscale group-hover:grayscale-0 transition-all duration-500 rounded-xl"
                />

                <div className="flex-grow flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-black uppercase tracking-tight text-white">{item.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id || item._id, item.size)}
                      className="text-white/20 hover:text-brand-orange transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <p className="text-[9px] font-black uppercase tracking-widest text-brand-blue mb-4">
                    Size: {item.size} • ₹{item.price.toLocaleString()}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id || item._id, item.size, item.quantity - 1)}
                        className="p-2 hover:bg-white/5 text-white/40 hover:text-white transition-all"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-4 text-[10px] font-black text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id || item._id, item.size, item.quantity + 1)}
                        className="p-2 hover:bg-white/5 text-white/40 hover:text-white transition-all"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag size={24} className="text-white/10" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 max-w-[200px] leading-loose">
                Your tactical arsenal is currently empty.
              </p>
              <Link
                href="/products"
                onClick={() => setCartOpen(false)}
                className="mt-8 text-[9px] font-black uppercase tracking-widest text-brand-blue hover:text-white transition-colors border-b border-brand-blue/30 pb-1"
              >
                Explore Gear →
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-8 bg-white/5 border-t border-white/5 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Subtotal</span>
              <span className="text-2xl font-black text-white">₹{subtotal.toLocaleString()}</span>
            </div>

            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20">
              Shipping and taxes calculated at deployment.
            </p>

            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="w-full btn-premium flex items-center justify-center gap-3 py-6"
            >
              Checkout Now <ArrowRight size={16} />
            </Link>

            <button
              onClick={() => setCartOpen(false)}
              className="w-full text-[9px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors"
            >
              Continue Engineering
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
