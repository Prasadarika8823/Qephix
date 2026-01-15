import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { 
  MapPin, Calendar, Edit3, Shield, Zap, Clock, 
  TrendingUp, CheckCircle2, Lock, Eye, Users, 
  GraduationCap, Briefcase, FileText, Handshake, 
  Search, ShieldCheck, Activity, Globe, Scale,
  MessageSquare
} from 'lucide-react';
import SectionFade from '../ui/SectionFade';

interface ProfileViewProps {
  user: User;
  onOpenChat?: (ally: any) => void;
}

type RelationshipView = 'self' | 'ally' | 'observer';
type Tab = 'dossier' | 'network' | 'pacts';

const ProfileView: React.FC<ProfileViewProps> = ({ user, onOpenChat }) => {
  const [viewMode, setViewMode] = useState<RelationshipView>('self');
  const [activeTab, setActiveTab] = useState<Tab>('dossier');

  // --- Mock Identity Data ---
  const identity = {
    fullName: user.user_metadata?.full_name || 'Protocol User',
    handle: `@${user.email?.split('@')[0]}`,
    role: "Senior System Architect",
    institution: "Self-Taught / Independent",
    location: "Global Grid (UTC-5)",
    disciplineStatement: "Building resilient systems through consistent deep work. No zero days.",
    reliability: 98,
    joined: "Oct 2023",
    status: "Open to Accountability"
  };

  // --- Mock Stats Data (Layered) ---
  const stats = {
    totalHours: { exact: "482h 15m", rounded: "480h+" },
    streak: { exact: "14 Days", rounded: "10+ Days" },
    integrity: { exact: "99.2%", rounded: "High" },
    topics: [
      { name: "System Design", hours: 140 },
      { name: "Rust Programming", hours: 85 },
      { name: "Calculus III", hours: 45 },
    ]
  };

  // --- Mock Network Data ---
  const allies = [
    { name: "Sarah_Dev", role: "Frontend Engineer", status: "Focusing", common: "React, Design" },
    { name: "Dr_Focus", role: "Med Student", status: "Online", common: "Biology" },
  ];

  const pacts = [
    { title: "Weekly 20h Core", partner: "Sarah_Dev", progress: 85, status: "On Track" },
    { title: "Morning 5am Club", partner: "Early_Risers", progress: 100, status: "Complete" }
  ];

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      
      {/* 1. IDENTITY MATRIX (Header) */}
      <div className="relative glass-panel rounded-2xl border border-white/5 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[#0B1121]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-navy/60 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-dark/80 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
        </div>

        <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
           {/* Avatar / Identity Signal */}
           <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-[#020617] p-1 border border-white/10 shadow-2xl">
                 <div className="w-full h-full rounded-xl bg-gradient-to-br from-brand-cyber/20 to-brand-purple/20 flex items-center justify-center text-4xl font-display font-bold text-white relative overflow-hidden group">
                    <span className="relative z-10">{identity.fullName[0]}</span>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 </div>
              </div>
              {/* Integrity Badge */}
              <div className="absolute -bottom-3 -right-3 bg-[#020617] p-1.5 rounded-lg border border-white/10 shadow-lg flex items-center gap-1.5" title="Reliability Index">
                 <ShieldCheck className="w-4 h-4 text-brand-accent" />
                 <span className="text-xs font-bold text-white">{identity.reliability}%</span>
              </div>
           </div>

           {/* Core Info */}
           <div className="flex-1 space-y-4">
              <div>
                 <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                    <h1 className="text-3xl font-display font-bold text-white tracking-tight">{identity.fullName}</h1>
                    <span className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-slate-400 font-mono">{identity.handle}</span>
                 </div>
                 <p className="text-slate-400 text-sm italic border-l-2 border-brand-accent/50 pl-3 py-1">
                    "{identity.disciplineStatement}"
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                 <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-400">
                       <Briefcase className="w-4 h-4 text-brand-cyber" />
                       <span className="text-slate-200">{identity.role}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                       <GraduationCap className="w-4 h-4 text-brand-purple" />
                       <span className="text-slate-200">{identity.institution}</span>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-400">
                       <Globe className="w-4 h-4 text-slate-500" />
                       <span className="text-slate-200">{identity.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                       <Calendar className="w-4 h-4 text-slate-500" />
                       <span className="text-slate-200">Deployed {identity.joined}</span>
                    </div>
                 </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap gap-3 pt-2">
                 {viewMode === 'self' && (
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-white transition-all flex items-center gap-2">
                       <Edit3 className="w-3 h-3" /> Edit Dossier
                    </button>
                 )}
                 {viewMode === 'self' && (
                    <button className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-lg text-xs font-bold text-brand-accent hover:bg-brand-accent/20 transition-all flex items-center gap-2">
                       <Zap className="w-3 h-3" /> Signal Mentorship
                    </button>
                 )}
                 {viewMode === 'ally' && (
                     <button 
                       onClick={() => onOpenChat && onOpenChat({ name: identity.fullName, role: identity.role, status: 'Online' })}
                       className="px-4 py-2 bg-brand-accent hover:bg-orange-600 rounded-lg text-xs font-bold text-white shadow-[0_0_15px_rgba(234,88,12,0.3)] transition-all flex items-center gap-2"
                     >
                        <MessageSquare className="w-3 h-3" /> Secure Comms
                     </button>
                 )}
                 {viewMode === 'observer' && (
                     <button className="px-4 py-2 bg-brand-cyber/10 border border-brand-cyber/20 hover:bg-brand-cyber/20 rounded-lg text-xs font-bold text-brand-cyber transition-all flex items-center gap-2">
                        <Users className="w-3 h-3" /> Request Alliance
                     </button>
                 )}
              </div>
           </div>
        </div>

        {/* Visibility Controller (Self Only) */}
        <div className="bg-[#020617]/50 border-t border-white/5 p-2 flex justify-center md:justify-end gap-2">
           <span className="text-[10px] text-slate-500 uppercase font-bold self-center mr-2">Preview Profile As:</span>
           {(['self', 'ally', 'observer'] as const).map(mode => (
              <button 
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded text-[10px] uppercase font-bold transition-all ${viewMode === mode ? 'bg-white text-brand-dark' : 'text-slate-500 hover:text-white'}`}
              >
                 {mode}
              </button>
           ))}
        </div>
      </div>

      {/* 2. NAVIGATION TABS */}
      <div className="flex items-center gap-8 border-b border-white/5 px-2">
         {[
            { id: 'dossier', label: 'Discipline Dossier', icon: FileText },
            { id: 'network', label: 'Alliance Network', icon: Users },
            { id: 'pacts', label: 'Accountability Pacts', icon: Handshake },
         ].map(tab => (
            <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as Tab)}
               className={`flex items-center gap-2 pb-4 text-sm font-medium transition-all relative ${
                  activeTab === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'
               }`}
            >
               <tab.icon className="w-4 h-4" />
               {tab.label}
               {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent shadow-[0_0_10px_#ea580c]"></div>
               )}
            </button>
         ))}
      </div>

      {/* 3. DYNAMIC CONTENT AREA */}
      <div className="min-h-[400px]">
         
         {/* --- TAB: DOSSIER (Stats & Focus Areas) --- */}
         {activeTab === 'dossier' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4 duration-300">
               
               {/* Left Col: High Level Stats */}
               <div className="lg:col-span-2 space-y-6">
                  {/* Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     {/* Total Focus */}
                     <div className="glass-panel p-5 rounded-xl border border-white/5 flex flex-col justify-between h-32 group">
                        <div className="flex justify-between items-start">
                           <Clock className="w-5 h-5 text-brand-cyber" />
                           {viewMode === 'ally' && <UnlockBadge />}
                        </div>
                        <div>
                           <div className="text-2xl font-display font-bold text-white">
                              {viewMode === 'observer' ? stats.totalHours.rounded : stats.totalHours.exact}
                           </div>
                           <div className="text-[10px] uppercase tracking-widest text-slate-500">Total Deep Work</div>
                        </div>
                     </div>

                     {/* Streak */}
                     <div className="glass-panel p-5 rounded-xl border border-white/5 flex flex-col justify-between h-32 group">
                        <div className="flex justify-between items-start">
                           <TrendingUp className="w-5 h-5 text-brand-accent" />
                           {viewMode === 'ally' && <UnlockBadge />}
                        </div>
                        <div>
                           <div className="text-2xl font-display font-bold text-white">
                              {viewMode === 'observer' ? stats.streak.rounded : stats.streak.exact}
                           </div>
                           <div className="text-[10px] uppercase tracking-widest text-slate-500">Consistency Streak</div>
                        </div>
                     </div>

                     {/* Integrity */}
                     <div className="glass-panel p-5 rounded-xl border border-white/5 flex flex-col justify-between h-32 group">
                        <div className="flex justify-between items-start">
                           <ShieldCheck className="w-5 h-5 text-brand-purple" />
                        </div>
                        <div>
                           <div className="text-2xl font-display font-bold text-white">
                              {viewMode === 'observer' ? stats.integrity.rounded : stats.integrity.exact}
                           </div>
                           <div className="text-[10px] uppercase tracking-widest text-slate-500">Session Integrity</div>
                        </div>
                     </div>
                  </div>

                  {/* Detailed Breakdown (Hidden for Observers) */}
                  <div className="glass-panel p-6 rounded-2xl border border-white/5">
                     <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">Focus Distribution</h3>
                        {viewMode === 'observer' ? (
                           <div className="flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10">
                              <Lock className="w-3 h-3 text-slate-500" />
                              <span className="text-[10px] text-slate-500 uppercase font-bold">Observer View Restricted</span>
                           </div>
                        ) : (
                           <UnlockBadge text="Ally Access Active" />
                        )}
                     </div>

                     {viewMode === 'observer' ? (
                        <div className="h-40 flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                           <div className="text-center">
                              <Users className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                              <p className="text-sm text-slate-500">Connect as an Ally to view detailed topic breakdowns.</p>
                           </div>
                        </div>
                     ) : (
                        <div className="space-y-4">
                           {stats.topics.map((topic, i) => (
                              <div key={i} className="space-y-2">
                                 <div className="flex justify-between text-xs">
                                    <span className="text-white font-medium">{topic.name}</span>
                                    <span className="text-slate-400 font-mono">{topic.hours}h</span>
                                 </div>
                                 <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div 
                                       className={`h-full rounded-full ${i === 0 ? 'bg-brand-cyber' : i === 1 ? 'bg-brand-purple' : 'bg-slate-500'}`} 
                                       style={{width: `${(topic.hours / 200) * 100}%`}}
                                    ></div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </div>

               {/* Right Col: Identity & Goals */}
               <div className="space-y-6">
                  {/* Current Goal */}
                  <div className="p-1 rounded-2xl bg-gradient-to-br from-brand-accent/20 to-brand-dark">
                     <div className="bg-[#0B1121] rounded-xl p-5 border border-brand-accent/20 h-full">
                        <div className="flex items-center gap-2 mb-3">
                           <Activity className="w-4 h-4 text-brand-accent" />
                           <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">Active Protocol</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">SaaS Launch Q4</h3>
                        <p className="text-xs text-slate-400 mb-4">Focusing on high-leverage shipping tasks. 07:00 - 11:00 UTC Daily.</p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                           <span>Currently Active</span>
                        </div>
                     </div>
                  </div>

                  {/* Badges / Reputation */}
                  <div className="glass-panel p-5 rounded-2xl border border-white/5">
                     <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Reputation Signal</h3>
                     <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                           <Shield className="w-5 h-5 text-brand-accent" />
                           <div>
                              <p className="text-white text-xs font-bold">High Integrity</p>
                              <p className="text-[10px] text-slate-500">99% session completion rate</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                           <Users className="w-5 h-5 text-brand-purple" />
                           <div>
                              <p className="text-white text-xs font-bold">Mentor Status</p>
                              <p className="text-[10px] text-slate-500">Available for guidance</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* --- TAB: NETWORK (Allies) --- */}
         {activeTab === 'network' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-300">
               {/* My Allies */}
               <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                     <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Allies ({allies.length})</h3>
                     <button className="text-[10px] text-brand-accent font-bold hover:underline">Find New Allies</button>
                  </div>
                  
                  {allies.map((ally, i) => (
                     <div key={i} className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between group hover:border-brand-accent/30 transition-all">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-lg bg-[#020617] flex items-center justify-center text-white font-bold border border-white/10">
                              {ally.name[0]}
                           </div>
                           <div>
                              <h4 className="text-white font-bold text-sm">{ally.name}</h4>
                              <p className="text-xs text-slate-500">{ally.role} • <span className="text-slate-400">{ally.common}</span></p>
                           </div>
                        </div>
                        <div className="flex items-center gap-2">
                           {ally.status === 'Focusing' && (
                              <span className="px-2 py-0.5 rounded bg-brand-accent/10 text-brand-accent text-[10px] font-bold border border-brand-accent/20 animate-pulse">
                                 FOCUSING
                              </span>
                           )}
                           <button 
                             onClick={() => onOpenChat && onOpenChat(ally)}
                             className="p-2 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                           >
                              <MessageSquare className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                  ))}

                  {/* Add New Slot */}
                  <div className="border border-dashed border-white/10 rounded-xl p-4 flex items-center justify-center gap-2 text-slate-500 hover:text-white hover:border-white/30 cursor-pointer transition-all">
                     <Search className="w-4 h-4" />
                     <span className="text-xs font-bold uppercase">Discover Peers</span>
                  </div>
               </div>

               {/* Incoming Requests */}
               <div className="glass-panel p-6 rounded-2xl border border-white/5 h-fit">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Pending Requests</h3>
                  <div className="space-y-4">
                     <div className="p-4 rounded-xl bg-[#020617] border border-white/5">
                        <div className="flex items-center gap-3 mb-3">
                           <div className="w-8 h-8 rounded-full bg-slate-800"></div>
                           <div>
                              <p className="text-sm text-white font-bold">Quant_Jock</p>
                              <p className="text-[10px] text-slate-500">Finance • 92% Match</p>
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <button className="flex-1 py-1.5 bg-brand-accent hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-colors">Accept Alliance</button>
                           <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-400 text-xs font-bold rounded-lg transition-colors">Ignore</button>
                        </div>
                     </div>
                     <p className="text-xs text-slate-600 text-center italic">Only Allies can see your detailed breakdown.</p>
                  </div>
               </div>
            </div>
         )}

         {/* --- TAB: PACTS (Accountability) --- */}
         {activeTab === 'pacts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-300">
               {pacts.map((pact, i) => (
                  <div key={i} className="glass-panel p-6 rounded-2xl border border-brand-accent/20 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl group-hover:bg-brand-accent/10 transition-all"></div>
                     
                     <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="flex items-center gap-3">
                           <div className="p-2 rounded-lg bg-brand-accent/10 text-brand-accent">
                              <Scale className="w-5 h-5" />
                           </div>
                           <div>
                              <h3 className="text-white font-bold">{pact.title}</h3>
                              <p className="text-xs text-slate-400">Pact with {pact.partner}</p>
                           </div>
                        </div>
                        <div className="px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold uppercase">
                           {pact.status}
                        </div>
                     </div>

                     <div className="space-y-2 relative z-10">
                        <div className="flex justify-between text-xs">
                           <span className="text-slate-400">Adherence</span>
                           <span className="text-white font-mono">{pact.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-brand-accent" style={{width: `${pact.progress}%`}}></div>
                        </div>
                     </div>

                     <button className="mt-6 w-full py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs text-slate-300 hover:text-white transition-all">
                        View Agreement Details
                     </button>
                  </div>
               ))}

               {/* Create New Pact */}
               <div className="border border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-slate-500 hover:text-white hover:border-brand-accent/30 cursor-pointer transition-all min-h-[200px]">
                  <Handshake className="w-8 h-8" />
                  <span className="text-sm font-bold uppercase tracking-wide">Draft New Protocol</span>
               </div>
            </div>
         )}
      </div>

    </div>
  );
};

// Helper Component for Badges
const UnlockBadge = ({ text = "Ally Access" }: { text?: string }) => (
   <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-brand-accent/10 border border-brand-accent/20">
      <Eye className="w-3 h-3 text-brand-accent" />
      <span className="text-[10px] text-brand-accent font-bold uppercase">{text}</span>
   </div>
);

export default ProfileView;