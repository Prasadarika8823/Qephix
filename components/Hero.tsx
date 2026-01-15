import React from 'react';
import SectionFade from './ui/SectionFade';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenAuth: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenAuth }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Decorative center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-cyber/5 blur-[100px] rounded-full pointer-events-none animate-pulse-slow"></div>

      <div className="max-w-6xl mx-auto px-6 text-center z-10 relative">
        <SectionFade>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 border border-white/10 mb-8 backdrop-blur-sm bg-[length:200%_100%] animate-shimmer">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-300">System V.2.0 Live</span>
          </div>
        </SectionFade>

        <SectionFade delay={100}>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-tight mb-8 text-white tracking-tight">
            A place where you <br />
            can actually <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-orange-500 to-amber-500 animate-shimmer bg-[length:200%_100%]">focus.</span>
          </h1>
        </SectionFade>

        <SectionFade delay={200}>
          <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Not a productivity gimmick. Not another distraction. <br className="hidden md:block" />
            QEPHIX is built for people who take their learning seriously.
            <span className="block mt-6 text-transparent bg-clip-text bg-gradient-to-r from-slate-500 via-slate-200 to-slate-500 bg-[length:200%_100%] animate-shimmer text-sm uppercase tracking-widest font-bold">
              Structure. Accountability. Discipline.
            </span>
          </p>
        </SectionFade>

        <SectionFade delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={onOpenAuth}
              className="group relative px-10 py-5 bg-gradient-to-r from-brand-accent to-orange-700 rounded-xl text-white font-bold text-lg tracking-wide overflow-hidden shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_40px_rgba(234,88,12,0.6)] transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start a Focus Session <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button 
              onClick={onOpenAuth}
              className="group px-10 py-5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 hover:text-white transition-all font-medium flex items-center gap-2 text-lg hover:border-brand-cyber/30"
            >
              Explore the System <ChevronRight className="w-5 h-5 text-brand-cyber group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </SectionFade>
      </div>
      
      {/* Bottom fade for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;