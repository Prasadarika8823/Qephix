import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { 
  User as UserIcon, Shield, Bell, HelpCircle, FileText, 
  LogOut, ChevronRight, Check, X, Smartphone, Globe, Lock,
  Sliders, Zap, Eye, Wifi, Database, Cpu, Monitor, Moon,
  AlertTriangle, Download, Trash2, Key, ToggleLeft, ToggleRight,
  Clock, CheckCircle2, XCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import SectionFade from '../ui/SectionFade';

interface SettingsViewProps {
  user: User;
}

type SettingsCategory = 'identity' | 'protocol' | 'network' | 'system';
type SettingsTab = 
  | 'account' | 'security' 
  | 'focus' | 'notifications' 
  | 'privacy' | 'allies'
  | 'preferences' | 'data' | 'advanced';

const SettingsView: React.FC<SettingsViewProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const menuMap = [
    {
      label: "Identity & Access",
      items: [
        { id: 'account', label: 'Profile Dossier', icon: UserIcon },
        { id: 'security', label: 'Security & Auth', icon: Shield },
      ]
    },
    {
      label: "The Protocol",
      items: [
        { id: 'focus', label: 'Focus Controls', icon: Sliders },
        { id: 'notifications', label: 'Notifications', icon: Bell },
      ]
    },
    {
      label: "The Network",
      items: [
        { id: 'privacy', label: 'Visibility & Privacy', icon: Eye },
        { id: 'allies', label: 'Ally Permissions', icon: Wifi },
      ]
    },
    {
      label: "System",
      items: [
        { id: 'preferences', label: 'App Preferences', icon: Monitor },
        { id: 'data', label: 'Data & Export', icon: Database },
        { id: 'advanced', label: 'Advanced / Dev', icon: Cpu },
      ]
    }
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleUpdatePassword = async () => {
    setPasswordMessage(null);
    if (!newPassword) return;
    if (newPassword !== confirmPassword) {
        setPasswordMessage({type: 'error', text: "Passwords do not match."});
        return;
    }
    if (newPassword.length < 6) {
        setPasswordMessage({type: 'error', text: "Password must be at least 6 characters."});
        return;
    }

    try {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;
        setPasswordMessage({type: 'success', text: "Password updated successfully."});
        setNewPassword('');
        setConfirmPassword('');
    } catch (err: any) {
        setPasswordMessage({type: 'error', text: err.message});
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-100px)]">
      
      {/* LEFT COL: Navigation Sidebar */}
      <div className="lg:col-span-3 flex flex-col h-full overflow-y-auto custom-scrollbar pr-2">
        <div className="mb-6">
           <h1 className="text-2xl font-display font-bold text-white mb-2">Settings</h1>
           <p className="text-slate-400 text-xs">System configuration v2.4</p>
        </div>

        <nav className="space-y-6 flex-1">
          {menuMap.map((group, idx) => (
            <div key={idx}>
              <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3 pl-2">
                {group.label}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as SettingsTab)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-300 group ${
                      activeTab === item.id 
                        ? 'bg-white/10 text-white shadow-lg border border-white/10' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-brand-accent' : 'text-slate-500 group-hover:text-slate-300'}`} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                    {activeTab === item.id && <div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5 mt-4">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-sm font-medium"
           >
             <LogOut className="w-4 h-4" />
             Disengage & Sign Out
           </button>
           <div className="mt-4 px-4 flex justify-between items-center text-[10px] text-slate-600 font-mono">
              <span>BUILD: 2024.10.25</span>
              <span>STABLE</span>
           </div>
        </div>
      </div>

      {/* RIGHT COL: Settings Content Area */}
      <div className="lg:col-span-9 h-full overflow-y-auto custom-scrollbar pb-20">
        <div className="bg-[#0B1121]/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 md:p-8 min-h-full animate-in fade-in slide-in-from-right-4 duration-300 relative">
          
          {/* --- TAB: ACCOUNT --- */}
          {activeTab === 'account' && (
            <div className="space-y-8 max-w-3xl">
               <SectionHeader title="Profile Dossier" subtitle="Manage your public-facing identity and academic standing." />

               {/* Avatar & Basics */}
               <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-cyber/20 to-brand-purple/20 border border-white/10 flex items-center justify-center text-3xl font-bold text-white relative group cursor-pointer">
                     {user.user_metadata?.full_name?.[0] || 'U'}
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                        <span className="text-[10px] uppercase font-bold">Upload</span>
                     </div>
                  </div>
                  <div className="flex-1 space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup label="Full Name" defaultValue={user.user_metadata?.full_name} />
                        <InputGroup label="Display Handle" defaultValue={`@${user.email?.split('@')[0]}`} />
                     </div>
                  </div>
               </div>

               {/* Academic/Professional Context */}
               <div className="space-y-4 pt-6 border-t border-white/5">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Discipline Context</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <InputGroup label="Institution / Company" placeholder="e.g. MIT, Self-Taught, Google" />
                     <InputGroup label="Field of Study / Role" placeholder="e.g. Computer Science, Writer" />
                     
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Experience Level</label>
                        <select className="w-full bg-[#020617] border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent outline-none text-sm appearance-none">
                           <option>Student (Undergrad)</option>
                           <option>Student (Grad/PhD)</option>
                           <option>Professional</option>
                           <option>Researcher</option>
                           <option>Self-Learner</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Primary Goal</label>
                        <select className="w-full bg-[#020617] border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent outline-none text-sm appearance-none">
                           <option>Exam Preparation</option>
                           <option>Skill Acquisition</option>
                           <option>Deep Work / Output</option>
                           <option>Maintenance</option>
                        </select>
                     </div>
                  </div>
               </div>

               {/* Discipline Statement */}
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Discipline Statement</label>
                  <textarea 
                     className="w-full bg-[#020617] border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent outline-none h-24 resize-none text-sm"
                     placeholder="State your philosophy. This is visible to Allies."
                     defaultValue="Building resilient systems through consistent deep work. No zero days."
                  />
               </div>

               <div className="flex justify-end pt-4">
                  <ActionButton label="Update Dossier" />
               </div>
            </div>
          )}

          {/* --- TAB: SECURITY --- */}
          {activeTab === 'security' && (
             <div className="space-y-8 max-w-3xl">
               <SectionHeader title="Security & Auth" subtitle="Hardening your account access and session management." />

               <div className="space-y-6">
                  {/* Password */}
                  <div className="p-6 rounded-xl border border-white/10 bg-[#020617]/50">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider">Credentials</h3>
                        <span className="text-[10px] text-slate-500">Last changed recently</span>
                     </div>
                     
                     {passwordMessage && (
                        <div className={`mb-4 p-3 rounded-lg border flex items-center gap-2 text-xs font-medium ${passwordMessage.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                           {passwordMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                           {passwordMessage.text}
                        </div>
                     )}

                     <div className="space-y-3">
                        <InputGroup 
                            label="New Password" 
                            type="password" 
                            placeholder="••••••••" 
                            value={newPassword}
                            onChange={(e: any) => setNewPassword(e.target.value)}
                        />
                        <InputGroup 
                            label="Confirm Password" 
                            type="password" 
                            placeholder="••••••••" 
                            value={confirmPassword}
                            onChange={(e: any) => setConfirmPassword(e.target.value)}
                        />
                        <div className="flex justify-end mt-2">
                           <button 
                             onClick={handleUpdatePassword}
                             className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg text-xs font-bold transition-colors"
                           >
                              Update Password
                           </button>
                        </div>
                     </div>
                  </div>

                  {/* 2FA */}
                  <div className="p-6 rounded-xl border border-white/10 bg-[#020617]/50 flex items-center justify-between">
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                           <Lock className="w-4 h-4 text-brand-purple" />
                           <h3 className="text-white font-bold text-sm">Two-Factor Authentication</h3>
                        </div>
                        <p className="text-xs text-slate-500">Secure your account with TOTP (Authy/Google Auth).</p>
                     </div>
                     <ToggleSwitch checked={false} />
                  </div>

                  {/* Sessions */}
                  <div className="space-y-3">
                     <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider pl-1">Active Sessions</h3>
                     <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                           <div className="p-2 bg-white/5 rounded-lg"><Monitor className="w-5 h-5 text-slate-300" /></div>
                           <div>
                              <p className="text-sm font-bold text-white">Chrome on MacOS</p>
                              <p className="text-xs text-green-400">Current Session • San Francisco, US</p>
                           </div>
                        </div>
                        <span className="text-[10px] text-slate-500">IP: 192.168.1.1</span>
                     </div>
                     <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02] opacity-60">
                        <div className="flex items-center gap-4">
                           <div className="p-2 bg-white/5 rounded-lg"><Smartphone className="w-5 h-5 text-slate-300" /></div>
                           <div>
                              <p className="text-sm font-bold text-white">Safari on iPhone</p>
                              <p className="text-xs text-slate-400">Last seen 2h ago</p>
                           </div>
                        </div>
                        <button className="text-xs text-red-400 hover:text-red-300 underline">Revoke</button>
                     </div>
                  </div>
               </div>
             </div>
          )}

          {/* --- TAB: FOCUS CONTROLS --- */}
          {activeTab === 'focus' && (
             <div className="space-y-8 max-w-3xl">
                <SectionHeader title="Focus Controls" subtitle="Configure the behavior of your discipline protocols." />
                
                {/* Default Timers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {['Pomodoro (25m)', 'Deep Work (50m)', 'Monk Mode (90m)'].map((label, i) => (
                      <div key={i} className="p-4 rounded-xl border border-white/10 bg-[#020617]/50 hover:border-brand-accent/30 transition-colors">
                         <label className="text-xs font-bold text-slate-500 uppercase block mb-2">{label}</label>
                         <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-brand-accent" />
                            <input type="number" defaultValue={[25, 50, 90][i]} className="bg-transparent text-lg font-bold text-white w-12 outline-none" />
                            <span className="text-xs text-slate-600">min</span>
                         </div>
                      </div>
                   ))}
                </div>

                {/* Strictness Settings */}
                <div className="space-y-4 pt-4">
                   <h3 className="text-sm font-bold text-white uppercase tracking-wider">Discipline Enforcement</h3>
                   
                   <SettingsRow 
                      icon={Lock} 
                      title="Strict Protocol" 
                      desc="Prevent session cancellation or pausing once started."
                      checked={true} 
                   />
                   <SettingsRow 
                      icon={AlertTriangle} 
                      title="Cognitive Load Warnings" 
                      desc="Alert when fatigue metrics suggest diminishing returns (>4h daily)."
                      checked={true} 
                   />
                   <SettingsRow 
                      icon={Zap} 
                      title="Break Enforcement" 
                      desc="Lock interface during mandatory recovery periods."
                      checked={false} 
                   />
                </div>
             </div>
          )}

          {/* --- TAB: NOTIFICATIONS --- */}
          {activeTab === 'notifications' && (
             <div className="space-y-8 max-w-3xl">
                <SectionHeader title="Notification Matrix" subtitle="Control interruption levels and communication channels." />

                <div className="space-y-6">
                   <div className="p-4 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-start gap-4">
                      <Bell className="w-5 h-5 text-brand-accent mt-1" />
                      <div>
                         <h4 className="text-sm font-bold text-white">Quiet Hours Enabled</h4>
                         <p className="text-xs text-slate-400">Notifications are automatically muted during active sessions.</p>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Protocol Alerts</h3>
                      <SettingsRow title="Session Start Reminders" desc="10 min before scheduled blocks." checked={true} />
                      <SettingsRow title="Streak Recovery" desc="Nudges when risk of breaking chain is detected." checked={true} />
                      <SettingsRow title="Weekly Report" desc="Sunday evening performance digest." checked={true} />
                   </div>

                   <div className="space-y-4 pt-4 border-t border-white/5">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Community Signals</h3>
                      <SettingsRow title="Ally Activity" desc="When allies start a 'Deep Work' session." checked={false} />
                      <SettingsRow title="Pact Updates" desc="Progress on mutual accountability goals." checked={true} />
                   </div>
                </div>
             </div>
          )}

          {/* --- TAB: PRIVACY --- */}
          {activeTab === 'privacy' && (
             <div className="space-y-8 max-w-3xl">
                <SectionHeader title="Visibility & Privacy" subtitle="Manage your footprint on the Global Grid." />

                {/* Profile Layer Matrix */}
                <div className="space-y-4">
                   <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Data Exposure Layers</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl border border-white/10 bg-[#020617]/50 opacity-50">
                         <div className="text-xs font-bold text-slate-500 uppercase mb-2">Public / Stranger</div>
                         <ul className="text-xs text-slate-400 space-y-2">
                            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-500" /> Display Name</li>
                            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-500" /> Reliability Score</li>
                            <li className="flex items-center gap-2"><X className="w-3 h-3 text-red-500" /> Exact Hours</li>
                            <li className="flex items-center gap-2"><X className="w-3 h-3 text-red-500" /> Topics</li>
                         </ul>
                      </div>
                      <div className="p-4 rounded-xl border border-brand-cyber/20 bg-brand-cyber/5">
                         <div className="text-xs font-bold text-brand-cyber uppercase mb-2">Observer (Follower)</div>
                         <ul className="text-xs text-slate-300 space-y-2">
                            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-brand-cyber" /> Discipline Statement</li>
                            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-brand-cyber" /> Rounded Hours</li>
                            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-brand-cyber" /> Current Streak</li>
                            <li className="flex items-center gap-2"><X className="w-3 h-3 text-slate-600" /> Detailed Analytics</li>
                         </ul>
                      </div>
                      <div className="p-4 rounded-xl border border-brand-accent/20 bg-brand-accent/5">
                         <div className="text-xs font-bold text-brand-accent uppercase mb-2">Ally (Mutual)</div>
                         <ul className="text-xs text-slate-300 space-y-2">
                            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-brand-accent" /> Exact Logs</li>
                            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-brand-accent" /> Live Status</li>
                            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-brand-accent" /> Specific Topics</li>
                            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-brand-accent" /> Chat Access</li>
                         </ul>
                      </div>
                   </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                   <h3 className="text-sm font-bold text-white uppercase tracking-wider">Global Settings</h3>
                   <SettingsRow title="Discoverable in Search" desc="Allow users to find you by name or goal." checked={true} />
                   <SettingsRow title="Show 'Focusing Now' Status" desc="Broadcast live status to Allies." checked={true} />
                   <SettingsRow title="Allow Ally Requests" desc="Receive new connection requests." checked={true} />
                </div>
             </div>
          )}

          {/* --- TAB: PREFERENCES --- */}
          {activeTab === 'preferences' && (
             <div className="space-y-8 max-w-3xl">
                <SectionHeader title="App Preferences" subtitle="Customize the interface to match your workflow." />

                <div className="space-y-6">
                   <div className="space-y-4">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Visual Interface</h3>
                      <div className="grid grid-cols-2 gap-4">
                         <button className="p-4 rounded-xl border border-brand-accent bg-white/5 flex flex-col items-center gap-2">
                            <div className="w-full h-12 bg-[#020617] rounded-lg border border-white/10"></div>
                            <span className="text-xs font-bold text-white">Default Dark</span>
                         </button>
                         <button className="p-4 rounded-xl border border-white/10 bg-[#000000] flex flex-col items-center gap-2 opacity-60 hover:opacity-100">
                            <div className="w-full h-12 bg-black rounded-lg border border-white/5"></div>
                            <span className="text-xs font-bold text-slate-400">OLED Black</span>
                         </button>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Accessibility & Motion</h3>
                      <SettingsRow title="Reduced Motion" desc="Minimize UI animations and transitions." checked={false} />
                      <SettingsRow title="High Contrast Borders" desc="Increase visibility of panel edges." checked={false} />
                      <SettingsRow title="Sound Effects" desc="Subtle audio cues for session events." checked={true} />
                   </div>
                </div>
             </div>
          )}

           {/* --- TAB: DATA --- */}
           {activeTab === 'data' && (
             <div className="space-y-8 max-w-3xl">
                <SectionHeader title="Data & Export" subtitle="You own your discipline data. Manage it here." />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="p-6 rounded-xl border border-white/10 bg-[#020617] hover:border-brand-cyber/50 transition-colors cursor-pointer group">
                      <Download className="w-8 h-8 text-brand-cyber mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-white font-bold text-sm">Export CSV</h3>
                      <p className="text-xs text-slate-500 mt-1">Download your full session history and analytics.</p>
                   </div>
                   <div className="p-6 rounded-xl border border-white/10 bg-[#020617] hover:border-brand-purple/50 transition-colors cursor-pointer group">
                      <Key className="w-8 h-8 text-brand-purple mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-white font-bold text-sm">Request API Key</h3>
                      <p className="text-xs text-slate-500 mt-1">Access your data programmatically (Beta).</p>
                   </div>
                </div>

                <div className="pt-8 border-t border-red-500/20">
                   <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-4">Danger Zone</h3>
                   <div className="flex items-center justify-between p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                      <div>
                         <h4 className="text-white font-bold text-sm">Reset Analytics</h4>
                         <p className="text-xs text-slate-500">Clear all streaks and hours. Cannot be undone.</p>
                      </div>
                      <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-xs font-bold border border-red-500/20 transition-colors">
                         Reset Data
                      </button>
                   </div>
                   <div className="flex items-center justify-between p-4 rounded-xl border border-red-500/20 bg-red-500/5 mt-4">
                      <div>
                         <h4 className="text-white font-bold text-sm">Delete Account</h4>
                         <p className="text-xs text-slate-500">Permanently remove your identity from the protocol.</p>
                      </div>
                      <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-colors">
                         Delete Account
                      </button>
                   </div>
                </div>
             </div>
           )}

        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
   <div className="mb-8 border-b border-white/5 pb-6">
      <h2 className="text-2xl font-display font-bold text-white mb-2">{title}</h2>
      <p className="text-sm text-slate-400">{subtitle}</p>
   </div>
);

const InputGroup = ({ label, type = "text", placeholder, defaultValue, value, onChange }: any) => (
   <div className="space-y-2 w-full">
      <label className="text-xs font-bold text-slate-500 uppercase">{label}</label>
      <input 
        type={type} 
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-[#020617] border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 outline-none transition-all text-sm placeholder-slate-700"
      />
   </div>
);

const SettingsRow = ({ icon: Icon, title, desc, checked }: any) => (
   <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors group">
      <div className="flex items-center gap-4">
         {Icon && <div className="p-2 rounded-lg bg-white/5 text-slate-400 group-hover:text-white"><Icon className="w-5 h-5" /></div>}
         <div>
            <p className="text-sm font-bold text-white">{title}</p>
            <p className="text-xs text-slate-500">{desc}</p>
         </div>
      </div>
      <ToggleSwitch checked={checked} />
   </div>
);

const ToggleSwitch = ({ checked }: { checked: boolean }) => (
   <button className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${checked ? 'bg-brand-accent' : 'bg-slate-700'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${checked ? 'translate-x-7' : 'translate-x-1'}`}></div>
   </button>
);

const ActionButton = ({ label }: { label: string }) => (
   <button className="px-6 py-2.5 bg-brand-accent hover:bg-orange-600 text-white rounded-lg font-bold shadow-[0_0_15px_rgba(234,88,12,0.3)] transition-all text-sm uppercase tracking-wide">
      {label}
   </button>
);

export default SettingsView;