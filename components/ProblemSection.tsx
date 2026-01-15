import React from 'react';
import { Smartphone, BrainCircuit, Target, ShieldAlert } from 'lucide-react';
import SectionFade from './ui/SectionFade';

const problems = [
  {
    icon: ShieldAlert,
    title: "Endless Distractions",
    desc: "Your environment is engineered to break your focus. We block the noise so you can think.",
    gradient: "from-red-500 to-orange-500"
  },
  {
    icon: BrainCircuit,
    title: "Inconsistent Motivation",
    desc: "Willpower fades. Systems don't. We provide the structure when you don't feel like working.",
    gradient: "from-blue-400 to-brand-cyber"
  },
  {
    icon: Target,
    title: "Zero Accountability",
    desc: "Studying alone is easy to quit. Our presence protocol ensures you stick to the session.",
    gradient: "from-purple-400 to-brand-purple"
  },
  {
    icon: Smartphone,
    title: "Fake Productivity",
    desc: "Most tools are toys. They make you feel busy without helping you produce real output.",
    gradient: "from-emerald-400 to-emerald-600"
  }
];

const ProblemSection: React.FC = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <SectionFade>
          <div className="mb-16 md:text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
              Studying isn't hard. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-orange-500 to-red-500 animate-shimmer bg-[length:200%_100%]">Staying focused is.</span>
            </h2>
            <p className="text-slate-400 text-lg">
              The modern world is at war with your attention span. 
              You don't need more tips; you need a protected environment.
            </p>
          </div>
        </SectionFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((item, idx) => (
            <SectionFade key={idx} delay={idx * 100}>
              <div className="glass-panel p-8 rounded-xl h-full group transition-all duration-500 hover:-translate-y-1 hover:border-brand-accent/30 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className={`text-xl font-bold text-white mb-3 font-display group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${item.gradient} transition-all duration-300`}>
                  {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {item.desc}
                </p>
                <div className={`mt-6 h-[1px] w-12 bg-white/10 group-hover:w-full group-hover:bg-gradient-to-r ${item.gradient} transition-all duration-500`}></div>
              </div>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;