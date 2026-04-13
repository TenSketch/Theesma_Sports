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
  ArrowUpDown
} from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
      <div className="bg-white/5 border border-white/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
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
                    <div className="w-12 h-12 bg-white/5 border border-white/10 p-1 flex-shrink-0">
                       <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-opacity" />
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
                    <button className="p-2 bg-white/5 text-gray-500 hover:text-white transition-colors border border-transparent hover:border-white/10 rounded">
                      <Edit size={14} />
                    </button>
                    <button className="p-2 bg-white/5 text-gray-500 hover:text-brand-orange transition-colors border border-transparent hover:border-white/10 rounded">
                       <Trash2 size={14} />
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
    </div>
  );
}
