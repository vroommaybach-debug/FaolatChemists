import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export function Account() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate Supabase email/password auth
    setTimeout(() => {
      setLoading(false);
      login({ email });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-brand-teal/30 flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 p-64 bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none" />
      
      <header className="p-6 relative z-20">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-brand-teal transition-colors text-sm font-medium tracking-wide w-fit">
          <ArrowLeft className="w-4 h-4" /> Back Home
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md p-10 rounded border border-slate-200 bg-white shadow-xl"
        >
          <div className="w-12 h-12 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-8">
            <User className="w-6 h-6" />
          </div>
          
          <h1 className="text-3xl font-display font-medium tracking-tight mb-2 text-brand-navy">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-slate-500 text-sm mb-8 font-light">
            {isLogin ? 'Enter your details to access your health portal.' : 'Sign up to manage your prescriptions and orders.'}
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-4 text-brand-navy placeholder-slate-400 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-colors"
              />
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-4 text-brand-navy placeholder-slate-400 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-colors"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded bg-brand-navy text-white font-medium tracking-wide hover:bg-brand-teal transition-colors flex items-center justify-center shadow-lg shadow-brand-teal/20"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (isLogin ? "Sign In" : "Register")}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-slate-500 hover:text-brand-teal font-medium transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
