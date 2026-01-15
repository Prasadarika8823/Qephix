import React from 'react';
import SectionFade from './ui/SectionFade';
import { Target, Users, LineChart, Brain, Zap, Shield, ArrowRight } from 'lucide-react';

const steps = [
  {
    num: "01",
    title: "Start With Intent",
    icon: Target,
    desc: "Intentionality is the precursor to discipline. Before the timer starts, you must define the output.",
    details: [
      "Define specific output goals",
      "Clear physical & digital workspace",
      "Set custom duration (25-90m)"
    ],
    accent: "text-brand-cyber",
    border: "group-hover:border-brand-cyber/50",
    titleGradient: "group-hover:from-brand-cyber group-hover:to-cyan-400"
  },
  {
    num: "02",
    title: "Focus Together",
    icon: Users,
    desc: "Isolation breeds distraction. Presence creates pressure. Work alongside serious peers in silence.",
    details: [
      "Silent virtual co-working",
      "Camera-optional accountability",
      "Strict 'No Distraction' protocol"
    ],
    accent: "text-brand-purple",
    border: "group-hover:border-brand-purple/50",
    titleGradient: "group-hover:from-brand-purple group-hover:to-fuchsia-400"
  },
  {
    num: "03",
    title: "Track Real Effort",
    icon: LineChart,
    desc: "What gets measured gets managed. We track deep work hours, not just time spent at the desk.",
    details: [
      "Deep work analytics",
      "Streak maintenance & recovery",
      "Weekly performance review"
    ],
    accent: "text-brand-accent",
    border: "group-hover:border-brand-accent/50",
    titleGradient: "group-hover:from-brand-accent group-hover:to-orange-400"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-32 relative z-10 overflow-hidden">
      {/* Background Tech Visuals */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[20%] left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-cyber/20 to-transparent"></div>
        <div className="absolute top-[80%] left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full opacity-20 animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <SectionFade>
          <div className="text-center mb-20">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyber/10 border border-brand-cyber/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyber animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-cyber">The Protocol</span>
             </div>
             <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
               Systematic <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyber to-brand-purple animate-shimmer bg-[length:200%_100%]">Progression</span>
             </h2>
             <p className="text-slate-400 max-w-2xl mx-auto text-lg">
               We don't rely on willpower. We rely on a repeatable workflow designed to trigger flow states.
             </p>
          </div>
        </SectionFade>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-16 left-[16%] right-[16%] h-[2px] bg-white/5 z-0">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-cyber/50 to-transparent w-1/2 animate-float"></div>
          </div>

          {steps.map((step, idx) => (
            <SectionFade key={idx} delay={idx * 150} className="h-full">
              <div className={`relative h-full flex flex-col glass-panel p-8 rounded-2xl border border-white/5 transition-all duration-500 hover:bg-white/[0.04] group hover:-translate-y-2 ${step.border} hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]`}>
                
                {/* Step Header */}
                <div className="flex items-start justify-between mb-8 relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-brand-dark border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-shadow duration-500">
                     <step.icon className={`w-6 h-6 ${step.accent} transition-transform duration-500 group-hover:scale-110`} />
                  </div>
                  <span className="font-display text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                    {step.num}
                  </span>
                </div>

                <h3 className={`text-2xl font-bold text-white mb-4 ${step.titleGradient} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300`}>
                  {step.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed mb-8 flex-grow group-hover:text-slate-300 transition-colors">
                  {step.desc}
                </p>

                {/* Micro-interaction Details */}
                <div className="space-y-3 pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors">
                   {step.details.map((detail, i) => (
                     <div key={i} className="flex items-center gap-3 text-sm text-slate-500 group-hover:text-slate-300 transition-colors">
                        <div className={`w-1.5 h-1.5 rounded-full ${step.accent === 'text-brand-accent' ? 'bg-brand-accent' : step.accent === 'text-brand-cyber' ? 'bg-brand-cyber' : 'bg-brand-purple'} group-hover:shadow-[0_0_8px_currentColor]`}></div>
                        {detail}
                     </div>
                   ))}
                </div>

                {/* Glow effect */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent ${step.accent === 'text-brand-accent' ? 'via-brand-accent' : step.accent === 'text-brand-cyber' ? 'via-brand-cyber' : 'via-brand-purple'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              </div>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;