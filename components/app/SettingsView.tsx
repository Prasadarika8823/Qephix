import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { 
  User as UserIcon, Shield, Bell, HelpCircle, FileText, 
  LogOut, ChevronRight, Check, X, Smartphone, Globe, Lock
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import SectionFade from '../ui/SectionFade';

interface SettingsViewProps {
  user: User;
}

type SettingsTab = 'account' | 'security' | 'notifications' | 'support' | 'legal';

const SettingsView: React.FC<SettingsViewProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');

  const menuItems = [
    { id: 'account', label: 'Account', icon: UserIcon },
    { id: 'security', label: 'Security & Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'support', label: 'Help & Support', icon: HelpCircle },
    { id: 'legal', label: 'Terms & Privacy', icon: FileText },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
      
      {/* Settings Navigation Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <div>
           <h1 className="text-2xl font-display font-bold text-white mb-2">Settings</h1>
           <p className="text-slate-400 text-sm">Manage your protocol parameters.</p>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as SettingsTab)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-white/10 text-white shadow-lg border border-white/10' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-brand-accent' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              {activeTab === item.id && <ChevronRight className="w-3 h-3 text-brand-accent" />}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-sm font-medium"
           >
             <LogOut className="w-4 h-4" />
             Log Out of All Devices
           </button>
        </div>
      </div>

      {/* Settings Content Area */}
      <div className="lg:col-span-3">
        <div className="bg-[#0B1121]/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 md:p-8 min-h-[500px] animate-in fade-in slide-in-from-right-4 duration-300">
          
          {/* ACCOUNT SETTINGS */}
          {activeTab === 'account' && (
            <div className="space-y-8 max-w-2xl">
               <div>
                  <h2 className="text-xl font-bold text-white mb-1">Personal Information</h2>
                  <p className="text-sm text-slate-400">Update your identity on the grid.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                     <input 
                       type="text" 
                       defaultValue={user.user_metadata?.full_name}
                       className="w-full bg-[#020617] border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 outline-none transition-all"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase">Display Name</label>
                     <input 
                       type="text" 
                       defaultValue={user.email?.split('@')[0]}
                       className="w-full bg-[#020617] border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 outline-none transition-all"
                     />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                     <label className="text-xs font-bold text-slate-500 uppercase">Bio</label>
                     <textarea 
                       className="w-full bg-[#020617] border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 outline-none transition-all h-24 resize-none"
                       placeholder="Tell us about your focus goals..."
                     />
                  </div>
               </div>

               <div className="pt-6 border-t border-white/5">
                  <h2 className="text-xl font-bold text-white mb-4">Connected Accounts</h2>
                  <div className="space-y-3">
                     <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-3">
                           <Globe className="w-5 h-5 text-slate-300" />
                           <div>
                              <p className="text-white font-medium text-sm">Google</p>
                              <p className="text-xs text-slate-500">Connected as {user.email}</p>
                           </div>
                        </div>
                        <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">Connected</span>
                     </div>
                  </div>
               </div>

               <div className="flex justify-end pt-4">
                  <button className="px-6 py-2 bg-brand-accent hover:bg-orange-600 text-white rounded-lg font-bold shadow-[0_0_15px_rgba(234,88,12,0.3)] transition-all">
                     Save Changes
                  </button>
               </div>
            </div>
          )}

          {/* SECURITY SETTINGS */}
          {activeTab === 'security' && (
             <div className="space-y-8 max-w-2xl">
               <div>
                  <h2 className="text-xl font-bold text-white mb-1">Security & Privacy</h2>
                  <p className="text-sm text-slate-400">Protect your account and manage sessions.</p>
               </div>

               <div className="space-y-6">
                  <div className="p-6 rounded-xl border border-white/10 bg-[#020617]">
                     <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                           <Lock className="w-5 h-5 text-brand-purple" />
                           <div>
                              <h3 className="text-white font-bold text-sm">Two-Factor Authentication</h3>
                              <p className="text-xs text-slate-500">Add an extra layer of security.</p>
                           </div>
                        </div>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                           <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-slate-400 border-4 appearance-none cursor-pointer"/>
                           <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-900 cursor-pointer border border-slate-700"></label>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <h3 className="text-sm font-bold text-white uppercase tracking-wider">Change Password</h3>
                     <div className="space-y-3">
                        <input type="password" placeholder="Current Password" className="w-full bg-[#020617] border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent outline-none" />
                        <input type="password" placeholder="New Password" className="w-full bg-[#020617] border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent outline-none" />
                        <button className="px-4 py-2 border border-white/10 hover:bg-white/5 text-white rounded-lg text-sm font-medium transition-colors">
                           Update Password
                        </button>
                     </div>
                  </div>

                  <div className="pt-6 border-t border-white/5">
                     <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Active Sessions</h3>
                     <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-3">
                           <Smartphone className="w-4 h-4 text-slate-400" />
                           <div>
                              <p className="text-sm text-white">Chrome on macOS</p>
                              <p className="text-xs text-green-400">Active Now • San Francisco, US</p>
                           </div>
                        </div>
                        <button className="text-xs text-slate-500 hover:text-white">Revoke</button>
                     </div>
                  </div>
               </div>
             </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === 'notifications' && (
             <div className="space-y-8 max-w-2xl">
               <div>
                  <h2 className="text-xl font-bold text-white mb-1">Notifications</h2>
                  <p className="text-sm text-slate-400">Control how we communicate with you.</p>
               </div>

               <div className="space-y-1">
                  {[
                     { title: "Session Reminders", desc: "Notify me 10 minutes before a booked session." },
                     { title: "Streak Alerts", desc: "Remind me to maintain my focus streak." },
                     { title: "Community Mentions", desc: "When someone tags me in a room." },
                     { title: "Product Updates", desc: "New features and system upgrades." },
                     { title: "Marketing", desc: "Promotions and offers.", default: false },
                  ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors">
                        <div>
                           <p className="text-white font-medium text-sm">{item.title}</p>
                           <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                        <button className={`w-10 h-6 rounded-full relative transition-colors ${item.default === false ? 'bg-slate-700' : 'bg-brand-accent'}`}>
                           <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.default === false ? 'left-1' : 'right-1'}`}></div>
                        </button>
                     </div>
                  ))}
               </div>
             </div>
          )}

          {/* HELP & SUPPORT */}
          {activeTab === 'support' && (
             <div className="space-y-8 max-w-2xl">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Help & Support</h2>
                  <p className="text-sm text-slate-400">Systems operational. How can we assist?</p>
               </div>

               <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                     <h3 className="font-bold text-white mb-2">Frequently Asked Questions</h3>
                     <div className="space-y-2">
                        {['How is "Deep Work" calculated?', 'Can I sync with Google Calendar?', 'What happens if I miss a session?'].map((q, i) => (
                           <details key={i} className="group cursor-pointer">
                              <summary className="flex justify-between items-center text-sm text-slate-300 hover:text-brand-accent transition-colors py-2">
                                 {q} <ChevronRight className="w-3 h-3 group-open:rotate-90 transition-transform" />
                              </summary>
                              <p className="text-xs text-slate-500 pl-2 pb-2">
                                 System calculation is based on active window time and lack of interruptions. We use a proprietary algorithm to verify focus integrity.
                              </p>
                           </details>
                        ))}
                     </div>
                  </div>

                  <div>
                     <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Contact Support</h3>
                     <form className="space-y-4">
                        <input type="text" placeholder="Subject" className="w-full bg-[#020617] border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent outline-none" />
                        <textarea placeholder="Describe your issue..." className="w-full bg-[#020617] border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent outline-none h-32 resize-none" />
                        <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-bold transition-all">
                           Submit Ticket
                        </button>
                     </form>
                  </div>
               </div>
             </div>
          )}

          {/* LEGAL */}
          {activeTab === 'legal' && (
             <div className="space-y-8 max-w-2xl h-full flex flex-col">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Terms & Privacy</h2>
                  <p className="text-sm text-slate-400">The boring but necessary protocol definitions.</p>
               </div>

               <div className="flex-1 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar space-y-6 text-sm text-slate-400 leading-relaxed">
                  <section>
                     <h3 className="text-white font-bold mb-2">1. Terms of Service</h3>
                     <p>By accessing QEPHIX, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
                  </section>
                  <section>
                     <h3 className="text-white font-bold mb-2">2. Use License</h3>
                     <p>Permission is granted to temporarily download one copy of the materials (information or software) on QEPHIX's website for personal, non-commercial transitory viewing only.</p>
                  </section>
                  <section>
                     <h3 className="text-white font-bold mb-2">3. Privacy Policy</h3>
                     <p>Your privacy is important to us. It is QEPHIX's policy to respect your privacy regarding any information we may collect from you across our website.</p>
                     <p className="mt-2">We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
                  </section>
                  <section>
                     <h3 className="text-white font-bold mb-2">4. Data Retention</h3>
                     <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft.</p>
                  </section>
               </div>

               <div className="pt-4 border-t border-white/5 text-xs text-slate-600">
                  Last updated: October 24, 2024
               </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SettingsView;