import React from 'react';
import { 
  TrendingUp, Clock, Target, Calendar, Activity, 
  BrainCircuit, Zap, BarChart3, PieChart, AlertTriangle,
  Anchor, ArrowUpRight, GitCommit, Database, Layers,
  Compass, Search, Radio, Wifi, Battery, BatteryCharging,
  ShieldCheck, Crosshair, Map, Route, FileKey, Server, Lock, Shield,
  RotateCcw
} from 'lucide-react';
import SectionFade from '../ui/SectionFade';

const AnalyticsView: React.FC = () => {
  // Mock Data
  const heatmapData = Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => Math.random()));
  const cognitiveLoad = [30, 45, 60, 55, 85, 70, 60, 40, 30, 25];

  return (
    <div className="space-y-8 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-brand-cyber animate-pulse"></div>
              <span className="text-[10px] font-mono font-bold text-brand-cyber uppercase tracking-widest">System Intelligence v2.0</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Behavioral Analytics</h1>
           <p className="text-slate-400 max-w-xl">Deep pattern recognition and strategic architecture for your focus.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-colors">Export Report</button>
           <button className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-lg text-xs font-bold text-brand-accent hover:bg-brand-accent/20 transition-colors">Config</button>
        </div>
      </div>

      {/* SECTION 1: EXECUTIVE INTELLIGENCE (The "Core 4") */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
         {[
            { title: "Discipline Index", value: "89/100", sub: "Top 5% Global", icon: ShieldCheck, color: "text-brand-cyber", bg: "bg-brand-cyber/10", border: "border-brand-cyber/20" },
            { title: "Focus Quality", value: "92%", sub: "+4% vs Last Week", icon: Zap, color: "text-brand-purple", bg: "bg-brand-purple/10", border: "border-brand-purple/20" },
            { title: "Deep Work Ratio", value: "68%", sub: "2.5h Avg Session", icon: Layers, color: "text-brand-accent", bg: "bg-brand-accent/10", border: "border-brand-accent/20" },
            { title: "Drift Score", value: "Low", sub: "High Intent Alignment", icon: Crosshair, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
         ].map((stat, i) => (
            <SectionFade key={i} delay={i * 50}>
               <div className={`p-5 rounded-xl border ${stat.border} ${stat.bg} backdrop-blur-sm relative overflow-hidden group hover:bg-opacity-20 transition-all`}>
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">{stat.title}</p>
                        <h3 className="text-2xl font-display font-bold text-white">{stat.value}</h3>
                     </div>
                     <stat.icon className={`w-6 h-6 ${stat.color} opacity-80 group-hover:scale-110 transition-transform`} />
                  </div>
                  <div className="flex items-center gap-2">
                     <span className={`w-1.5 h-1.5 rounded-full ${stat.color}`}></span>
                     <p className="text-xs opacity-70">{stat.sub}</p>
                  </div>
               </div>
            </SectionFade>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         
         {/* SECTION 2: FOCUS ARCHITECTURE (REBUILT & EXPANDED) - LEFT COL */}
         <div className="xl:col-span-2 space-y-8">
            
            {/* GOAL ARCHITECTURE SYSTEM */}
            <SectionFade delay={200}>
               <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-32 bg-brand-cyber/5 blur-[80px] rounded-full pointer-events-none"></div>
                  
                  <div className="flex items-center justify-between mb-8 relative z-10">
                     <div className="flex items-center gap-3">
                        <Anchor className="w-5 h-5 text-brand-cyber" />
                        <h2 className="text-lg font-bold text-white">Focus Architecture</h2>
                     </div>
                     <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase">
                        <span>Tree View</span>
                        <div className="w-px h-3 bg-white/10"></div>
                        <span>Goal -> Milestone -> Session</span>
                     </div>
                  </div>

                  {/* VISUAL HIERARCHY TREE */}
                  <div className="space-y-6 relative z-10 pl-2">
                     {/* Root Goal */}
                     <div className="flex items-start gap-4 group">
                         <div className="flex flex-col items-center gap-1">
                            <div className="w-8 h-8 rounded-lg bg-brand-cyber flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                               <Target className="w-4 h-4 text-white" />
                            </div>
                            <div className="w-px h-full bg-gradient-to-b from-brand-cyber to-slate-800 min-h-[40px]"></div>
                         </div>
                         <div className="flex-1 bg-white/5 border border-white/5 rounded-xl p-4 hover:border-brand-cyber/30 transition-all">
                            <div className="flex justify-between mb-2">
                               <h3 className="font-bold text-white text-sm">Launch SaaS MVP</h3>
                               <span className="text-[10px] bg-brand-cyber/20 text-brand-cyber px-2 py-0.5 rounded border border-brand-cyber/20">Primary Objective</span>
                            </div>
                            <div className="w-full h-1.5 bg-black rounded-full overflow-hidden mb-2">
                               <div className="w-[65%] h-full bg-brand-cyber"></div>
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-500">
                               <span>Goal Alignment Score: 94/100</span>
                               <span>Est. Completion: Nov 15</span>
                            </div>
                         </div>
                     </div>

                     {/* Milestones (Branches) */}
                     {[
                        { title: "Backend Architecture", status: "Active", progress: 45, color: "bg-slate-500", icon: Database },
                        { title: "UI Component System", status: "Pending", progress: 10, color: "bg-slate-700", icon: Layers },
                     ].map((ms, idx) => (
                        <div key={idx} className="flex items-start gap-4 relative group">
                            {/* Connector Line Logic */}
                            <div className="absolute left-[15px] -top-6 w-[20px] h-[34px] border-l border-b border-slate-700 rounded-bl-xl pointer-events-none"></div>

                            <div className="flex flex-col items-center gap-1 ml-8">
                               <div className={`w-6 h-6 rounded-md bg-[#020617] border border-slate-700 flex items-center justify-center`}>
                                  <ms.icon className="w-3 h-3 text-slate-400" />
                               </div>
                               {idx === 0 && <div className="w-px h-full bg-slate-800 min-h-[30px]"></div>}
                            </div>

                            <div className="flex-1 bg-[#020617]/50 border border-white/5 rounded-xl p-3 hover:bg-white/5 transition-all cursor-pointer">
                               <div className="flex justify-between mb-1">
                                  <h4 className="font-bold text-slate-200 text-xs">{ms.title}</h4>
                                  <span className="text-[10px] text-slate-500 uppercase">{ms.status}</span>
                               </div>
                               
                               {/* Milestone Velocity & Stats */}
                               <div className="flex items-center gap-4 mt-2">
                                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                                     <Activity className="w-3 h-3 text-brand-accent" />
                                     <span>Velocity: High</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                                     <GitCommit className="w-3 h-3 text-brand-purple" />
                                     <span>12 Sessions Linked</span>
                                  </div>
                                  <div className="flex-1 text-right text-[10px] font-mono text-slate-600">
                                     Drift: <span className="text-green-500">0%</span>
                                  </div>
                               </div>
                            </div>
                        </div>
                     ))}
                  </div>
               </div>
            </SectionFade>
            
            {/* STRATEGIC METRICS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Cognitive Load Analysis */}
                <SectionFade delay={250}>
                   <div className="glass-panel p-5 rounded-xl border border-white/5 h-full">
                      <div className="flex justify-between items-start mb-6">
                         <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Cognitive Load</p>
                            <h3 className="text-sm font-bold text-white">Fatigue Threshold Analysis</h3>
                         </div>
                         <Battery className="w-5 h-5 text-slate-400" />
                      </div>
                      
                      {/* CSS Graph */}
                      <div className="h-32 w-full flex items-end justify-between gap-1 relative border-b border-white/10 pb-4">
                         <div className="absolute top-1/3 w-full h-px bg-red-500/20 border-t border-dashed border-red-500/50"></div> {/* Threshold Line */}
                         {cognitiveLoad.map((val, i) => (
                            <div key={i} className="flex-1 bg-brand-cyber/20 rounded-t-sm relative group">
                               <div 
                                 className={`absolute bottom-0 left-0 right-0 rounded-t-sm transition-all duration-1000 ${val > 75 ? 'bg-red-500' : 'bg-brand-cyber'}`}
                                 style={{ height: `${val}%` }}
                               ></div>
                            </div>
                         ))}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-2">Warning: Load exceeding 80% causes 40% drop in quality.</p>
                   </div>
                </SectionFade>

                {/* Behavioral Pattern Clustering */}
                <SectionFade delay={300}>
                   <div className="glass-panel p-5 rounded-xl border border-white/5 h-full relative overflow-hidden">
                      <div className="flex justify-between items-start mb-4 relative z-10">
                         <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Behavioral Clusters</p>
                            <h3 className="text-sm font-bold text-white">Work Mode Effectiveness</h3>
                         </div>
                         <BrainCircuit className="w-5 h-5 text-brand-purple" />
                      </div>
                      
                      {/* Abstract Bubble Chart Viz */}
                      <div className="relative h-32 w-full flex items-center justify-center z-10">
                         <div className="absolute w-20 h-20 rounded-full bg-brand-accent/20 border border-brand-accent/50 flex items-center justify-center text-[10px] font-bold text-white animate-float">
                            Deep
                         </div>
                         <div className="absolute left-4 top-4 w-14 h-14 rounded-full bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center text-[10px] text-slate-300">
                            Creation
                         </div>
                         <div className="absolute right-4 bottom-2 w-16 h-16 rounded-full bg-brand-cyber/10 border border-brand-cyber/30 flex items-center justify-center text-[10px] text-slate-300">
                            Study
                         </div>
                      </div>
                      <p className="text-[10px] text-center text-slate-500 relative z-10">Deep Work sessions yield 2.5x higher goal velocity.</p>
                   </div>
                </SectionFade>

            </div>

         </div>

         {/* SECTION 3: TEMPORAL & TACTICAL INTELLIGENCE - RIGHT COL */}
         <div className="space-y-6">
            
            {/* 24/7 HEATMAP */}
            <SectionFade delay={350}>
               <div className="glass-panel p-5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                     <Map className="w-4 h-4 text-slate-500" />
                     <h3 className="text-sm font-bold text-white uppercase tracking-wider">Focus Heatmap</h3>
                  </div>
                  
                  <div className="grid grid-cols-[auto_1fr] gap-2">
                     <div className="flex flex-col justify-between text-[8px] text-slate-600 font-mono py-1">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                     </div>
                     <div className="grid grid-rows-7 gap-1">
                        {heatmapData.map((day, d) => (
                           <div key={d} className="grid grid-cols-24 gap-0.5 h-3">
                              {day.map((hour, h) => (
                                 <div 
                                    key={h} 
                                    className="rounded-[1px]" 
                                    style={{ 
                                       backgroundColor: hour > 0.8 ? '#ea580c' : hour > 0.5 ? '#3b82f6' : hour > 0.2 ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.05)'
                                    }}
                                    title={`Day ${d+1}, Hour ${h}: ${(hour * 100).toFixed(0)}% Focus`}
                                 ></div>
                              ))}
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                     <span className="text-[10px] text-slate-500">00:00</span>
                     <span className="text-[10px] text-slate-500">12:00</span>
                     <span className="text-[10px] text-slate-500">23:59</span>
                  </div>
               </div>
            </SectionFade>
            
            {/* TACTICAL METRICS LIST */}
            <SectionFade delay={400}>
               <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                     <Compass className="w-4 h-4 text-slate-500" />
                     <h3 className="text-sm font-bold text-white uppercase tracking-wider">Tactical Metrics</h3>
                  </div>

                  {[
                     { label: "Session Length Efficacy", val: "50m", sub: "Optimal duration", icon: Clock },
                     { label: "Break Efficiency", val: "94%", sub: "Recharge rate", icon: BatteryCharging },
                     { label: "Recovery Speed", val: "12m", sub: "Time to resume flow", icon: RotateCcw },
                     { label: "Planned vs Actual", val: "98%", sub: "Estimation accuracy", icon: Target },
                  ].map((m, i) => (
                     <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                        <div className="flex items-center gap-3">
                           <div className="p-1.5 rounded bg-[#020617] text-slate-400"><m.icon className="w-3 h-3" /></div>
                           <div>
                              <p className="text-xs text-slate-300 font-bold">{m.label}</p>
                              <p className="text-[10px] text-slate-500">{m.sub}</p>
                           </div>
                        </div>
                        <span className="text-sm font-mono font-bold text-white">{m.val}</span>
                     </div>
                  ))}
               </div>
            </SectionFade>

            {/* DRIFT & RECOVERY */}
            <SectionFade delay={450}>
               <div className="p-5 rounded-xl border border-red-500/20 bg-red-500/5">
                  <div className="flex items-center gap-2 mb-4 text-red-400">
                     <AlertTriangle className="w-4 h-4" />
                     <h3 className="text-xs font-bold uppercase tracking-wider">Drift Detection</h3>
                  </div>
                  <div className="flex justify-between items-end mb-2">
                     <span className="text-2xl font-bold text-white">4.2%</span>
                     <span className="text-[10px] text-red-400 mb-1">Above Tolerance</span>
                  </div>
                  <div className="w-full bg-[#020617] h-1.5 rounded-full overflow-hidden">
                     <div className="h-full bg-red-500 w-[15%]"></div>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">Intent vs Action gap detected in evening sessions.</p>
               </div>
            </SectionFade>

         </div>
      </div>

      {/* SECTION 4: STRATEGIC FORECAST */}
      <SectionFade delay={500}>
         <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/5 relative overflow-hidden mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
               <div>
                  <div className="flex items-center gap-2 mb-1">
                     <Route className="w-4 h-4 text-brand-accent" />
                     <h2 className="text-lg font-bold text-white">Strategic Forecast</h2>
                  </div>
                  <p className="text-xs text-slate-400">AI-driven projection of discipline trajectory over next 30 days.</p>
               </div>
               <div className="flex gap-4">
                  <div className="text-right">
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Discipline Stability</p>
                     <p className="text-lg font-bold text-white">High (8.5)</p>
                  </div>
                  <div className="w-px h-8 bg-white/10"></div>
                  <div className="text-right">
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Integrity Score</p>
                     <p className="text-lg font-bold text-brand-cyber">98.2%</p>
                  </div>
               </div>
            </div>

            {/* Simulated Forecast Graph */}
            <div className="relative h-48 w-full border-b border-l border-white/10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]">
               {/* Trend Line */}
               <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                  <path d="M0,150 C100,140 200,160 300,100 C400,40 500,80 600,50 C700,20 800,40 900,10" fill="none" stroke="#3b82f6" strokeWidth="2" />
                  <path d="M900,10 C1000,-20 1100,0 1200,-10" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="4 4" /> {/* Forecast part */}
                  <circle cx="900" cy="10" r="4" fill="#020617" stroke="#white" strokeWidth="2" />
                  <text x="910" y="25" fill="#ea580c" fontSize="10" fontWeight="bold">Forecast</text>
               </svg>
            </div>
            
            {/* Recommendations Engine */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
               {[
                  { type: "Strategy", text: "Shift deep work block to 09:00 AM based on fatigue data." },
                  { type: "Warning", text: "Evening drift increasing. Enforce Focus Firewall after 6 PM." },
                  { type: "Optimization", text: "50m sessions yielding 15% better quality than 90m." }
               ].map((rec, i) => (
                  <div key={i} className="bg-[#020617] border border-white/5 p-3 rounded-lg flex items-start gap-3">
                     <div className="w-1 h-full bg-brand-cyber rounded-full"></div>
                     <div>
                        <p className="text-[10px] font-bold text-brand-cyber uppercase tracking-widest mb-1">{rec.type}</p>
                        <p className="text-xs text-slate-300 leading-relaxed">{rec.text}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </SectionFade>

      {/* SECTION 5: INFRASTRUCTURE & LOGS (Moved from Sessions) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-white/5">
          
          {/* Discipline Ledger */}
          <SectionFade delay={550}>
             <div className="glass-panel p-6 rounded-2xl border border-white/5">
                <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-slate-500" />
                      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Discipline Ledger</h3>
                   </div>
                   <div className="flex items-center gap-1.5 text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                      <ShieldCheck className="w-3 h-3" /> VERIFIED
                   </div>
                </div>
                
                <div className="space-y-2 font-mono text-[10px] text-slate-500">
                   <div className="grid grid-cols-12 gap-2 text-[8px] uppercase tracking-widest text-slate-600 mb-2 border-b border-white/5 pb-2">
                      <div className="col-span-4">Hash</div>
                      <div className="col-span-5">Action</div>
                      <div className="col-span-3 text-right">Timestamp</div>
                   </div>
                   {[
                      {hash: "0x8f...2a1b", action: "SESSION_COMPLETE", time: "14:02 UTC"},
                      {hash: "0x3c...9d4e", action: "STREAK_EXTEND", time: "09:55 UTC"},
                      {hash: "0x1a...7f8b", action: "PROTOCOL_INIT", time: "09:30 UTC"},
                      {hash: "0x9b...4c2d", action: "FIREWALL_ENGAGED", time: "Yesterday"},
                      {hash: "0x2e...1f9a", action: "GOAL_MILESTONE", time: "Yesterday"},
                   ].map((entry, i) => (
                      <div key={i} className="grid grid-cols-12 gap-2 p-2 hover:bg-white/5 rounded transition-colors cursor-default">
                         <div className="col-span-4 text-brand-cyber/70 truncate">{entry.hash}</div>
                         <div className="col-span-5 text-slate-300 truncate">{entry.action}</div>
                         <div className="col-span-3 text-right text-slate-600">{entry.time}</div>
                      </div>
                   ))}
                </div>
                <button className="w-full mt-4 py-2 border border-white/5 hover:bg-white/10 rounded text-xs text-slate-400 transition-colors">
                   View Full Chain History
                </button>
             </div>
          </SectionFade>

          {/* Protocol & System Status */}
          <SectionFade delay={600}>
             <div className="space-y-6">
                
                {/* Protocol Performance */}
                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                   <div className="flex items-center gap-2 mb-4">
                      <Layers className="w-4 h-4 text-slate-500" />
                      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Protocol Performance</h3>
                   </div>
                   <div className="space-y-3">
                      {[
                         { name: "Monk Mode", score: 98, usage: "High" },
                         { name: "90/20 Split", score: 85, usage: "Medium" },
                         { name: "Pomodoro Classic", score: 72, usage: "Low" }
                      ].map((p, i) => (
                         <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#020617] border border-white/5">
                            <span className="text-sm text-white font-medium">{p.name}</span>
                            <div className="flex items-center gap-4">
                               <div className="text-right">
                                  <div className="text-[10px] text-slate-500 uppercase">Eff. Score</div>
                                  <div className={`text-xs font-bold ${p.score > 90 ? 'text-brand-accent' : 'text-slate-300'}`}>{p.score}/100</div>
                               </div>
                               <div className="h-8 w-px bg-white/10"></div>
                               <div className="text-right">
                                  <div className="text-[10px] text-slate-500 uppercase">Usage</div>
                                  <div className="text-xs text-white">{p.usage}</div>
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>

                {/* Firewall Log (Mini) */}
                <div className="p-4 rounded-xl border border-white/5 bg-[#020617]">
                   <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                         <Lock className="w-3 h-3 text-slate-500" />
                         <span className="text-[10px] font-bold text-slate-500 uppercase">Firewall Log</span>
                      </div>
                      <span className="text-[10px] text-green-500">Active</span>
                   </div>
                   <p className="text-xs text-slate-400">
                      <span className="text-brand-accent">34</span> distractions blocked in last 24h.
                   </p>
                </div>

             </div>
          </SectionFade>
      </div>

    </div>
  );
};

export default AnalyticsView;