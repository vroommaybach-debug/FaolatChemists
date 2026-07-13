import React from 'react';
import { Pill, Activity, Calendar as CalendarIcon, Clock, ChevronRight, CheckCircle2, Globe, Newspaper, ShoppingCart, MessageSquare, LogOut } from 'lucide-react';
import { PrescriptionUploadZone } from './PrescriptionUploadZone';
import { SmartSearch } from './SmartSearch';
import { useTherapySchedule } from '../hooks/useTherapySchedule';
import { motion, AnimatePresence } from 'motion/react';
import { useAuthStore } from '../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalHeader } from './GlobalHeader';
import { TiltCard } from './TiltCard';

export function Dashboard() {
  const therapySchedule = useTherapySchedule('alexander-o');
  const [isOrdering, setIsOrdering] = React.useState(false);
  const [orderComplete, setOrderComplete] = React.useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleQuickRefill = async () => {
    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      setOrderComplete(true);
      setTimeout(() => setOrderComplete(false), 3000);
    }, 1500);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-brand-teal/30">
      <GlobalHeader />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-12 perspective-1000">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-2 text-brand-navy">
              Welcome back, {user?.email ? user.email.split('@')[0] : 'User'}
            </h1>
            <p className="text-slate-500 text-lg">
              Manage your orders, prescriptions, and health records securely.
            </p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded hover:bg-slate-50 hover:text-red-500 transition-colors w-fit"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Actions / Schedule */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="bg-white border border-slate-200 rounded p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-medium text-brand-navy flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-brand-teal" />
                  Your Medication Schedule
                </h2>
              </div>

              <div className="space-y-4">
                {therapySchedule.map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.2 }}
                    key={i} 
                    className="flex items-center justify-between p-4 bg-brand-light rounded border border-slate-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded flex items-center justify-center ${item.status === 'taken' ? 'bg-brand-teal/10 text-brand-teal' : 'bg-white border border-slate-200 text-slate-400'}`}>
                        {item.status === 'taken' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="font-medium text-brand-navy">{item.drugName}</h3>
                        <p className="text-sm text-slate-500">{item.dosage} • {item.time}</p>
                      </div>
                    </div>
                    {item.status === 'pending' && (
                      <button className="px-4 py-2 text-sm font-medium bg-brand-navy text-white rounded hover:bg-slate-800 transition-colors">
                        Mark Taken
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Document Upload */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white border border-slate-200 rounded p-6 shadow-sm">
               <h2 className="text-xl font-display font-medium text-brand-navy mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-brand-teal" />
                  Upload Prescription
               </h2>
               <p className="text-slate-500 text-sm mb-6">Securely upload a photo or PDF of your doctor's prescription for pharmacist review.</p>
               <PrescriptionUploadZone />
            </motion.section>

            {/* Medical Records & Vault */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="bg-white border border-slate-200 rounded p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-medium text-brand-navy flex items-center gap-2">
                  Medical Records
                  <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-bold tracking-wider uppercase border border-green-200">
                    Secure
                  </span>
                </h2>
                <button className="text-sm text-brand-teal hover:text-teal-600 transition-colors font-medium">View History</button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Dr. Adeyemi Note', date: 'Oct 12, 2023', type: 'Prescription' },
                  { name: 'Blood Panel Results', date: 'Sep 04, 2023', type: 'Lab Report' }
                ].map((doc, idx) => (
                  <TiltCard key={idx}>
                    <div className="p-4 rounded border border-slate-200 bg-brand-light hover:border-brand-teal transition-colors cursor-pointer group flex justify-between items-center">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-1 font-mono">{doc.type}</p>
                        <h4 className="text-sm font-medium text-brand-navy">{doc.name}</h4>
                      </div>
                      <span className="text-xs font-mono text-slate-500 group-hover:text-brand-teal transition-colors">{doc.date}</span>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </motion.section>

          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            
            {/* Quick Refill Widget */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TiltCard>
                <div className="p-6 rounded border border-slate-200 bg-white shadow-sm h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-brand-navy flex items-center gap-2">
                      <Pill className="w-4 h-4 text-brand-teal" />
                      Quick Refill
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-2xl font-display font-medium text-brand-navy">Amlodipine 5mg</p>
                    <p className="text-sm text-slate-500">30 Day Supply • 2 Refills Remaining</p>
                  </div>

                  <button 
                    onClick={handleQuickRefill}
                    disabled={isOrdering}
                    className="w-full py-3 bg-brand-navy text-white rounded font-medium flex items-center justify-center transition-all hover:bg-brand-teal shadow-md shadow-brand-teal/20"
                  >
                    <AnimatePresence mode="wait">
                      {isOrdering ? (
                         <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : orderComplete ? (
                         <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Order Placed</motion.div>
                      ) : (
                         <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Refill for ₦1,500</motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </TiltCard>
            </motion.div>

            {/* Marketplace Setup */}
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 rounded border border-brand-teal/20 bg-brand-teal/5 relative overflow-hidden"
            >
               <h3 className="font-display font-medium text-brand-navy mb-2 flex items-center gap-2">
                 <ShoppingCart className="w-4 h-4 text-brand-teal" />
                 Shop Pharmacy
               </h3>
               <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                 Browse our full catalog of over-the-counter and prescription medicines.
               </p>
               <Link to="/catalog" className="w-full py-3.5 rounded border border-brand-teal/20 bg-white text-brand-teal font-medium text-sm transition-colors flex items-center justify-center gap-2 hover:border-brand-teal/50 hover:bg-brand-light">
                 Browse Catalog <ChevronRight className="w-4 h-4" />
               </Link>
            </motion.div>

            {/* Support */}
            <motion.div 
              className="p-6 rounded border border-slate-200 bg-white shadow-sm"
            >
               <h3 className="font-medium text-brand-navy mb-2 flex items-center gap-2">
                 <MessageSquare className="w-4 h-4 text-slate-400" />
                 Need Help?
               </h3>
               <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                 Speak with a pharmacist about your medications or orders.
               </p>
               <button className="text-sm font-medium text-brand-teal hover:text-teal-600 transition-colors">
                 Contact Support &rarr;
               </button>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
}
