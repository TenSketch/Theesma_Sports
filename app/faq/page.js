'use client';

import { ChevronRight, HelpCircle, ShieldCheck, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  const faqs = [
    { q: "What is your Shipping Policy?", a: "Standard delivery within 3-5 business days. Express shipping available elite members." },
    { q: "Do you offer international shipping?", a: "Yes, Theesma Sports ships to over 50 countries globally with localized logistics." },
    { q: "How can I track my order?", a: "You can track your acquisition via the Admin Pipeline or the link sent to your sync email." },
    { q: "What is the return policy for Pro-Grade gear?", a: "30-day exchange for manufacturing defects. Wear and tear from high-intensity play is not covered." }
  ];

  return (
    <div className="bg-brand-black min-h-screen pt-32 pb-24 px-6 text-white font-inter">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight font-outfit mb-12">
          Knowledge <span className="text-brand-blue">Base</span>.
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="glass p-8 rounded-2xl group hover:border-brand-blue/30 transition-all">
              <div className="flex items-center gap-4 mb-4">
                 <HelpCircle className="text-brand-blue" size={20} />
                 <h3 className="text-lg font-bold font-outfit">{faq.q}</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed pl-9">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 glass rounded-3xl border border-brand-blue/10 flex flex-col md:row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                 <Mail size={32} />
              </div>
              <div>
                 <h4 className="text-xl font-bold font-outfit">Need deeper sync?</h4>
                 <p className="text-gray-500 text-sm">Direct human assistance available 24/7.</p>
              </div>
           </div>
           <Link href="/contact" className="btn-premium">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
