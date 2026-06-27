import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Stethoscope, Brain, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlobalHeader } from '../components/GlobalHeader';
import symptomHeroImage from '../assets/images/symptom_hero_1782463916642.jpg';

export function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setIsAnalyzing(true);
    // Simulate AI symptom mapping to specific FAOLAT formulations
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults([
        {
          condition: 'Tension Headache',
          confidence: 94,
          description: 'Based on described patterns, typical of stress-induced tension.',
          recommendation: { name: 'Pain Relief Protocol', sku: 'PR-882' }
        },
        {
          condition: 'Migraine (Mild)',
          confidence: 65,
          description: 'Secondary possibility. If light sensitivity occurs, consult a physician.',
          recommendation: null
        }
      ]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500/30">
      <GlobalHeader />

      <main className="max-w-4xl mx-auto px-6 py-32">
        <div className="relative rounded-[3rem] overflow-hidden mb-12 bg-slate-900 shadow-2xl">
          <div className="absolute inset-0">
             <img src={symptomHeroImage} alt="Natural Remedies" className="w-full h-full object-cover opacity-50 mix-blend-overlay" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          </div>
          <div className="relative z-10 px-8 py-20 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6">
              <Stethoscope className="w-8 h-8 text-orange-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-4 text-white">Symptom Guide</h1>
            <p className="text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-8 text-lg">
              Describe your symptoms in your own words. We will map them to potential conditions and recommend safe, effective medicines from our pharmacy.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-orange-400" /> AI-Powered</div>
              <div className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Instant Analysis</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-12 shadow-sm mb-8 relative z-20 -mt-12 mx-4 md:mx-8">
          <form onSubmit={handleAnalyze}>
            <label className="block text-sm font-medium text-slate-900 mb-4 uppercase tracking-widest">
              Describe your condition
            </label>
            <textarea 
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g., 'I have a dull, throbbing pain in my forehead that started this morning, and my neck feels stiff...'"
              className="w-full h-40 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none mb-8 font-light text-lg"
            />
            
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500 flex items-center gap-2 max-w-xs">
                <ShieldCheck className="w-4 h-4 text-orange-500" /> 
                This tool provides general guidance, not a medical diagnosis.
              </p>
              <button 
                type="submit"
                disabled={isAnalyzing || !symptoms.trim()}
                className="px-8 py-4 rounded-full bg-slate-900 text-white font-medium tracking-wide hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" /> Check Symptoms
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <AnimatePresence>
          {results && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-display font-medium px-4 text-slate-900">Analysis Results</h2>
              
              {results.map((res: any, idx: number) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-8 relative overflow-hidden shadow-sm">
                  {idx === 0 && <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full pointer-events-none" />}
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                      <h3 className="text-2xl font-medium text-slate-900 mb-2">{res.condition}</h3>
                      <p className="text-slate-500 font-light max-w-xl">{res.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-display font-medium text-slate-900">{res.confidence}%</span>
                      <p className="text-xs uppercase tracking-widest text-slate-400">Match</p>
                    </div>
                  </div>

                  {res.recommendation && (
                    <div className="mt-8 pt-8 border-t border-slate-100 relative z-10">
                      <p className="text-xs uppercase tracking-widest text-slate-500 font-medium mb-4">Recommended Treatment</p>
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-orange-500" />
                          <span className="font-medium text-slate-900">{res.recommendation.name}</span>
                          <span className="text-xs text-slate-400 font-mono">{res.recommendation.sku}</span>
                        </div>
                        <Link to="/catalog" className="flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors">
                          View in Pharmacy <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
