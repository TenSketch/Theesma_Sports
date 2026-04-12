'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Globe } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-brand-black min-h-screen pt-20 pb-24 px-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        
        {/* Auth Header */}
        <div className="text-center mb-12">
          <Link href="/" className="text-2xl font-black tracking-tighter text-white mb-6 inline-block">
            THEESMA <span className="text-brand-orange">SPORTS</span>
          </Link>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white leading-none">
            {isLogin ? 'Welcome Back' : 'Create Identity'}
          </h2>
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em] mt-4">
            {isLogin ? 'Enter your credentials to access the arsenal' : 'Join the elite ranks of athletes worldwide'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/5 border border-white/10 p-10 shadow-2xl relative overflow-hidden group">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-brand-blue/10 transform rotate-45 translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-all duration-700" />
          
          <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input type="text" placeholder="Athlete Name" className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-sm focus:outline-none focus:border-brand-blue" />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input type="email" placeholder="athlete@theesma.com" className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-sm focus:outline-none focus:border-brand-blue" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-sm focus:outline-none focus:border-brand-blue" />
              </div>
            </div>

            {isLogin && (
               <div className="text-right">
                  <button type="button" className="text-[10px] uppercase font-bold text-gray-600 hover:text-white tracking-widest">Forgot Password?</button>
               </div>
            )}

            <button className="w-full bg-white text-black py-5 text-sm font-black uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-all flex items-center justify-center gap-2 group/btn">
              {isLogin ? 'Login Now' : 'Sign Up'} <ArrowRight className="group-hover/btn:translate-x-2 transition-transform" size={18} />
            </button>
          </form>

          {/* Social Auth */}
            <button className="w-full bg-white/5 border border-white/10 py-4 text-xs font-bold uppercase tracking-widest text-white flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
              <Globe size={18} className="text-brand-blue" />
              Continue with Google
            </button>
        </div>

        {/* Toggle Account */}
        <div className="text-center mt-10">
           <button 
             onClick={() => setIsLogin(!isLogin)}
             className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 hover:text-brand-orange transition-colors"
           >
             {isLogin ? "Don't have an ID? Create Rank" : "Already a member? Secure Login"}
           </button>
        </div>

      </div>
    </div>
  );
}
