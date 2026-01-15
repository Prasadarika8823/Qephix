import React from 'react';
import { Linkedin, Twitter, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
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
               {[Linkedin, Twitter, Github].map((Icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-accent hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(234,88,12,0.4)] transition-all duration-300">
                   <Icon className="w-5 h-5" />
                 </a>
               ))}
             </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Platform</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-brand-accent transition-colors hover:pl-1">How it Works</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors hover:pl-1">Pricing</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors hover:pl-1">Manifesto</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors hover:pl-1">Login</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Legal</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-brand-accent transition-colors hover:pl-1">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors hover:pl-1">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors hover:pl-1">Contact Support</a></li>
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
  );
};

export default Footer;