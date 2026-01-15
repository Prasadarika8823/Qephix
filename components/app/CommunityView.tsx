import React from 'react';
import { Users, Radio, ArrowRight, Lock, Globe } from 'lucide-react';
import SectionFade from '../ui/SectionFade';

const CommunityView: React.FC = () => {
  const activeRooms = [
    { title: "Silent Deep Work (Camera On)", participants: 12, max: 20, type: "Deep Work", tags: ["Strict", "Video"] },
    { title: "Developers Lounge", participants: 45, max: 50, type: "Coding", tags: ["Chat Allowed", "Music"] },
    { title: "Med School Prep", participants: 8, max: 10, type: "Study", tags: ["Pomodoro"] },
    { title: "Late Night Writers", participants: 3, max: 10, type: "Creative", tags: ["Quiet"] },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-green-500 text-xs font-bold uppercase tracking-widest">Live Protocol</span>
           </div>
           <h1 className="text-3xl font-display font-bold text-white mb-2">Focus Rooms</h1>
           <p className="text-slate-400">Join a synchronous session. Presence creates accountability.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-slate-300 transition-colors">My Groups</button>
           <button className="px-4 py-2 rounded-lg bg-brand-cyber/10 border border-brand-cyber/20 text-brand-cyber hover:bg-brand-cyber/20 transition-colors">Create Room</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeRooms.map((room, i) => (
          <SectionFade key={i} delay={i * 50}>
            <div className="group bg-[#0B1121]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-brand-accent/40 hover:shadow-[0_0_20px_rgba(234,88,12,0.15)] transition-all duration-300 relative overflow-hidden">
               {/* Background Tech Lines */}
               <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 100% 0%, #3b82f6 0%, transparent 50%)'}}></div>
               
               <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                     <div className="px-2 py-1 rounded bg-white/5 text-xs font-bold text-slate-300 border border-white/10 uppercase tracking-wide">
                        {room.type}
                     </div>
                     <div className="flex items-center gap-1 text-slate-400">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">{room.participants}/{room.max}</span>
                     </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">{room.title}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                     {room.tags.map(tag => (
                        <span key={tag} className="text-xs text-slate-500 bg-[#020617] px-2 py-1 rounded border border-white/5">#{tag}</span>
                     ))}
                  </div>

                  <button className="w-full py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-accent/50 text-white font-bold transition-all flex items-center justify-center gap-2 group-hover:translate-x-1 duration-300">
                     Join Session <ArrowRight className="w-4 h-4 group-hover:ml-1 transition-all" />
                  </button>
               </div>
            </div>
          </SectionFade>
        ))}
        
        {/* Placeholder for locked/pro rooms */}
        <div className="bg-[#0B1121]/40 border border-white/5 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center">
           <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-slate-500" />
           </div>
           <h3 className="text-lg font-bold text-slate-300 mb-1">Private Teams</h3>
           <p className="text-sm text-slate-500 mb-4">Upgrade to create persistent team rooms.</p>
           <button className="text-brand-accent text-sm font-bold hover:underline">View Pro Plans</button>
        </div>
      </div>
      
      {/* Global Map Placeholder (Visual Flair) */}
      <div className="mt-12 glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 bg-[#020617] opacity-80"></div>
         <div className="relative z-10 flex flex-col items-center text-center">
            <Globe className="w-12 h-12 text-brand-cyber mb-4 animate-pulse-slow" />
            <h3 className="text-xl font-bold text-white mb-2">Global Focus Grid</h3>
            <p className="text-slate-400 max-w-lg">1,204 disciplined minds are currently focusing across 42 countries. You are not alone in the pursuit of excellence.</p>
         </div>
      </div>
    </div>
  );
};

export default CommunityView;