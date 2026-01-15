import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import { 
  Play, Zap, Clock, Target, Activity,
  Flame, BrainCircuit,
  Hourglass, MonitorPlay, RotateCcw,
  Pause, Sun, Moon, Crosshair, 
  ShieldAlert, MousePointerClick, Lock,
  Award, Users, Edit2, Save, CheckCircle2,
  ChevronRight
} from 'lucide-react';
import SectionFade from '../ui/SectionFade';
import { SessionRequest } from './DashboardLayout';
import { UserProfile, UserSession, Achievement, Ally } from '../../types';

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
  
  // --- DATABASE STATE ---
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [nextSession, setNextSession] = useState<UserSession | null>(null);
  const [calculatedPeak, setCalculatedPeak] = useState("Not enough data");
  const [avgSessionDuration, setAvgSessionDuration] = useState(0);
  
  // New Features State
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [allies, setAllies] = useState<Ally[]>([]);
  
  // Inputs
  const [intentInput, setIntentInput] = useState('');
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState('150');

  // Stopwatch State
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  // --- INITIALIZATION ---
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    fetchDashboardData();
    return () => clearInterval(timer);
  }, [user.id]);

  // Stopwatch Logic
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

  // --- DATA FETCHING & LOGIC ---
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // 1. Fetch Profile
      let { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // Handle New User creation if missing
      if (profileError && profileError.code === 'PGRST116') {
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{ 
            id: user.id, 
            full_name: user.user_metadata?.full_name,
            daily_goal_minutes: 150,
            minutes_focused_today: 0,
            discipline_index: 0,
            average_focus_score: 0,
            current_streak: 1, // First login counts as streak 1
            last_active_date: new Date().toISOString().split('T')[0],
            total_sessions_count: 0
          }])
          .select()
          .single();
        
        if (createError) throw createError;
        profileData = newProfile;
      }

      // --- LOGIN STREAK & DISCIPLINE LOGIC ---
      const today = new Date().toISOString().split('T')[0];
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterday = yesterdayDate.toISOString().split('T')[0];

      let updates: any = {};
      let needsUpdate = false;
      let calculatedStreak = profileData.current_streak;

      // Logic: Only update if the last active date isn't today
      if (profileData.last_active_date !== today) {
         if (profileData.last_active_date === yesterday) {
            // Consecutive login: Increment Streak
            calculatedStreak = (profileData.current_streak || 0) + 1;
         } else {
            // Missed a day: Reset Streak to 1
            calculatedStreak = 1;
         }

         // Calculate Discipline Index
         const newDisciplineIndex = Math.min(100, Math.round((calculatedStreak / 7) * 100));

         updates.current_streak = calculatedStreak;
         updates.discipline_index = newDisciplineIndex;
         updates.last_active_date = today;
         updates.minutes_focused_today = 0;
         
         needsUpdate = true;
         // Sync local object for subsequent logic
         profileData.current_streak = calculatedStreak;
         profileData.discipline_index = newDisciplineIndex;
      }

      // Sync DB if needed
      if (needsUpdate) {
         await supabase.from('profiles').update(updates).eq('id', user.id);
         profileData = { ...profileData, ...updates };
      }

      setProfile(profileData);
      setIntentInput(profileData?.daily_intent || '');
      setGoalInput(profileData?.daily_goal_minutes?.toString() || '150');

      // --- 2. FETCH ACHIEVEMENTS & UNLOCK LOGIC ---
      const { data: existingBadges } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', user.id);

      setAchievements(existingBadges || []);

      // Check "Consistent Builder" (Discipline Index > 80)
      const hasBuilderBadge = existingBadges?.some(b => b.badge_type === 'consistent_builder');
      
      if (profileData.discipline_index >= 80 && !hasBuilderBadge) {
          // Unlock Badge
          const { data: newBadge } = await supabase
            .from('achievements')
            .insert({ user_id: user.id, badge_type: 'consistent_builder' })
            .select()
            .single();
          
          if (newBadge) {
             setAchievements(prev => [...prev, newBadge]);
             // Optional: Trigger a toast here
          }
      }

      // --- 3. FETCH ALLIES ---
      // Fetch connections where status is 'accepted'
      const { data: alliesData } = await supabase
        .from('allies')
        .select('requester_id, accepter_id')
        .or(`requester_id.eq.${user.id},accepter_id.eq.${user.id}`)
        .eq('status', 'accepted');

      if (alliesData && alliesData.length > 0) {
          // Extract IDs of the *other* person
          const friendIds = alliesData.map(a => 
             a.requester_id === user.id ? a.accepter_id : a.requester_id
          );
          
          // Fetch names of these friends
          const { data: friendProfiles } = await supabase
            .from('profiles')
            .select('id, full_name')
            .in('id', friendIds);
            
          if (friendProfiles) {
             setAllies(friendProfiles.map(p => ({ 
                profile_id: p.id, 
                full_name: p.full_name || 'Ally' 
             })));
          }
      }

      // 4. Fetch Next Upcoming Session
      const { data: sessionData } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'scheduled')
        .gt('scheduled_at', new Date().toISOString())
        .order('scheduled_at', { ascending: true })
        .limit(1)
        .single();

      setNextSession(sessionData);

      // 5. Intelligence Layer (Peak Focus & Avg Duration)
      const { data: sessionHistory } = await supabase
        .from('sessions')
        .select('scheduled_at, actual_duration') // Include actual_duration
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .order('scheduled_at', { ascending: false })
        .limit(100);

      if (sessionHistory && sessionHistory.length > 0) {
          // Peak Focus Calculation
          const hourCounts: {[key: number]: number} = {};
          let totalDuration = 0;
          let validDurationCount = 0;

          sessionHistory.forEach(s => {
              const hour = new Date(s.scheduled_at).getHours();
              hourCounts[hour] = (hourCounts[hour] || 0) + 1;
              if (s.actual_duration) {
                  totalDuration += s.actual_duration;
                  validDurationCount++;
              }
          });
          
          // Set Peak
          if (Object.keys(hourCounts).length > 0) {
              const peakHour = Object.keys(hourCounts).reduce((a, b) => hourCounts[parseInt(a)] > hourCounts[parseInt(b)] ? a : b);
              const endHour = parseInt(peakHour) + 2;
              setCalculatedPeak(`${peakHour}:00 - ${endHour}:00`);
          }

          // Set Avg Duration
          const avgMins = validDurationCount > 0 ? Math.round(totalDuration / validDurationCount) : 0;
          setAvgSessionDuration(avgMins);
      } else {
        setCalculatedPeak("Needs 3+ Sessions");
        setAvgSessionDuration(0);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // --- ACTIONS ---

  const handleUpdateIntent = async () => {
    if (!profile) return;
    try {
      await supabase.from('profiles').update({ daily_intent: intentInput }).eq('id', user.id);
      setProfile({ ...profile, daily_intent: intentInput });
    } catch (error) { console.error(error); }
  };

  const handleUpdateGoal = async () => {
    if (!profile) return;
    try {
      const mins = parseInt(goalInput) || 150;
      await supabase.from('profiles').update({ daily_goal_minutes: mins }).eq('id', user.id);
      setProfile({ ...profile, daily_goal_minutes: mins });
      setIsEditingGoal(false);
    } catch (error) { console.error(error); }
  };

  // --- CORE LOGIC: SESSION COMPLETION ---
  const handleCompleteSession = async (title: string, durationMinutes: number, type: 'pomodoro' | 'deep_work' | 'freestyle') => {
    if (!profile) return;

    try {
      const sessionScore = 100;

      await supabase.from('sessions').insert({
        user_id: user.id,
        title: title,
        duration: durationMinutes,
        actual_duration: durationMinutes,
        focus_rating: sessionScore,
        type: type,
        status: 'completed',
        scheduled_at: new Date().toISOString()
      });

      // Update Aggregates
      const prevTotal = profile.total_sessions_count || 0;
      const prevAvg = profile.average_focus_score || 0;
      const newTotalSessions = prevTotal + 1;
      const newAvgScore = Math.round(((prevAvg * prevTotal) + sessionScore) / newTotalSessions);
      const newMinutesToday = (profile.minutes_focused_today || 0) + durationMinutes;

      const updates = {
        total_sessions_count: newTotalSessions,
        average_focus_score: newAvgScore,
        minutes_focused_today: newMinutesToday,
      };

      await supabase.from('profiles').update(updates).eq('id', user.id);

      fetchDashboardData();
      setStopwatchTime(0);
      setIsStopwatchRunning(false);

    } catch (error) {
      console.error('Error logging session:', error);
    }
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

  const formatStopwatch = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
    if (diffInSeconds < 0) return "Overdue";
    if (diffInSeconds < 60) return "Starting now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min`;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const progressPercent = profile 
    ? Math.min(100, Math.round((profile.minutes_focused_today / profile.daily_goal_minutes) * 100))
    : 0;
  
  const circleCircumference = 200;
  const strokeDashoffset = circleCircumference - (progressPercent / 100) * circleCircumference;

  // Determine Achievement Status
  const isBuilderUnlocked = achievements.some(a => a.badge_type === 'consistent_builder');

  return (
    <div className={`space-y-8 pb-32 transition-all duration-700 ${focusMode ? 'grayscale-[0.3]' : ''}`}>
      
      {/* 1. TOP HUD */}
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

      {/* 2. OVERVIEW CARDS */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 ${focusMode ? 'opacity-50 hover:opacity-100 transition-opacity' : ''}`}>
        
        {/* CARD 1: DAILY GOAL */}
        <SectionFade delay={100}>
          <div className="relative group h-40 glass-panel rounded-2xl border border-white/5 p-5 overflow-hidden transition-all duration-300 hover:border-brand-cyber/30">
             <div className="absolute top-0 right-0 p-4">
                <Target className="w-5 h-5 text-slate-600 group-hover:text-brand-cyber transition-colors" />
             </div>
             {isEditingGoal ? (
                <div className="h-full flex flex-col justify-center">
                   <label className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Set Target (Mins)</label>
                   <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        value={goalInput}
                        onChange={(e) => setGoalInput(e.target.value)}
                        className="w-20 bg-black/50 border border-brand-cyber rounded p-1 text-white font-bold"
                        autoFocus
                      />
                      <button onClick={handleUpdateGoal} className="p-1.5 bg-brand-cyber text-white rounded hover:bg-blue-600"><Save className="w-4 h-4" /></button>
                   </div>
                </div>
             ) : (
                <div className="flex items-center gap-6 h-full">
                    <div className="relative w-20 h-20">
                      <svg className="w-full h-full -rotate-90">
                          <circle cx="40" cy="40" r="32" stroke="#1e293b" strokeWidth="6" fill="transparent" />
                          <circle 
                            cx="40" cy="40" r="32" 
                            stroke="#3b82f6" strokeWidth="6" 
                            fill="transparent" 
                            strokeDasharray={circleCircumference} 
                            strokeDashoffset={strokeDashoffset} 
                            className="transition-all duration-1000 ease-out"
                          /> 
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center"><span className="text-sm font-bold text-white">{progressPercent}%</span></div>
                    </div>
                    <div className="group/edit cursor-pointer" onClick={() => setIsEditingGoal(true)}>
                      <div className="text-3xl font-display font-bold text-white flex items-center gap-2">
                        {profile ? Math.round(profile.minutes_focused_today / 60 * 10) / 10 : 0}
                        <span className="text-lg text-slate-500 font-sans font-normal">/ {(profile?.daily_goal_minutes || 150) / 60}h</span>
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-1 flex items-center gap-1 group-hover/edit:text-brand-cyber transition-colors">
                        Daily Progress <Edit2 className="w-3 h-3 opacity-0 group-hover/edit:opacity-100" />
                      </div>
                    </div>
                </div>
             )}
          </div>
        </SectionFade>

        {/* CARD 2: STREAK */}
        <SectionFade delay={150}>
          <div className="relative group h-40 glass-panel rounded-2xl border border-white/5 p-5 overflow-hidden transition-all duration-300 hover:border-brand-accent/30">
             <div className="absolute top-0 right-0 p-4"><Flame className="w-5 h-5 text-slate-600 group-hover:text-brand-accent transition-colors" /></div>
             <div className="flex flex-col justify-center h-full">
                <div className="flex items-baseline gap-2">
                   <span className="text-4xl font-display font-bold text-white">
                      {loading ? '-' : profile?.current_streak || 0}
                   </span>
                   <span className="text-sm font-medium text-brand-accent">Days</span>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-2">Current Streak</div>
             </div>
          </div>
        </SectionFade>

        {/* CARD 3: TOTAL SESSIONS & AVG DURATION (Dynamic from Sessions) */}
        <SectionFade delay={200}>
          <div className="relative group h-40 glass-panel rounded-2xl border border-white/5 p-5 overflow-hidden transition-all duration-300 hover:border-brand-purple/30">
             <div className="absolute top-0 right-0 p-4"><Activity className="w-5 h-5 text-slate-600 group-hover:text-brand-purple transition-colors" /></div>
             <div className="grid grid-cols-2 gap-4 h-full content-center">
                <div>
                   <div className="text-2xl font-bold text-white">{loading ? '-' : profile?.total_sessions_count || 0}</div>
                   <div className="text-[10px] uppercase tracking-wider text-slate-500">Sessions</div>
                </div>
                <div>
                   <div className="text-2xl font-bold text-white">
                      {loading ? '-' : (avgSessionDuration > 0 ? `${avgSessionDuration}m` : '0m')}
                   </div>
                   <div className="text-[10px] uppercase tracking-wider text-slate-500">Avg Session</div>
                </div>
             </div>
          </div>
        </SectionFade>

        {/* CARD 4: UP NEXT */}
        <SectionFade delay={250}>
           <div className="relative group h-40 rounded-2xl p-0.5 bg-gradient-to-br from-brand-accent/20 to-brand-dark overflow-hidden">
              <div className="absolute inset-0 bg-brand-accent/10 blur-xl"></div>
              <div className="relative h-full bg-[#0B1121] rounded-[14px] p-5 flex flex-col justify-between overflow-hidden">
                 {nextSession ? (
                   <>
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                           <Clock className="w-3 h-3 text-brand-accent animate-pulse" />
                           <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wider">
                              Starts: {formatTime(nextSession.scheduled_at)}
                           </span>
                        </div>
                        <div className="font-bold text-white leading-tight line-clamp-2">{nextSession.title}</div>
                     </div>
                     <button onClick={() => onChangeView('sessions')} className="w-full py-2.5 bg-brand-accent hover:bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all">
                        <Play className="w-3 h-3 fill-current" /> Initialize
                     </button>
                   </>
                 ) : (
                   <div className="flex flex-col items-center justify-center h-full text-center">
                      <Clock className="w-6 h-6 text-slate-700 mb-2" />
                      <p className="text-sm font-bold text-slate-500">No sessions scheduled</p>
                      <button onClick={() => onChangeView('sessions')} className="mt-2 text-[10px] uppercase font-bold text-brand-accent hover:text-white transition-colors">
                        + Plan Next
                      </button>
                   </div>
                 )}
              </div>
           </div>
        </SectionFade>
      </div>

      {/* 3. FOCUS CONTROL CENTER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <SectionFade delay={300} className="lg:col-span-2">
            <div className="glass-panel border border-white/5 rounded-3xl p-1 h-full flex flex-col relative overflow-hidden">
               <div className="flex p-1 gap-1 bg-[#020617]/50 rounded-t-[22px]">
                   <button 
                      onClick={() => setActiveTab('pomodoro')} 
                      className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2 ${activeTab === 'pomodoro' ? 'bg-white/10 text-white shadow-lg border border-white/10' : 'text-slate-500 hover:text-white'}`}
                   >
                      <BrainCircuit className={`w-4 h-4 ${activeTab === 'pomodoro' ? 'text-brand-accent' : ''}`} /> Pomodoro
                   </button>
                   <button 
                      onClick={() => setActiveTab('stopwatch')} 
                      className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2 ${activeTab === 'stopwatch' ? 'bg-white/10 text-white shadow-lg border border-white/10' : 'text-slate-500 hover:text-white'}`}
                   >
                      <Hourglass className={`w-4 h-4 ${activeTab === 'stopwatch' ? 'text-brand-accent' : ''}`} /> Stopwatch
                   </button>
               </div>

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
                            <button 
                               onClick={() => handleCompleteSession('Unstructured Freestyle', Math.ceil(stopwatchTime / 60), 'freestyle')}
                               className="mt-6 text-xs font-bold text-brand-accent hover:text-white border-b border-brand-accent/30 hover:border-white pb-1 transition-all"
                            >
                               Save Session & Update Streak
                            </button>
                         )}
                      </div>
                   )}
               </div>
            </div>
         </SectionFade>
         
         {/* Smart Presets */}
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
                        onClick={() => onRequestSession({ title: p.title, duration: p.min, type: 'deep_work', autoOpen: true })}
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
         </div>
      </div>

      {/* --- 4. INTELLIGENCE LAYER --- */}
      <div className={`mt-12 transition-all duration-700 ${focusMode ? 'opacity-30 pointer-events-none blur-sm' : ''}`}>
         <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0B1121] to-[#020617] border border-white/10 flex items-center justify-center">
               <BrainCircuit className="w-4 h-4 text-brand-cyber" />
            </div>
            <div>
               <h3 className="text-lg font-display font-bold text-white leading-none">Intelligence Layer</h3>
               <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Pattern Recognition Active</p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* CARD 1: DISCIPLINE INDEX */}
            <SectionFade delay={600}>
               <div className="glass-panel p-5 rounded-2xl border border-white/5 relative group hover:border-brand-accent/30 transition-all h-full">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-2 rounded-lg bg-white/5 text-slate-400 group-hover:text-brand-accent transition-colors"><ShieldAlert className="w-4 h-4" /></div>
                     <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">Active</span>
                  </div>
                  <div className="flex items-end gap-2 mb-1">
                     <span className="text-3xl font-bold text-white">{profile?.discipline_index || 0}</span>
                     <span className="text-sm text-slate-500 mb-1">/ 100</span>
                  </div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-4">Discipline Index</p>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-gradient-to-r from-brand-accent to-orange-400" style={{width: `${profile?.discipline_index || 0}%`}}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">Based on 7-day consistency.</p>
               </div>
            </SectionFade>

            {/* CARD 2: PEAK FOCUS */}
            <SectionFade delay={650}>
               <div className="glass-panel p-5 rounded-2xl border border-white/5 relative group hover:border-brand-cyber/30 transition-all h-full">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-2 rounded-lg bg-white/5 text-slate-400 group-hover:text-brand-cyber transition-colors"><Activity className="w-4 h-4" /></div>
                     <span className="text-[10px] text-slate-500 font-mono">HISTORICAL</span>
                  </div>
                  <div className="flex items-end gap-1 h-12 mb-4">
                     {Array.from({length: 12}).map((_, i) => (
                        <div key={i} className={`flex-1 rounded-sm ${i > 4 && i < 8 ? 'bg-brand-cyber' : 'bg-white/5'}`} style={{height: `${Math.random() * 80 + 20}%`}}></div>
                     ))}
                  </div>
                  <p className="text-xs text-white font-bold">Peak Focus: {calculatedPeak}</p>
                  <p className="text-[10px] text-slate-500 mt-1">Calculated from session history.</p>
               </div>
            </SectionFade>

            {/* CARD 3: FOCUS IDENTITY (Dynamic Achievement) */}
            <SectionFade delay={700}>
               <div className={`glass-panel p-5 rounded-2xl border relative group transition-all h-full overflow-hidden ${isBuilderUnlocked ? 'border-brand-purple/40 hover:border-brand-purple/60 shadow-[0_0_20px_rgba(139,92,246,0.1)]' : 'border-white/5 hover:border-white/20'}`}>
                  {isBuilderUnlocked && <div className="absolute top-0 right-0 p-32 bg-brand-purple/5 blur-3xl rounded-full group-hover:bg-brand-purple/10 transition-all"></div>}
                  
                  <div className="flex justify-between items-start mb-4 relative z-10">
                     <div className={`p-2 rounded-lg bg-white/5 transition-colors ${isBuilderUnlocked ? 'text-brand-purple bg-brand-purple/10' : 'text-slate-400'}`}>
                        <Award className="w-4 h-4" />
                     </div>
                     {isBuilderUnlocked ? (
                        <span className="text-[10px] bg-brand-purple/20 text-brand-purple px-1.5 py-0.5 rounded border border-brand-purple/20 font-bold">UNLOCKED</span>
                     ) : (
                        <Lock className="w-3 h-3 text-slate-600" />
                     )}
                  </div>
                  
                  <div className="relative z-10">
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-white/5 px-2 py-0.5 rounded bg-white/5">Identity</span>
                     <h4 className={`text-lg font-bold mt-2 ${isBuilderUnlocked ? 'text-white' : 'text-slate-500'}`}>Consistent Builder</h4>
                     <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                        {isBuilderUnlocked 
                           ? "Achievement Unlocked! You have maintained a discipline index above 80."
                           : "Maintain Discipline Index > 80 to unlock this identity badge."}
                     </p>
                  </div>
               </div>
            </SectionFade>

             {/* CARD 4: ACCOUNTABILITY PARTNER (Real-time Allies) */}
            <SectionFade delay={750}>
               <div className="glass-panel p-5 rounded-2xl border border-white/5 relative group hover:border-white/20 transition-all h-full">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-2 rounded-lg bg-white/5 text-slate-400 group-hover:text-white transition-colors"><Users className="w-4 h-4" /></div>
                     <div className="flex -space-x-2">
                        {/* User Avatar */}
                        <div className="w-6 h-6 rounded-full bg-slate-700 border border-[#0B1121] flex items-center justify-center text-[8px] text-white font-bold">{firstName[0]}</div>
                        {/* Ally Avatars */}
                        {allies.slice(0, 2).map((ally, idx) => (
                           <div key={idx} className="w-6 h-6 rounded-full bg-brand-accent border border-[#0B1121] flex items-center justify-center text-[8px] font-bold text-white" title={ally.full_name}>
                              {ally.full_name[0]}
                           </div>
                        ))}
                        {allies.length > 2 && (
                           <div className="w-6 h-6 rounded-full bg-slate-800 border border-[#0B1121] flex items-center justify-center text-[8px] font-bold text-slate-400">+{allies.length - 2}</div>
                        )}
                     </div>
                  </div>
                  
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Accountability</p>
                  
                  {allies.length > 0 ? (
                     <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-sm font-bold text-white">{allies.length} Allies Active</span>
                     </div>
                  ) : (
                     <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                        <span className="text-sm font-bold text-slate-400">No Allies Yet</span>
                     </div>
                  )}

                  <button 
                     onClick={() => onChangeView('community')}
                     className="w-full py-1.5 rounded bg-white/5 text-[10px] font-bold text-slate-300 hover:bg-white/10 transition-colors uppercase flex items-center justify-center gap-1 group/btn"
                  >
                     {allies.length > 0 ? 'View Ally Status' : 'Find Allies'} <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
               </div>
            </SectionFade>
         </div>
      </div>

      {/* --- 5. FLOATING FOCUS DOCK --- */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50 transition-all duration-500 ${focusMode ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-95'}`}>
         <div className="bg-[#0B1121]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_0_50px_rgba(0,0,0,0.6)] flex items-center gap-2 ring-1 ring-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>

            <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-[#020617]/50 rounded-xl border border-white/5 focus-within:border-brand-cyber/50 transition-colors">
               <Crosshair className="w-4 h-4 text-slate-500" />
               <input 
                  type="text" 
                  value={intentInput}
                  onChange={(e) => setIntentInput(e.target.value)}
                  onBlur={handleUpdateIntent}
                  onKeyDown={(e) => e.key === 'Enter' && handleUpdateIntent()}
                  placeholder="What is your single outcome today?" 
                  className="w-full bg-transparent border-none outline-none text-sm text-white placeholder-slate-600"
               />
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-white/5">
               <button 
                  onClick={() => handleUpdateIntent()}
                  className="p-2.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors relative group"
               >
                  <Save className="w-4 h-4" />
               </button>

               <button 
                  onClick={() => onRequestSession({ title: "Deep Work Mode", duration: 60, type: 'deep_work', autoOpen: true })}
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