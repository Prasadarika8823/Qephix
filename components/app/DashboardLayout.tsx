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
  Zap
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import BackgroundGrid from '../BackgroundGrid';
import DashboardHome from './DashboardHome';
import SessionsView from './SessionsView';
import AnalyticsView from './AnalyticsView';
import CommunityView from './CommunityView';
import SettingsView from './SettingsView';

interface DashboardLayoutProps {
  session: Session;
}

type ViewState = 'home' | 'sessions' | 'analytics' | 'community' | 'settings';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ session }) => {
  const [activeView, setActiveView] = useState<ViewState>('home');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sessions', label: 'Sessions', icon: Timer },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'home': return <DashboardHome user={session.user} onChangeView={setActiveView} />;
      case 'sessions': return <SessionsView />;
      case 'analytics': return <AnalyticsView />;
      case 'community': return <CommunityView />;
      case 'settings': return <SettingsView user={session.user} />;
      default: return <DashboardHome user={session.user} onChangeView={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-accent selection:text-white overflow-hidden flex">
      <BackgroundGrid />
      
      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden lg:flex flex-col w-72 h-screen fixed left-0 top-0 border-r border-white/5 bg-[#020617]/80 backdrop-blur-xl z-50">
        {/* Logo Area */}
        <div className="p-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-brand-cyber to-brand-purple rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <span className="font-display font-bold text-white text-lg">Q</span>
          </div>
          <span className="font-display font-bold text-xl tracking-widest text-white">QEPHIX</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
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
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center">
               <span className="font-bold text-xs">{session.user.email?.[0].toUpperCase()}</span>
            </div>
            <div className="flex-1 overflow-hidden">
               <p className="text-sm font-medium text-white truncate">{session.user.user_metadata?.full_name || 'User'}</p>
               <p className="text-xs text-slate-500 truncate">Pro Plan</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header & Nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#020617]/90 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-4">
         <div className="flex items-center gap-2">
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
        <div className="fixed inset-0 z-40 bg-[#020617] pt-20 px-6 lg:hidden animate-in slide-in-from-right duration-200">
           <nav className="space-y-2">
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
             <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-xl border border-transparent text-red-400 mt-8"
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
    </div>
  );
};

export default DashboardLayout;