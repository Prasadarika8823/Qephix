import React from 'react';
import SectionFade from './ui/SectionFade';
import { Code2, Cpu, Globe } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-32 relative z-10 border-t border-white/5 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 bg-[#010409]"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-navy/40 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      
      {/* Grid pattern on the left */}
      <div 
        className="absolute left-0 top-20 w-1/3 h-full opacity-[0.05] pointer-events-none" 
        style={{backgroundImage: 'linear-gradient(0deg, transparent 24%, #ffffff 25%, #ffffff 26%, transparent 27%, transparent 74%, #ffffff 75%, #ffffff 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #ffffff 25%, #ffffff 26%, transparent 27%, transparent 74%, #ffffff 75%, #ffffff 76%, transparent 77%, transparent)', backgroundSize: '50px 50px'}}
      ></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionFade>
          <div className="mb-20">
             <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-8">
               Built by learners, <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-orange-500 to-amber-400 animate-shimmer bg-[length:200%_100%]">for learners.</span>
             </h2>
             <div className="h-1 w-32 bg-gradient-to-r from-brand-accent to-brand-purple"></div>
          </div>
        </SectionFade>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <SectionFade delay={100}>
            <div className="prose prose-invert prose-lg">
              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                QEPHIX began as a reaction to a noisy world. We noticed that "productivity tools" were becoming distractions themselves—gamified to keep you clicking, not working.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                We stripped away the badges, the avatars, and the confetti. We replaced them with <span className="text-white font-semibold border-b border-brand-cyber/50">discipline protocols</span>, <span className="text-white font-semibold border-b border-brand-purple/50">deep work analytics</span>, and <span className="text-white font-semibold border-b border-brand-accent/50">real-time accountability</span>.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Our mission is simple: To provide the digital infrastructure for the top 1% of students, creators, and professionals to do the best work of their lives.
              </p>
            </div>
          </SectionFade>

          <SectionFade delay={200}>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Technical Rigor - Cyber Blue */}
                <div className="group p-6 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-brand-cyber/50 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                   <div className="w-10 h-10 rounded-lg bg-brand-cyber/20 flex items-center justify-center mb-4 group-hover:bg-brand-cyber/30 transition-colors">
                      <Code2 className="w-5 h-5 text-brand-cyber group-hover:scale-110 transition-transform" />
                   </div>
                   <h4 className="text-white font-bold mb-2 group-hover:text-brand-cyber transition-colors">Technical Rigor</h4>
                   <p className="text-sm text-slate-500 group-hover:text-slate-400">Platform stability and speed are features, not afterthoughts.</p>
                </div>

                {/* Focus First - Purple */}
                <div className="group p-6 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-brand-purple/50 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                   <div className="w-10 h-10 rounded-lg bg-brand-purple/20 flex items-center justify-center mb-4 group-hover:bg-brand-purple/30 transition-colors">
                      <Cpu className="w-5 h-5 text-brand-purple group-hover:scale-110 transition-transform" />
                   </div>
                   <h4 className="text-white font-bold mb-2 group-hover:text-brand-purple transition-colors">Focus First</h4>
                   <p className="text-sm text-slate-500 group-hover:text-slate-400">Every pixel is designed to reduce cognitive load.</p>
                </div>

                {/* Global Standard - Orange Accent */}
                <div className="group p-6 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm sm:col-span-2 hover:border-brand-accent/50 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(234,88,12,0.15)]">
                   <div className="w-10 h-10 rounded-lg bg-brand-accent/20 flex items-center justify-center mb-4 group-hover:bg-brand-accent/30 transition-colors">
                      <Globe className="w-5 h-5 text-brand-accent group-hover:scale-110 transition-transform" />
                   </div>
                   <h4 className="text-white font-bold mb-2 group-hover:text-brand-accent transition-colors">Global Standard</h4>
                   <p className="text-sm text-slate-500 group-hover:text-slate-400">Connecting disciplined minds from over 40 countries.</p>
                </div>
             </div>
          </SectionFade>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;