import React from 'react';
import { TrendingUp, Clock, Target, Calendar } from 'lucide-react';
import SectionFade from '../ui/SectionFade';

const AnalyticsView: React.FC = () => {
  // CSS-only bar chart generation
  const weeklyData = [65, 40, 75, 55, 90, 30, 60]; // Percentages
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-2">Performance Analytics</h1>
        <p className="text-slate-400">Quantify your discipline. Visualizing effort over time.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Hours', value: '42.5', unit: 'hrs', icon: Clock, change: '+12%', color: 'from-blue-500 to-blue-600' },
          { label: 'Sessions', value: '38', unit: 'total', icon: Target, change: '+5%', color: 'from-purple-500 to-purple-600' },
          { label: 'Completion', value: '94', unit: '%', icon: TrendingUp, change: '+2%', color: 'from-emerald-500 to-emerald-600' },
          { label: 'Best Streak', value: '12', unit: 'days', icon: Calendar, change: 'Active', color: 'from-orange-500 to-brand-accent' },
        ].map((stat, i) => (
          <SectionFade key={i} delay={i * 50}>
            <div className="relative overflow-hidden rounded-2xl bg-[#0B1121] border border-white/5 p-6 group">
              <div className={`absolute top-0 right-0 p-4 opacity-5 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                <stat.icon className="w-16 h-16" />
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{stat.value}</span>
                <span className="text-sm text-slate-500">{stat.unit}</span>
              </div>
              <div className={`mt-4 text-xs font-bold inline-block px-2 py-1 rounded bg-white/5 ${stat.change.includes('+') ? 'text-green-400' : 'text-brand-accent'}`}>
                {stat.change}
              </div>
              <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color} w-0 group-hover:w-full transition-all duration-700`}></div>
            </div>
          </SectionFade>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center mb-8">
             <h3 className="text-xl font-bold text-white">Focus Distribution (Weekly)</h3>
             <select className="bg-[#020617] border border-white/10 text-white text-sm rounded-lg px-3 py-1 outline-none">
                <option>This Week</option>
                <option>Last Week</option>
                <option>Last Month</option>
             </select>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 md:gap-4">
             {weeklyData.map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                   <div className="w-full relative h-full flex items-end">
                      <div 
                        className={`w-full rounded-t-lg bg-gradient-to-t from-brand-cyber/20 to-brand-cyber/60 group-hover:from-brand-accent/20 group-hover:to-brand-accent transition-all duration-500 relative`}
                        style={{ height: `${height}%` }}
                      >
                         {/* Tooltip */}
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                            {height}% Goal
                         </div>
                      </div>
                   </div>
                   <span className="text-xs text-slate-500 font-medium">{days[i]}</span>
                </div>
             ))}
          </div>
        </div>

        {/* Breakdown Circle */}
        <div className="glass-panel p-8 rounded-2xl border border-white/5 flex flex-col items-center justify-center relative">
           <h3 className="text-xl font-bold text-white mb-8 w-full text-left">Session Types</h3>
           
           <div className="relative w-48 h-48 mb-8">
              {/* CSS Conic Gradient Pie Chart */}
              <div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(#ea580c 0% 40%, #3b82f6 40% 70%, #8b5cf6 70% 100%)' }}></div>
              <div className="absolute inset-4 bg-[#0B1121] rounded-full flex items-center justify-center flex-col">
                 <span className="text-3xl font-bold text-white">128</span>
                 <span className="text-xs text-slate-500 uppercase tracking-widest">Sessions</span>
              </div>
           </div>

           <div className="w-full space-y-3">
              <div className="flex items-center justify-between text-sm">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-accent"></div>
                    <span className="text-slate-300">Deep Work</span>
                 </div>
                 <span className="font-bold text-white">40%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-cyber"></div>
                    <span className="text-slate-300">Study</span>
                 </div>
                 <span className="font-bold text-white">30%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-purple"></div>
                    <span className="text-slate-300">Creation</span>
                 </div>
                 <span className="font-bold text-white">30%</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;