import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PrescriptionUploadZone } from '../components/PrescriptionUploadZone';

export function Checkout() {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasPrescriptionItems = items.some(item => item.requires_prescription);

  const handlePaymentInit = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/checkout/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'alexander@example.com', // Would come from Auth
          amount: subtotal,
          cartItems: items
        })
      });
      const data = await response.json();
      
      if (data.success) {
        // Simulate Paystack redirect success
        setTimeout(() => {
          setIsProcessing(false);
          setStep(3);
          clearCart();
        }, 2000);
      }
    } catch (e) {
      console.error(e);
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center font-sans selection:bg-orange-500/30">
        <p className="text-slate-500 mb-4 font-light">Your cart is empty.</p>
        <Link to="/catalog" className="px-6 py-2 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors">Return to Pharmacy</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500/30">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          <Link to="/catalog" className="flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors text-sm font-medium tracking-wide">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <span className="mx-auto font-display font-medium tracking-tight text-slate-900">Secure Checkout</span>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-display font-medium mb-2">Review Cart</h1>
                <p className="text-slate-500 font-light">Confirm your medicines before proceeding.</p>
              </div>

              <div className="space-y-4 mb-8">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <div>
                      <h3 className="font-medium text-slate-900">{item.name} <span className="text-slate-500 ml-2">x{item.quantity}</span></h3>
                      <p className="text-xs text-slate-400 font-mono mt-2 tracking-widest uppercase">{item.sku}</p>
                    </div>
                    <span className="font-medium text-lg text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center p-6 bg-slate-100 rounded-2xl border border-slate-200 mb-8">
                <span className="text-lg text-slate-600">Total</span>
                <span className="text-3xl font-medium text-slate-900">${subtotal.toFixed(2)}</span>
              </div>

              <button 
                onClick={() => hasPrescriptionItems ? setStep(2) : handlePaymentInit()}
                className="w-full py-4 rounded-full bg-orange-500 text-white font-medium tracking-wide hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
              >
                {hasPrescriptionItems ? 'Continue to Rx Verification' : 'Proceed to Payment'}
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
               <div className="mb-8 text-center">
                <h1 className="text-3xl font-display font-medium mb-2 text-slate-900">Medical Verification</h1>
                <p className="text-slate-500 font-light">Your cart contains prescription medicines. Please upload your document.</p>
              </div>

              <div className="mb-12">
                <PrescriptionUploadZone />
              </div>

              <button 
                onClick={handlePaymentInit}
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-orange-500 text-white font-medium tracking-wide hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-orange-500/20"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Initializing Secure Gateway...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" /> Secure Checkout
                  </>
                )}
              </button>
              
              <button 
                onClick={() => setStep(1)}
                className="w-full mt-4 py-4 rounded-full text-slate-500 font-medium tracking-wide hover:text-slate-900 transition-colors"
              >
                Back to Review
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-200">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h1 className="text-4xl font-display font-medium mb-4 text-slate-900">Order Confirmed</h1>
              <p className="text-slate-500 mb-12 max-w-md mx-auto font-light leading-relaxed">
                Your medicines have been successfully ordered. You will receive a confirmation email shortly.
              </p>
              <Link to="/dashboard" className="px-8 py-4 rounded-full border border-slate-200 bg-white text-slate-900 font-medium hover:bg-slate-50 shadow-sm transition-colors">
                Go to Dashboard
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
