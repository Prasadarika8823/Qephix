import React from 'react';
import SectionFade from './ui/SectionFade';
import { CheckCircle2 } from 'lucide-react';

const audiences = [
  "High-stakes Exam Students (Med, Law, Eng)",
  "Self-taught Developers & Engineers",
  "Professional Writers & Creators",
  "Researchers & Academics"
];

const WhoItsFor: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-transparent to-brand-navy/40 relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        
        <div className="lg:w-1/2">
          <SectionFade>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Built for people who take learning <span className="text-brand-accent">seriously.</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              If you're looking for gamification, badges, or animated mascots, this isn't for you. 
              QEPHIX is designed for the disciplined minority who want raw output.
            </p>
            <div className="flex gap-4">
               <div className="h-16 w-1 bg-brand-accent"></div>
               <p className="text-white italic opacity-80">
                 "I finally found a place where I can actually focus. The silence is powerful."
               </p>
            </div>
          </SectionFade>
        </div>

        <div className="lg:w-1/2 w-full">
          <div className="grid gap-4">
            {audiences.map((item, idx) => (
              <SectionFade key={idx} delay={idx * 100} className="w-full">
                <div className="flex items-center gap-4 p-6 glass-panel rounded-lg hover:bg-white/5 transition-all cursor-default group">
                  <CheckCircle2 className="w-6 h-6 text-slate-600 group-hover:text-brand-accent transition-colors" />
                  <span className="text-lg font-medium text-slate-200 group-hover:text-white transition-colors">
                    {item}
                  </span>
                </div>
              </SectionFade>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhoItsFor;