import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RotateCcw, StopCircle, 
  History, Calendar, Clock, Zap, CheckCircle2,
  BrainCircuit, ArrowRight, Activity, Timer
} from 'lucide-react';
import SectionFade from '../ui/SectionFade';
import { SessionRequest } from './DashboardLayout';

interface SessionsViewProps {
  initialConfig?: SessionRequest | null;
  onConfigConsumed?: () => void;
}

interface SessionRecord {
  id: number;
  title: string;
  duration: number;
  date: string;
  status: 'completed' | 'interrupted';
  score: number;
}

const SessionsView: React.FC<SessionsViewProps> = ({ initialConfig, onConfigConsumed }) => {
  // --- State ---
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(25); // Default minutes
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [sessionTitle, setSessionTitle] = useState("Deep Focus");
  const [sessionIntent, setSessionIntent] = useState("");
  
  // History State (Mocked for now to ensure "like before" feel without complex DB deps)
  const [history, setHistory] = useState<SessionRecord[]>([
    { id: 1, title: "Morning Deep Work", duration: 50, date: "Today, 09:00 AM", status: "completed", score: 100 },
    { id: 2, title: "React Component Review", duration: 25, date: "Yesterday, 02:00 PM", status: "completed", score: 95 },
    { id: 3, title: "System Architecture", duration: 45, date: "Yesterday, 11:00 AM", status: "interrupted", score: 60 },
  ]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --- 1. Auto-Start from Dashboard Request ---
  useEffect(() => {
    if (initialConfig) {
      if (initialConfig.autoOpen) {
        startSession(
           initialConfig.duration || 25, 
           initialConfig.title || "Quick Session",
           initialConfig.goal || ""
        );
      }
      if (onConfigConsumed) onConfigConsumed();
    }
  }, [initialConfig]);

  // --- 2. Timer Logic ---
  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isPaused]);

  // --- Actions ---

  const startSession = (mins: number, title?: string, intent?: string) => {
    setDuration(mins);
    setTimeLeft(mins * 60);
    setSessionTitle(title || "Focus Session");
    setSessionIntent(intent || "");
    setIsActive(true);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    if (window.confirm("End session early? Progress will be saved as interrupted.")) {
      addToHistory('interrupted');
      setIsActive(false);
    }
  };

  const handleComplete = () => {
    addToHistory('completed');
    setIsActive(false);
    // Play sound or notification here
    alert("Session Complete!");
  };

  const addToHistory = (status: 'completed' | 'interrupted') => {
     const newRecord: SessionRecord = {
        id: Date.now(),
        title: sessionTitle,
        duration: duration,
        date: "Just now",
        status: status,
        score: status === 'completed' ? 100 : 50
     };
     setHistory(prev => [newRecord, ...prev]);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  // --- VIEW: ACTIVE SESSION OVERLAY ---
  if (isActive) {
    return (
      <div className="fixed inset-0 z-50 bg-[#020617] flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
         {/* Background Pulse */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[100px] transition-all duration-1000 ${isPaused ? 'opacity-20 scale-90' : 'opacity-50 animate-pulse-slow'}`}></div>
         </div>

         <div className="relative z-10 text-center max-w-2xl w-full px-6">
            <div className="mb-8">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                  <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-yellow-500' : 'bg-brand-accent animate-pulse'}`}></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                     {isPaused ? 'Protocol Paused' : 'Focus Protocol Active'}
                  </span>
               </div>
               <h2 className="text-3xl font-bold text-white mb-2">{sessionTitle}</h2>
               {sessionIntent && <p className="text-slate-400 italic">"{sessionIntent}"</p>}
            </div>

            {/* Timer Display */}
            <div className="relative w-80 h-80 mx-auto mb-12 flex items-center justify-center">
               {/* Progress Ring */}
               <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="160" cy="160" r="156" stroke="#1e293b" strokeWidth="2" fill="transparent" />
                  <circle 
                    cx="160" cy="160" r="156" 
                    stroke="#ea580c" strokeWidth="4" 
                    fill="transparent" 
                    strokeDasharray={980} 
                    strokeDashoffset={980 - (980 * progress) / 100} 
                    className="transition-all duration-1000 ease-linear"
                  /> 
               </svg>
               
               <div className="text-center">
                  <div className="text-7xl font-display font-bold text-white tabular-nums tracking-tighter">
                     {formatTime(timeLeft)}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest mt-2">Remaining</div>
               </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
               <button 
                  onClick={togglePause}
                  className="w-16 h-16 rounded-full bg-white text-brand-dark flex items-center justify-center hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
               >
                  {isPaused ? <Play className="w-6 h-6 fill-current ml-1" /> : <Pause className="w-6 h-6 fill-current" />}
               </button>
               <button 
                  onClick={handleStop}
                  className="w-16 h-16 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-red-400 hover:border-red-500/50 flex items-center justify-center transition-all"
               >
                  <StopCircle className="w-6 h-6" />
               </button>
            </div>
         </div>
      </div>
    );
  }

  // --- VIEW: DASHBOARD (Inactive) ---
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
       
       {/* LEFT: History Log */}
       <div className="lg:col-span-7 space-y-6">
          <SectionFade>
             <div className="flex items-center gap-3 mb-6">
                <History className="w-5 h-5 text-brand-cyber" />
                <h2 className="text-xl font-bold text-white">Session Log</h2>
             </div>
             
             <div className="space-y-3">
                {history.map((session) => (
                   <div key={session.id} className="group p-4 rounded-xl border border-white/5 bg-[#0B1121]/50 hover:bg-[#0B1121] hover:border-white/10 transition-all flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${session.status === 'completed' ? 'bg-brand-cyber/10 text-brand-cyber' : 'bg-red-500/10 text-red-500'}`}>
                            {session.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                         </div>
                         <div>
                            <h4 className="font-bold text-white text-sm">{session.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                               <Calendar className="w-3 h-3" /> {session.date}
                            </div>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="font-mono font-bold text-white">{session.duration}m</div>
                         <div className={`text-[10px] font-bold uppercase ${session.score >= 90 ? 'text-green-500' : 'text-yellow-500'}`}>
                            Score: {session.score}
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </SectionFade>
       </div>

       {/* RIGHT: Quick Start */}
       <div className="lg:col-span-5">
          <SectionFade delay={100}>
             <div className="glass-panel p-8 rounded-3xl border border-white/10 sticky top-6">
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-10 h-10 rounded-xl bg-brand-accent/20 flex items-center justify-center">
                      <Timer className="w-6 h-6 text-brand-accent" />
                   </div>
                   <div>
                      <h2 className="text-xl font-bold text-white">Quick Start</h2>
                      <p className="text-xs text-slate-400">Initialize new protocol</p>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Session Name</label>
                      <input 
                        type="text" 
                        value={sessionTitle}
                        onChange={(e) => setSessionTitle(e.target.value)}
                        className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 text-white focus:border-brand-accent outline-none transition-all"
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Duration (Minutes)</label>
                      <div className="grid grid-cols-4 gap-2">
                         {[25, 45, 60, 90].map(m => (
                            <button 
                              key={m}
                              onClick={() => setDuration(m)}
                              className={`py-3 rounded-lg text-sm font-bold border transition-all ${duration === m ? 'bg-white text-brand-dark border-white' : 'bg-[#020617] text-slate-400 border-white/10 hover:border-white/30'}`}
                            >
                               {m}m
                            </button>
                         ))}
                      </div>
                   </div>

                   <button 
                      onClick={() => startSession(duration, sessionTitle)}
                      className="w-full py-4 mt-4 bg-gradient-to-r from-brand-accent to-orange-600 hover:opacity-90 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group"
                   >
                      Initialize Session <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
             </div>
          </SectionFade>
       </div>

    </div>
  );
};

export default SessionsView;