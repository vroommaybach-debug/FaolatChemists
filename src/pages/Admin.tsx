import React, { useState } from 'react';
import { GlobalHeader } from '../components/GlobalHeader';
import { Users, ShoppingBag, TrendingUp, AlertCircle, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Admin() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-brand-teal/30">
      <GlobalHeader />
      
      <div className="flex pt-20 min-h-screen">
        {/* Admin Sidebar */}
        <div className="w-64 bg-brand-navy text-slate-300 flex-shrink-0 border-r border-slate-800">
          <div className="p-6 border-b border-slate-800/50">
            <h2 className="text-white font-display text-xl">Admin Portal</h2>
            <p className="text-xs font-mono text-brand-teal mt-1">Super Admin</p>
          </div>
          <nav className="p-4 space-y-1">
            {['Overview', 'Orders', 'Products', 'Prescriptions', 'Users'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`w-full text-left px-4 py-3 rounded text-sm font-medium transition-colors ${activeTab === tab.toLowerCase() ? 'bg-brand-teal/10 text-brand-teal' : 'hover:bg-white/5 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
            <Link to="/" className="w-full text-left px-4 py-3 rounded text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white block mt-8">
              &larr; Back to Site
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 md:p-12">
          <div className="mb-8 flex items-center justify-between">
             <h1 className="text-3xl font-display text-brand-navy capitalize">{activeTab}</h1>
             <button className="px-4 py-2 bg-brand-navy text-white rounded text-sm font-medium hover:bg-brand-teal transition-colors">
               Generate Report
             </button>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { title: 'Total Revenue (MTD)', value: '₦4,250,000', icon: TrendingUp },
                  { title: 'Active Orders', value: '34', icon: ShoppingBag },
                  { title: 'Pending Prescriptions', value: '12', icon: AlertCircle, alert: true },
                  { title: 'Low Stock Alerts', value: '8', icon: Package }
                ].map((kpi, i) => (
                  <div key={i} className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-2 rounded ${kpi.alert ? 'bg-brand-red/10 text-brand-red' : 'bg-brand-teal/10 text-brand-teal'}`}>
                        <kpi.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-display text-brand-navy mb-1">{kpi.value}</h3>
                    <p className="text-sm font-light text-slate-500 uppercase tracking-wider">{kpi.title}</p>
                  </div>
                ))}
              </div>

              {/* Placeholder table for recent orders */}
              <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-medium text-brand-navy">Recent Orders</h3>
                  <button className="text-sm text-brand-teal hover:underline font-medium">View All</button>
                </div>
                <div className="p-6 text-center py-12 text-slate-500 font-light">
                  Supabase database connection required to fetch live orders.
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && (
            <div className="bg-white rounded border border-slate-200 shadow-sm p-12 text-center text-slate-500 font-light">
               <div className="w-16 h-16 rounded-full bg-slate-50 mx-auto mb-4 flex items-center justify-center">
                 <AlertCircle className="w-8 h-8 text-slate-300" />
               </div>
               <p className="text-lg">Connect to Supabase to enable the {activeTab} management module.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
