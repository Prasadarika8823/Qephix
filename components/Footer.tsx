import React, { useState } from 'react';
import { Linkedin } from 'lucide-react';
import LegalModal from './LegalModal';

const Footer: React.FC = () => {
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | 'contact' | null>(null);

  const openLegal = (type: 'privacy' | 'terms' | 'contact') => {
    setLegalType(type);
    setLegalOpen(true);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="bg-[#010409] border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
        {/* Footer Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-brand-accent/5 blur-[100px] pointer-events-none animate-pulse-slow"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
               <div className="flex items-center gap-2 mb-6 group cursor-default">
                 <div className="w-6 h-6 bg-brand-accent rounded-md flex items-center justify-center shadow-[0_0_10px_rgba(234,88,12,0.3)] group-hover:shadow-[0_0_15px_rgba(234,88,12,0.6)] transition-shadow">
                   <span className="font-bold text-white text-xs">Q</span>
                 </div>
                 <span className="font-display font-bold text-2xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-white group-hover:from-brand-cyber group-hover:via-brand-purple group-hover:to-brand-accent transition-all duration-500 bg-[length:200%_100%] animate-shimmer">QEPHIX</span>
               </div>
               <p className="text-slate-500 max-w-sm mb-6">
                 A focus-first learning platform built for discipline, deep work, and accountability. 
                 Join the top 1% of learners.
               </p>
               <div className="flex gap-4">
                 <a 
                   href="https://www.linkedin.com/company/qephix/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0077b5] hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(0,119,181,0.4)] transition-all duration-300"
                 >
                   <Linkedin className="w-5 h-5 fill-current" />
                 </a>
               </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Platform</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li>
                    <button onClick={() => scrollTo('how-it-works')} className="hover:text-brand-accent transition-colors hover:pl-1 text-left">
                        How it Works
                    </button>
                </li>
                <li>
                    <button onClick={() => scrollTo('philosophy')} className="hover:text-brand-accent transition-colors hover:pl-1 text-left">
                        Why QEPHIX
                    </button>
                </li>
                <li>
                    <button onClick={() => scrollTo('about')} className="hover:text-brand-accent transition-colors hover:pl-1 text-left">
                        About
                    </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Legal</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li>
                    <button onClick={() => openLegal('privacy')} className="hover:text-brand-accent transition-colors hover:pl-1 text-left">
                        Privacy Policy
                    </button>
                </li>
                <li>
                    <button onClick={() => openLegal('terms')} className="hover:text-brand-accent transition-colors hover:pl-1 text-left">
                        Terms of Service
                    </button>
                </li>
                <li>
                    <button onClick={() => openLegal('contact')} className="hover:text-brand-accent transition-colors hover:pl-1 text-left">
                        Contact Support
                    </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-600 text-sm">
            <p>© {new Date().getFullYear()} QEPHIX Systems. All rights reserved.</p>
            <p className="flex items-center gap-2 mt-4 md:mt-0">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Systems Operational
            </p>
          </div>
        </div>
      </footer>
      
      <LegalModal 
        isOpen={legalOpen} 
        type={legalType} 
        onClose={() => setLegalOpen(false)} 
      />
    </>
  );
};

export default Footer;