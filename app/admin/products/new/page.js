'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  Box, 
  Eye, 
  EyeOff,
  AlertCircle 
} from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Cricket',
    category_id: 'cricket',
    price: '',
    stock: '',
    description: '',
    show_price_on_listing: false,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff'],
    sizes: ['M', 'L'],
    variants: ['Carbon', 'Speed'],
  });
  const [autoSlug, setAutoSlug] = useState(true);

  const generateSlug = (baseName, sizes, variants) => {
    const slugBase = baseName?.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const extra = sizes?.[0] || variants?.[0] || '';
    const suffix = extra ? `-${extra.toLowerCase().replace(/\s+/g, '-')}` : '';
    return `${slugBase}${suffix}`.replace(/--+/g, '-').replace(/^-|-$/g, '');
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const newImages = files.map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages.map((file) => file.url)],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
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
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('System failure during deployment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/admin/products" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
          <ArrowLeft size={14} /> Back to Arsenal
        </Link>
        <h1 className="text-2xl font-black uppercase tracking-tighter text-white">Deploy New Asset</h1>
      </div>

      {error && (
        <div className="bg-brand-orange/10 border border-brand-orange/20 p-4 flex gap-3 items-center text-brand-orange text-xs font-bold uppercase tracking-widest">
           <AlertCircle size={18} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Core Data */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 p-8 space-y-6">
             <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Product Identity (Name)</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Carbon Fiber Pro Racket"
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      name,
                      slug: autoSlug ? generateSlug(name, prev.sizes, prev.variants) : prev.slug,
                    }));
                  }}
                  className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-brand-blue"
                />
             </div>

             <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">System Slug (Unique ID)</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="text" 
                    required
                    placeholder="racket-carbon-pro"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                    className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white font-mono focus:outline-none focus:border-brand-blue"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setAutoSlug(!autoSlug);
                      if (!autoSlug) {
                        setFormData((prev) => ({
                          ...prev,
                          slug: generateSlug(prev.name, prev.sizes, prev.variants),
                        }));
                      }
                    }}
                    className={`px-3 py-2 text-[10px] font-black uppercase tracking-widest rounded ${autoSlug ? 'bg-brand-blue text-black' : 'bg-white/5 text-gray-400'}`}
                  >
                    {autoSlug ? 'Auto' : 'Manual'}
                  </button>
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Description</label>
                <textarea 
                  rows={6}
                  required
                  placeholder="Technical details and performance benefits..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-brand-blue"
                />
             </div>

             <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                   <div className="flex items-center justify-between gap-3">
                     <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Sizes</label>
                     <button
                       type="button"
                       onClick={() => setFormData((prev) => ({ ...prev, sizes: [...prev.sizes, ''] }))}
                       className="text-[10px] uppercase font-black tracking-widest text-brand-blue"
                     >+ Add</button>
                   </div>
                   <div className="space-y-3">
                     {formData.sizes.map((size, index) => (
                       <div key={index} className="flex items-center gap-3">
                         <input
                           type="text"
                           value={size}
                           onChange={(e) => {
                             const nextSizes = [...formData.sizes];
                             nextSizes[index] = e.target.value;
                             setFormData((prev) => ({
                               ...prev,
                               sizes: nextSizes,
                               slug: autoSlug ? generateSlug(prev.name, nextSizes, prev.variants) : prev.slug,
                             }));
                           }}
                           className="flex-1 bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-brand-blue"
                         />
                         <button
                           type="button"
                           onClick={() => setFormData((prev) => ({
                             ...prev,
                             sizes: prev.sizes.filter((_, idx) => idx !== index),
                           }))}
                           className="text-[10px] font-black uppercase tracking-widest text-brand-orange"
                         >Remove</button>
                       </div>
                     ))}
                   </div>
                </div>
                <div className="space-y-2">
                   <div className="flex items-center justify-between gap-3">
                     <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Variants</label>
                     <button
                       type="button"
                       onClick={() => setFormData((prev) => ({ ...prev, variants: [...prev.variants, ''] }))}
                       className="text-[10px] uppercase font-black tracking-widest text-brand-blue"
                     >+ Add</button>
                   </div>
                   <div className="space-y-3">
                     {formData.variants.map((variant, index) => (
                       <div key={index} className="flex items-center gap-3">
                         <input
                           type="text"
                           value={variant}
                           onChange={(e) => {
                             const nextVariants = [...formData.variants];
                             nextVariants[index] = e.target.value;
                             setFormData((prev) => ({
                               ...prev,
                               variants: nextVariants,
                               slug: autoSlug ? generateSlug(prev.name, prev.sizes, nextVariants) : prev.slug,
                             }));
                           }}
                           className="flex-1 bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-brand-blue"
                         />
                         <button
                           type="button"
                           onClick={() => setFormData((prev) => ({
                             ...prev,
                             variants: prev.variants.filter((_, idx) => idx !== index),
                           }))}
                           className="text-[10px] font-black uppercase tracking-widest text-brand-orange"
                         >Remove</button>
                       </div>
                     ))}
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 grid grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Price (INR)</label>
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
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Stock Availability</label>
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
           <div className="bg-white/5 border border-white/10 p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value, category_id: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                  className="w-full bg-black border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-brand-blue"
                >
                  <option>Cricket</option>
                  <option>Football</option>
                  <option>Badminton</option>
                  <option>Gym</option>
                  <option>Running</option>
                </select>
              </div>

              <div className="pt-4 border-t border-white/5">
                 <div className="flex items-center justify-between">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black uppercase text-white">Curiosity Design</p>
                       <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Hide price on listing pages</p>
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
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">Product Graphics</p>
                <span className="text-[9px] uppercase tracking-[0.3em] text-gray-500">{formData.images.length} files</span>
              </div>
              <label className="block cursor-pointer rounded-3xl bg-white/5 border border-dashed border-white/20 p-8 text-center hover:border-brand-blue/40 transition-all">
                 <ImageIcon size={24} className="text-gray-700 mb-3" />
                 <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Upload multiple image assets</p>
                 <input
                   type="file"
                   multiple
                   accept="image/*"
                   onChange={handleFileUpload}
                   className="hidden"
                 />
              </label>
              <div className="grid grid-cols-3 gap-3">
                {formData.images.map((src, index) => (
                  <div key={src + index} className="h-20 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    <img src={src} alt={`Upload preview ${index + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
           </div>

           <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-6 text-xs font-black uppercase tracking-[0.3em] hover:bg-brand-blue hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
           >
              {loading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full" />
              ) : (
                <Save size={18} /> 
              )}
              {loading ? 'Initializing...' : 'Deploy Asset'}
           </button>
        </div>
      </form>
    </div>
  );
}
