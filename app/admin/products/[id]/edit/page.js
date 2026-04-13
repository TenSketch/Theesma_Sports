'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  Eye, 
  EyeOff,
  AlertCircle,
  Loader2,
  Trash2
} from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Cricket',
    price: '',
    stock: '',
    description: '',
    show_price_on_listing: false,
    images: []
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        
        if (data.success) {
          setFormData({
            ...data.data,
            price: data.data.price?.toString() || '',
            stock: data.data.stock?.toString() || ''
          });
        } else {
          setError('Failed to locate asset: ' + data.error);
        }
      } catch (err) {
        setError('Systems unavailable for retrieval.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
           ...formData,
           price: Number(formData.price),
           stock: Number(formData.stock)
        }),
      });

      const data = await res.json();
      if (data.success) {
        router.push('/admin/products');
        router.refresh();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Logic failure during synchronization.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
     return (
       <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
          <Loader2 className="text-brand-blue animate-spin" size={32} />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Decrypting Asset Intel...</p>
       </div>
     );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/admin/products" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
          <ArrowLeft size={14} /> Back to Arsenal
        </Link>
        <div className="text-right">
           <h1 className="text-2xl font-black uppercase tracking-tighter text-white">Modify Asset</h1>
           <p className="text-[9px] text-brand-blue font-bold uppercase tracking-widest mt-1 italic">ORC ID: {id}</p>
        </div>
      </div>

      {error && (
        <div className="bg-brand-orange/10 border border-brand-orange/20 p-4 flex gap-3 items-center text-brand-orange text-xs font-bold uppercase tracking-widest">
           <AlertCircle size={18} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Core Data */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 p-8 space-y-6 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 blur-3xl pointer-events-none" />
             
             <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Asset Identity (Name)</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Carbon Fiber Pro Racket"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-brand-blue transition-all"
                />
             </div>

             <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 flex items-center justify-between">
                   <span>System Slug (Danger Zone)</span>
                   {formData.slug !== formData.name.toLowerCase().replace(/ /g, '-') && (
                     <span className="text-brand-orange text-[8px] animate-pulse">Manual Override Active</span>
                   )}
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="racket-carbon-pro"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                  className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white font-mono focus:outline-none focus:border-brand-orange/50"
                />
             </div>

             <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Technical Brief (Description)</label>
                <textarea 
                  rows={6}
                  required
                  placeholder="Technical details and performance benefits..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-brand-blue transition-all"
                />
             </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 grid grid-cols-2 gap-6 relative overflow-hidden">
             <div className="absolute bottom-0 right-0 w-24 h-24 bg-brand-orange/5 blur-3xl pointer-events-none" />
             <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Acquisition Value (INR)</label>
                <input 
                  type="number" 
                  required
                  placeholder="4999"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-brand-blue"
                />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Ordnance Stock</label>
                <input 
                  type="number" 
                  required
                  placeholder="100"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-brand-blue"
                />
             </div>
          </div>
        </div>

        {/* Right Column: Meta & Actions */}
        <div className="space-y-6">
           <div className="bg-white/5 border border-white/10 p-8 space-y-6 relative overflow-hidden">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Sector Classification</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-black border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-brand-blue cursor-pointer"
                >
                  <option>Cricket</option>
                  <option>Football</option>
                  <option>Badminton</option>
                  <option>Gym</option>
                  <option>Running</option>
                  <option>Training</option>
                </select>
              </div>

              <div className="pt-4 border-t border-white/5">
                 <div className="flex items-center justify-between">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black uppercase text-white">Curiosity Cloak</p>
                       <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Hide price in public shop</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, show_price_on_listing: !formData.show_price_on_listing})}
                      className={`p-2 transition-all ${formData.show_price_on_listing ? 'bg-brand-blue text-white' : 'bg-white/5 text-gray-600'}`}
                    >
                      {formData.show_price_on_listing ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                 </div>
              </div>
           </div>

           <div className="bg-white/5 border border-white/10 p-8 space-y-4">
              <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">Asset Visualization</p>
              {formData.images[0] ? (
                 <div className="aspect-square bg-black border border-white/10 overflow-hidden relative group">
                    <img src={formData.images[0]} alt="Preview" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <p className="text-[8px] font-black text-white uppercase tracking-[0.4em]">Update Signal</p>
                    </div>
                 </div>
              ) : (
                <div className="aspect-square bg-black border border-dashed border-white/20 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-brand-blue/40 transition-all">
                   <ImageIcon size={24} className="text-gray-700 group-hover:text-brand-blue" />
                   <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Awaiting Uplink</span>
                </div>
              )}
           </div>

           <button 
              type="submit"
              disabled={saving}
              className="w-full bg-white text-black py-6 text-xs font-black uppercase tracking-[0.3em] hover:bg-brand-blue hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.05)] transition-all"
           >
              {saving ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} /> 
              )}
              {saving ? 'Synchronizing...' : 'Save Configuration'}
           </button>
        </div>
      </form>
    </div>
  );
}
