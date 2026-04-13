'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard';
import { Search as SearchIcon, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      if (!query) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/products/search?q=${query}`);
        const data = await res.json();
        if (data.success) {
          setResults(data.data);
        }
      } catch (e) {
        console.error("Search fetch failed", e);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-brand-black pt-32 pb-24 px-6 text-white font-inter">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/5 pb-12">
           <div>
              <div className="flex items-center gap-3 text-brand-blue mb-4">
                 <SearchIcon size={20} />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em]">Search Results</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight font-outfit">
                 {query ? `"${query}"` : "Explore Arsenal"}.
              </h1>
           </div>
           
           <div className="flex items-center gap-4">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{results.length} Matches Found</span>
              <div className="h-px w-24 bg-white/10" />
           </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
             <Loader2 size={32} className="text-brand-blue animate-spin" />
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] animate-pulse">Syncing catalog data...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {results.map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-[40px] max-w-2xl mx-auto">
             <p className="text-sm font-bold text-gray-500 uppercase tracking-widest italic mb-8">No equipment signals detected for this query.</p>
             <Link href="/products" className="btn-premium">View Full Arsenal</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
       <div className="min-h-screen bg-brand-black flex items-center justify-center">
          <Loader2 size={32} className="text-brand-blue animate-spin" />
       </div>
    }>
       <SearchResults />
    </Suspense>
  );
}
