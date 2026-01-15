import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { 
  Play, Zap, Clock, Target, ArrowUpRight, 
  Calendar, BarChart3, MoreHorizontal, Activity,
  Flame, ChevronRight, Layers, BellRing, BrainCircuit,
  TrendingUp, Timer, Hourglass, MonitorPlay, RotateCcw,
  Pause, Sun, Moon, CheckSquare, List, Crosshair, 
  ShieldAlert, Battery, Swords, MousePointerClick, Lock,
  ThumbsUp, ThumbsDown, Award, Users
} from 'lucide-react';
import SectionFade from '../ui/SectionFade';
import { SessionRequest } from './DashboardLayout';

interface DashboardHomeProps {
  user: User;
  onChangeView: (view: any) => void;
  onRequestSession: (request: SessionRequest) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ user, onChangeView, onRequestSession }) => {
  const firstName = user.user_metadata?.full_name?.split(' ')[0] || 'Traveler';
  const [currentTime, setCurrentTime] = useState(new Date());
  const [focusMode, setFocusMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'pomodoro' | 'stopwatch'>('pomodoro');
  
  // Stopwatch State
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  // --- NEW FOCUS OS STATE ---
  const [dailyIntent, setDailyIntent] = useState('');
  const [priorityStack, setPriorityStack] = useState([
    { id: 1, text: "Complete System Architecture", done: false },
    { id: 2, text: "Review PRs", done: true },
    { id: 3, text: "Write Documentation", done: false }
  ]);
  const [showReflection, setShowReflection] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval: any;
    if (isStopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime((prev) => prev + 1);
      }, 1000);
    } else if (!isStopwatchRunning && stopwatchTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isStopwatchRunning, stopwatchTime]);

  const formatStopwatch = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePomodoroStart = (duration: number) => {
    onRequestSession({
      title: `Pomodoro Session (${duration}m)`,
      duration: duration,
      type: 'pomodoro',
      goal: 'Maintain focus cycle',
      autoOpen: true
    });
  };

  const handleStopwatchSave = () => {
    const duration = Math.max(1, Math.floor(stopwatchTime / 60));
    onRequestSession({
      title: 'Unstructured Deep Work',
      duration: duration,
      type: 'freestyle',
      goal: 'Recorded from open timer',
      autoOpen: true
    });
    setStopwatchTime(0);
    setIsStopwatchRunning(false);
  };

  const handleSmartPreset = (title: string, duration: number, goal: string) => {
    onRequestSession({
      title,
      duration,
      goal,
      type: 'deep_work',
      autoOpen: true
    });
  };

  const togglePriority = (id: number) => {
    setPriorityStack(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  // Mock Data
  const weeklyActivity = [40, 70, 45, 90, 60, 20, 0]; 
  const nextSession = {
    title: "Deep Work: System Architecture",
    startsIn: "15 min",
  };
  const todaySchedule = [
    { time: "09:00", title: "Morning Review", type: "completed", duration: "30m" },
    { time: "10:00", title: "React Query Refactor", type: "completed", duration: "60m" },
    { time: "14:00", title: "System Architecture", type: "upcoming", duration: "90m" },
  ];

  return (
    <div className={`space-y-8 pb-32 transition-all duration-700 ${focusMode ? 'grayscale-[0.3]' : ''}`}>
      
      {/* 1. TOP HUD (Enhanced) */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <SectionFade>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">System Nominal</span>
            </div>
            <div className="text-2xl md:text-3xl font-display font-bold text-white">
              Ready to focus, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">{firstName}</span>?
            </div>
          </SectionFade>
        </div>
        
        {/* Global Focus Clock & Mode Toggle */}
        <SectionFade delay={100} className="w-full md:w-auto flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-2xl font-display font-bold text-white tracking-widest tabular-nums leading-none">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500">Local Time</div>
          </div>
          <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
          <button 
             onClick={() => setFocusMode(!focusMode)}
             className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                focusMode 
                  ? 'bg-brand-accent/20 border-brand-accent text-brand-accent shadow-[0_0_15px_rgba(234,88,12,0.3)]' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
             }`}
          >
             {focusMode ? <Sun className="w-4 h-4 animate-spin-slow" /> : <Moon className="w-4 h-4" />}
             <span className="text-xs font-bold uppercase tracking-wide">{focusMode ? 'Focus Mode On' : 'Enter Focus'}</span>
          </button>
        </SectionFade>
      </div>

      {/* 2. OVERVIEW CARDS (Preserved) */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 ${focusMode ? 'opacity-50 hover:opacity-100 transition-opacity' : ''}`}>
        <SectionFade delay={100}>
          <div className="relative group h-40 glass-panel rounded-2xl border border-white/5 p-5 overflow-hidden transition-all duration-300 hover:border-brand-cyber/30">
             <div className="absolute top-0 right-0 p-4"><Target className="w-5 h-5 text-slate-600 group-hover:text-brand-cyber transition-colors" /></div>
             <div className="flex items-center gap-6 h-full">
                <div className="relative w-20 h-20">
                   <svg className="w-full h-full -rotate-90">
                      <circle cx="40" cy="40" r="32" stroke="#1e293b" strokeWidth="6" fill="transparent" />
                      <circle cx="40" cy="40" r="32" stroke="#3b82f6" strokeWidth="6" fill="transparent" strokeDasharray="200" strokeDashoffset="60" />
                   </svg>
                   <div className="absolute inset-0 flex items-center justify-center"><span className="text-sm font-bold text-white">70%</span></div>
                </div>
                <div>
                   <div className="text-3xl font-display font-bold text-white">2.5<span className="text-sm text-slate-500 font-sans font-normal ml-1">h</span></div>
                   <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">Daily Goal</div>
                </div>
             </div>
          </div>
        </SectionFade>

        <SectionFade delay={150}>
          <div className="relative group h-40 glass-panel rounded-2xl border border-white/5 p-5 overflow-hidden transition-all duration-300 hover:border-brand-accent/30">
             <div className="absolute top-0 right-0 p-4"><Flame className="w-5 h-5 text-slate-600 group-hover:text-brand-accent transition-colors" /></div>
             <div className="flex flex-col justify-center h-full">
                <div className="flex items-baseline gap-2">
                   <span className="text-4xl font-display font-bold text-white">12</span>
                   <span className="text-sm font-medium text-brand-accent">Days</span>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-2">Current Streak</div>
             </div>
          </div>
        </SectionFade>

        <SectionFade delay={200}>
          <div className="relative group h-40 glass-panel rounded-2xl border border-white/5 p-5 overflow-hidden transition-all duration-300 hover:border-brand-purple/30">
             <div className="absolute top-0 right-0 p-4"><Activity className="w-5 h-5 text-slate-600 group-hover:text-brand-purple transition-colors" /></div>
             <div className="grid grid-cols-2 gap-4 h-full content-center">
                <div><div className="text-2xl font-bold text-white">84</div><div className="text-[10px] uppercase tracking-wider text-slate-500">Sessions</div></div>
                <div><div className="text-2xl font-bold text-white">94%</div><div className="text-[10px] uppercase tracking-wider text-slate-500">Focus</div></div>
             </div>
          </div>
        </SectionFade>

        <SectionFade delay={250}>
           <div className="relative group h-40 rounded-2xl p-0.5 bg-gradient-to-br from-brand-accent/20 to-brand-dark overflow-hidden">
              <div className="absolute inset-0 bg-brand-accent/10 blur-xl"></div>
              <div className="relative h-full bg-[#0B1121] rounded-[14px] p-5 flex flex-col justify-between overflow-hidden">
                 <div>
                    <div className="flex items-center gap-2 mb-1">
                       <Clock className="w-3 h-3 text-brand-accent animate-pulse" />
                       <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wider">Up Next: {nextSession.startsIn}</span>
                    </div>
                    <div className="font-bold text-white leading-tight line-clamp-2">{nextSession.title}</div>
                 </div>
                 <button onClick={() => onChangeView('sessions')} className="w-full py-2.5 bg-brand-accent hover:bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all">
                    <Play className="w-3 h-3 fill-current" /> Initialize
                 </button>
              </div>
           </div>
        </SectionFade>
      </div>

      {/* 3. FOCUS CONTROL CENTER (Preserved) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Focus Timer Module */}
         <SectionFade delay={300} className="lg:col-span-2">
            <div className="glass-panel border border-white/5 rounded-3xl p-1 h-full flex flex-col relative overflow-hidden">
               {/* Header / Tabs */}
               <div className="flex p-1 gap-1 bg-[#020617]/50 rounded-t-[22px]">
                   <button 
                      onClick={() => setActiveTab('pomodoro')} 
                      className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2 ${activeTab === 'pomodoro' ? 'bg-white/10 text-white shadow-lg border border-white/10' : 'text-slate-500 hover:text-white'}`}
                   >
                      <Layers className={`w-4 h-4 ${activeTab === 'pomodoro' ? 'text-brand-accent' : ''}`} /> Pomodoro
                   </button>
                   <button 
                      onClick={() => setActiveTab('stopwatch')} 
                      className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2 ${activeTab === 'stopwatch' ? 'bg-white/10 text-white shadow-lg border border-white/10' : 'text-slate-500 hover:text-white'}`}
                   >
                      <Hourglass className={`w-4 h-4 ${activeTab === 'stopwatch' ? 'text-brand-accent' : ''}`} /> Stopwatch
                   </button>
               </div>

               {/* Timer Content */}
               <div className="flex-1 p-8 flex flex-col items-center justify-center relative bg-[#0B1121]/30 rounded-b-[22px]">
                   <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 50% 50%, #ea580c 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
                   
                   {activeTab === 'pomodoro' ? (
                      <div className="w-full text-center animate-in zoom-in-95 duration-300">
                         <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">Select Intensity Cycle</h3>
                         <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
                            <button onClick={() => handlePomodoroStart(25)} className="group p-6 rounded-2xl border border-white/10 bg-[#020617] hover:border-brand-accent transition-all relative overflow-hidden">
                               <div className="text-3xl font-display font-bold text-white mb-1 group-hover:text-brand-accent">25m</div>
                               <div className="text-xs text-slate-500">Standard</div>
                               <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </button>
                            <button onClick={() => handlePomodoroStart(50)} className="group p-6 rounded-2xl border border-white/10 bg-[#020617] hover:border-brand-cyber transition-all relative overflow-hidden">
                               <div className="text-3xl font-display font-bold text-white mb-1 group-hover:text-brand-cyber">50m</div>
                               <div className="text-xs text-slate-500">Deep Work</div>
                               <div className="absolute inset-0 bg-brand-cyber/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </button>
                         </div>
                         <div className="text-xs text-slate-600 flex items-center justify-center gap-2">
                            <Clock className="w-3 h-3" /> Auto-creates session log
                         </div>
                      </div>
                   ) : (
                      <div className="w-full text-center animate-in zoom-in-95 duration-300">
                         <div className="font-mono text-6xl md:text-7xl font-bold text-white mb-8 tracking-tighter tabular-nums">
                            {formatStopwatch(stopwatchTime)}
                         </div>
                         <div className="flex items-center justify-center gap-4">
                            <button 
                               onClick={() => setIsStopwatchRunning(!isStopwatchRunning)}
                               className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 ${isStopwatchRunning ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-brand-accent text-white hover:bg-orange-600'}`}
                            >
                               {isStopwatchRunning ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                            </button>
                            <button 
                               onClick={() => { setStopwatchTime(0); setIsStopwatchRunning(false); }}
                               className="w-16 h-16 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all"
                            >
                               <RotateCcw className="w-6 h-6" />
                            </button>
                         </div>
                         {stopwatchTime > 0 && !isStopwatchRunning && (
                            <button onClick={handleStopwatchSave} className="mt-6 text-xs font-bold text-brand-accent hover:text-white border-b border-brand-accent/30 hover:border-white pb-1 transition-all">
                               Save as Session
                            </button>
                         )}
                      </div>
                   )}
               </div>
            </div>
         </SectionFade>
         
         {/* Smart Presets & Break Manager */}
         <div className="space-y-4">
            <SectionFade delay={350}>
               <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 mb-2">Smart Presets</h4>
                  {[
                     { title: "Exam Sprint", min: 90, icon: Zap, color: "text-yellow-400" },
                     { title: "Creative Flow", min: 60, icon: MonitorPlay, color: "text-purple-400" },
                     { title: "Quick Review", min: 30, icon: RotateCcw, color: "text-cyan-400" },
                  ].map((p, i) => (
                     <button 
                        key={i}
                        onClick={() => handleSmartPreset(p.title, p.min, `Auto-generated ${p.title}`)}
                        className="w-full flex items-center justify-between p-4 rounded-xl bg-[#0B1121] border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group"
                     >
                        <div className="flex items-center gap-3">
                           <div className={`p-2 rounded-lg bg-white/5 ${p.color}`}>
                              <p.icon className="w-4 h-4" />
                           </div>
                           <div className="text-left">
                              <div className="font-bold text-white text-sm">{p.title}</div>
                              <div className="text-[10px] text-slate-500">{p.min} minutes</div>
                           </div>
                        </div>
                        <Play className="w-3 h-3 text-slate-600 group-hover:text-white transition-colors" />
                     </button>
                  ))}
               </div>
            </SectionFade>

            <SectionFade delay={400}>
               <div className="p-4 rounded-xl bg-gradient-to-br from-brand-accent/10 to-transparent border border-brand-accent/20 flex items-center gap-4">
                  <div className="p-2 rounded-full bg-brand-accent/20 text-brand-accent animate-pulse">
                     <Clock className="w-4 h-4" />
                  </div>
                  <div>
                     <div className="text-xs font-bold text-brand-accent uppercase tracking-wider">Break Manager</div>
                     <div className="text-[10px] text-slate-400">Next suggested break in 45m</div>
                  </div>
               </div>
            </SectionFade>
         </div>
      </div>

      {/* 4. MAIN COMMAND GRID (Preserved from existing) */}
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${focusMode ? 'opacity-30 pointer-events-none filter blur-sm transition-all duration-700' : 'transition-all duration-700'}`}>
         
         {/* LEFT COL: Timeline */}
         <div className="lg:col-span-2">
            <SectionFade delay={450}>
              <div className="glass-panel rounded-3xl border border-white/5 p-6 md:p-8 relative overflow-hidden">
                 <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                       <Layers className="w-4 h-4 text-slate-500" />
                       <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Protocol Timeline</span>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-slate-600" />
                 </div>
                 
                 {/* Timeline Strip */}
                 <div className="relative space-y-8 pl-4">
                    <div className="absolute left-[23px] top-2 bottom-4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
                    {todaySchedule.map((item, idx) => (
                       <div key={idx} className={`relative flex items-center gap-6 group ${item.type === 'completed' ? 'opacity-50' : ''}`}>
                          <div className={`relative z-10 w-2.5 h-2.5 rounded-full border-2 transition-all ${item.type === 'upcoming' ? 'bg-brand-dark border-brand-accent scale-125' : 'bg-slate-700 border-slate-700'}`}></div>
                          <div className="w-12 text-xs font-mono text-slate-500">{item.time}</div>
                          <div className={`flex-1 p-4 rounded-xl border transition-all ${item.type === 'upcoming' ? 'bg-white/5 border-brand-accent/30' : 'bg-transparent border-white/5'}`}>
                             <div className="flex justify-between items-start">
                                <div>
                                   <div className="font-bold text-sm text-white">{item.title}</div>
                                   <div className="text-[10px] text-slate-500 mt-1">{item.duration}</div>
                                </div>
                                {item.type === 'upcoming' && (
                                   <button 
                                      onClick={() => handleSmartPreset(item.title, parseInt(item.duration), item.title)}
                                      className="p-2 rounded-lg bg-brand-accent text-white shadow-lg hover:scale-110 transition-transform"
                                   >
                                      <Play className="w-3 h-3 fill-current" />
                                   </button>
                                )}
                             </div>
                          </div>
                       </div>
                    ))}
                    {/* Add Slot */}
                    <div className="relative flex items-center gap-6 group cursor-pointer" onClick={() => handleSmartPreset("New Session", 45, "")}>
                       <div className="relative z-10 w-2.5 h-2.5 rounded-full border-2 border-dashed border-slate-600 bg-transparent group-hover:border-white transition-colors"></div>
                       <div className="w-12 text-xs font-mono text-slate-600">--:--</div>
                       <div className="flex-1 p-3 rounded-xl border border-white/5 border-dashed flex items-center justify-center text-slate-600 hover:text-white hover:border-white/20 transition-all">
                          <span className="text-xs uppercase tracking-widest font-bold">+ Schedule Block</span>
                       </div>
                    </div>
                 </div>
              </div>
            </SectionFade>
         </div>

         {/* RIGHT COL: Analytics */}
         <div>
            <SectionFade delay={500}>
               <div className="glass-panel p-6 rounded-2xl border border-white/5 relative">
                  <div className="flex justify-between items-center mb-6">
                     <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-slate-500" />
                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Weekly Load</span>
                     </div>
                     <span className="text-xs text-green-400 font-mono">+14%</span>
                  </div>
                  <div className="flex items-end justify-between h-32 gap-2">
                     {weeklyActivity.map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end h-full group/bar cursor-pointer">
                           <div className="w-full bg-white/5 rounded-t-sm relative hover:bg-brand-cyber/50 transition-all" style={{height: `${h}%`}}></div>
                        </div>
                     ))}
                  </div>
               </div>
            </SectionFade>
         </div>
      </div>

      {/* --- 5. NEW: FOCUS OS INTELLIGENCE & STRATEGY LAYER --- */}
      <div className={`mt-12 transition-all duration-700 ${focusMode ? 'opacity-30 pointer-events-none blur-sm' : ''}`}>
         
         {/* SECTION HEADER */}
         <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0B1121] to-[#020617] border border-white/10 flex items-center justify-center">
               <BrainCircuit className="w-4 h-4 text-brand-cyber" />
            </div>
            <div>
               <h3 className="text-lg font-display font-bold text-white leading-none">Intelligence Layer</h3>
               <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">System Optimization & Strategy</p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* CARD 1: DISCIPLINE INDEX */}
            <SectionFade delay={600}>
               <div className="glass-panel p-5 rounded-2xl border border-white/5 relative group hover:border-brand-accent/30 transition-all h-full">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-2 rounded-lg bg-white/5 text-slate-400 group-hover:text-brand-accent transition-colors"><ShieldAlert className="w-4 h-4" /></div>
                     <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">Improving</span>
                  </div>
                  <div className="flex items-end gap-2 mb-1">
                     <span className="text-3xl font-bold text-white">85</span>
                     <span className="text-sm text-slate-500 mb-1">/ 100</span>
                  </div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-4">Discipline Index</p>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-gradient-to-r from-brand-accent to-orange-400 w-[85%]"></div>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">Based on consistency & breaks.</p>
               </div>
            </SectionFade>

            {/* CARD 2: FOCUS PATTERN (HEATMAP) */}
            <SectionFade delay={650}>
               <div className="glass-panel p-5 rounded-2xl border border-white/5 relative group hover:border-brand-cyber/30 transition-all h-full">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-2 rounded-lg bg-white/5 text-slate-400 group-hover:text-brand-cyber transition-colors"><Activity className="w-4 h-4" /></div>
                     <span className="text-[10px] text-slate-500 font-mono">24H CYCLE</span>
                  </div>
                  <div className="flex items-end gap-1 h-12 mb-4">
                     {Array.from({length: 12}).map((_, i) => (
                        <div key={i} className={`flex-1 rounded-sm ${i === 8 || i === 9 ? 'bg-brand-cyber' : i > 5 ? 'bg-brand-cyber/40' : 'bg-white/5'}`} style={{height: `${Math.random() * 100}%`}}></div>
                     ))}
                  </div>
                  <p className="text-xs text-white font-bold">Peak Focus: 08:00 - 11:00</p>
                  <p className="text-[10px] text-slate-500 mt-1">Schedule deep work in this window.</p>
               </div>
            </SectionFade>

            {/* CARD 3: FOCUS IDENTITY */}
            <SectionFade delay={700}>
               <div className="glass-panel p-5 rounded-2xl border border-white/5 relative group hover:border-brand-purple/30 transition-all h-full overflow-hidden">
                  <div className="absolute top-0 right-0 p-32 bg-brand-purple/5 blur-3xl rounded-full group-hover:bg-brand-purple/10 transition-all"></div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                     <div className="p-2 rounded-lg bg-white/5 text-slate-400 group-hover:text-brand-purple transition-colors"><Award className="w-4 h-4" /></div>
                     <Lock className="w-3 h-3 text-slate-600" />
                  </div>
                  <div className="relative z-10">
                     <span className="text-[10px] font-bold text-brand-purple uppercase tracking-widest border border-brand-purple/20 px-2 py-0.5 rounded bg-brand-purple/10">Architect</span>
                     <h4 className="text-lg font-bold text-white mt-2">Consistent Builder</h4>
                     <p className="text-xs text-slate-400 mt-2 line-clamp-2">You focus best in 60m blocks. Maintain streak to unlock 'Monk' status.</p>
                  </div>
               </div>
            </SectionFade>

            {/* CARD 4: ACCOUNTABILITY PARTNER */}
            <SectionFade delay={750}>
               <div className="glass-panel p-5 rounded-2xl border border-white/5 relative group hover:border-white/20 transition-all h-full">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-2 rounded-lg bg-white/5 text-slate-400 group-hover:text-white transition-colors"><Users className="w-4 h-4" /></div>
                     <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-slate-700 border border-[#0B1121]"></div>
                        <div className="w-6 h-6 rounded-full bg-brand-accent border border-[#0B1121] flex items-center justify-center text-[8px] font-bold text-white">You</div>
                     </div>
                  </div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Accountability</p>
                  <div className="flex items-center gap-2 mb-3">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                     <span className="text-sm font-bold text-white">Partner Active</span>
                  </div>
                  <button className="w-full py-1.5 rounded bg-white/5 text-[10px] font-bold text-slate-300 hover:bg-white/10 transition-colors uppercase">Sync Session</button>
               </div>
            </SectionFade>
         </div>

         {/* STRATEGY GRID */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            
            {/* PRIORITY STACK */}
            <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/5">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                     <List className="w-4 h-4 text-slate-500" />
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Priority Stack</span>
                  </div>
                  <span className="text-[10px] text-slate-600 bg-white/5 px-2 py-1 rounded">Top 3 Only</span>
               </div>
               <div className="space-y-3">
                  {priorityStack.map((task) => (
                     <div key={task.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all group ${task.done ? 'bg-white/[0.02] border-white/5 opacity-60' : 'bg-[#020617]/50 border-white/10 hover:border-brand-accent/40'}`}>
                        <button 
                           onClick={() => togglePriority(task.id)}
                           className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${task.done ? 'bg-green-500 border-green-500 text-white' : 'border-slate-600 hover:border-white text-transparent'}`}
                        >
                           <CheckSquare className="w-3 h-3 fill-current" />
                        </button>
                        <span className={`flex-1 text-sm font-medium ${task.done ? 'text-slate-500 line-through' : 'text-white'}`}>{task.text}</span>
                        {!task.done && (
                           <button onClick={() => handleSmartPreset(task.text, 45, `Focus on: ${task.text}`)} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-brand-accent/10 text-brand-accent hover:bg-brand-accent hover:text-white transition-all">
                              <Play className="w-3 h-3 fill-current" />
                           </button>
                        )}
                     </div>
                  ))}
               </div>
            </div>

            {/* CHALLENGE / GOAL ALIGNMENT */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col justify-between group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl group-hover:bg-brand-accent/10 transition-all"></div>
               <div>
                  <div className="flex items-center gap-2 mb-2">
                     <Swords className="w-4 h-4 text-slate-500" />
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Challenge</span>
                  </div>
                  <h4 className="text-lg font-bold text-white">7-Day Discipline</h4>
                  <p className="text-xs text-slate-400 mt-1">Complete 4h deep work daily.</p>
               </div>
               
               <div className="mt-6">
                  <div className="flex justify-between text-xs mb-2">
                     <span className="text-white font-bold">Day 4/7</span>
                     <span className="text-brand-accent">57%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                     <div className="w-[57%] h-full bg-brand-accent"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* --- 6. FLOATING FOCUS DOCK (PERSISTENT) --- */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50 transition-all duration-500 ${focusMode ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-95'}`}>
         <div className="bg-[#0B1121]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_0_50px_rgba(0,0,0,0.6)] flex items-center gap-2 ring-1 ring-white/5 relative overflow-hidden">
            
            {/* Ambient Dock Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>

            {/* Daily Intent Input */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-[#020617]/50 rounded-xl border border-white/5 focus-within:border-brand-cyber/50 transition-colors">
               <Crosshair className="w-4 h-4 text-slate-500" />
               <input 
                  type="text" 
                  value={dailyIntent}
                  onChange={(e) => setDailyIntent(e.target.value)}
                  placeholder="What is your single outcome today?" 
                  className="w-full bg-transparent border-none outline-none text-sm text-white placeholder-slate-600"
               />
            </div>

            {/* Time Awareness Pill */}
            <div className="hidden md:flex flex-col items-center px-4 border-l border-white/5">
               <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Time Left</span>
               <span className="text-xs font-mono font-bold text-white">4h 20m</span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/5">
               <button 
                  onClick={() => setShowReflection(!showReflection)}
                  className="p-2.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors relative group"
                  title="Daily Reflection"
               >
                  <CheckSquare className="w-5 h-5" />
                  {showReflection && (
                     <div className="absolute bottom-full right-0 mb-4 w-64 p-4 bg-[#0B1121] border border-white/10 rounded-xl shadow-2xl animate-in slide-in-from-bottom-2">
                        <h4 className="text-sm font-bold text-white mb-3">Session Check-in</h4>
                        <div className="flex gap-2 mb-3">
                           <button className="flex-1 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg text-xs font-bold flex justify-center gap-2"><ThumbsUp className="w-3 h-3" /> Focused</button>
                           <button className="flex-1 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-xs font-bold flex justify-center gap-2"><ThumbsDown className="w-3 h-3" /> Distracted</button>
                        </div>
                        <textarea className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-xs text-white resize-none" rows={2} placeholder="Note distractions..."></textarea>
                     </div>
                  )}
               </button>

               <button 
                  onClick={() => handleSmartPreset("Deep Work Mode", 60, "Instant Focus Mode Activated")}
                  className="group relative px-4 py-2.5 bg-brand-accent hover:bg-orange-600 rounded-xl text-white font-bold text-xs uppercase tracking-wide shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] transition-all flex items-center gap-2 overflow-hidden"
               >
                  <span className="relative z-10">Deep Mode</span>
                  <MousePointerClick className="w-4 h-4 relative z-10" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
               </button>
            </div>
         </div>
      </div>

    </div>
  );
};

export default DashboardHome;