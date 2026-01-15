import React, { useState, useEffect } from 'react';
import { 
  Play, Clock, Target, Zap, 
  Filter, ChevronDown, CheckCircle2, 
  AlertCircle, Layout, Layers, Hash, 
  History, BrainCircuit, Flame, X, ChevronUp, Star
} from 'lucide-react';
import SectionFade from '../ui/SectionFade';
import { SessionRequest } from './DashboardLayout';

interface SessionsViewProps {
  initialConfig?: SessionRequest | null;
  onConfigConsumed?: () => void;
}

type FocusMode = 'pomodoro' | 'deep' | 'free';

interface SessionLog {
  id: number;
  title: string;
  mode: FocusMode;
  duration: number; // minutes
  actualDuration?: number;
  startTime: string; // ISO or display string
  date: string;
  status: 'completed' | 'interrupted' | 'missed';
  intent: string;
  rating?: number; // 1-5
  notes?: string;
  isStreak?: boolean;
}

const SessionsView: React.FC<SessionsViewProps> = ({ initialConfig, onConfigConsumed }) => {
  // --- Creation State ---
  const [mode, setMode] = useState<FocusMode>('deep');
  const [duration, setDuration] = useState(45);
  const [title, setTitle] = useState('');
  const [intent, setIntent] = useState('');
  
  // --- History State ---
  const [historyFilter, setHistoryFilter] = useState<'all' | 'completed' | 'interrupted'>('all');
  const [expandedSessionId, setExpandedSessionId] = useState<number | null>(null);

  // --- Mock Data ---
  const [templates] = useState([
    { id: 1, name: "Exam Revision", duration: 60, mode: 'deep' as FocusMode, icon:  BrainCircuit},
    { id: 2, name: "Coding Sprint", duration: 90, mode: 'free' as FocusMode, icon: Hash },
    { id: 3, name: "Admin Block", duration: 25, mode: 'pomodoro' as FocusMode, icon: Layers },
  ]);

  const [history, setHistory] = useState<SessionLog[]>([
    { 
      id: 101, title: "System Architecture", mode: 'deep', duration: 90, actualDuration: 88, 
      startTime: "14:00", date: "Today", status: 'completed', intent: "Finalize DB Schema", rating: 5, isStreak: true 
    },
    { 
      id: 102, title: "Morning Review", mode: 'pomodoro', duration: 25, actualDuration: 25, 
      startTime: "09:30", date: "Today", status: 'completed', intent: "Clear Inbox", rating: 4 
    },
    { 
      id: 103, title: "React Components", mode: 'free', duration: 60, actualDuration: 20, 
      startTime: "16:00", date: "Yesterday", status: 'interrupted', intent: "Build UI Library", notes: "Emergency call interrupted flow." 
    },
    { 
      id: 104, title: "Physics Study", mode: 'deep', duration: 50, actualDuration: 0, 
      startTime: "20:00", date: "Yesterday", status: 'missed', intent: "Chapter 4 Notes" 
    },
  ]);

  // Handle incoming Dashboard requests
  useEffect(() => {
    if (initialConfig && initialConfig.autoOpen) {
      if (initialConfig.title) setTitle(initialConfig.title);
      if (initialConfig.duration) setDuration(initialConfig.duration);
      if (initialConfig.goal) setIntent(initialConfig.goal);
      if (initialConfig.type) {
        setMode(initialConfig.type === 'pomodoro' ? 'pomodoro' : initialConfig.type === 'freestyle' ? 'free' : 'deep');
      }
      if (onConfigConsumed) onConfigConsumed();
      
      // Scroll to top on mobile
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [initialConfig, onConfigConsumed]);

  const handleStartSession = () => {
    // Logic to start session (would normally route to active timer view)
    console.log("Starting Session:", { title, mode, duration, intent });
    // For demo, just add to top of history as 'In Progress' (simulated)
    const newSession: SessionLog = {
      id: Date.now(),
      title: title || "Untitled Session",
      mode,
      duration,
      startTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      date: "Today",
      status: 'completed', // Simulate completion for history view
      intent: intent || "No intent specified",
      isStreak: false
    };
    setHistory([newSession, ...history]);
    // Reset form
    setTitle('');
    setIntent('');
  };

  const loadTemplate = (t: typeof templates[0]) => {
    setTitle(t.name);
    setDuration(t.duration);
    setMode(t.mode);
  };

  const getModeIcon = (m: FocusMode) => {
    switch (m) {
      case 'pomodoro': return Layers;
      case 'deep': return BrainCircuit;
      case 'free': return Zap;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-brand-cyber';
      case 'interrupted': return 'text-orange-500';
      case 'missed': return 'text-red-500';
      default: return 'text-slate-500';
    }
  };

  return (
    <div className="min-h-screen pb-20">
      
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Session Control</h1>
          <p className="text-slate-400 text-sm">Configure parameters and engage focus protocols.</p>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs font-mono text-slate-500">
           <span>SYSTEM: READY</span>
           <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* --- LEFT COL: CREATION COCKPIT --- */}
        <div className="lg:col-span-5 space-y-6">
          <SectionFade>
            <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden relative">
               {/* Header Decoration */}
               <div className="h-1 w-full bg-gradient-to-r from-brand-accent via-brand-purple to-brand-cyber"></div>
               
               <div className="p-6 md:p-8 space-y-8">
                  
                  {/* 1. Mode Selector */}
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Layout className="w-3 h-3" /> Focus Protocol
                     </label>
                     <div className="grid grid-cols-3 gap-2">
                        {[
                           { id: 'pomodoro', label: 'Pomodoro', icon: Layers },
                           { id: 'deep', label: 'Deep Work', icon: BrainCircuit },
                           { id: 'free', label: 'Flow State', icon: Zap },
                        ].map((m) => (
                           <button
                              key={m.id}
                              onClick={() => setMode(m.id as FocusMode)}
                              className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-300 ${
                                 mode === m.id 
                                    ? 'bg-white/10 border-brand-accent text-white shadow-[0_0_15px_rgba(234,88,12,0.2)]' 
                                    : 'bg-[#020617]/50 border-white/5 text-slate-500 hover:bg-white/5 hover:text-slate-300'
                              }`}
                           >
                              <m.icon className={`w-5 h-5 ${mode === m.id ? 'text-brand-accent' : 'text-current'}`} />
                              <span className="text-xs font-bold">{m.label}</span>
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* 2. Duration Control */}
                  <div className="space-y-4">
                     <div className="flex justify-between items-end">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                           <Clock className="w-3 h-3" /> Duration
                        </label>
                        <span className="text-2xl font-display font-bold text-white tabular-nums">
                           {duration}<span className="text-sm text-slate-500 font-sans ml-1">min</span>
                        </span>
                     </div>
                     
                     {/* Custom Slider Visual */}
                     <div className="relative h-2 bg-[#020617] rounded-full overflow-hidden">
                        <div 
                           className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-cyber to-brand-purple transition-all duration-300"
                           style={{ width: `${(duration / 180) * 100}%` }}
                        ></div>
                        <input 
                           type="range" 
                           min="5" 
                           max="180" 
                           step="5"
                           value={duration}
                           onChange={(e) => setDuration(parseInt(e.target.value))}
                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                     </div>

                     {/* Quick Presets */}
                     <div className="flex gap-2">
                        {[25, 45, 60, 90].map(mins => (
                           <button 
                              key={mins}
                              onClick={() => setDuration(mins)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                                 duration === mins 
                                    ? 'bg-brand-cyber/20 border-brand-cyber text-brand-cyber' 
                                    : 'bg-transparent border-white/10 text-slate-500 hover:border-slate-400'
                              }`}
                           >
                              {mins}m
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* 3. Session Context */}
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Session Title</label>
                        <input 
                           type="text" 
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 text-white placeholder-slate-600 focus:border-brand-accent outline-none transition-all"
                           placeholder="What are you working on?"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Specific Intent</label>
                        <div className="relative">
                           <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                           <input 
                              type="text" 
                              value={intent}
                              onChange={(e) => setIntent(e.target.value)}
                              className="w-full bg-[#020617] border border-white/10 rounded-xl py-4 pl-10 pr-4 text-white placeholder-slate-600 focus:border-brand-accent outline-none transition-all"
                              placeholder="Define the outcome..."
                           />
                        </div>
                     </div>
                  </div>

                  {/* 4. Action Area */}
                  <div className="pt-4 border-t border-white/5 space-y-4">
                     <button 
                        onClick={handleStartSession}
                        className="group relative w-full py-4 bg-gradient-to-r from-brand-accent to-orange-600 rounded-xl text-white font-bold text-lg uppercase tracking-wide shadow-[0_0_30px_rgba(234,88,12,0.3)] hover:shadow-[0_0_50px_rgba(234,88,12,0.5)] transition-all overflow-hidden"
                     >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                           Initialize Session <Play className="w-5 h-5 fill-current" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                     </button>
                     
                     <div className="flex justify-between items-center text-xs text-slate-500">
                        <button className="hover:text-white transition-colors">Schedule for later</button>
                        <span>Est. Completion: {new Date(Date.now() + duration * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                     </div>
                  </div>

               </div>
            </div>
          </SectionFade>

          {/* Templates (Quick Load) */}
          <SectionFade delay={100}>
             <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Quick Load Templates</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                   {templates.map(t => (
                      <button 
                        key={t.id} 
                        onClick={() => loadTemplate(t)}
                        className="flex flex-col items-start p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-brand-cyber/30 transition-all text-left group"
                      >
                         <t.icon className="w-4 h-4 text-slate-400 group-hover:text-brand-cyber mb-2 transition-colors" />
                         <span className="text-sm font-bold text-slate-200 group-hover:text-white">{t.name}</span>
                         <span className="text-sm text-slate-500">{t.duration}m • {t.mode}</span>
                      </button>
                   ))}
                </div>
             </div>
          </SectionFade>
        </div>

        {/* --- RIGHT COL: HISTORY & LOGS --- */}
        <div className="lg:col-span-7 space-y-6">
           
           {/* Filters & Controls */}
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0B1121]/50 backdrop-blur-sm p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2">
                 <History className="w-4 h-4 text-slate-500" />
                 <span className="text-sm font-bold text-white">Session Logs</span>
              </div>
              <div className="flex gap-2">
                 {(['all', 'completed', 'interrupted'] as const).map(f => (
                    <button 
                       key={f}
                       onClick={() => setHistoryFilter(f)}
                       className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                          historyFilter === f 
                             ? 'bg-white/10 text-white border border-white/10' 
                             : 'text-slate-500 hover:text-slate-300'
                       }`}
                    >
                       {f}
                    </button>
                 ))}
              </div>
           </div>

           {/* Timeline Feed */}
           <div className="space-y-4 relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-[28px] top-4 bottom-4 w-px bg-white/5 z-0"></div>

              {history
                .filter(s => historyFilter === 'all' || s.status === historyFilter)
                .map((session) => (
                 <SectionFade key={session.id} className="relative z-10">
                    <div 
                       className={`group relative bg-[#0B1121] border transition-all duration-300 rounded-2xl overflow-hidden ${
                          expandedSessionId === session.id 
                             ? 'border-brand-accent/40 shadow-[0_0_30px_rgba(0,0,0,0.3)]' 
                             : 'border-white/5 hover:border-white/10'
                       }`}
                    >
                       {/* Main Row */}
                       <div 
                          className="p-5 flex items-center gap-4 cursor-pointer"
                          onClick={() => setExpandedSessionId(expandedSessionId === session.id ? null : session.id)}
                       >
                          {/* Icon/Status Indicator */}
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border bg-[#020617] ${
                             session.status === 'completed' ? 'border-brand-cyber/20 text-brand-cyber' :
                             session.status === 'interrupted' ? 'border-orange-500/20 text-orange-500' :
                             'border-red-500/20 text-red-500'
                          }`}>
                             {session.isStreak ? <Flame className="w-6 h-6 fill-current" /> : React.createElement(getModeIcon(session.mode), { className: "w-6 h-6" })}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                             <div className="flex justify-between items-start mb-1">
                                <h3 className="text-white font-bold truncate pr-4">{session.title}</h3>
                                <span className="text-xs font-mono text-slate-500">{session.startTime}</span>
                             </div>
                             <div className="flex items-center gap-3 text-sm text-slate-400">
                                <span className={`flex items-center gap-1.5 ${getStatusColor(session.status)}`}>
                                   {session.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                                   {session.status === 'interrupted' && <AlertCircle className="w-3 h-3" />}
                                   {session.status === 'missed' && <X className="w-3 h-3" />}
                                   <span className="capitalize">{session.status}</span>
                                </span>
                                <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                                <span>{session.duration}m</span>
                             </div>
                          </div>

                          {/* Expand Trigger */}
                          <div className="text-slate-600 group-hover:text-white transition-colors">
                             {expandedSessionId === session.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                       </div>

                       {/* Expanded Details */}
                       {expandedSessionId === session.id && (
                          <div className="bg-white/[0.02] border-t border-white/5 p-5 animate-in slide-in-from-top-2">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                {/* Metrics */}
                                <div className="space-y-4">
                                   <div>
                                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Primary Intent</p>
                                      <p className="text-sm text-slate-300 italic">"{session.intent}"</p>
                                   </div>
                                   <div className="flex items-center gap-4">
                                      <div>
                                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Actual Time</p>
                                         <p className="text-sm text-white font-mono">{session.actualDuration || 0}m <span className="text-slate-500">/ {session.duration}m</span></p>
                                      </div>
                                      {session.rating && (
                                         <div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Focus Rating</p>
                                            <div className="flex gap-0.5">
                                               {[1,2,3,4,5].map(star => (
                                                  <Star key={star} className={`w-3 h-3 ${star <= session.rating! ? 'text-brand-accent fill-current' : 'text-slate-700'}`} />
                                               ))}
                                            </div>
                                         </div>
                                      )}
                                   </div>
                                </div>

                                {/* Actions & Notes */}
                                <div className="space-y-4">
                                   {session.notes && (
                                      <div>
                                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Session Notes</p>
                                         <p className="text-xs text-slate-400 bg-[#020617] p-2 rounded border border-white/5">{session.notes}</p>
                                      </div>
                                   )}
                                   <div className="flex justify-end gap-2 pt-2">
                                      {session.status !== 'completed' && (
                                         <button 
                                            onClick={() => { setTitle(session.title); setMode(session.mode); setDuration(session.duration); setIntent(session.intent); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                                            className="px-3 py-1.5 rounded-lg bg-brand-accent/10 hover:bg-brand-accent/20 text-brand-accent text-xs font-bold border border-brand-accent/20 transition-colors"
                                         >
                                            Retry Session
                                         </button>
                                      )}
                                      <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-colors">
                                         Compare
                                      </button>
                                   </div>
                                </div>

                             </div>
                          </div>
                       )}

                       {/* Visual Progress Bar (Decor) */}
                       {session.status === 'completed' && (
                          <div className="absolute bottom-0 left-0 h-0.5 bg-brand-cyber w-full opacity-30"></div>
                       )}
                       {session.status === 'interrupted' && (
                          <div className="absolute bottom-0 left-0 h-0.5 bg-orange-500 w-[40%] opacity-50"></div>
                       )}
                    </div>
                 </SectionFade>
              ))}
           </div>

           {/* Empty State */}
           {history.length === 0 && (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                 <History className="w-10 h-10 text-slate-600 mx-auto mb-4" />
                 <h3 className="text-slate-400 font-bold mb-1">No Session Logs</h3>
                 <p className="text-xs text-slate-600">Complete your first protocol to populate data.</p>
              </div>
           )}

        </div>
      </div>
    </div>
  );
};

export default SessionsView;