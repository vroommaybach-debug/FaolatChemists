import React from 'react';
import { motion } from 'motion/react';
import { GlobalHeader } from '../components/GlobalHeader';
import { Microscope, Activity, Droplet, TestTube, CheckCircle2, Factory } from 'lucide-react';
import heroImage from '../assets/images/hero_lab_1782464564992.jpg';

export function Manufacturing() {
  return (
    <div className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-brand-teal/30">
      <GlobalHeader />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-brand-navy">
          <div className="absolute inset-0 z-0">
             <img src={heroImage} alt="Laboratory" className="w-full h-full object-cover mix-blend-overlay opacity-30" />
             <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-transparent to-brand-navy" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
             <span className="inline-flex items-center gap-2 py-1 px-3 rounded border border-brand-gold/30 bg-brand-gold/10 text-xs font-mono tracking-widest uppercase text-brand-gold mb-6">
                <Factory className="w-4 h-4" /> Production Facilities
             </span>
             <motion.h1 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
               className="text-5xl md:text-6xl font-display text-white mb-6"
             >
               Precision Manufacturing.
             </motion.h1>
             <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">
               Explore our NAFDAC-approved facilities where active ingredients become life-saving treatments.
             </p>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
             <div className="space-y-24">
               
               {/* Step 1 */}
               <div className="flex flex-col md:flex-row gap-12 items-center">
                 <div className="md:w-1/2">
                   <div className="w-16 h-16 rounded bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-6">
                     <TestTube className="w-8 h-8" />
                   </div>
                   <h2 className="text-3xl font-display text-brand-navy mb-4">1. Sourcing & Formulation</h2>
                   <p className="text-slate-600 font-light leading-relaxed mb-4">
                     We begin by sourcing premium Active Pharmaceutical Ingredients (APIs) from globally audited suppliers. Our R&D chemists develop stable, highly bioavailable formulations tailored for efficacy in our regional climate.
                   </p>
                   <ul className="space-y-2 font-mono text-xs text-slate-500 uppercase tracking-widest">
                     <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-teal" /> GMP Certified Suppliers</li>
                     <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-teal" /> Climate-Stable Formulation</li>
                   </ul>
                 </div>
                 <div className="md:w-1/2 aspect-[4/3] bg-brand-light rounded border border-slate-200 flex items-center justify-center text-slate-300">
                    [Formulation Lab Visual]
                 </div>
               </div>

               {/* Step 2 */}
               <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                 <div className="md:w-1/2">
                   <div className="w-16 h-16 rounded bg-brand-navy text-white flex items-center justify-center mb-6">
                     <Microscope className="w-8 h-8" />
                   </div>
                   <h2 className="text-3xl font-display text-brand-navy mb-4">2. Quality Control & Testing</h2>
                   <p className="text-slate-600 font-light leading-relaxed mb-4">
                     Before mass production, every formulation undergoes rigorous testing in our analytical labs using HPLC and spectrometry to verify identity, purity, and potency against international pharmacopoeia standards.
                   </p>
                 </div>
                 <div className="md:w-1/2 aspect-[4/3] bg-slate-900 rounded border border-slate-800 flex items-center justify-center text-slate-700">
                    [Microscope/QC Visual]
                 </div>
               </div>

               {/* Step 3 */}
               <div className="flex flex-col md:flex-row gap-12 items-center">
                 <div className="md:w-1/2">
                   <div className="w-16 h-16 rounded bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-6">
                     <Activity className="w-8 h-8" />
                   </div>
                   <h2 className="text-3xl font-display text-brand-navy mb-4">3. Scaling & Production</h2>
                   <p className="text-slate-600 font-light leading-relaxed mb-4">
                     Our cleanroom environments utilize automated tableting, liquid filling, and blister packaging lines. Environmental controls ensure zero cross-contamination.
                   </p>
                 </div>
                 <div className="md:w-1/2 aspect-[4/3] bg-brand-light rounded border border-slate-200 flex items-center justify-center text-slate-300">
                    [Production Line Visual]
                 </div>
               </div>

             </div>
          </div>
        </section>

        {/* Contract CTA */}
        <section className="py-24 bg-brand-navy text-center" id="contract">
           <div className="max-w-3xl mx-auto px-6">
             <h2 className="text-3xl font-display text-brand-gold mb-6">Contract Manufacturing</h2>
             <p className="text-slate-300 font-light mb-8 text-lg">
               Looking for a reliable manufacturing partner in Nigeria? Faolat offers contract manufacturing services for oral solids, liquids, and topical preparations.
             </p>
             <button className="px-8 py-4 bg-brand-teal text-white rounded font-medium hover:bg-teal-600 transition-colors">
               Contact Our B2B Team
             </button>
           </div>
        </section>
      </main>
    </div>
  );
}
