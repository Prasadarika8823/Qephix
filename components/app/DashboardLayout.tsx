import React, { useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { 
  LayoutDashboard, 
  Timer, 
  BarChart2, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User as UserIcon
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import BackgroundGrid from '../BackgroundGrid';
import DashboardHome from './DashboardHome';
import SessionsView from './SessionsView';
import AnalyticsView from './AnalyticsView';
import CommunityView from './CommunityView';
import SettingsView from './SettingsView';
import ProfileView from './ProfileView';
import ChatOverlay from './ChatOverlay';

interface DashboardLayoutProps {
  session: Session;
}

type ViewState = 'home' | 'sessions' | 'analytics' | 'community' | 'settings' | 'profile';

export interface SessionRequest {
  title?: string;
  duration?: number;
  type?: 'pomodoro' | 'deep_work' | 'freestyle';
  goal?: string;
  autoOpen: boolean;
}

interface Ally {
  name: string;
  role: string;
  status: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ session }) => {
  const activeViewInitial = 'home';
  const [activeView, setActiveView] = useState<ViewState>('home');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  
  // Bridge state to pass focus tool data to Sessions view
  const [sessionRequest, setSessionRequest] = useState<SessionRequest | null>(null);

  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChatAlly, setActiveChatAlly] = useState<Ally | null>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleSessionRequest = (request: SessionRequest) => {
    setSessionRequest(request);
    setActiveView('sessions');
    // Auto collapse chat if focusing
    setIsChatOpen(false);
  };

  const handleOpenChat = (ally: Ally) => {
    setActiveChatAlly(ally);
    setIsChatOpen(true);
  };

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sessions', label: 'Sessions', icon: Timer },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'community', label: 'Community', icon: Users },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'home': 
        return (
          <DashboardHome 
            user={session.user} 
            onChangeView={setActiveView} 
            onRequestSession={handleSessionRequest}
            onOpenChat={handleOpenChat}
          />
        );
      case 'sessions': 
        return <SessionsView initialConfig={sessionRequest} onConfigConsumed={() => setSessionRequest(null)} />;
      case 'analytics': return <AnalyticsView />;
      case 'community': return <CommunityView />;
      case 'settings': return <SettingsView user={session.user} />;
      case 'profile': return <ProfileView user={session.user} onOpenChat={handleOpenChat} />;
      default: return <DashboardHome user={session.user} onChangeView={setActiveView} onRequestSession={handleSessionRequest} onOpenChat={handleOpenChat} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-accent selection:text-white overflow-hidden flex">
      <BackgroundGrid />
      
      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden lg:flex flex-col w-72 h-screen fixed left-0 top-0 border-r border-white/5 bg-[#020617]/80 backdrop-blur-xl z-50">
        {/* Logo Area */}
        <div 
          className="p-8 flex items-center gap-3 cursor-pointer"
          onClick={() => setActiveView('home')}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-brand-cyber to-brand-purple rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <span className="font-display font-bold text-white text-lg">Q</span>
          </div>
          <span className="font-display font-bold text-xl tracking-widest text-white">QEPHIX</span>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ViewState)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                activeView === item.id 
                  ? 'text-white bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-colors ${activeView === item.id ? 'text-brand-accent' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span className="font-medium tracking-wide">{item.label}</span>
              
              {activeView === item.id && (
                <div className="absolute inset-y-0 left-0 w-1 bg-brand-accent shadow-[0_0_10px_#ea580c]"></div>
              )}
            </button>
          ))}
          
          {/* Divider */}
          <div className="my-4 border-t border-white/5 mx-4"></div>

           {/* Profile & Settings (Separate Group) */}
           <button
              onClick={() => setActiveView('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                activeView === 'profile' 
                  ? 'text-white bg-white/5 border border-white/10' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <UserIcon className={`w-5 h-5 transition-colors ${activeView === 'profile' ? 'text-brand-accent' : 'text-slate-500'}`} />
              <span className="font-medium tracking-wide">Profile</span>
           </button>
           
           <button
              onClick={() => setActiveView('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                activeView === 'settings' 
                  ? 'text-white bg-white/5 border border-white/10' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className={`w-5 h-5 transition-colors ${activeView === 'settings' ? 'text-brand-accent' : 'text-slate-500'}`} />
              <span className="font-medium tracking-wide">Settings</span>
           </button>
        </nav>

        {/* User Mini Profile */}
        <div className="p-4 border-t border-white/5">
          <div 
             className="flex items-center gap-3 px-4 py-3 mb-2 cursor-pointer hover:bg-white/5 rounded-lg transition-colors"
             onClick={() => setActiveView('profile')}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-cyber to-brand-purple border border-white/10 flex items-center justify-center text-white text-xs font-bold">
               {session.user.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
               <p className="text-sm font-medium text-white truncate">{session.user.user_metadata?.full_name || 'User'}</p>
               <p className="text-xs text-slate-500 truncate">Online</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header & Nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#020617]/90 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-4">
         <div className="flex items-center gap-2" onClick={() => setActiveView('home')}>
            <div className="w-6 h-6 bg-gradient-to-br from-brand-cyber to-brand-purple rounded flex items-center justify-center">
              <span className="font-display font-bold text-white text-xs">Q</span>
            </div>
            <span className="font-display font-bold text-lg tracking-widest text-white">QEPHIX</span>
         </div>
         <button onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} className="text-slate-300">
            {isMobileNavOpen ? <X /> : <Menu />}
         </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-40 bg-[#020617] pt-20 px-6 lg:hidden animate-in slide-in-from-right duration-200 overflow-y-auto">
           <nav className="space-y-2 pb-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id as ViewState);
                  setIsMobileNavOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl border ${
                  activeView === item.id 
                    ? 'bg-white/5 border-brand-accent/30 text-white' 
                    : 'border-transparent text-slate-400'
                }`}
              >
                <item.icon className={activeView === item.id ? 'text-brand-accent' : ''} />
                <span className="text-lg font-medium">{item.label}</span>
              </button>
            ))}
            
            <div className="h-px bg-white/10 my-4"></div>
            
            <button
                onClick={() => { setActiveView('profile'); setIsMobileNavOpen(false); }}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl border ${
                  activeView === 'profile' ? 'bg-white/5 border-brand-accent/30 text-white' : 'border-transparent text-slate-400'
                }`}
            >
                <UserIcon />
                <span className="text-lg font-medium">Profile</span>
            </button>
            
            <button
                onClick={() => { setActiveView('settings'); setIsMobileNavOpen(false); }}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl border ${
                  activeView === 'settings' ? 'bg-white/5 border-brand-accent/30 text-white' : 'border-transparent text-slate-400'
                }`}
            >
                <Settings />
                <span className="text-lg font-medium">Settings</span>
            </button>

             <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-xl border border-transparent text-red-400 mt-4"
            >
              <LogOut />
              <span className="text-lg font-medium">Sign Out</span>
            </button>
           </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 pt-16 lg:pt-0 min-h-screen relative z-10 overflow-y-auto custom-scrollbar">
        <div className="p-6 lg:p-12 max-w-7xl mx-auto animate-in fade-in duration-500">
          {renderView()}
        </div>
      </main>

      {/* Global Chat Overlay */}
      <ChatOverlay 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        ally={activeChatAlly} 
      />
    </div>
  );
};

export default DashboardLayout;