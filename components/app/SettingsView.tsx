import React from 'react';
import { User } from '@supabase/supabase-js';
import { User as UserIcon, Bell, Shield, Moon, Monitor } from 'lucide-react';

interface SettingsViewProps {
  user: User;
}

const SettingsView: React.FC<SettingsViewProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-2">System Settings</h1>
        <p className="text-slate-400">Configure your profile and workspace preferences.</p>
      </div>

      {/* Profile Card */}
      <div className="glass-panel p-8 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center gap-8">
         <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-cyber to-brand-purple flex items-center justify-center shadow-2xl">
            <span className="text-4xl font-bold text-white">{user.email?.[0].toUpperCase()}</span>
         </div>
         <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-1">{user.user_metadata?.full_name || 'Protocol User'}</h2>
            <p className="text-slate-400 mb-4">{user.email}</p>
            <div className="flex gap-3 justify-center md:justify-start">
               <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors">Edit Profile</button>
               <button className="px-4 py-2 border border-brand-accent/30 text-brand-accent rounded-lg text-sm hover:bg-brand-accent/10 transition-colors">Upgrade Plan</button>
            </div>
         </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 gap-6">
         {/* Preferences */}
         <div className="bg-[#0B1121]/50 border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
               <Monitor className="w-5 h-5 text-brand-cyber" /> Interface
            </h3>
            
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-white font-medium">Dark Mode</p>
                     <p className="text-xs text-slate-500">The only acceptable way to focus.</p>
                  </div>
                  <div className="w-12 h-6 bg-brand-accent rounded-full relative cursor-pointer">
                     <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md"></div>
                  </div>
               </div>
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-white font-medium">Reduced Motion</p>
                     <p className="text-xs text-slate-500">Minimize animations for performance.</p>
                  </div>
                  <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
                     <div className="absolute left-1 top-1 w-4 h-4 bg-slate-400 rounded-full"></div>
                  </div>
               </div>
            </div>
         </div>

         {/* Notifications */}
         <div className="bg-[#0B1121]/50 border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
               <Bell className="w-5 h-5 text-brand-purple" /> Notifications
            </h3>
            
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-white font-medium">Session Reminders</p>
                     <p className="text-xs text-slate-500">Get notified 10 minutes before start.</p>
                  </div>
                  <div className="w-12 h-6 bg-brand-accent rounded-full relative cursor-pointer">
                     <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md"></div>
                  </div>
               </div>
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-white font-medium">Streak Alerts</p>
                     <p className="text-xs text-slate-500">Don't break the chain.</p>
                  </div>
                  <div className="w-12 h-6 bg-brand-accent rounded-full relative cursor-pointer">
                     <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md"></div>
                  </div>
               </div>
            </div>
         </div>

         {/* Account */}
         <div className="bg-[#0B1121]/50 border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
               <Shield className="w-5 h-5 text-red-400" /> Danger Zone
            </h3>
            <div className="flex items-center justify-between">
               <div>
                  <p className="text-white font-medium">Delete Account</p>
                  <p className="text-xs text-slate-500">Permanently remove all data.</p>
               </div>
               <button className="px-4 py-2 border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-lg text-sm transition-colors">Delete</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SettingsView;