import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import { 
  MapPin, Calendar, Edit3, Shield, Zap, Clock, 
  TrendingUp, CheckCircle2, Lock, Eye, Users, 
  GraduationCap, Briefcase, FileText, Handshake, 
  Search, ShieldCheck, Activity, Globe, Scale,
  MessageSquare, Award, Loader2
} from 'lucide-react';
import SectionFade from '../ui/SectionFade';
import { UserProfile, Achievement, Ally } from '../../types';

interface ProfileViewProps {
  user: User;
  onOpenChat?: (ally: any) => void;
}

type RelationshipView = 'self' | 'ally' | 'observer';
type Tab = 'dossier' | 'network' | 'pacts';

const ProfileView: React.FC<ProfileViewProps> = ({ user, onOpenChat }) => {
  const [viewMode, setViewMode] = useState<RelationshipView>('self');
  const [activeTab, setActiveTab] = useState<Tab>('dossier');
  
  // --- REAL DATA STATE ---
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [allies, setAllies] = useState<Ally[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);

  useEffect(() => {
    fetchProfileData();
  }, [user.id]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      
      // 1. Fetch Profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(profileData);

      // 2. Fetch Achievements
      const { data: badgeData } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', user.id);
      setAchievements(badgeData || []);

      // 3. Fetch Allies (Accepted)
      const { data: alliesData } = await supabase
        .from('allies')
        .select('requester_id, accepter_id')
        .or(`requester_id.eq.${user.id},accepter_id.eq.${user.id}`)
        .eq('status', 'accepted');

      if (alliesData && alliesData.length > 0) {
          const friendIds = alliesData.map(a => 
             a.requester_id === user.id ? a.accepter_id : a.requester_id
          );
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
      } else {
        setAllies([]);
      }

    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
     return <div className="flex items-center justify-center h-64 text-brand-accent animate-pulse"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  // --- DERIVED STATE ---
  const identity = {
    fullName: profile?.full_name || user.user_metadata?.full_name || 'Protocol User',
    handle: `@${user.email?.split('@')[0]}`,
    role: "System Architect", // Placeholder as 'role' isn't in DB yet
    institution: "QEPHIX Protocol",
    location: "Global Grid",
    disciplineStatement: profile?.daily_intent || "Building resilient systems through consistent deep work.",
    reliability: profile?.discipline_index || 0,
    joined: new Date(user.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
  };

  const hasBuilderBadge = achievements.some(a => a.badge_type === 'consistent_builder');

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      
      {/* 1. IDENTITY MATRIX (Header) */}
      <div className="relative glass-panel rounded-2xl border border-white/5 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[#0B1121]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-navy/60 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-dark/80 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
        </div>

        <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
           {/* Avatar / Identity Signal */}
           <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-[#020617] p-1 border border-white/10 shadow-2xl">
                 <div className="w-full h-full rounded-xl bg-gradient-to-br from-brand-cyber/20 to-brand-purple/20 flex items-center justify-center text-4xl font-display font-bold text-white relative overflow-hidden group">
                    <span className="relative z-10">{identity.fullName[0]}</span>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 </div>
              </div>
              {/* Integrity Badge */}
              <div className="absolute -bottom-3 -right-3 bg-[#020617] p-1.5 rounded-lg border border-white/10 shadow-lg flex items-center gap-1.5" title="Discipline Index">
                 <ShieldCheck className="w-4 h-4 text-brand-accent" />
                 <span className="text-xs font-bold text-white">{identity.reliability}</span>
              </div>
           </div>

           {/* Core Info */}
           <div className="flex-1 space-y-4">
              <div>
                 <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                    <h1 className="text-3xl font-display font-bold text-white tracking-tight">{identity.fullName}</h1>
                    <span className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-slate-400 font-mono">{identity.handle}</span>
                 </div>
                 <p className="text-slate-400 text-sm italic border-l-2 border-brand-accent/50 pl-3 py-1">
                    "{identity.disciplineStatement}"
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                 <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-400">
                       <Briefcase className="w-4 h-4 text-brand-cyber" />
                       <span className="text-slate-200">{identity.role}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                       <GraduationCap className="w-4 h-4 text-brand-purple" />
                       <span className="text-slate-200">{identity.institution}</span>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-400">
                       <Globe className="w-4 h-4 text-slate-500" />
                       <span className="text-slate-200">{identity.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                       <Calendar className="w-4 h-4 text-slate-500" />
                       <span className="text-slate-200">Deployed {identity.joined}</span>
                    </div>
                 </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap gap-3 pt-2">
                 {viewMode === 'self' && (
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-white transition-all flex items-center gap-2">
                       <Edit3 className="w-3 h-3" /> Edit Dossier
                    </button>
                 )}
                 {viewMode === 'self' && (
                    <button className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-lg text-xs font-bold text-brand-accent hover:bg-brand-accent/20 transition-all flex items-center gap-2">
                       <Zap className="w-3 h-3" /> Signal Mentorship
                    </button>
                 )}
              </div>
           </div>
        </div>

        {/* Visibility Controller (Self Only) */}
        <div className="bg-[#020617]/50 border-t border-white/5 p-2 flex justify-center md:justify-end gap-2">
           <span className="text-[10px] text-slate-500 uppercase font-bold self-center mr-2">Preview Profile As:</span>
           {(['self', 'ally', 'observer'] as const).map(mode => (
              <button 
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded text-[10px] uppercase font-bold transition-all ${viewMode === mode ? 'bg-white text-brand-dark' : 'text-slate-500 hover:text-white'}`}
              >
                 {mode}
              </button>
           ))}
        </div>
      </div>

      {/* 2. NAVIGATION TABS */}
      <div className="flex items-center gap-8 border-b border-white/5 px-2">
         {[
            { id: 'dossier', label: 'Discipline Dossier', icon: FileText },
            { id: 'network', label: 'Alliance Network', icon: Users },
            { id: 'pacts', label: 'Accountability Pacts', icon: Handshake },
         ].map(tab => (
            <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as Tab)}
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

      {/* 3. DYNAMIC CONTENT AREA */}
      <div className="min-h-[400px]">
         
         {/* --- TAB: DOSSIER (Stats & Focus Areas) --- */}
         {activeTab === 'dossier' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4 duration-300">
               
               {/* Left Col: High Level Stats */}
               <div className="lg:col-span-2 space-y-6">
                  {/* Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     {/* Total Focus */}
                     <div className="glass-panel p-5 rounded-xl border border-white/5 flex flex-col justify-between h-32 group">
                        <div className="flex justify-between items-start">
                           <Clock className="w-5 h-5 text-brand-cyber" />
                           {viewMode === 'ally' && <UnlockBadge />}
                        </div>
                        <div>
                           <div className="text-2xl font-display font-bold text-white">
                              {profile ? Math.round((profile.total_sessions_count * 50) / 60) : 0}h
                           </div>
                           <div className="text-[10px] uppercase tracking-widest text-slate-500">Total Deep Work</div>
                        </div>
                     </div>

                     {/* Streak */}
                     <div className="glass-panel p-5 rounded-xl border border-white/5 flex flex-col justify-between h-32 group">
                        <div className="flex justify-between items-start">
                           <TrendingUp className="w-5 h-5 text-brand-accent" />
                           {viewMode === 'ally' && <UnlockBadge />}
                        </div>
                        <div>
                           <div className="text-2xl font-display font-bold text-white">
                              {profile?.current_streak || 0} Days
                           </div>
                           <div className="text-[10px] uppercase tracking-widest text-slate-500">Consistency Streak</div>
                        </div>
                     </div>

                     {/* Integrity */}
                     <div className="glass-panel p-5 rounded-xl border border-white/5 flex flex-col justify-between h-32 group">
                        <div className="flex justify-between items-start">
                           <ShieldCheck className="w-5 h-5 text-brand-purple" />
                        </div>
                        <div>
                           <div className="text-2xl font-display font-bold text-white">
                              {profile?.discipline_index || 0}%
                           </div>
                           <div className="text-[10px] uppercase tracking-widest text-slate-500">Discipline Index</div>
                        </div>
                     </div>
                  </div>

                  {/* Badges / Reputation */}
                  <div className="glass-panel p-5 rounded-2xl border border-white/5">
                     <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Reputation & Achievements</h3>
                     
                     <div className="space-y-3">
                        {achievements.length === 0 && (
                            <div className="text-center py-6 text-slate-500 text-xs italic">
                                No achievements unlocked yet. Consistent effort is required.
                            </div>
                        )}

                        {hasBuilderBadge && (
                           <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-brand-purple/20 to-brand-cyber/20 border border-brand-purple/30">
                              <div className="p-2 rounded-lg bg-brand-purple/20 text-brand-purple">
                                 <Award className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="text-white text-xs font-bold">Consistent Builder</p>
                                 <p className="text-[10px] text-slate-400">Discipline Index > 80 achieved.</p>
                              </div>
                              <div className="ml-auto px-2 py-0.5 rounded border border-brand-purple/30 text-[10px] text-brand-purple font-bold uppercase bg-brand-purple/10">
                                 Unlocked
                              </div>
                           </div>
                        )}

                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 opacity-50">
                           <Shield className="w-5 h-5 text-slate-500" />
                           <div>
                              <p className="text-slate-400 text-xs font-bold">Iron Will (Locked)</p>
                              <p className="text-[10px] text-slate-600">Reach a 30-day streak.</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Right Col: Identity & Goals */}
               <div className="space-y-6">
                  {/* Current Goal */}
                  <div className="p-1 rounded-2xl bg-gradient-to-br from-brand-accent/20 to-brand-dark">
                     <div className="bg-[#0B1121] rounded-xl p-5 border border-brand-accent/20 h-full">
                        <div className="flex items-center gap-2 mb-3">
                           <Activity className="w-4 h-4 text-brand-accent" />
                           <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">Daily Protocol</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Daily Intent</h3>
                        <p className="text-xs text-slate-400 mb-4 italic">"{profile?.daily_intent || "No intent set for today."}"</p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                           <span>System Tracking</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* --- TAB: NETWORK (Allies) --- */}
         {activeTab === 'network' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-300">
               {/* My Allies */}
               <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                     <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Allies ({allies.length})</h3>
                     <button className="text-[10px] text-brand-accent font-bold hover:underline">Find New Allies</button>
                  </div>
                  
                  {allies.length === 0 ? (
                      <div className="glass-panel p-8 rounded-xl border border-white/5 text-center">
                          <Users className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                          <p className="text-slate-400 text-sm font-bold">No Allies Connected</p>
                          <p className="text-slate-600 text-xs mt-1 mb-4">Focus is better with accountability.</p>
                          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg border border-white/10 transition-colors">
                              Go to Community Search
                          </button>
                      </div>
                  ) : (
                      allies.map((ally, i) => (
                         <div key={i} className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between group hover:border-brand-accent/30 transition-all">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-lg bg-[#020617] flex items-center justify-center text-white font-bold border border-white/10">
                                  {ally.full_name[0]}
                               </div>
                               <div>
                                  <h4 className="text-white font-bold text-sm">{ally.full_name}</h4>
                                  <p className="text-xs text-slate-500">Protocol Ally</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-2">
                               <button 
                                 onClick={() => onOpenChat && onOpenChat({ name: ally.full_name, role: 'Ally', status: 'Online' })}
                                 className="p-2 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                               >
                                  <MessageSquare className="w-4 h-4" />
                               </button>
                            </div>
                         </div>
                      ))
                  )}

                  {/* Add New Slot */}
                  {allies.length > 0 && (
                      <div className="border border-dashed border-white/10 rounded-xl p-4 flex items-center justify-center gap-2 text-slate-500 hover:text-white hover:border-white/30 cursor-pointer transition-all">
                         <Search className="w-4 h-4" />
                         <span className="text-xs font-bold uppercase">Discover More Peers</span>
                      </div>
                  )}
               </div>

               {/* Incoming Requests Placeholder */}
               <div className="glass-panel p-6 rounded-2xl border border-white/5 h-fit">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Pending Requests</h3>
                  <div className="text-center py-6 text-slate-600 text-xs italic">
                      No pending requests at this time.
                  </div>
               </div>
            </div>
         )}

         {/* --- TAB: PACTS (Placeholder) --- */}
         {activeTab === 'pacts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-300">
               {/* Create New Pact */}
               <div className="border border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-slate-500 hover:text-white hover:border-brand-accent/30 cursor-pointer transition-all min-h-[200px]">
                  <Handshake className="w-8 h-8" />
                  <span className="text-sm font-bold uppercase tracking-wide">Draft New Protocol</span>
               </div>
            </div>
         )}
      </div>

    </div>
  );
};

// Helper Component for Badges
const UnlockBadge = ({ text = "Ally Access" }: { text?: string }) => (
   <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-brand-accent/10 border border-brand-accent/20">
      <Eye className="w-3 h-3 text-brand-accent" />
      <span className="text-[10px] text-brand-accent font-bold uppercase">{text}</span>
   </div>
);

export default ProfileView;