'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  Trophy, 
  LogOut,
  LayoutDashboard,
  ShieldAlert
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Events', href: '/admin/events', icon: Trophy },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState({ name: 'System Admin', initial: 'SA' });

  useEffect(() => {
    async function checkAdmin() {
      if (pathname === '/admin/login') {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        
        if (data.success && data.data.role === 'admin') {
          setIsAdmin(true);
          setAdminData({
            name: data.data.name || 'System Admin',
            initial: data.data.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'SA'
          });
        } else if (data.success) {
          setIsAdmin(false);
        } else {
          router.push('/admin/login');
        }
      } catch (e) {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    }
    checkAdmin();
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      const { auth } = await import('@/lib/firebase');
      await auth.signOut(); // Firebase Client Signout
      
      await fetch('/api/auth/logout', { method: 'POST' }); // Local Session Clear
      
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error('Logout Sync Failure', e);
      // Fallback redirect
      router.push('/admin/login');
    }
  };

  if (loading) return null;

  if (!isAdmin && pathname !== '/admin/login') {
    return null; 
  }

  return (
    <div className="flex h-screen bg-black overflow-hidden font-inter">
      {/* Sidebar - Only show if not on login page */}
      {pathname !== '/admin/login' && (
        <aside className="w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl flex flex-col z-30 animate-in slide-in-from-left duration-700">
          <div className="p-8">
            <Link href="/admin" className="text-xl font-black tracking-tighter text-white">
              THEESMA <span className="text-brand-blue">ADMIN</span>
            </Link>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-1 italic">
              Command Center
            </p>
          </div>

          <nav className="flex-grow px-4 space-y-2 mt-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                    isActive 
                    ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <item.icon size={18} className={isActive ? 'text-brand-blue' : 'text-gray-500'} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10 mt-auto">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-gray-500 hover:text-brand-orange transition-colors"
            >
              <LogOut size={18} />
              Secure Logout
            </button>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto custom-scrollbar bg-black relative">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-orange/5 blur-[100px] pointer-events-none rounded-full" />
        
        {/* Top Header - Only show if not on login page */}
        {pathname !== '/admin/login' && (
          <header className="sticky top-0 z-20 bg-black/40 backdrop-blur-md border-b border-white/5 px-8 py-4 flex items-center justify-between animate-in slide-in-from-top duration-700">
            <h2 className="text-sm font-black uppercase tracking-widest text-white/40">
              {navItems.find(item => item.href === pathname)?.name || 'Command Center'}
            </h2>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                 <p className="text-xs font-black text-white">{adminData.name}</p>
                 <p className="text-[10px] font-bold text-brand-blue uppercase tracking-tighter">System Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center font-black text-brand-blue text-xs">
                {adminData.initial}
              </div>
            </div>
          </header>
        )}

        <div className={pathname === '/admin/login' ? "" : "p-8 relative z-10"}>
          {children}
        </div>
      </main>
    </div>
  );
}

