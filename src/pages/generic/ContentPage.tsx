import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { GlobalHeader } from '../../components/GlobalHeader';
import contentHeroImage from '../../assets/images/content_hero_1782463929061.jpg';

export function ContentPage() {
  const location = useLocation();
  const path = location.pathname;
  
  // A simple title generator based on path
  const title = path.split('/').pop()?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Content';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500/30">
      <GlobalHeader />

      <main className="max-w-5xl mx-auto px-6 py-32">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors text-sm font-medium tracking-wide w-fit mb-12">
          <ArrowLeft className="w-4 h-4" /> Back Home
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8 prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:font-medium prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:font-light prose-p:leading-relaxed">
            <h1 className="text-4xl md:text-5xl tracking-tight mb-8">{title}</h1>
            
            <div className="w-full h-64 md:h-80 rounded-[2rem] overflow-hidden mb-12 shadow-lg border border-slate-200">
               <img src={contentHeroImage} alt={title} className="w-full h-full object-cover" />
            </div>

            <p className="text-xl text-slate-600 font-light leading-relaxed mb-8">
              This page provides general information and policies for FAOLAT Chemists. All our services are guided by local and international pharmacy standards to ensure the highest quality of care.
            </p>
            <h3 className="text-2xl font-display font-medium text-slate-900 mt-12 mb-6">Our Commitment to Health</h3>
            <p className="text-slate-600 font-light mb-6">
              We are dedicated to providing the highest quality healthcare products. Our medicines are sourced directly from manufacturers and authorized distributors, ensuring 100% authenticity and safety for our community.
            </p>
            <h3 className="text-2xl font-display font-medium text-slate-900 mt-12 mb-6">Contact Information</h3>
            <p className="text-slate-600 font-light">
              For immediate assistance, please contact our pharmacy desk. Our licensed pharmacists are available 24/7 to answer your health queries and provide professional advice.
            </p>
          </div>
          
          <div className="md:col-span-4 space-y-6">
             <div className="p-8 rounded-[2rem] bg-orange-50 border border-orange-100">
               <ShieldCheck className="w-10 h-10 text-orange-500 mb-6" />
               <h4 className="text-xl font-display font-medium text-slate-900 mb-3">Looking for Medicines?</h4>
               <p className="text-slate-600 font-light mb-8 text-sm">Explore our catalog of verified natural and pharmaceutical remedies.</p>
               <Link to="/catalog" className="w-full py-4 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                 Shop Catalog <ArrowRight className="w-4 h-4" />
               </Link>
             </div>
             <div className="p-8 rounded-[2rem] bg-white border border-slate-200 shadow-sm">
               <h4 className="text-lg font-medium text-slate-900 mb-3">Join FAOLAT</h4>
               <p className="text-slate-500 font-light mb-6 text-sm">Create an account for faster checkout and exclusive health insights.</p>
               <Link to="/auth/shopper-id" className="w-full py-3 rounded-full border border-slate-200 text-slate-900 font-medium hover:bg-slate-50 transition-colors flex items-center justify-center">
                 Create Account
               </Link>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
