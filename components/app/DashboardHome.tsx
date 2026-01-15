import React from 'react';
import { User } from '@supabase/supabase-js';
import { Play, TrendingUp, Calendar, Clock, ArrowUpRight, Zap } from 'lucide-react';

interface DashboardHomeProps {
  user: User;
  onChangeView: (view: any) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ user, onChangeView }) => {
  const userName = user.user_metadata?.full_name?.split(' ')[0] || 'Traveler';

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">{userName}</span>
          </h1>
          <p className="text-slate-400">Your systems are optimal. Ready to focus?</p>
        </div>
        <button className="group relative px-8 py-4 bg-gradient-to-r from-brand-accent to-orange-700 rounded-xl text-white font-bold tracking-wide shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_40px_rgba(234,88,12,0.5)] transition-all duration-300 hover:scale-[1.02] flex items-center gap-3 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Play className="w-5 h-5 fill-current" />
          <span>Start Focus Session</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Weekly Focus', value: '12.5 hrs', sub: '+15% vs last week', icon: Clock, color: 'text-brand-cyber' },
          { label: 'Current Streak', value: '4 Days', sub: 'Keep it up', icon: Zap, color: 'text-brand-accent' },
          { label: 'Sessions', value: '8', sub: 'Completed this week', icon: Calendar, color: 'text-brand-purple' },
          { label: 'Efficiency', value: '94%', sub: 'Deep work ratio', icon: TrendingUp, color: 'text-emerald-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 hover:bg-white/[0.03] transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              {i === 0 && <div className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> 12%</div>}
            </div>
            <h3 className="text-3xl font-display font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="text-xs text-slate-500 mt-2">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activity / Sessions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recent Sessions</h2>
            <button onClick={() => onChangeView('sessions')} className="text-sm text-brand-accent hover:text-white transition-colors">View All</button>
          </div>
          
          <div className="space-y-3">
            {[
              { title: "React Architecture Study", time: "45 min", date: "Today, 10:00 AM", score: "High Focus" },
              { title: "System Design Interview Prep", time: "90 min", date: "Yesterday, 2:00 PM", score: "Deep Work" },
              { title: "Algorithm Practice", time: "60 min", date: "Yesterday, 11:00 AM", score: "Flow State" }
            ].map((session, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[#0B1121]/50 border border-white/5 hover:border-brand-accent/30 transition-all hover:bg-[#0B1121] group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-dark to-slate-900 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-brand-accent transition-colors">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors">{session.title}</h4>
                    <p className="text-xs text-slate-500">{session.date} • {session.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-medium bg-brand-cyber/10 text-brand-cyber border border-brand-cyber/20">
                    {session.score}
                  </span>
                  <button className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Goal / Streak */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Focus Trajectory</h2>
          
          <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp className="w-32 h-32 text-brand-accent" />
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2 relative z-10">Daily Goal</h3>
            <div className="flex items-end gap-2 mb-4 relative z-10">
              <span className="text-4xl font-display font-bold text-white">2.5</span>
              <span className="text-sm text-slate-400 mb-2">/ 4 hrs</span>
            </div>
            
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-2 relative z-10">
              <div className="h-full bg-gradient-to-r from-brand-accent to-orange-500 w-[65%] rounded-full shadow-[0_0_10px_#ea580c]"></div>
            </div>
            <p className="text-xs text-slate-400 relative z-10">65% Completed</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-gradient-to-b from-brand-cyber/5 to-transparent">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-brand-cyber" />
              <h3 className="font-bold text-white">Upcoming Session</h3>
            </div>
            <div className="p-4 rounded-xl bg-[#020617] border border-white/10 mb-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Starts in 20 min</p>
              <h4 className="font-bold text-white">Deep Work: Project Alpha</h4>
            </div>
            <button className="w-full py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-sm font-bold text-white transition-all">
              Prepare Environment
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;