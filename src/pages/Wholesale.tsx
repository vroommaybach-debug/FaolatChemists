import React from 'react';
import { GlobalHeader } from '../components/GlobalHeader';
import { Building2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { TiltCard } from '../components/TiltCard';

export function Wholesale() {
  return (
    <div className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-brand-teal/30">
      <GlobalHeader />
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 perspective-1000">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto text-center mb-16">
          <div className="w-16 h-16 rounded bg-brand-teal/10 text-brand-teal flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display text-brand-navy mb-6">B2B Wholesale Portal</h1>
          <p className="text-lg text-slate-600 font-light leading-relaxed">
            Partner with Faolat Chemist. We supply licensed pharmacies, hospitals, and clinics across West Africa with premium, NAFDAC-approved medications at wholesale rates.
          </p>
        </motion.div>

        <TiltCard>
          <div className="bg-white rounded border border-slate-200 p-8 md:p-12 shadow-sm max-w-2xl mx-auto relative overflow-hidden group">
            <div className="absolute inset-0 bg-brand-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <h2 className="text-2xl font-display text-brand-navy mb-6 text-center relative z-10">Apply for a Wholesale Account</h2>
            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Facility Name</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-brand-navy focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors" placeholder="e.g. HealthPlus Pharmacy" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">PCN License Number</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-brand-navy focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors" placeholder="Enter license no." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-brand-navy focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors" placeholder="procurement@facility.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message (Optional)</label>
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-brand-navy focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none h-32 transition-colors" placeholder="Tell us about your volume requirements..." />
              </div>
              <button type="button" className="w-full py-4 bg-brand-navy text-white rounded font-medium hover:bg-brand-teal transition-colors flex items-center justify-center gap-2 relative overflow-hidden group/btn">
                <span className="relative z-10 flex items-center gap-2">Submit Application <ArrowRight className="w-4 h-4" /></span>
                <div className="absolute inset-0 bg-brand-teal scale-x-0 group-hover/btn:scale-x-100 transform origin-left transition-transform duration-500 ease-out" />
              </button>
            </form>
          </div>
        </TiltCard>
      </main>
    </div>
  );
}
