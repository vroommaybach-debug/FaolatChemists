import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldAlert, ShoppingBag, Pill, ArrowRight, Activity } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { GlobalHeader } from '../components/GlobalHeader';
import contentHeroImage from '../assets/images/content_hero_1782463929061.jpg';

export function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { addItem, openCart, items } = useCartStore();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        requires_prescription: product.requires_prescription,
        sku: product.sku
      });
      openCart();
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${slug}`);
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (!product) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">Product not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500/30">
      <GlobalHeader />

      <main className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square bg-white border border-slate-200 rounded-[3rem] flex items-center justify-center shadow-lg relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-50 to-transparent" />
            <Pill className="w-32 h-32 text-slate-300 relative z-10" />
            
            <div className="absolute top-8 left-8">
              <span className="px-4 py-2 bg-white/80 backdrop-blur border border-slate-200 text-slate-600 text-xs font-medium uppercase tracking-widest rounded-full">
                {product.sku}
              </span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-8 pb-8 border-b border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-orange-500 font-medium tracking-widest uppercase text-xs">
                  {product.category}
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-display font-medium tracking-tight mb-4 text-slate-900">{product.name}</h1>
              <div className="flex items-center gap-6">
                <span className="text-3xl font-medium text-slate-900">${product.price.toFixed(2)}</span>
                <span className="text-sm text-slate-500 font-medium">Active: {product.active_ingredient}</span>
              </div>
            </div>

            <div className="prose prose-slate prose-lg text-slate-600 font-light leading-relaxed mb-10">
              <p>{product.description}</p>
            </div>

            <div className="space-y-6">
              {product.requires_prescription && (
                <div className="flex items-start gap-4 p-4 rounded-2xl border border-orange-200 bg-orange-50">
                  <ShieldAlert className="w-6 h-6 text-orange-600 shrink-0" />
                  <div>
                    <h4 className="font-medium text-orange-900">Prescription Required</h4>
                    <p className="text-sm text-orange-700/80 mt-1">This medication requires a valid medical prescription. You will be prompted to upload it during checkout for pharmacist review.</p>
                  </div>
                </div>
              )}

              <button 
                onClick={handleAddToCart}
                className="w-full py-4 rounded-full bg-slate-900 text-white font-medium tracking-wide hover:bg-slate-800 transition-colors duration-300 shadow-lg shadow-slate-900/10"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>

        {/* Funnel Content Block */}
        <div className="mt-32 pt-16 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-[3rem] overflow-hidden aspect-[4/3] bg-slate-100 shadow-xl border border-slate-200">
               <img src={contentHeroImage} alt="Natural Wellness" className="w-full h-full object-cover" />
            </div>
            <div className="pr-12">
              <span className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-orange-500 mb-6">
                <Activity className="w-4 h-4" /> Natural Wellness Journey
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight text-slate-900 mb-6">Your Health, <br/>Expertly Handled.</h2>
              <p className="text-slate-600 font-light text-lg leading-relaxed mb-8">
                Beyond providing authentic medicines, we're dedicated to holistic healing. Join FAOLAT Chemists to access personalized health advice, seamless prescription management, and exclusive botanical insights.
              </p>
              <Link to="/auth/shopper-id" className="px-8 py-4 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-lg flex items-center justify-center gap-2 inline-flex w-fit">
                Start Your Journey <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
