import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Users, Search, Filter, ShieldCheck, Zap, 
  Clock, Target, BrainCircuit, Activity, Globe, 
  CheckCircle2, ArrowRight, Layers, Hash, 
  UserPlus, Radio, Lock, Loader2
} from 'lucide-react';
import SectionFade from '../ui/SectionFade';

// --- Types ---
interface ProfileSearchResult {
  id: string;
  full_name: string;
  discipline_index: number;
}

const CommunityView: React.FC = () => {
  // --- State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<ProfileSearchResult[]>([]);
  const [requestSentMap, setRequestSentMap] = useState<{[key:string]: boolean}>({});
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUser(data.user?.id || null);
    });
  }, []);

  // --- Search Logic ---
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, discipline_index')
        .ilike('full_name', `%${searchQuery}%`)
        .limit(10);
      
      if (error) throw error;
      
      // Filter out self
      const filtered = (data || []).filter(p => p.id !== currentUser);
      setSearchResults(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const sendAllyRequest = async (targetUserId: string) => {
    if (!currentUser) return;
    try {
      const { error } = await supabase
        .from('allies')
        .insert({
          requester_id: currentUser,
          accepter_id: targetUserId,
          status: 'pending'
        });

      if (error) {
        // If duplicate (already requested), just mark as sent for UI feedback
        if (error.code === '23505') { 
           console.log("Request already exists");
        } else {
           throw error;
        }
      }
      
      setRequestSentMap(prev => ({ ...prev, [targetUserId]: true }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-8 gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
              </span>
              <span className="text-brand-accent text-[10px] font-bold uppercase tracking-widest">Global Focus Grid</span>
           </div>
           <h1 className="text-3xl font-display font-bold text-white mb-2">Disciplined Network</h1>
           <p className="text-slate-400 max-w-lg text-sm">Find serious peers. Presence creates accountability.</p>
        </div>
        
        {/* Ambient Stats */}
        <div className="flex gap-6">
           <div className="text-right">
              <div className="text-2xl font-bold text-white">1,402</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Active Minds</div>
           </div>
           <div className="w-px h-10 bg-white/10"></div>
           <div className="text-right">
              <div className="text-2xl font-bold text-brand-cyber">98.4%</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Completion Rate</div>
           </div>
        </div>
      </div>

      {/* SEARCH MODULE */}
      <div className="bg-[#0B1121]/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-2xl">
         <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Find Allies</h2>
         <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-accent transition-colors" />
               <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name..."
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-slate-600 focus:border-brand-accent focus:outline-none transition-all"
               />
            </div>
            <button 
               type="submit"
               disabled={isSearching}
               className="px-6 py-3 bg-brand-accent hover:bg-orange-600 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-50"
            >
               {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
            </button>
         </form>

         {/* Search Results */}
         {searchResults.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-4">
               {searchResults.map((profile) => (
                  <div key={profile.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#020617] border border-white/10 flex items-center justify-center font-bold text-white">
                           {profile.full_name[0]}
                        </div>
                        <div>
                           <h4 className="text-sm font-bold text-white">{profile.full_name}</h4>
                           <div className="flex items-center gap-1.5">
                              <ShieldCheck className="w-3 h-3 text-brand-cyber" />
                              <span className="text-xs text-slate-400">Index: {profile.discipline_index || 0}</span>
                           </div>
                        </div>
                     </div>
                     <button
                        onClick={() => sendAllyRequest(profile.id)}
                        disabled={requestSentMap[profile.id]}
                        className={`p-2 rounded-lg transition-all ${
                           requestSentMap[profile.id] 
                             ? 'bg-green-500/10 text-green-500 cursor-default' 
                             : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
                        }`}
                     >
                        {requestSentMap[profile.id] ? <CheckCircle2 className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                     </button>
                  </div>
               ))}
            </div>
         )}
         
         {searchResults.length === 0 && searchQuery && !isSearching && (
            <div className="mt-6 text-center text-slate-500 text-sm">
               No travelers found with that designation.
            </div>
         )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Placeholder for future community features */}
         <div className="lg:col-span-3 text-center py-12 border border-dashed border-white/5 rounded-2xl">
            <Globe className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-500">Global Protocol Sessions</h3>
            <p className="text-sm text-slate-600 mt-2">Live sessions coming in next system update.</p>
         </div>
      </div>
    </div>
  );
};

export default CommunityView;