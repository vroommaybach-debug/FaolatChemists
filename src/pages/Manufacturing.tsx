import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { GlobalHeader } from '../components/GlobalHeader';
import { Microscope, Activity, Droplet, TestTube, CheckCircle2, Factory, ShieldCheck, Zap } from 'lucide-react';
import { TiltCard } from '../components/TiltCard';
import heroImage from '../assets/images/hero_lab_1782464564992.jpg';

export function Manufacturing() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-brand-teal/30">
      <GlobalHeader />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-brand-navy perspective-1000">
          <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
             <motion.img 
               initial={{ scale: 1.1 }}
               animate={{ scale: 1 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               src={heroImage} alt="Laboratory" className="w-full h-full object-cover mix-blend-overlay opacity-30" />
             <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-transparent to-brand-navy" />
          </motion.div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
             <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 py-1 px-3 rounded border border-brand-gold/30 bg-brand-gold/10 text-xs font-mono tracking-widest uppercase text-brand-gold mb-6">
                <Factory className="w-4 h-4" /> Production Facilities
             </motion.span>
             <motion.h1 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
               className="text-5xl md:text-6xl font-display text-white mb-6"
             >
               Precision Manufacturing.
             </motion.h1>
             <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-xl text-slate-400 font-light max-w-2xl mx-auto">
               Explore our NAFDAC-approved facilities where active ingredients become life-saving treatments.
             </motion.p>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-24 bg-white relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 hidden md:block" />
          <div className="max-w-5xl mx-auto px-6">
             <div className="space-y-24">
               
               {/* Step 1 */}
               <div className="flex flex-col md:flex-row gap-12 items-center relative">
                 <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="md:w-1/2 relative z-10 bg-white pr-8">
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
                 </motion.div>
                 <div className="md:w-1/2 w-full">
                   <TiltCard>
                     <div className="aspect-[4/3] bg-brand-light rounded border border-slate-200 flex flex-col items-center justify-center text-slate-400 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-brand-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Activity className="w-12 h-12 mb-4 text-brand-teal opacity-50" />
                        <span className="font-mono text-sm uppercase tracking-widest">Formulation Lab</span>
                     </div>
                   </TiltCard>
                 </div>
               </div>

               {/* Step 2 */}
               <div className="flex flex-col md:flex-row-reverse gap-12 items-center relative">
                 <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="md:w-1/2 relative z-10 bg-white pl-8">
                   <div className="w-16 h-16 rounded bg-brand-navy text-white flex items-center justify-center mb-6">
                     <Microscope className="w-8 h-8" />
                   </div>
                   <h2 className="text-3xl font-display text-brand-navy mb-4">2. Quality Control & Testing</h2>
                   <p className="text-slate-600 font-light leading-relaxed mb-4">
                     Before mass production, every formulation undergoes rigorous testing in our analytical labs using HPLC and spectrometry to verify identity, purity, and potency against international pharmacopoeia standards.
                   </p>
                 </motion.div>
                 <div className="md:w-1/2 w-full">
                   <TiltCard>
                     <div className="aspect-[4/3] bg-slate-900 rounded border border-slate-800 flex flex-col items-center justify-center text-slate-500 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <ShieldCheck className="w-12 h-12 mb-4 text-brand-gold opacity-50" />
                        <span className="font-mono text-sm uppercase tracking-widest text-slate-400">Microscope / QC</span>
                     </div>
                   </TiltCard>
                 </div>
               </div>

               {/* Step 3 */}
               <div className="flex flex-col md:flex-row gap-12 items-center relative">
                 <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="md:w-1/2 relative z-10 bg-white pr-8">
                   <div className="w-16 h-16 rounded bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-6">
                     <Factory className="w-8 h-8" />
                   </div>
                   <h2 className="text-3xl font-display text-brand-navy mb-4">3. Scaling & Production</h2>
                   <p className="text-slate-600 font-light leading-relaxed mb-4">
                     Our cleanroom environments utilize automated tableting, liquid filling, and blister packaging lines. Environmental controls ensure zero cross-contamination.
                   </p>
                 </motion.div>
                 <div className="md:w-1/2 w-full">
                   <TiltCard>
                     <div className="aspect-[4/3] bg-brand-light rounded border border-slate-200 flex flex-col items-center justify-center text-slate-400 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-brand-navy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Zap className="w-12 h-12 mb-4 text-slate-300 opacity-50" />
                        <span className="font-mono text-sm uppercase tracking-widest">Production Line</span>
                     </div>
                   </TiltCard>
                 </div>
               </div>

             </div>
          </div>
        </section>

        {/* Contract CTA */}
        <section className="py-24 bg-brand-navy text-center" id="contract">
           <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto px-6">
             <h2 className="text-3xl font-display text-brand-gold mb-6">Contract Manufacturing</h2>
             <p className="text-slate-300 font-light mb-8 text-lg">
               Looking for a reliable manufacturing partner in Nigeria? Faolat offers contract manufacturing services for oral solids, liquids, and topical preparations.
             </p>
             <button className="px-8 py-4 bg-brand-teal text-white rounded font-medium hover:bg-teal-600 transition-colors relative overflow-hidden group">
               <span className="relative z-10">Contact Our B2B Team</span>
               <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-500 ease-out" />
             </button>
           </motion.div>
        </section>
      </main>
    </div>
  );
}
