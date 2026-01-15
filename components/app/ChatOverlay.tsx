import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Send, Zap, Bell, CheckCircle2, Lock, 
  Shield, Clock, Activity, MessageSquare
} from 'lucide-react';

interface Ally {
  name: string;
  role: string;
  status: string;
}

interface ChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  ally: Ally | null;
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'ally' | 'system';
  type?: 'text' | 'nudge' | 'session_start' | 'session_complete';
  timestamp: string;
  isDelivered?: boolean;
}

const ChatOverlay: React.FC<ChatOverlayProps> = ({ isOpen, onClose, ally }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Session initialized. Secure channel established.", sender: 'system', timestamp: 'Yesterday', type: 'text' },
    { id: 2, text: "Are you hitting the 09:00 protocol today?", sender: 'ally', timestamp: '08:45 AM', type: 'text' },
    { id: 3, text: "Starting Deep Work (90m). Priority: Backend API.", sender: 'me', timestamp: '09:00 AM', type: 'session_start', isDelivered: true },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDelivered: true,
      type: 'text'
    };
    setMessages([...messages, newMsg]);
    setInputText('');
  };

  const sendQuickAction = (type: 'nudge' | 'session_start' | 'session_complete') => {
    let text = "";
    if (type === 'nudge') text = "⚠️ Accountability Nudge: Check your focus.";
    if (type === 'session_start') text = "⚡ Initializing Focus Protocol (50m).";
    if (type === 'session_complete') text = "✅ Session Complete. Protocol fulfilled.";

    const newMsg: Message = {
      id: Date.now(),
      text,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDelivered: true,
      type
    };
    setMessages([...messages, newMsg]);
  };

  return (
    <>
      {/* Backdrop (Click to close) */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Slide-in Panel */}
      <div className={`fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-[#0B1121]/95 border-l border-white/10 z-[70] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col transition-transform duration-300 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 relative bg-[#020617]/50">
           <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent"></div>
           
           <div className="flex items-center gap-3">
              <div className="relative">
                 <div className="w-10 h-10 rounded-lg bg-brand-dark border border-white/10 flex items-center justify-center text-white font-bold">
                    {ally?.name[0] || '?'}
                 </div>
                 <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#020617] ${ally?.status === 'Focusing' ? 'bg-brand-accent' : ally?.status === 'Online' ? 'bg-green-500' : 'bg-slate-500'}`}></div>
              </div>
              <div>
                 <h3 className="text-white font-bold text-sm leading-tight">{ally?.name || 'Unknown Ally'}</h3>
                 <p className="text-[10px] text-slate-400 uppercase tracking-wider">{ally?.status || 'Offline'}</p>
              </div>
           </div>

           <button 
             onClick={onClose}
             className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
           >
              <X className="w-5 h-5" />
           </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-gradient-to-b from-[#0B1121] to-[#020617]">
           {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                 {msg.sender === 'system' ? (
                    <div className="w-full flex items-center gap-4 my-2">
                       <div className="h-px flex-1 bg-white/5"></div>
                       <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5">
                          <Lock className="w-3 h-3" /> {msg.text}
                       </span>
                       <div className="h-px flex-1 bg-white/5"></div>
                    </div>
                 ) : (
                    <div className={`max-w-[80%] space-y-1 ${msg.sender === 'me' ? 'items-end flex flex-col' : 'items-start flex flex-col'}`}>
                       <div 
                          className={`p-3 rounded-2xl text-sm leading-relaxed border backdrop-blur-sm relative overflow-hidden ${
                             msg.sender === 'me' 
                                ? 'bg-brand-cyber/10 border-brand-cyber/20 text-slate-100 rounded-tr-none' 
                                : 'bg-white/5 border-white/10 text-slate-300 rounded-tl-none'
                          } ${
                             msg.type === 'nudge' ? 'border-brand-accent/40 bg-brand-accent/5' : ''
                          } ${
                             msg.type === 'session_start' ? 'border-green-500/30 bg-green-500/5' : ''
                          }`}
                       >  
                          {/* Special Message Types */}
                          {msg.type === 'session_start' && (
                             <div className="flex items-center gap-2 mb-1 text-green-400 text-xs font-bold uppercase tracking-wide pb-2 border-b border-green-500/20">
                                <Zap className="w-3 h-3" /> Focus Protocol
                             </div>
                          )}
                          {msg.type === 'nudge' && (
                             <div className="flex items-center gap-2 mb-1 text-brand-accent text-xs font-bold uppercase tracking-wide pb-2 border-b border-brand-accent/20">
                                <Bell className="w-3 h-3" /> Attention
                             </div>
                          )}

                          {msg.text}
                       </div>
                       
                       <div className="flex items-center gap-2 text-[10px] text-slate-600">
                          <span>{msg.timestamp}</span>
                          {msg.sender === 'me' && msg.isDelivered && (
                             <CheckCircle2 className="w-3 h-3 text-slate-600" />
                          )}
                       </div>
                    </div>
                 )}
              </div>
           ))}
           <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/5 bg-[#020617] space-y-3 relative z-10">
           
           {/* Quick Actions */}
           <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              <button 
                 onClick={() => sendQuickAction('session_start')}
                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 text-green-500 text-[10px] font-bold uppercase whitespace-nowrap transition-colors"
              >
                 <Activity className="w-3 h-3" /> Starting
              </button>
              <button 
                 onClick={() => sendQuickAction('session_complete')}
                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-cyber/10 border border-brand-cyber/20 hover:bg-brand-cyber/20 text-brand-cyber text-[10px] font-bold uppercase whitespace-nowrap transition-colors"
              >
                 <CheckCircle2 className="w-3 h-3" /> Completed
              </button>
              <button 
                 onClick={() => sendQuickAction('nudge')}
                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-accent/10 border border-brand-accent/20 hover:bg-brand-accent/20 text-brand-accent text-[10px] font-bold uppercase whitespace-nowrap transition-colors"
              >
                 <Bell className="w-3 h-3" /> Nudge
              </button>
           </div>

           <div className="relative">
              <input 
                 type="text" 
                 value={inputText}
                 onChange={(e) => setInputText(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                 placeholder="Secure message..."
                 className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent/50 focus:bg-white/10 transition-all"
              />
              <button 
                 onClick={handleSend}
                 className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-brand-accent text-white hover:bg-orange-600 transition-colors shadow-lg"
              >
                 <Send className="w-4 h-4" />
              </button>
           </div>
           
           <div className="text-center">
              <span className="text-[10px] text-slate-600 flex items-center justify-center gap-1.5">
                 <Shield className="w-3 h-3" /> End-to-End Encrypted • Focus Mode Aware
              </span>
           </div>
        </div>

      </div>
    </>
  );
};

export default ChatOverlay;