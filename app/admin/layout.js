'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  Trophy, 
  LogOut,
  LayoutDashboard,
  ShieldAlert,
  Menu,
  X,
  Bell,
  Image
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Events', href: '/admin/events', icon: Trophy },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Media', href: '/admin/media', icon: Image },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // In production, this would be a server-side check or a JWT verification
    // For development, we'll check for an admin flag or simply allow during build
    const checkAdmin = () => {
      // Logic placeholder: const user = getAuthUser();
      setIsAdmin(true); 
      setLoading(false);
    };
    checkAdmin();
  }, [router]);

  if (loading) return null;

  if (!isAdmin) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center text-center p-6">
        <ShieldAlert className="text-brand-orange mb-4" size={48} />
        <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Access Denied</h1>
        <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">Administrative clearance required for this sector.</p>
        <Link href="/" className="mt-8 text-brand-blue font-bold uppercase text-[10px] tracking-[0.2em] hover:underline underline-offset-4">Return to Public Zone</Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black overflow-hidden font-inter">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative left-0 top-0 h-full w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl flex flex-col z-50 transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
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
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-gray-500 hover:text-brand-orange transition-colors">
            <LogOut size={18} />
            Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto custom-scrollbar bg-black relative md:ml-0">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-orange/5 blur-[100px] pointer-events-none rounded-full" />
        
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-black/40 backdrop-blur-md border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-white hover:text-brand-blue transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h2 className="text-sm font-black uppercase tracking-widest text-white/40">
              {navItems.find(item => item.href === pathname)?.name || 'Command Center'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-brand-blue transition-all">
              <Bell size={18} />
            </button>
            <div className="flex flex-col items-end">
               <p className="text-xs font-black text-white">Vicky Admin</p>
               <p className="text-[10px] font-bold text-brand-blue uppercase tracking-tighter">System Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center font-black text-brand-blue text-xs">
              VA
            </div>
          </div>
        </header>

        <div className="p-8 relative z-10">
          {children}
        </div>
      </main>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#000',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
    </div>
  );
}

