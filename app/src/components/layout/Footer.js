import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Info */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="text-xl font-bold tracking-tighter text-white mb-6 block">
            THEESMA <span className="text-brand-orange">SPORTS</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Performance driven sports brand built for athletes who demand the absolute best. Proven in competition.
          </p>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="text-white font-semibold uppercase tracking-widest text-xs mb-6">Explore</h4>
          <ul className="space-y-4">
            <li><Link href="/products" className="text-gray-400 hover:text-white text-sm transition-colors">All Products</Link></li>
            <li><Link href="/events" className="text-gray-400 hover:text-white text-sm transition-colors">Tournaments</Link></li>
            <li><Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">Our Story</Link></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="text-white font-semibold uppercase tracking-widest text-xs mb-6">Customer Support</h4>
          <ul className="space-y-4">
            <li><Link href="/faq" className="text-gray-400 hover:text-white text-sm transition-colors">FAQs</Link></li>
            <li><Link href="/shipping" className="text-gray-400 hover:text-white text-sm transition-colors">Shipping Policy</Link></li>
            <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold uppercase tracking-widest text-xs mb-6">Join the Community</h4>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email your address" 
              className="bg-white/5 border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-brand-blue flex-grow"
            />
            <button className="bg-brand-blue px-6 py-2 text-xs font-bold uppercase transition-transform hover:scale-105">Join</button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-8 flex flex-col md:row items-center justify-between gap-4">
        <p className="text-gray-600 text-[10px] uppercase tracking-widest">
          © 2024 THEESMA SPORTS ENTERPRISE. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6">
          <Link href="#" className="text-gray-600 hover:text-white text-[10px] uppercase tracking-widest">Instagram</Link>
          <Link href="#" className="text-gray-600 hover:text-white text-[10px] uppercase tracking-widest">X (Twitter)</Link>
          <Link href="#" className="text-gray-600 hover:text-white text-[10px] uppercase tracking-widest">YouTube</Link>
        </div>
      </div>
    </footer>
  );
}
