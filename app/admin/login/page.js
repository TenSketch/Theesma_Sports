'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ShieldCheck, ArrowRight, Loader2, Home } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);

  // Check if already logged in as admin
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.success && data.data.role === 'admin') {
          router.push('/admin');
        }
      } catch (e) {}
    }
    checkSession();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Sign in with Firebase Client SDK
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const { auth } = await import('@/lib/firebase');
      
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const idToken = await userCredential.user.getIdToken();

      // 2. Verify with our backend and set session
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      });

      const data = await res.json();

      if (data.success) {
        if (data.data.role === 'admin') {
          router.push('/admin');
          router.refresh();
        } else {
          setError('Access Denied: Administrative clearance not detected.');
          // Log out from firebase client to sync state
          auth.signOut();
        }
      } else {
        setError(data.error || 'Authentication Failed');
      }
    } catch (err) {
      setError('System Access Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden font-inter">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/10 blur-[160px] rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse transition-all duration-1000" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-orange/5 blur-[120px] rounded-full translate-y-1/3 -translate-x-1/3" />
      
      {/* Main Login Card */}
      <div className="w-full max-w-sm relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Brand Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue/10 border border-brand-blue/20 rounded-2xl mb-6 group transition-all duration-500 hover:border-brand-blue/50">
             <ShieldCheck size={32} className="text-brand-blue group-hover:scale-110 transition-transform duration-500" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-white font-outfit uppercase">
             Command <span className="text-brand-blue">Center</span>
          </h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-3 italic">
             Logistics & Resource Management
          </p>
        </div>

        {/* Glassmorphic Form */}
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
           {/* Scan Line Animation */}
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent -translate-y-full group-hover:translate-y-[400px] transition-all duration-[2000ms] ease-linear" />
           
           <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] uppercase font-black tracking-widest text-gray-400 block ml-1">Admin Credential</label>
                <div className="relative group/field">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/field:text-brand-blue transition-colors" size={16} />
                  <input 
                    type="email" 
                    placeholder="admin@theesma.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black/50 border border-white/5 p-4 pl-12 text-sm text-white focus:outline-none focus:border-brand-blue transition-all rounded-xl placeholder:text-gray-700" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase font-black tracking-widest text-gray-400 block ml-1">Security Key</label>
                <div className="relative group/field">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/field:text-brand-blue transition-colors" size={16} />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-black/50 border border-white/5 p-4 pl-12 text-sm text-white focus:outline-none focus:border-brand-blue transition-all rounded-xl placeholder:text-gray-700" 
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-brand-orange/10 border border-brand-orange/20 rounded-xl animate-in slide-in-from-top-2">
                   <p className="text-[10px] text-brand-orange font-bold uppercase tracking-wider text-center">{error}</p>
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-xl hover:bg-brand-blue hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-30 disabled:pointer-events-none group/btn"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : (
                  <>Establish Auth <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" size={16} /></>
                )}
              </button>
           </form>
        </div>

        {/* Footer Meta */}
        <div className="mt-12 text-center space-y-6">
           <Link href="/" className="inline-flex items-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest hover:text-white transition-colors">
              <Home size={12} /> Return to Arsenal
           </Link>
           <p className="text-[8px] text-gray-800 font-bold uppercase tracking-[0.5em] mt-12">
              Theesma OS v4.2.0 • Encryption Layer Active
           </p>
        </div>

      </div>
    </div>
  );
}
