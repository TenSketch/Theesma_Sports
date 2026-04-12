import { ArrowRight, Zap, Target, Users2 } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-brand-black min-h-screen text-white font-inter overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-brand-orange font-bold text-[10px] uppercase tracking-[0.4em] mb-4">Our DNA</p>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-12">
            ATHLETES <br />
            <span className="text-white/20">FOR ATHLETES.</span>
          </h1>
          <div className="max-w-2xl">
            <p className="text-gray-400 text-lg leading-relaxed mb-10 font-medium">
              Theesma Sports was born in the sweat and pressure of real competition. We saw where current gear failed, and we decided to engineer the solutions ourselves.
            </p>
          </div>
        </div>
        
        {/* Background Decorative Text */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-5 pointer-events-none select-none">
           <h2 className="text-[20rem] font-black uppercase tracking-tighter text-white">THEESMA</h2>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <div className="w-12 h-[1px] bg-brand-blue mb-8" />
            <h3 className="text-3xl font-black uppercase tracking-tighter">Pure <br /> Performance.</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              We don't follow trends. We follow metrics. Every fiber and every angle of our equipment is measured against professional standards of durability and power.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-12 h-[1px] bg-brand-orange mb-8" />
            <h3 className="text-3xl font-black uppercase tracking-tighter">Zero <br /> Complacency.</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Winning is temporary. Excellence is a continuous pursuit. Our R&D team consists of retired pros who know exactly what it takes to stay at the top.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-12 h-[1px] bg-white/20 mb-8" />
            <h3 className="text-3xl font-black uppercase tracking-tighter">Global <br /> Community.</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              From Chennai to New York, Theesma is more than gear—it's a shared mindset of pushing human limits through disciplined engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Image / Stats Section */}
      <section className="relative py-32 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-square bg-gray-100 overflow-hidden group">
            <img 
               src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1000" 
               className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
               alt="Training"
            />
            <div className="absolute inset-0 border-[20px] border-white/80 pointer-events-none" />
          </div>
          
          <div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-10">
              PROVEN IN <br />
              <span className="text-brand-blue italic underline">COMBAT.</span>
            </h2>
            <div className="space-y-8 mb-12">
               <div className="flex gap-4 items-start">
                  <Zap className="text-brand-orange mt-1" size={20} />
                  <p className="text-sm font-bold uppercase tracking-widest">30% Increased explosive energy return</p>
               </div>
               <div className="flex gap-4 items-start">
                  <Target className="text-brand-orange mt-1" size={20} />
                  <p className="text-sm font-bold uppercase tracking-widest">15 Major tournament partnership wins</p>
               </div>
               <div className="flex gap-4 items-start">
                  <Users2 className="text-brand-orange mt-1" size={20} />
                  <p className="text-sm font-bold uppercase tracking-widest">10,000+ Professional athletes outfitted</p>
               </div>
            </div>
            <Link href="/products" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest border-b-2 border-black pb-2 hover:gap-6 transition-all">
               Join the legacy <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 flex flex-col items-center text-center">
         <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white/5 mb-[-2rem] md:mb-[-4rem]">THEESMA</h2>
         <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-12 relative z-10">READY FOR DISCIPLINE?</h3>
         <Link href="/auth" className="px-16 py-6 bg-brand-blue text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all shadow-2xl shadow-blue-900/40">
            Create Athlete Profile
         </Link>
      </section>

    </div>
  );
}
