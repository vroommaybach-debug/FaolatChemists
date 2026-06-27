import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronDown, ShoppingBag, Search, Pill, Stethoscope, Microscope, Building2, FlaskConical, CheckCircle2, Truck } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';

const menuItems = [
  {
    title: 'Products',
    icon: Pill,
    links: [
      { name: 'Pharmacy Catalog', href: '/catalog' },
      { name: 'Antibiotics', href: '/catalog?category=antibiotics' },
      { name: 'Antimalarials', href: '/catalog?category=antimalarials' },
      { name: 'Vitamins & Supplements', href: '/catalog?category=vitamins' },
    ],
    featured: { name: 'Faolat Formulations', desc: 'Browse our exclusively manufactured lines.', href: '/catalog?manufacturer=faolat' }
  },
  {
    title: 'Manufacturing',
    icon: FlaskConical,
    links: [
      { name: 'Our Process', href: '/manufacturing' },
      { name: 'Quality Assurance', href: '/manufacturing#qa' },
      { name: 'Contract Manufacturing', href: '/manufacturing#contract' },
      { name: 'Regulatory Compliance', href: '/manufacturing#compliance' },
    ],
    featured: { name: 'State-of-the-Art Labs', desc: 'See how we produce our medicine.', href: '/manufacturing' }
  },
  {
    title: 'Company',
    icon: Building2,
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Leadership', href: '/about#team' },
      { name: 'Research & Insights', href: '/blog' },
      { name: 'Contact Us', href: '/contact' },
    ],
    featured: { name: 'Our Lagos Roots', desc: 'Learn about our journey serving West Africa.', href: '/about' }
  },
  {
    title: 'Providers',
    icon: Stethoscope,
    links: [
      { name: 'B2B Wholesale Portal', href: '/wholesale' },
      { name: 'Symptom Checker', href: '/health-library/symptom-checker' },
    ],
    featured: { name: 'Partner with Us', href: '/wholesale', desc: 'Special pricing for pharmacies and clinics.' }
  }
];

export function GlobalHeader() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { items, openCart } = useCartStore();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="fixed top-0 w-full z-50 transition-all font-sans">
      {/* Subtle Top Utility Nav */}
      <div className="bg-brand-navy text-slate-300 py-1.5 px-6 text-[10px] sm:text-xs font-mono tracking-widest uppercase hidden md:flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-brand-teal" /> NAFDAC Certified</span>
          <span className="flex items-center gap-2"><Truck className="w-3 h-3 text-brand-teal" /> Nationwide Delivery</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/catalog" className="hover:text-white transition-colors">Catalog</Link>
          <Link to="/manufacturing" className="hover:text-white transition-colors">Manufacturing</Link>
          <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
          <Link to="/health-library/symptom-checker" className="hover:text-white transition-colors">Symptom Checker</Link>
          <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
        </div>
      </div>

      <div className="w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 group z-50 relative">
            <div className="w-8 h-8 rounded bg-brand-teal flex items-center justify-center group-hover:scale-105 transition-transform duration-500 shadow-sm">
              <span className="text-white font-bold font-display text-sm tracking-tighter">FC</span>
            </div>
            <span className="font-display tracking-tight text-xl text-brand-navy">Faolat Chemist</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 h-full" onMouseLeave={() => setActiveMenu(null)}>
            {menuItems.map((item) => (
              <div 
                key={item.title} 
                className="relative h-20 flex items-center px-4"
                onMouseEnter={() => setActiveMenu(item.title)}
              >
                <button className={`text-sm tracking-wide font-medium flex items-center gap-1.5 transition-colors ${activeMenu === item.title ? 'text-brand-teal' : 'text-slate-600 hover:text-brand-navy'}`}>
                  {item.title}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMenu === item.title ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {activeMenu === item.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-20 left-0 w-[500px] bg-white border border-slate-200 rounded shadow-xl overflow-hidden"
                    >
                      <div className="p-6 grid grid-cols-5 gap-6">
                        <div className="col-span-3 space-y-4">
                          <p className="text-xs uppercase tracking-widest text-slate-400 font-medium flex items-center gap-2 font-mono">
                            <item.icon className="w-3.5 h-3.5" />
                            {item.title}
                          </p>
                          <ul className="space-y-3">
                            {item.links.map(link => (
                              <li key={link.name}>
                                <Link to={link.href} className="text-sm text-slate-700 hover:text-brand-teal transition-colors block">
                                  {link.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-span-2 bg-brand-light p-5 rounded border border-slate-100 flex flex-col justify-between group">
                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-widest text-brand-teal mb-2 font-medium">Featured</p>
                            <h4 className="text-sm font-medium text-brand-navy mb-1 group-hover:text-brand-teal transition-colors">{item.featured.name}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-light">{item.featured.desc}</p>
                          </div>
                          <Link to={item.featured.href} className="text-xs font-medium text-brand-teal uppercase tracking-wider mt-4 hover:underline">
                            Explore &rarr;
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4 relative z-50">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors text-slate-600 hover:text-brand-navy">
            <Search className="w-4 h-4" />
          </button>
          
          {isAuthenticated ? (
            <>
              <button onClick={openCart} className="text-xs text-brand-navy font-medium tracking-wide flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 rounded hover:bg-slate-50 transition-colors">
                <ShoppingBag className="w-4 h-4" /> Cart ({cartItemCount})
              </button>
              <Link to="/dashboard" className="hidden sm:flex text-sm font-medium text-white bg-brand-navy px-5 py-2 rounded hover:bg-slate-800 transition-all duration-300 tracking-wide">
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth/shopper-id" className="hidden sm:flex text-sm font-medium text-white bg-brand-teal px-5 py-2 rounded hover:bg-teal-600 transition-all duration-300 tracking-wide shadow-sm">
                Login / Register
              </Link>
            </>
          )}
        </div>
      </div>
      </div>
    </header>
  );
}
