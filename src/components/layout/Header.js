'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Menu, X, ArrowRight, Loader2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide header on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }
  const { cartItems, toggleCart } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchInputRef = useRef(null);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Scroll-aware navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus search input when overlay opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Debounced search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/products/search?q=${searchQuery}`);
        const data = await res.json();
        if (data.success) {
          setResults(data.data);
        }
      } catch (e) {
        console.error("Search sync failure", e);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${searchQuery}`);
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { href: '/play', label: 'Play' },
    { href: '/events', label: 'Compete' },
    { href: '/products', label: 'Experience' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
          }`}
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/img/Theesmasports-logo-horizontal-1.png"
            alt="Theesma Sports"
            width={420}
            height={120}
            className="w-[clamp(180px,20vw,420px)] h-auto object-contain object-left"
            priority
          />
        </Link>

        {/* Navigation — Desktop */}
        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 hover:text-white transition-all relative group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-blue group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-white/40 hover:text-white transition-colors"
            aria-label="Open search"
          >
            <Search size={16} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white/40 hover:text-white transition-colors"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-black/98 backdrop-blur-2xl transition-all duration-500 flex flex-col items-center justify-center gap-10 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="text-4xl font-black uppercase tracking-tighter text-white/60 hover:text-white transition-all"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Search Overlay */}
      <div className={`fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl transition-all duration-500 ${isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <button
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
        >
          <X size={32} />
        </button>

        <div className="max-w-4xl mx-auto pt-32 px-6">
          <form onSubmit={handleSearchSubmit} className="relative mb-12">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search the arsenal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b-2 border-white/10 py-6 text-2xl md:text-5xl font-black text-white focus:outline-none focus:border-brand-blue transition-colors placeholder:text-white/5"
            />
            {isLoading && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <Loader2 size={32} className="text-brand-blue animate-spin" />
              </div>
            )}
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {results.length > 0 ? (
              results.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product.slug}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="flex items-center gap-6 p-4 hover:bg-white/5 transition-colors group"
                >
                  <div className="w-20 h-20 bg-white/5 overflow-hidden relative">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-cover grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-tight">{product.name}</h4>
                    <p className="text-[10px] text-brand-blue font-black uppercase tracking-widest mt-1">{product.category}</p>
                  </div>
                  <ArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" size={18} />
                </Link>
              ))
            ) : searchQuery.length > 2 && !isLoading ? (
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs italic">No matching gear signals found.</p>
            ) : null}
          </div>

          {!searchQuery && (
            <div className="mt-12">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-6">Popular Intel</p>
              <div className="flex flex-wrap gap-4">
                {['Cricket Bat', 'Pro Jersey', 'Running', 'Vanquish'].map(term => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-6 py-2 bg-white/5 border border-white/10 text-xs font-bold text-white/70 hover:text-white hover:border-brand-blue transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
