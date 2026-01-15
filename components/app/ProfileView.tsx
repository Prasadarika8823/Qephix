import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { 
  MapPin, Link as LinkIcon, Calendar, Edit3, 
  Award, Zap, Clock, TrendingUp, CheckCircle2, 
  Share2, Grid, List
} from 'lucide-react';
import SectionFade from '../ui/SectionFade';

interface ProfileViewProps {
  user: User;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'achievements'>('overview');

  const stats = [
    { label: 'Total Focus', value: '142h', icon: Clock, color: 'text-brand-cyber' },
    { label: 'Current Streak', value: '12 Days', icon: Zap, color: 'text-brand-accent' },
    { label: 'Sessions', value: '84', icon: CheckCircle2, color: 'text-brand-purple' },
  ];

  const achievements = [
    { id: 1, title: 'Deep Work Disciple', desc: 'Complete 100 hours of focus', icon: Award, progress: 85, color: 'text-yellow-500' },
    { id: 2, title: 'Night Owl', desc: '5 sessions after midnight', icon:  Calendar, progress: 100, color: 'text-brand-purple' },
    { id: 3, title: 'Early Riser', desc: '10 sessions before 8am', icon: Zap, progress: 40, color: 'text-brand-accent' },
    { id: 4, title: 'Perfect Week', desc: '7 day streak', icon: TrendingUp, progress: 100, color: 'text-emerald-400' },
  ];

  const history = [
    { title: "Advanced System Design", date: "Today, 2:30 PM", duration: "90m", type: "Deep Work" },
    { title: "React Query Refactor", date: "Yesterday, 10:00 AM", duration: "60m", type: "Coding" },
    { title: "Documentation Review", date: "Oct 24, 4:00 PM", duration: "45m", type: "Admin" },
    { title: "Algorithm Study", date: "Oct 23, 8:00 PM", duration: "120m", type: "Study" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Profile Header */}
      <div className="relative">
        {/* Banner */}
        <div className="h-48 w-full rounded-2xl bg-gradient-to-r from-brand-navy via-brand-dark to-brand-navy border border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-brand-cyber/5" style={{backgroundImage: 'radial-gradient(circle at 50% 50%, #3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.3}}></div>
          <div className="absolute top-0 right-0 p-32 bg-brand-accent/20 blur-[100px] rounded-full pointer-events-none"></div>
        </div>

        {/* User Info Bar */}
        <div className="px-6 pb-6 -mt-16 relative flex flex-col md:flex-row items-end md:items-center gap-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-[#020617] p-1.5 border border-white/10 shadow-2xl relative z-10">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-brand-cyber to-brand-purple flex items-center justify-center text-4xl font-bold text-white shadow-inner">
                {user.email?.[0].toUpperCase()}
              </div>
            </div>
            <button className="absolute bottom-2 right-2 z-20 p-2 rounded-full bg-brand-accent text-white shadow-lg hover:bg-orange-600 transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 mb-2">
            <h1 className="text-3xl font-display font-bold text-white mb-1">
              {user.user_metadata?.full_name || 'Protocol User'}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                <span className="text-brand-accent">@</span>{user.email?.split('@')[0]}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Global Grid
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Joined Oct 2023
              </span>
            </div>
            <p className="mt-3 text-slate-300 max-w-xl text-sm leading-relaxed">
              Software Engineer focused on high-performance systems. Building the future of digital infrastructure.
            </p>
          </div>

          <div className="flex gap-3 mb-2">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium transition-all flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="px-4 py-2 bg-brand-accent hover:bg-orange-600 text-white rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.5)] transition-all">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <SectionFade key={i} delay={i * 50}>
            <div className="glass-panel p-5 rounded-xl border border-white/5 flex items-center gap-4 hover:bg-white/[0.02] transition-colors">
              <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </SectionFade>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-white/5 flex gap-8">
        {[
          { id: 'overview', label: 'Overview', icon: Grid },
          { id: 'history', label: 'Activity', icon: List },
          { id: 'achievements', label: 'Achievements', icon: Award },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
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

      {/* Content Area */}
      <div className="min-h-[300px]">
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4 duration-500">
            {achievements.map((item) => (
              <div key={item.id} className="group bg-[#0B1121]/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden hover:border-white/10 transition-all">
                 <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-white mb-1">{item.title}</h3>
                 <p className="text-xs text-slate-500 mb-4">{item.desc}</p>
                 
                 {/* Progress Bar */}
                 <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${item.progress === 100 ? 'bg-gradient-to-r from-brand-accent to-brand-purple' : 'bg-slate-600'}`} style={{width: `${item.progress}%`}}></div>
                 </div>
                 <p className="text-[10px] text-right text-slate-500 mt-1">{item.progress}%</p>
              </div>
            ))}
            
            {/* Locked Slot */}
            <div className="border border-dashed border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center opacity-50">
               <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-2">
                 <Award className="w-6 h-6 text-slate-600" />
               </div>
               <p className="text-xs text-slate-500 font-bold">???</p>
               <p className="text-[10px] text-slate-600">Hidden Achievement</p>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
           <div className="space-y-2 animate-in slide-in-from-bottom-4 duration-500">
             {history.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[#0B1121]/30 border border-white/5 hover:bg-[#0B1121] transition-colors group">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-brand-cyber transition-colors">
                         <Clock className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors">{item.title}</h4>
                         <p className="text-xs text-slate-500">{item.date}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <span className="block font-mono text-sm text-brand-accent">{item.duration}</span>
                      <span className="text-xs text-slate-600 uppercase tracking-wide">{item.type}</span>
                   </div>
                </div>
             ))}
           </div>
        )}

        {activeTab === 'overview' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
             <div className="glass-panel p-8 rounded-2xl border border-white/5 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Contribution Graph</h3>
                <p className="text-slate-400 text-sm mb-8">Visualizing your focus intensity over the last 30 days.</p>
                
                {/* Simulated Contribution Graph */}
                <div className="flex flex-wrap justify-center gap-1 max-w-2xl mx-auto">
                   {Array.from({ length: 90 }).map((_, i) => {
                      const intensity = Math.random();
                      let color = 'bg-white/5';
                      if (intensity > 0.8) color = 'bg-brand-accent';
                      else if (intensity > 0.6) color = 'bg-brand-accent/60';
                      else if (intensity > 0.3) color = 'bg-brand-accent/30';
                      
                      return (
                         <div key={i} className={`w-3 h-3 rounded-sm ${color} hover:scale-125 transition-transform cursor-default`} title="2.5 hrs focused"></div>
                      )
                   })}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;