import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { SmartSearch } from '../components/SmartSearch';
import { ChevronRight, ShoppingBag, Pill, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { GlobalHeader } from '../components/GlobalHeader';
import { TiltCard } from '../components/TiltCard';
import catalogHeroImage from '../assets/images/catalog_hero_1782463903675.jpg';

export function Catalog() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { items, openCart } = useCartStore();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    // Fetch products from our API (which queries Supabase)
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-brand-teal/30">
      <GlobalHeader />

      <main className="max-w-7xl mx-auto px-6 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded overflow-hidden mb-16 bg-brand-navy border border-slate-200 perspective-1000"
        >
          <div className="absolute inset-0">
             <motion.img 
               initial={{ scale: 1.1 }}
               animate={{ scale: 1 }}
               transition={{ duration: 2, ease: "easeOut" }}
               src={catalogHeroImage} 
               alt="Pharmacy Catalog" 
               className="w-full h-full object-cover opacity-30 mix-blend-overlay" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-navy to-transparent" />
          </div>
          <div className="relative z-10 px-8 py-20 md:py-32 flex flex-col items-center text-center">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-teal font-mono text-xs font-medium uppercase tracking-widest mb-6">Our Collection</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-6xl font-display text-white mb-6 max-w-3xl">Pharmacy Catalog</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-slate-300 max-w-2xl mx-auto font-light text-lg md:text-xl leading-relaxed mb-10">Explore our verified medicines, natural remedies, and health supplements, guaranteed for maximum efficacy and safety.</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
               <button className="px-8 py-4 rounded bg-brand-teal text-white font-medium hover:bg-teal-600 transition-colors shadow-lg shadow-brand-teal/20">Browse All</button>
               <button className="px-8 py-4 rounded bg-white/10 text-white font-medium hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10 flex items-center justify-center gap-2">Consult Expert <ArrowRight className="w-4 h-4" /></button>
            </motion.div>
          </div>
        </motion.div>

        {/* The AI Search Component Integration */}
        <div className="mb-16">
          <SmartSearch />
        </div>

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <h2 className="text-xl font-display text-brand-navy">All Medicines</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">Filters</button>
            <button className="px-4 py-2 rounded border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">Sort By</button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="h-80 bg-white border border-slate-100 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <TiltCard key={product.id} className="h-full">
                <Link 
                  to={`/catalog/${product.id}`} 
                  className="group border border-slate-200 rounded bg-white overflow-hidden hover:border-brand-teal hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  <div className="p-6 pb-0">
                    <div className="aspect-square mb-6 rounded bg-brand-light flex items-center justify-center border border-slate-100 group-hover:border-brand-teal transition-colors">
                      <Pill className="w-12 h-12 text-slate-300 group-hover:text-brand-teal transition-colors duration-500" />
                    </div>
                  </div>
                  <div className="p-6 pt-0 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-medium">{product.category}</span>
                      {product.requires_prescription && (
                        <span className="text-[10px] uppercase tracking-wider text-brand-red bg-brand-red/10 px-2 py-0.5 rounded font-bold">Rx</span>
                      )}
                    </div>
                    <h3 className="text-lg font-display text-brand-navy mb-2 leading-tight">{product.name}</h3>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="text-lg font-mono text-brand-navy font-medium">₦{(product.price * 1500).toLocaleString()}</span>
                      <button className="w-8 h-8 rounded bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
