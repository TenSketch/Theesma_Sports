'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Package,
  ArrowUpDown,
  Loader2
} from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (e) {
        console.error("Failed to fetch products for admin", e);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-white/20 uppercase tracking-widest text-xs animate-pulse">Scanning Inventory...</div>;



  const handleDelete = async (id) => {
    if (!window.confirm("CONFIRM DECOMMISSION: This will permanently remove this asset from the arsenal. Proceed?")) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (data.success) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert("Sector Failure: " + data.error);
      }
    } catch (e) {
      alert("System Sync Failure");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Product Arsenal</h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 italic">
            Management of elite performance gear
          </p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="bg-brand-blue px-6 py-3 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/20"
        >
          <Plus size={16} /> Deploy New Product
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search by name, category or series..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors"
          />
        </div>
        <button className="px-6 py-4 bg-white/5 border border-white/10 text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
          <Filter size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Filter</span>
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-white/5 border border-white/10 overflow-x-auto custom-scrollbar custom-scrollbar-horizontal">
        <table className="min-w-[900px] w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                Product Details
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                Category
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                Price
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                Stock
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                Visibility
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredProducts.map((product) => (
              <tr key={product.id || product._id} className="hover:bg-white/[0.01] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 p-1 flex-shrink-0 cursor-pointer" onClick={() => {
                      const imgs = Array.isArray(product.images) && product.images.length > 0 
                        ? product.images 
                        : [product.image || '/img/gear.png'];
                      setLightboxImages(imgs);
                      setLightboxIndex(0);
                      setLightboxOpen(true);
                    }}>
                       <img 
                        src={(Array.isArray(product.images) && product.images[0]) || product.image || '/img/gear.png'} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-opacity" 
                       />
                    </div>
                    <div>
                       <p className="text-xs font-black text-white uppercase tracking-tighter">{product.name}</p>
                       <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">SLUG: {product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-brand-blue/10 text-brand-blue text-[9px] font-black uppercase tracking-widest rounded leading-none">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-xs font-bold text-white">
                  ₹{product.price.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 5 ? 'bg-green-500' : 'bg-brand-orange'}`} />
                    <span className="text-xs font-bold text-gray-400">{product.stock} units</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                   {product.show_price_on_listing ? (
                     <div className="flex items-center gap-2 text-brand-blue">
                        <Eye size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Public Price</span>
                     </div>
                   ) : (
                     <div className="flex items-center gap-2 text-gray-600">
                        <EyeOff size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest italic">Curiosity Mode</span>
                     </div>
                   )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link 
                      href={`/admin/products/${product.id || product._id}/edit`}
                      className="p-2 bg-white/5 text-gray-500 hover:text-white transition-colors border border-transparent hover:border-white/10 rounded block"
                    >
                      <Edit size={14} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(product.id || product._id)}
                      disabled={deletingId === (product.id || product._id)}
                      className="p-2 bg-white/5 text-gray-500 hover:text-brand-orange transition-colors border border-transparent hover:border-white/10 rounded disabled:opacity-30"
                    >
                      {deletingId === (product.id || product._id) ? <Loader2 className="animate-spin" size={14} /> : <Trash2 size={14} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredProducts.length === 0 && (
          <div className="p-20 text-center">
            <Package className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-sm font-bold text-gray-600 uppercase tracking-widest italic">Inventory currently offline for this criteria</p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">
         <p>Showing {filteredProducts.length} entries of {products.length}</p>
         <div className="flex gap-4">
            <button className="hover:text-white transition-colors">Previous</button>
            <button className="hover:text-white transition-colors">Next</button>
         </div>
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 py-8">
          <div className="relative w-full max-w-4xl bg-black/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              ✕
            </button>
            <div className="relative h-[60vh] md:h-[70vh] bg-black">
              <img
                src={lightboxImages[lightboxIndex] || '/img/gear.png'}
                alt="Gallery image"
                className="h-full w-full object-contain p-4"
              />
              {lightboxImages.length > 1 && (
                <>
                  <button
                    onClick={() => setLightboxIndex((lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setLightboxIndex((lightboxIndex + 1) % lightboxImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
            {lightboxImages.length > 1 && (
              <div className="flex items-center justify-center gap-3 p-4 bg-white/5 overflow-x-auto custom-scrollbar">
                {lightboxImages.map((src, index) => (
                  <button
                    key={src + index}
                    onClick={() => setLightboxIndex(index)}
                    className={`h-16 w-16 md:h-20 md:w-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${index === lightboxIndex ? 'border-brand-blue scale-105' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                  >
                    <img src={src} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
