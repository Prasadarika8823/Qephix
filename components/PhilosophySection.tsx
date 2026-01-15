import React from 'react';
import SectionFade from './ui/SectionFade';
import { Focus, Users, Timer, Layers, Zap, ShieldCheck } from 'lucide-react';

const PhilosophySection: React.FC = () => {
  const cards = [
    {
      title: "Focus First",
      desc: "Built for deep work, no noise. We block the chaos so you can enter the zone immediately.",
      example: "Eliminate notification fatigue and context switching cost.",
      icon: Focus,
      tag: "Core",
      color: "#3b82f6", // brand-cyber
      gradient: "from-blue-400 to-brand-cyber",
      borderColor: "group-hover:border-brand-cyber/50",
      shadowColor: "group-hover:shadow-brand-cyber/20"
    },
    {
      title: "Accountability",
      desc: "Structure beats hype. Our presence protocol ensures you stick to the session when willpower fades.",
      example: "Commit to a session time. Show up or break the chain.",
      icon: Layers,
      tag: "System",
      color: "#8b5cf6", // brand-purple
      gradient: "from-violet-400 to-brand-purple",
      borderColor: "group-hover:border-brand-purple/50",
      shadowColor: "group-hover:shadow-brand-purple/20"
    },
    {
      title: "Purposeful Study",
      desc: "Progress over time spent. Measure deep work hours, not just 'busy' time. Quantify effort.",
      example: "Data-driven insights on your peak performance hours.",
      icon: Timer,
      tag: "Metric",
      color: "#ea580c", // brand-accent
      gradient: "from-orange-400 to-brand-accent",
      borderColor: "group-hover:border-brand-accent/50",
      shadowColor: "group-hover:shadow-brand-accent/20"
    },
    {
      title: "Community",
      desc: "Presence without interruption. A shared environment of high-stakes focus and serious peers.",
      example: "Synchronous sessions with ambitious professionals.",
      icon: Users,
      tag: "Social",
      color: "#ffffff",
      gradient: "from-slate-200 to-white",
      borderColor: "group-hover:border-white/50",
      shadowColor: "group-hover:shadow-white/10"
    }
  ];

  return (
    <section id="philosophy" className="py-24 relative z-10 bg-brand-navy/20 overflow-hidden">
       {/* Ambient background animation */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-cyber/5 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/5 rounded-full blur-[100px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>
       </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionFade>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
             <div className="max-w-2xl">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                  The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyber via-purple-400 to-brand-accent animate-shimmer bg-[length:200%_100%]">Architecture</span>
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Designed for the top 1% of learners who understand that real work requires a protected environment.
                </p>
             </div>
             
             {/* Decorative Tech Badge */}
             <div className="hidden md:flex items-center gap-3 px-4 py-2 border border-white/10 rounded-lg bg-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <ShieldCheck className="w-5 h-5 text-brand-accent animate-pulse" />
                <span className="text-sm font-mono text-slate-300 uppercase tracking-widest">Protocol Active</span>
             </div>
          </div>
        </SectionFade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, idx) => (
            <SectionFade key={idx} delay={idx * 100} className="h-full">
              <div className={`group relative h-[380px] flex flex-col p-6 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:-translate-y-2 hover:scale-[1.02] ${card.borderColor} shadow-xl ${card.shadowColor}`}>
                
                {/* Top Subtle Gradient Light Source */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/50 transition-all duration-500"></div>
                <div className={`absolute inset-0 bg-gradient-to-b ${card.tag === 'Core' ? 'from-brand-cyber/5' : card.tag === 'System' ? 'from-brand-purple/5' : card.tag === 'Metric' ? 'from-brand-accent/5' : 'from-white/5'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-slate-400 group-hover:text-white group-hover:border-white/20 transition-all backdrop-blur-md">
                            {card.tag}
                        </span>
                        <div className={`p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors duration-300`}>
                            <card.icon className={`w-5 h-5 text-slate-300 group-hover:scale-110 transition-transform duration-500`} style={{color: card.color}} />
                        </div>
                    </div>

                    <h3 className={`font-display text-2xl font-bold mb-3 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${card.gradient} group-hover:to-white transition-all duration-500`}>
                        {card.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-light border-l-2 border-white/5 pl-3 mb-4 group-hover:border-white/20 group-hover:text-slate-300 transition-colors">
                        {card.desc}
                    </p>
                    
                    {/* Hover Reveal Example */}
                    <div className="mt-auto overflow-hidden max-h-0 group-hover:max-h-32 transition-all duration-500 ease-in-out">
                       <div className="pt-3 pb-1 border-t border-white/5">
                          <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                             <Zap className="w-3 h-3 text-brand-accent" /> Insight
                          </p>
                          <p className="text-xs text-white/80 italic font-medium leading-relaxed">"{card.example}"</p>
                       </div>
                    </div>
                </div>

                {/* Active glow orb on hover */}
                <div 
                  className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[60px] transition-all duration-700 opacity-0 group-hover:opacity-40 pointer-events-none translate-y-10 group-hover:translate-y-0"
                  style={{ backgroundColor: card.color }}
                ></div>
              </div>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;