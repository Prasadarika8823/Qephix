import React from 'react';
import { X, Shield, FileText, Mail } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | 'contact' | null;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  const content = {
    privacy: {
      title: "Privacy Policy",
      icon: Shield,
      text: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p><strong className="text-white">Last Updated: October 2024</strong></p>
          <p>At QEPHIX, we take your privacy seriously. We are building a tool for focus, not data harvesting.</p>
          
          <div className="mt-4">
            <h4 className="text-white font-bold mb-2">1. Data Collection</h4>
            <p>We only collect data necessary for your account (email, name) and your session history to provide analytics. We do not sell your data to third parties.</p>
          </div>

          <div className="mt-4">
            <h4 className="text-white font-bold mb-2">2. Analytics</h4>
            <p>All focus metrics are private by default. You control who sees your progress through the Alliance Network settings.</p>
          </div>

          <div className="mt-4">
            <h4 className="text-white font-bold mb-2">3. Security</h4>
            <p>We use industry-standard encryption for all data transmission and storage.</p>
          </div>
        </div>
      )
    },
    terms: {
      title: "Terms of Service",
      icon: FileText,
      text: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <div className="mt-4">
            <h4 className="text-white font-bold mb-2">1. Usage Protocol</h4>
            <p>QEPHIX is a tool for disciplined work. Any abuse of the community features, harassment, or disruption of other users' focus sessions will result in immediate account termination.</p>
          </div>
          
          <div className="mt-4">
            <h4 className="text-white font-bold mb-2">2. Subscriptions & Refunds</h4>
            <p>We offer a fair refund policy. If the protocol doesn't work for you within 14 days, you get your money back, no questions asked.</p>
          </div>

          <div className="mt-4">
            <h4 className="text-white font-bold mb-2">3. Availability</h4>
            <p>While we strive for 99.9% uptime, we are not liable for lost focus time due to server maintenance.</p>
          </div>
        </div>
      )
    },
    contact: {
      title: "Contact Support",
      icon: Mail,
      text: (
        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <p>Need help with the protocol? Found a bug? Or just want to suggest a feature?</p>
          
          <div className="p-6 bg-white/5 rounded-xl border border-white/10 text-center">
            <p className="text-xs text-slate-400 uppercase font-bold mb-2">Direct Email Channel</p>
            <a href="mailto:support@qephix.com" className="text-brand-accent hover:text-white hover:underline text-xl font-bold transition-colors">support@qephix.com</a>
          </div>
          
          <p className="text-center text-slate-500 text-xs">Our engineering team usually responds within 24 hours.</p>
        </div>
      )
    }
  };

  const current = content[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-xl bg-[#0B1121] border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#020617]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-accent/10 rounded-lg">
                <current.icon className="w-5 h-5 text-brand-accent" />
            </div>
            <h3 className="font-display font-bold text-xl text-white">{current.title}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {current.text}
        </div>
      </div>
    </div>
  );
};

export default LegalModal;