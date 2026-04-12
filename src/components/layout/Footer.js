import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        {/* Brand Info */}
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-2xl font-black tracking-tighter text-white mb-8 block uppercase">
            THEESMA <span className="text-brand-blue">SPORTS</span>
          </Link>
          <p className="text-white/30 text-xs font-bold uppercase tracking-[0.3em] leading-loose max-w-sm">
            Forging technical arsenal for the elite. We are the pulse of competition and the grit of the athlete.
          </p>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-8">Navigation</h4>
          <ul className="space-y-4">
            <li><Link href="/play" className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Play</Link></li>
            <li><Link href="/events" className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Compete</Link></li>
            <li><Link href="/products" className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Shop</Link></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-8">Connect</h4>
          <ul className="space-y-4">
            <li><Link href="#" className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Instagram</Link></li>
            <li><Link href="#" className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">X / Twitter</Link></li>
            <li><Link href="#" className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">YouTube</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <p className="text-white/20 text-[8px] font-bold uppercase tracking-[0.5em]">
          © 2026 THEESMA SPORTS ENTERPRISE. PROVEN IN COMPETITION.
        </p>
        <div className="flex gap-12">
           <Link href="/privacy" className="text-white/20 hover:text-white text-[8px] font-bold uppercase tracking-widest transition-all">Privacy Intel</Link>
           <Link href="/terms" className="text-white/20 hover:text-white text-[8px] font-bold uppercase tracking-widest transition-all">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
