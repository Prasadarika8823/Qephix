import React, { useState } from 'react';
import { 
  Users, Search, Filter, ShieldCheck, Zap, 
  Clock, Target, BrainCircuit, Activity, Globe, 
  CheckCircle2, ArrowRight, Layers, Hash, 
  UserPlus, Radio, Lock
} from 'lucide-react';
import SectionFade from '../ui/SectionFade';

// --- Types ---
interface Session {
  id: string;
  title: string;
  host: string;
  hostReliability: number; // 0-100%
  subject: string;
  startsIn: string; // "Live" or "10m"
  duration: number;
  participants: number;
  maxParticipants: number;
  mode: 'Deep' | 'Pomodoro' | 'Silent';
  tags: string[];
}

const CommunityView: React.FC = () => {
  // --- State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'deep' | 'pomodoro' | 'silent'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // --- Mock Data ---
  const activeSessions: Session[] = [
    { 
      id: '1', title: "Silent Deep Work Protocol", host: "Sarah_Dev", hostReliability: 99, 
      subject: "Coding", startsIn: "Live", duration: 90, participants: 18, maxParticipants: 20, 
      mode: 'Deep', tags: ["No Mic", "Camera Optional"] 
    },
    { 
      id: '2', title: "Med School: Pathology Block", host: "Dr_Focus", hostReliability: 96, 
      subject: "Medicine", startsIn: "Live", duration: 60, participants: 42, maxParticipants: 50, 
      mode: 'Pomodoro', tags: ["50/10", "Strict"] 
    },
    { 
      id: '3', title: "Thesis Writing Sprint", host: "Academic_Flow", hostReliability: 92, 
      subject: "Writing", startsIn: "5m", duration: 120, participants: 8, maxParticipants: 15, 
      mode: 'Silent', tags: ["PhD", "Research"] 
    },
    { 
      id: '4', title: "Algorithm Practice (LeetCode)", host: "Algo_Master", hostReliability: 88, 
      subject: "DSA", startsIn: "15m", duration: 45, participants: 12, maxParticipants: 25, 
      mode: 'Deep', tags: ["Interview Prep"] 
    },
    { 
      id: '5', title: "Financial Modeling", host: "Quant_Life", hostReliability: 95, 
      subject: "Finance", startsIn: "Live", duration: 180, participants: 4, maxParticipants: 10, 
      mode: 'Deep', tags: ["CFA", "Excel"] 
    },
  ];

  const circles = [
    { name: "Early Risers Club", members: 6, status: "Active Now", focus: "Morning Routine" },
    { name: "System Architects", members: 4, status: "2 Online", focus: "Backend Design" },
  ];

  const hubs = [
    { name: "Computer Science", active: 124 },
    { name: "Medicine & Bio", active: 86 },
    { name: "Law & Policy", active: 42 },
    { name: "Creative Arts", active: 38 },
  ];

  // --- Filter Logic ---
  const filteredSessions = activeSessions.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.host.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || s.mode.toLowerCase() === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 pb-20">
      
      {/* HEADER: Focus Waves & Identity */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-8 gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
              </span>
              <span className="text-brand-accent text-[10px] font-bold uppercase tracking-widest">Global Focus Grid</span>
           </div>
           <h1 className="text-3xl font-display font-bold text-white mb-2">Disciplined Network</h1>
           <p className="text-slate-400 max-w-lg text-sm">Join verified sessions. Presence creates accountability. No chat, no distractions.</p>
        </div>
        
        {/* Ambient Stats */}
        <div className="flex gap-6">
           <div className="text-right">
              <div className="text-2xl font-bold text-white">1,402</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Active Minds</div>
           </div>
           <div className="w-px h-10 bg-white/10"></div>
           <div className="text-right">
              <div className="text-2xl font-bold text-brand-cyber">98.4%</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Completion Rate</div>
           </div>
        </div>
      </div>

      {/* SEARCH & FILTER MODULE */}
      <div className="bg-[#0B1121]/50 backdrop-blur-sm border border-white/5 rounded-2xl p-4 sticky top-4 z-40 shadow-2xl">
         <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-accent transition-colors" />
               <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find sessions by subject, host, or keyword..."
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-slate-600 focus:border-brand-accent focus:outline-none transition-all"
               />
            </div>
            
            {/* Quick Filters */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
               {[
                  { id: 'all', label: 'All Protocols' },
                  { id: 'deep', label: 'Deep Work' },
                  { id: 'pomodoro', label: 'Pomodoro' },
                  { id: 'silent', label: 'Silent Mode' },
               ].map((f) => (
                  <button 
                     key={f.id}
                     onClick={() => setActiveFilter(f.id as any)}
                     className={`whitespace-nowrap px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                        activeFilter === f.id 
                           ? 'bg-white/10 text-white border-white/20 shadow-lg' 
                           : 'bg-transparent text-slate-500 border-transparent hover:bg-white/5 hover:text-slate-300'
                     }`}
                  >
                     {f.label}
                  </button>
               ))}
               <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-3 rounded-xl border transition-all ${showFilters ? 'bg-brand-accent text-white border-brand-accent' : 'bg-[#020617] text-slate-500 border-white/10 hover:text-white'}`}
               >
                  <Filter className="w-4 h-4" />
               </button>
            </div>
         </div>

         {/* Extended Filters (Expandable) */}
         {showFilters && (
            <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4 animate-in slide-in-from-top-2">
               <div>
                  <label className="text-[10px] text-slate-500 uppercase font-bold mb-2 block">Duration</label>
                  <select className="w-full bg-[#020617] border border-white/10 rounded-lg p-2 text-xs text-slate-300 outline-none">
                     <option>Any Duration</option>
                     <option>&lt; 30 mins</option>
                     <option>30 - 60 mins</option>
                     <option>60+ mins</option>
                  </select>
               </div>
               <div>
                  <label className="text-[10px] text-slate-500 uppercase font-bold mb-2 block">Subject Domain</label>
                  <select className="w-full bg-[#020617] border border-white/10 rounded-lg p-2 text-xs text-slate-300 outline-none">
                     <option>All Domains</option>
                     <option>Technology</option>
                     <option>Medicine</option>
                     <option>Law</option>
                     <option>Arts</option>
                  </select>
               </div>
               <div>
                  <label className="text-[10px] text-slate-500 uppercase font-bold mb-2 block">Reliability</label>
                  <div className="flex items-center gap-2">
                     <input type="checkbox" className="rounded bg-[#020617] border-white/10" />
                     <span className="text-xs text-slate-400">95%+ Hosts Only</span>
                  </div>
               </div>
               <div>
                  <label className="text-[10px] text-slate-500 uppercase font-bold mb-2 block">Style</label>
                  <div className="flex items-center gap-2">
                     <input type="checkbox" className="rounded bg-[#020617] border-white/10" />
                     <span className="text-xs text-slate-400">Camera Required</span>
                  </div>
               </div>
            </div>
         )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* LEFT COL: Session Feed */}
         <div className="lg:col-span-2 space-y-4">
            {/* Matching Engine Teaser */}
            <SectionFade>
               <div className="p-4 rounded-xl border border-brand-cyber/20 bg-brand-cyber/5 flex items-center justify-between group cursor-pointer hover:bg-brand-cyber/10 transition-colors">
                  <div className="flex items-center gap-3">
                     <div className="p-2 rounded-lg bg-brand-cyber/20 text-brand-cyber">
                        <BrainCircuit className="w-5 h-5 animate-pulse-slow" />
                     </div>
                     <div>
                        <h3 className="text-sm font-bold text-white">Find My Next Session</h3>
                        <p className="text-xs text-slate-400">AI Recommendation based on your 09:00 AM coding habit.</p>
                     </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand-cyber group-hover:translate-x-1 transition-transform" />
               </div>
            </SectionFade>

            {/* Session List */}
            <div className="space-y-4">
               {filteredSessions.map((session) => (
                  <SectionFade key={session.id}>
                     <div className="group glass-panel rounded-2xl p-5 border border-white/5 hover:border-brand-accent/30 transition-all duration-300 relative overflow-hidden">
                        
                        {/* Host Quality Strip */}
                        <div className="flex justify-between items-start mb-4">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#020617] border border-white/10 flex items-center justify-center text-xs font-bold text-white relative">
                                 {session.host[0]}
                                 <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border border-[#020617]">
                                    <ShieldCheck className="w-3 h-3 text-[#020617]" fill="currentColor" />
                                 </div>
                              </div>
                              <div>
                                 <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-white">{session.title}</span>
                                    {session.startsIn === 'Live' && (
                                       <span className="text-[10px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded animate-pulse">LIVE</span>
                                    )}
                                 </div>
                                 <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <span>Host: {session.host}</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                                    <span className="text-green-400 flex items-center gap-0.5">
                                       <ShieldCheck className="w-3 h-3" /> {session.hostReliability}% Reliability
                                    </span>
                                 </div>
                              </div>
                           </div>
                           
                           {/* Join Button */}
                           <button className="px-5 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-wide hover:bg-brand-accent hover:border-brand-accent transition-all shadow-lg">
                              Join Protocol
                           </button>
                        </div>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 py-3 border-y border-white/5 bg-white/[0.01] -mx-5 px-5">
                           <div>
                              <p className="text-[10px] text-slate-500 uppercase font-bold">Subject</p>
                              <p className="text-sm text-slate-300 flex items-center gap-1.5"><Hash className="w-3 h-3" /> {session.subject}</p>
                           </div>
                           <div>
                              <p className="text-[10px] text-slate-500 uppercase font-bold">Duration</p>
                              <p className="text-sm text-slate-300 flex items-center gap-1.5"><Clock className="w-3 h-3" /> {session.duration}m</p>
                           </div>
                           <div>
                              <p className="text-[10px] text-slate-500 uppercase font-bold">Mode</p>
                              <p className="text-sm text-brand-cyber flex items-center gap-1.5"><Zap className="w-3 h-3" /> {session.mode}</p>
                           </div>
                           <div>
                              <p className="text-[10px] text-slate-500 uppercase font-bold">Occupancy</p>
                              <p className="text-sm text-slate-300 flex items-center gap-1.5"><Users className="w-3 h-3" /> {session.participants}/{session.maxParticipants}</p>
                           </div>
                        </div>

                        {/* Footer Tags */}
                        <div className="flex items-center gap-2">
                           {session.tags.map(tag => (
                              <span key={tag} className="text-[10px] text-slate-500 bg-[#020617] px-2 py-1 rounded border border-white/5">
                                 {tag}
                              </span>
                           ))}
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     </div>
                  </SectionFade>
               ))}
            </div>
         </div>

         {/* RIGHT COL: Intelligence Sidebar */}
         <div className="space-y-6">
            
            {/* Subject Hubs */}
            <SectionFade delay={100}>
               <div className="glass-panel p-5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                     <Layers className="w-4 h-4 text-slate-500" />
                     <h3 className="text-sm font-bold text-white uppercase tracking-wider">Subject Hubs</h3>
                  </div>
                  <div className="space-y-2">
                     {hubs.map((hub, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors cursor-pointer group">
                           <span className="text-sm text-slate-300 group-hover:text-white">{hub.name}</span>
                           <span className="text-xs text-slate-500 bg-[#020617] px-2 py-0.5 rounded border border-white/5 group-hover:border-white/10">{hub.active} live</span>
                        </div>
                     ))}
                  </div>
                  <button className="w-full mt-4 py-2 text-xs text-brand-cyber font-bold hover:text-white transition-colors">
                     Explore All Hubs
                  </button>
               </div>
            </SectionFade>

            {/* Accountability Circles (Private Groups) */}
            <SectionFade delay={200}>
               <div className="glass-panel p-5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                     <Target className="w-4 h-4 text-slate-500" />
                     <h3 className="text-sm font-bold text-white uppercase tracking-wider">Your Circles</h3>
                  </div>
                  <div className="space-y-3">
                     {circles.map((circle, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[#020617] border border-white/5 hover:border-brand-purple/30 transition-colors cursor-pointer">
                           <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-white text-sm">{circle.name}</h4>
                              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                           </div>
                           <p className="text-[10px] text-slate-500 mb-2">{circle.focus}</p>
                           <div className="flex -space-x-2">
                              {Array.from({length: circle.members}).map((_, idx) => (
                                 <div key={idx} className="w-6 h-6 rounded-full bg-white/10 border border-[#020617] flex items-center justify-center text-[8px] text-white">
                                    {String.fromCharCode(65+idx)}
                                 </div>
                              ))}
                           </div>
                        </div>
                     ))}
                     <button className="w-full py-2 rounded-xl border border-dashed border-white/10 text-xs text-slate-500 hover:text-white hover:border-white/30 transition-colors flex items-center justify-center gap-2">
                        <UserPlus className="w-3 h-3" /> Create New Circle
                     </button>
                  </div>
               </div>
            </SectionFade>

            {/* Global Activity Map (Static Vis) */}
            <SectionFade delay={300}>
               <div className="p-5 rounded-2xl bg-[#020617] border border-white/5 relative overflow-hidden group">
                  <Globe className="w-16 h-16 text-brand-accent/5 absolute -right-4 -bottom-4 group-hover:scale-125 transition-transform duration-700" />
                  <div className="relative z-10">
                     <h3 className="text-sm font-bold text-white mb-1">Global Pulse</h3>
                     <div className="flex items-center gap-2 mb-4">
                        <Activity className="w-3 h-3 text-brand-accent" />
                        <span className="text-xs text-brand-accent">High Activity Region: Asia/Pacific</span>
                     </div>
                     <p className="text-[10px] text-slate-500 leading-relaxed">
                        Session density is peaking. Joining a session now increases completion probability by 42%.
                     </p>
                  </div>
               </div>
            </SectionFade>

         </div>

      </div>
    </div>
  );
};

export default CommunityView;