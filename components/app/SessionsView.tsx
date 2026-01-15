import React, { useState } from 'react';
import { Plus, MoreVertical, Play, Calendar, Trash2, Edit2, Clock } from 'lucide-react';
import SectionFade from '../ui/SectionFade';

const SessionsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Mock Data
  const [sessions, setSessions] = useState([
    { id: 1, title: "Deep Reading: Philosophy", duration: "60m", goal: "Read 2 chapters of Meditations", date: "Today, 4:00 PM", status: "upcoming" },
    { id: 2, title: "Code Review", duration: "45m", goal: "Clear PR backlog", date: "Tomorrow, 9:00 AM", status: "upcoming" },
    { id: 3, title: "React Architecture", duration: "90m", goal: "Refactor Context API", date: "Yesterday", status: "completed" },
    { id: 4, title: "Email Zero", duration: "30m", goal: "Clear inbox", date: "Yesterday", status: "completed" }
  ]);

  const filteredSessions = sessions.filter(s => s.status === activeTab);

  const handleDelete = (id: number) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-8 min-h-[80vh]">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Focus Sessions</h1>
          <p className="text-slate-400">Manage your upcoming blocks and review history.</p>
        </div>
        <button 
          onClick={() => setIsCreateOpen(true)}
          className="px-6 py-3 bg-brand-accent hover:bg-orange-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Create Session
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-[#0B1121] p-1 rounded-xl w-fit border border-white/5">
        <button 
          onClick={() => setActiveTab('upcoming')}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'upcoming' ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
        >
          Upcoming
        </button>
        <button 
          onClick={() => setActiveTab('completed')}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'completed' ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
        >
          History
        </button>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSessions.map((session) => (
          <SectionFade key={session.id}>
            <div className="group relative bg-[#0B1121]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-brand-accent/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,0,0,0.4)] overflow-hidden">
              
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 flex items-center gap-2">
                    <Clock className="w-3 h-3 text-brand-accent" /> {session.duration}
                  </div>
                  <div className="flex gap-2">
                     <button onClick={() => handleDelete(session.id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                     </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{session.title}</h3>
                <p className="text-sm text-slate-400 mb-6 min-h-[40px]">{session.goal}</p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" /> {session.date}
                  </div>
                  
                  {activeTab === 'upcoming' && (
                    <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-brand-accent text-white border border-white/10 hover:border-brand-accent font-bold text-sm transition-all flex items-center gap-2 group-hover:shadow-[0_0_15px_rgba(234,88,12,0.4)]">
                      <Play className="w-3 h-3 fill-current" /> Start
                    </button>
                  )}
                  {activeTab === 'completed' && (
                     <span className="text-brand-cyber text-sm font-bold">Completed</span>
                  )}
                </div>
              </div>
            </div>
          </SectionFade>
        ))}
      </div>

      {filteredSessions.length === 0 && (
         <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
            <p className="text-slate-500">No sessions found in this view.</p>
         </div>
      )}

      {/* Create Modal (Visual Only for Demo) */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsCreateOpen(false)}></div>
           <div className="relative w-full max-w-lg bg-[#0B1121] border border-white/10 rounded-2xl p-8 shadow-2xl animate-in zoom-in-95">
              <h2 className="text-2xl font-bold text-white mb-6">Create Focus Session</h2>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsCreateOpen(false); }}>
                 <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Session Title</label>
                    <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent outline-none transition-colors" placeholder="e.g., Deep Work Project A" autoFocus />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Duration (Min)</label>
                      <input type="number" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent outline-none transition-colors" defaultValue={45} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Date</label>
                      <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent outline-none transition-colors" defaultValue="Today" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Primary Goal</label>
                    <textarea className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent outline-none transition-colors h-24" placeholder="What specific outcome do you want?" />
                 </div>
                 <div className="flex justify-end gap-3 mt-6">
                    <button type="button" onClick={() => setIsCreateOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-brand-accent rounded-lg text-white font-bold hover:bg-orange-600 transition-colors shadow-lg">Create Session</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default SessionsView;