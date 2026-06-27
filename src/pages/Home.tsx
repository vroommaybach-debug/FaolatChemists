import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Zap, Droplet, 
  Activity, Brain, Heart, Microscope, 
  CheckCircle2, FileText, Truck, UserPlus, Pill, Sparkles, FileSearch, BadgeCheck
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { GlobalHeader } from '../components/GlobalHeader';
import heroImage from '../assets/images/hero_lab_1782464564992.jpg';

export function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '200px']);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setFeaturedProducts(data.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-brand-teal/30 overflow-hidden">
      <GlobalHeader />

      {/* 1. HERO */}
      <section className="relative min-h-[100vh] flex items-center justify-center pt-20 overflow-hidden bg-brand-navy text-white">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 flex items-center justify-center">
           <img src={heroImage} alt="Pharmaceutical Lab" className="w-full h-full object-cover mix-blend-overlay opacity-60" />
           <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center mt-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-brand-teal/30 bg-brand-teal/10 text-xs font-mono tracking-widest uppercase text-brand-teal mb-8">
              <Microscope className="w-4 h-4" /> Innovation & Care
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight leading-[1.05] mb-8"
          >
            Where Science<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-blue-400">Becomes Medicine.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-slate-300 max-w-3xl mb-12 font-light leading-relaxed"
          >
            Nigeria's trusted pharmaceutical manufacturer and licensed pharmacy, rooted in Lagos, serving lives across West Africa.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link to="/catalog" className="w-full sm:w-auto px-8 py-4 rounded bg-brand-teal text-white font-medium tracking-wide hover:bg-teal-600 transition-colors duration-300 flex items-center justify-center gap-2">
              Shop Medications
            </Link>
            <Link to="/manufacturing" className="w-full sm:w-auto px-8 py-4 rounded border border-white/30 text-white font-medium tracking-wide hover:bg-white/10 transition-colors duration-300 flex items-center justify-center gap-2">
              Our Manufacturing Process <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
        
        {/* Animated scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 animate-pulse opacity-50">
           <div className="w-[1px] h-12 bg-white/50" />
           <span className="text-[10px] font-mono tracking-widest mt-2 uppercase">Scroll</span>
        </div>
      </section>

      {/* 2. TRUST BANNER */}
      <section className="border-b border-slate-200 bg-white relative z-10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 text-brand-navy">
          <div className="flex items-center gap-2 font-mono text-xs md:text-sm tracking-widest uppercase font-semibold"><ShieldCheck className="w-5 h-5 text-brand-gold"/> NAFDAC Certified</div>
          <div className="flex items-center gap-2 font-mono text-xs md:text-sm tracking-widest uppercase font-semibold"><Activity className="w-5 h-5 text-brand-gold"/> PCN Licensed</div>
          <div className="flex items-center gap-2 font-mono text-xs md:text-sm tracking-widest uppercase font-semibold"><Microscope className="w-5 h-5 text-brand-gold"/> WHO GMP Standards</div>
          <div className="flex items-center gap-2 font-mono text-xs md:text-sm tracking-widest uppercase font-semibold"><CheckCircle2 className="w-5 h-5 text-brand-gold"/> Est. 1998</div>
        </div>
      </section>

      {/* 3. DUAL IDENTITY SECTION */}
      <section className="py-24 bg-brand-light">
         <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-brand-navy text-white p-12 md:p-16 rounded overflow-hidden relative group">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80')] opacity-10 bg-cover mix-blend-overlay transition-transform duration-1000 group-hover:scale-105" />
               <div className="relative z-10">
                 <h2 className="text-4xl font-display mb-6">We Make Medicine.</h2>
                 <p className="text-slate-300 font-light mb-10 text-lg leading-relaxed max-w-md">Our state-of-the-art facilities in Lagos produce high-quality oral and topical medications, fully compliant with WHO and NAFDAC standards.</p>
                 <Link to="/manufacturing" className="inline-flex items-center gap-2 text-brand-teal hover:text-white transition-colors border-b border-brand-teal pb-1">
                   Explore Manufacturing <ArrowRight className="w-4 h-4" />
                 </Link>
               </div>
             </motion.div>

             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white border border-slate-200 text-brand-navy p-12 md:p-16 rounded overflow-hidden relative group">
               <div className="absolute inset-0 bg-brand-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <div className="relative z-10">
                 <h2 className="text-4xl font-display mb-6">We Sell Medicine.</h2>
                 <p className="text-slate-600 font-light mb-10 text-lg leading-relaxed max-w-md">Whether you need our manufactured products or verified third-party pharmaceuticals, our retail arm delivers directly to your door.</p>
                 <Link to="/catalog" className="inline-flex items-center gap-2 text-brand-teal hover:text-brand-navy transition-colors border-b border-brand-teal pb-1 font-medium">
                   Shop Pharmacy <ArrowRight className="w-4 h-4" />
                 </Link>
               </div>
             </motion.div>
           </div>
         </div>
      </section>

      {/* 4. WHY FAOLAT SECTION */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-brand-navy mb-4">The Faolat Standard</h2>
            <p className="text-slate-500 font-light max-w-2xl mx-auto">Built on decades of pharmaceutical expertise and uncompromising quality.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Microscope, title: 'Certified Manufacturing', desc: 'In-house production ensuring end-to-to-end quality control.' },
              { icon: ShieldCheck, title: 'NAFDAC Approved', desc: '100% of our products meet strict regulatory requirements.' },
              { icon: Zap, title: 'Secure Online Orders', desc: 'Encrypted transactions and pharmacist-verified prescriptions.' },
              { icon: Truck, title: 'Nigeria-Wide Delivery', desc: 'Reliable dispatch to your home, clinic, or wholesale business.' }
            ].map((p, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex flex-col items-center text-center p-6 bg-slate-50 rounded border border-slate-100">
                <div className="w-12 h-12 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center mb-6">
                  <p.icon className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-brand-navy mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS */}
      <section className="py-24 relative z-10 bg-brand-light border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-brand-teal font-mono tracking-widest uppercase text-xs mb-4 block">Pharmacy</span>
              <h2 className="text-3xl md:text-4xl font-display text-brand-navy">Featured Products</h2>
            </div>
            <Link to="/catalog" className="text-slate-600 hover:text-brand-teal flex items-center gap-2 transition-colors border-b border-transparent hover:border-brand-teal pb-1 font-medium">
              View All Medicines <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group border border-slate-200 rounded bg-white overflow-hidden hover:border-brand-teal hover:shadow-xl transition-all duration-500 flex flex-col"
              >
                <Link to={`/catalog/${product.id}`} className="block flex-1 flex flex-col">
                  <div className="p-8 pb-0">
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded">{product.sku}</span>
                      {product.requires_prescription && (
                        <span className="px-2 py-1 rounded bg-brand-red/10 text-brand-red text-[10px] tracking-widest uppercase font-bold">Prescription Rx</span>
                      )}
                    </div>
                    <div className="aspect-square mb-8 rounded bg-brand-light flex items-center justify-center group-hover:bg-brand-teal/5 transition-colors">
                      <Pill className="w-16 h-16 text-slate-300 group-hover:text-brand-teal transition-colors duration-500" />
                    </div>
                  </div>
                  <div className="p-8 pt-0 flex-1 flex flex-col">
                    <h3 className="text-xl font-display text-brand-navy mb-2">{product.name}</h3>
                    <p className="text-slate-500 text-sm font-light line-clamp-2 mb-8">{product.description}</p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xl font-mono text-brand-navy font-medium">₦{(product.price * 1500).toLocaleString()}</span>
                      <button 
                        onClick={(e) => { e.preventDefault(); addItem({...product, quantity: 1}); openCart(); }}
                        className="px-6 py-3 rounded bg-brand-navy text-white text-sm font-medium hover:bg-brand-teal transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROCESS TEASER */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-brand-navy mb-4">From Lab to Home</h2>
            <p className="text-slate-500 font-light max-w-2xl mx-auto">How our dual-identity ensures quality at every step.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-24 right-24 h-px bg-brand-teal/20" />
            {[
              { step: '01', title: 'Formulation', desc: 'Our chemists develop efficacy-driven formulas.' },
              { step: '02', title: 'Quality Testing', desc: 'Rigorous lab testing against pharmacopoeia standards.' },
              { step: '03', title: 'Delivery', desc: 'Secure retail fulfillment directly to your hands.' }
            ].map((s, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-brand-light border-4 border-white flex items-center justify-center mb-6 shadow-lg shadow-brand-teal/5 text-2xl font-display text-brand-teal">
                  {s.step}
                </div>
                <h3 className="text-xl font-display text-brand-navy mb-3">{s.title}</h3>
                <p className="text-slate-500 font-light max-w-[250px]">{s.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/manufacturing" className="inline-block px-8 py-4 rounded border border-brand-navy text-brand-navy font-medium hover:bg-brand-navy hover:text-white transition-colors">
              Explore Our Process
            </Link>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-24 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-6">
           <h2 className="text-3xl md:text-4xl font-display mb-16 text-center text-brand-gold">Trusted by Professionals & Patients</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { quote: "Faolat's formulations are consistently reliable. We stock their antimalarials extensively in our clinic because we trust their QC process.", author: "Dr. Adebayo", role: "Chief Medical Officer, Lagos" },
               { quote: "Ordering my monthly prescriptions online has never been easier. The pharmacist verification gives me peace of mind.", author: "Chika N.", role: "Patient" },
               { quote: "Their B2B wholesale platform is seamless. Deliveries arrive on time, fully documented with NAFDAC batch numbers.", author: "Pharm. Olumide", role: "Retail Pharmacy Owner" }
             ].map((t, i) => (
                <div key={i} className="p-8 bg-white/5 border border-white/10 rounded">
                  <div className="flex gap-1 mb-6 text-brand-gold">
                    {[1,2,3,4,5].map(star => <Sparkles key={star} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="font-light text-slate-300 mb-8 italic">"{t.quote}"</p>
                  <div>
                    <p className="font-medium text-white">{t.author}</p>
                    <p className="text-xs font-mono text-brand-teal mt-1">{t.role}</p>
                  </div>
                </div>
             ))}
           </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded bg-brand-teal flex items-center justify-center">
                  <span className="text-white font-display text-lg tracking-tighter">FC</span>
                </div>
                <span className="font-display text-white text-2xl">Faolat Chemist</span>
              </div>
              <p className="text-sm font-light max-w-xs mb-8 leading-relaxed">
                Where Science Becomes Medicine. Licensed pharmaceutical manufacturers and retail chemists.
              </p>
              <div className="text-sm space-y-3 font-light">
                <p><strong className="text-white font-medium">Phone:</strong> +234 (0) 800 FAOLAT</p>
                <p><strong className="text-white font-medium">Email:</strong> care@faolatchemist.com</p>
                <p><strong className="text-white font-medium">Address:</strong> Lagos, Nigeria</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-display mb-6">Company</h4>
              <ul className="space-y-4 text-sm font-light">
                <li><Link to="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
                <li><Link to="/manufacturing" className="hover:text-brand-gold transition-colors">Manufacturing</Link></li>
                <li><Link to="/careers" className="hover:text-brand-gold transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-display mb-6">Pharmacy</h4>
              <ul className="space-y-4 text-sm font-light">
                <li><Link to="/products" className="hover:text-brand-gold transition-colors">All Products</Link></li>
                <li><Link to="/prescriptions" className="hover:text-brand-gold transition-colors">Upload Prescription</Link></li>
                <li><Link to="/wholesale" className="hover:text-brand-gold transition-colors">B2B / Wholesale</Link></li>
                <li><Link to="/blog" className="hover:text-brand-gold transition-colors">Research & Insights</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-display mb-6">Legal</h4>
              <ul className="space-y-4 text-sm font-light">
                <li><Link to="/legal/terms" className="hover:text-brand-gold transition-colors">Terms of Service</Link></li>
                <li><Link to="/legal/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
                <li><Link to="/legal/cookie-notice" className="hover:text-brand-gold transition-colors">Cookie Notice</Link></li>
                <li><Link to="/legal/nafdac" className="hover:text-brand-gold transition-colors">NAFDAC Info</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
            <p>&copy; {new Date().getFullYear()} Faolat Chemist. All rights reserved.</p>
            <div className="flex gap-4">
               <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-brand-teal"/> SSL Secured</span>
               <span className="flex items-center gap-1"><BadgeCheck className="w-3 h-3 text-brand-teal"/> Paystack Integrated</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
