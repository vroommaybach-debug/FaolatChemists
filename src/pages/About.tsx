import React from 'react';
import { motion } from 'motion/react';
import { GlobalHeader } from '../components/GlobalHeader';
import { ShieldCheck, History, Users, Globe2, Building2 } from 'lucide-react';
import heroImage from '../assets/images/hero_lab_1782464564992.jpg'; // Reusing for now

export function About() {
  return (
    <div className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-brand-teal/30">
      <GlobalHeader />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-brand-navy">
          <div className="absolute inset-0 z-0">
            <img src={heroImage} alt="Faolat Chemist Facilities" className="w-full h-full object-cover mix-blend-overlay opacity-40 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-transparent" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-display text-white mb-6"
            >
              Rooted in Lagos.<br />
              <span className="text-brand-teal">Built for West Africa.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-slate-300 font-light max-w-2xl mx-auto"
            >
              For decades, Faolat Chemist has bridged the gap between rigorous pharmaceutical manufacturing and accessible community healthcare.
            </motion.p>
          </div>
        </section>

        {/* The Dual Identity */}
        <section className="py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-brand-teal font-mono text-sm tracking-widest uppercase mb-4 block">Our Unique Position</span>
                <h2 className="text-4xl font-display text-brand-navy mb-6">Makers and Providers.</h2>
                <div className="space-y-6 text-slate-600 font-light leading-relaxed">
                  <p>
                    Most pharmacies only sell what others make. Most manufacturers never see the patients who rely on their drugs. At Faolat Chemist, we do both.
                  </p>
                  <p>
                    This dual identity allows us to control the quality of our formulations from the raw active ingredients all the way to the moment the medication is placed in your hands. 
                  </p>
                  <p>
                    We operate licensed, NAFDAC-approved manufacturing facilities in Lagos, producing a trusted line of essential medicines, while our retail and wholesale distribution networks ensure these life-saving products reach clinics, pharmacies, and patients efficiently.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-light p-8 rounded border border-slate-200 aspect-square flex flex-col items-center justify-center text-center">
                  <Building2 className="w-10 h-10 text-brand-teal mb-4" />
                  <h3 className="text-2xl font-display text-brand-navy mb-2">3+</h3>
                  <p className="text-xs font-mono uppercase tracking-widest text-slate-500">Facilities</p>
                </div>
                <div className="bg-brand-navy p-8 rounded border border-brand-navy aspect-square flex flex-col items-center justify-center text-center text-white mt-8">
                  <ShieldCheck className="w-10 h-10 text-brand-gold mb-4" />
                  <h3 className="text-2xl font-display mb-2">100%</h3>
                  <p className="text-xs font-mono uppercase tracking-widest text-slate-400">NAFDAC Certified</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-brand-light">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display text-brand-navy mb-4">What Drives Us</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: ShieldCheck, title: 'Uncompromising Safety', desc: 'Every batch of medication undergoes stringent quality control testing before it leaves our facility.' },
                { icon: Users, title: 'Community First', desc: 'We formulate and price our medications to meet the specific health challenges of our local communities.' },
                { icon: Globe2, title: 'Regional Impact', desc: 'Our wholesale distribution network supplies trusted clinics and pharmacies across Nigeria and West Africa.' }
              ].map((v, i) => (
                <div key={i} className="p-8 bg-white rounded border border-slate-200 hover:border-brand-teal transition-colors">
                  <v.icon className="w-8 h-8 text-brand-teal mb-6" />
                  <h3 className="text-xl font-display text-brand-navy mb-3">{v.title}</h3>
                  <p className="text-slate-500 font-light leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Teaser */}
        <section className="py-24 bg-white text-center border-t border-slate-200">
           <div className="max-w-2xl mx-auto px-6">
             <h2 className="text-3xl font-display text-brand-navy mb-6">See How We Make Medicine</h2>
             <p className="text-slate-500 font-light mb-8">Take a look inside our manufacturing process and quality assurance protocols.</p>
             <a href="/manufacturing" className="inline-flex px-8 py-4 bg-brand-navy text-white rounded font-medium hover:bg-brand-teal transition-colors">
               Explore Manufacturing
             </a>
           </div>
        </section>
      </main>
    </div>
  );
}
