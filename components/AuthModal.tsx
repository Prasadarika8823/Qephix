import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Github, Chrome, Loader2, AlertCircle, MailOpen, HelpCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'signin' | 'signup';
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialMode, onClose }) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'github' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync internal state if prop changes while closed
  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError(null);
      setIsSuccess(false);
      setEmail('');
      setPassword('');
      setFullName('');
      setSocialLoading(null);
    }
  }, [isOpen, initialMode]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
        setIsSuccess(true);
      } else if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        // Successful login
        onClose();
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (error) throw error;
        setIsSuccess(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setSocialLoading(provider);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      setSocialLoading(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-[#0B1121] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-300">
        
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyber via-brand-purple to-brand-accent"></div>
        <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-brand-accent/5 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="absolute bottom-[-50%] left-[-50%] w-[100%] h-[100%] bg-brand-cyber/5 rounded-full blur-[60px] pointer-events-none"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-full z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 relative z-10">
          {isSuccess ? (
            <div className="text-center py-6 animate-in fade-in zoom-in-95 duration-300">
               <div className="w-20 h-20 bg-brand-cyber/10 border border-brand-cyber/20 text-brand-cyber rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                  <MailOpen className="w-10 h-10" />
               </div>
               <h3 className="text-2xl font-display font-bold text-white mb-3">
                 {mode === 'forgot' ? 'Reset Link Sent' : 'Check your inbox'}
               </h3>
               <p className="text-slate-400 mb-8 leading-relaxed">
                  {mode === 'forgot' ? 'We sent a password reset link to' : 'We sent a secure confirmation link to'} <br/>
                  <span className="text-white font-medium">{email}</span>
               </p>
               <div className="space-y-3">
                 <button 
                    onClick={() => { setIsSuccess(false); setMode('signin'); }}
                    className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-all"
                 >
                    Back to Sign In
                 </button>
                 <button
                    onClick={onClose} 
                    className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                 >
                    Close Window
                 </button>
               </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="font-display text-3xl font-bold text-white mb-2">
                  {mode === 'signin' ? 'Welcome Back' : mode === 'signup' ? 'Join the Protocol' : 'Reset Password'}
                </h2>
                <p className="text-slate-400 text-sm">
                  {mode === 'signin' ? 'Resume your focus session.' : mode === 'signup' ? 'Start your journey to deep work.' : 'Enter your email to receive recovery instructions.'}
                </p>
              </div>

              {/* Messages */}
              {error && (
                <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400 text-sm animate-in slide-in-from-top-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 text-left">{error}</span>
                </div>
              )}

              {/* Social Login (Hidden on Forgot Password) */}
              {mode !== 'forgot' && (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <button 
                      onClick={() => handleSocialLogin('google')}
                      disabled={socialLoading !== null || loading}
                      className="group flex items-center justify-center gap-2 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-cyber/50 text-slate-300 hover:text-white transition-all text-sm font-medium relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {socialLoading === 'google' ? (
                        <Loader2 className="w-4 h-4 animate-spin text-brand-cyber" />
                      ) : (
                        <>
                          <Chrome className="w-4 h-4 text-slate-400 group-hover:text-brand-cyber transition-colors" /> 
                          <span>Google</span>
                        </>
                      )}
                      <div className="absolute inset-0 bg-brand-cyber/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                    <button 
                      onClick={() => handleSocialLogin('github')}
                      disabled={socialLoading !== null || loading}
                      className="group flex items-center justify-center gap-2 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-purple/50 text-slate-300 hover:text-white transition-all text-sm font-medium relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {socialLoading === 'github' ? (
                        <Loader2 className="w-4 h-4 animate-spin text-brand-purple" />
                      ) : (
                        <>
                          <Github className="w-4 h-4 text-slate-400 group-hover:text-brand-purple transition-colors" />
                          <span>GitHub</span>
                        </>
                      )}
                      <div className="absolute inset-0 bg-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 mb-6">
                     <HelpCircle className="w-3 h-3 text-slate-600" />
                     <span className="text-[10px] text-slate-600">Providers must be enabled in Supabase Dashboard</span>
                  </div>

                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-widest">
                      <span className="bg-[#0B1121] px-3 text-slate-600 font-medium">Or continue with email</span>
                    </div>
                  </div>
                </>
              )}

              {/* Form */}
              <form className="space-y-4" onSubmit={handleAuth}>
                {mode === 'signup' && (
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-500 mb-1 ml-1 group-focus-within:text-brand-cyber transition-colors uppercase">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-cyber transition-colors" />
                      <input 
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#020617] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyber/50 focus:ring-1 focus:ring-brand-cyber/50 transition-all text-sm"
                        placeholder="John Doe"
                        required
                        disabled={loading || socialLoading !== null}
                      />
                    </div>
                  </div>
                )}

                <div className="group">
                  <label className="block text-xs font-bold text-slate-500 mb-1 ml-1 group-focus-within:text-brand-cyber transition-colors uppercase">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-cyber transition-colors" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#020617] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyber/50 focus:ring-1 focus:ring-brand-cyber/50 transition-all text-sm"
                      placeholder="name@example.com"
                      required
                      disabled={loading || socialLoading !== null}
                    />
                  </div>
                </div>

                {mode !== 'forgot' && (
                  <div className="group">
                    <div className="flex justify-between items-center mb-1 ml-1">
                      <label className="block text-xs font-bold text-slate-500 group-focus-within:text-brand-cyber transition-colors uppercase">Password</label>
                      {mode === 'signin' && (
                        <button 
                          type="button"
                          onClick={() => { setMode('forgot'); setError(null); }}
                          className="text-xs text-brand-cyber hover:text-brand-cyber/80 transition-colors"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-cyber transition-colors" />
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#020617] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyber/50 focus:ring-1 focus:ring-brand-cyber/50 transition-all text-sm"
                        placeholder="••••••••"
                        required
                        disabled={loading || socialLoading !== null}
                      />
                    </div>
                  </div>
                )}

                <button 
                  disabled={loading || socialLoading !== null}
                  className="w-full group relative flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-brand-accent to-orange-600 rounded-lg text-white font-bold tracking-wide shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] hover:scale-[1.02] transition-all duration-300 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Footer Switch */}
              <div className="mt-6 text-center text-sm text-slate-400">
                {mode === 'forgot' ? (
                  <button 
                    onClick={() => { setMode('signin'); setError(null); }}
                    className="flex items-center justify-center gap-2 w-full text-white font-medium hover:text-brand-accent transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Sign In
                  </button>
                ) : (
                  <>
                    {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                    <button 
                      onClick={() => {
                        setMode(mode === 'signin' ? 'signup' : 'signin');
                        setError(null);
                      }}
                      className="text-white font-medium hover:text-brand-accent transition-colors underline decoration-brand-accent/30 hover:decoration-brand-accent decoration-2 underline-offset-4"
                    >
                      {mode === 'signin' ? 'Join now' : 'Sign in'}
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;