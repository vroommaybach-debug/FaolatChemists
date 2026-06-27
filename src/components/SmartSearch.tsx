import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export function SmartSearch() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    // Simulate AI inference routing
    setTimeout(() => {
      setIsSearching(false);
      navigate(`/catalog?q=${encodeURIComponent(query)}`);
    }, 1000);
  };

  return (
    <div className="relative max-w-2xl mx-auto w-full">
      <form 
        onSubmit={handleSearch}
        className={`relative flex items-center bg-white rounded-full transition-all duration-500 border ${isFocused ? 'border-orange-500 shadow-lg shadow-orange-500/10' : 'border-slate-200'}`}
      >
        <div className="pl-6 pr-3 py-4 flex items-center justify-center">
           <Search className={`w-5 h-5 transition-colors ${isFocused ? 'text-orange-500' : 'text-slate-400'}`} />
        </div>
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Describe your symptoms or search for a medicine..."
          className="flex-1 bg-transparent border-none text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 text-lg py-4 w-full font-light"
        />
        <div className="pr-2 pl-3 py-2">
          <button 
            type="submit"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            {isSearching ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>

      <AnimatePresence>
        {isFocused && !query && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-20 p-4"
          >
            <div className="flex items-center gap-2 mb-3 px-2">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-xs uppercase tracking-widest text-slate-500 font-medium">Smart Suggestions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Headache relief', 'Allergy medication', 'Vitamin C supplements', 'Cold and Flu'].map(suggestion => (
                <button 
                  key={suggestion}
                  onClick={() => { setQuery(suggestion); setIsFocused(false); }}
                  className="px-4 py-2 rounded-full bg-slate-50 text-slate-600 text-sm font-medium hover:bg-orange-50 hover:text-orange-600 transition-colors border border-slate-100"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
