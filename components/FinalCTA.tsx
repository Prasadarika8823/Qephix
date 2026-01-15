import React from 'react';
import SectionFade from './ui/SectionFade';
import { ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onOpenAuth: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenAuth }) => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-navy to-brand-dark"></div>
      <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 50% 50%, #3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <SectionFade>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Start your first <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-orange-400">focused session</span> today.
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            No ads. No distractions. No gimmicks. Just you, your goal, and your commitment.
          </p>

          <button 
            onClick={onOpenAuth}
            className="relative group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-brand-accent to-orange-700 text-white font-bold text-lg rounded-xl shadow-[0_0_30px_rgba(234,88,12,0.3)] hover:shadow-[0_0_50px_rgba(234,88,12,0.5)] transition-all duration-300 transform hover:scale-105"
          >
            Create My First Session
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <p className="mt-6 text-sm text-slate-600">
            Free to start. No credit card required.
          </p>
        </SectionFade>
      </div>
    </section>
  );
};

export default FinalCTA;