import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore } from '../store/useCartStore';
import { X, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCartStore();
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-white shadow-2xl z-50 flex flex-col font-sans"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Your Cart
              </h2>
              <button onClick={closeCart} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500">
                  <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                  <p>Your cart is empty.</p>
                  <button onClick={closeCart} className="mt-6 px-6 py-2 bg-slate-100 text-slate-900 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors">
                    Browse Pharmacy
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50">
                      <div className="w-16 h-16 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-xs font-medium text-slate-400 uppercase">
                        {item.sku.slice(0, 3)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm text-slate-900 pr-4">{item.name}</h4>
                          <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-900">${item.price.toFixed(2)}</span>
                          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-2 py-1">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-slate-500 hover:text-slate-900"><Minus className="w-3 h-3" /></button>
                            <span className="text-xs font-medium w-4 text-center text-slate-900">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-slate-500 hover:text-slate-900"><Plus className="w-3 h-3" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-slate-200 bg-slate-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="text-2xl font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => { closeCart(); navigate('/checkout'); }}
                  className="w-full py-4 rounded-full bg-slate-900 text-white font-medium tracking-wide hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
