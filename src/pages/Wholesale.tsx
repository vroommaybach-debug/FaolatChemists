import React from 'react';
import { GlobalHeader } from '../components/GlobalHeader';
import { Building2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Wholesale() {
  return (
    <div className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-brand-teal/30">
      <GlobalHeader />
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="w-16 h-16 rounded bg-brand-teal/10 text-brand-teal flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display text-brand-navy mb-6">B2B Wholesale Portal</h1>
          <p className="text-lg text-slate-600 font-light leading-relaxed">
            Partner with Faolat Chemist. We supply licensed pharmacies, hospitals, and clinics across West Africa with premium, NAFDAC-approved medications at wholesale rates.
          </p>
        </div>

        <div className="bg-white rounded border border-slate-200 p-8 md:p-12 shadow-sm max-w-2xl mx-auto">
          <h2 className="text-2xl font-display text-brand-navy mb-6 text-center">Apply for a Wholesale Account</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Facility Name</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-brand-navy focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none" placeholder="e.g. HealthPlus Pharmacy" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">PCN License Number</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-brand-navy focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none" placeholder="Enter license no." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-brand-navy focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none" placeholder="procurement@facility.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Message (Optional)</label>
              <textarea className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-brand-navy focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none h-32" placeholder="Tell us about your volume requirements..." />
            </div>
            <button type="button" className="w-full py-4 bg-brand-navy text-white rounded font-medium hover:bg-brand-teal transition-colors flex items-center justify-center gap-2">
              Submit Application <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
