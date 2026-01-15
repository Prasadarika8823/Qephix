import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

// Landing Page Components
import BackgroundGrid from './components/BackgroundGrid';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import PhilosophySection from './components/PhilosophySection';
import HowItWorks from './components/HowItWorks';
import WhoItsFor from './components/WhoItsFor';
import AboutSection from './components/AboutSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

// App Components
import DashboardLayout from './components/app/DashboardLayout';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Auth Modal State (For Landing Page)
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check URL hash for error or recovery to open modal
  useEffect(() => {
     const hash = window.location.hash;
     if (hash && hash.includes('error_description')) {
        // If there's an error in the hash (e.g. link expired), open modal to sign in
        setAuthMode('signin');
        setIsAuthOpen(true);
        // Clean URL
        window.history.replaceState(null, '', window.location.pathname);
     }
  }, []);

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center text-brand-accent">
        <div className="animate-pulse">Loading Protocol...</div>
      </div>
    );
  }

  // If Authenticated, show Dashboard
  if (session) {
    return <DashboardLayout session={session} />;
  }

  // If Not Authenticated, show Landing Page
  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-accent selection:text-white font-sans antialiased">
      <BackgroundGrid />
      <Navbar onOpenAuth={openAuth} />
      
      <main className="relative z-10 flex flex-col">
        <Hero onOpenAuth={() => openAuth('signup')} />
        <ProblemSection />
        <HowItWorks />
        <PhilosophySection />
        <WhoItsFor />
        <AboutSection />
        <FinalCTA onOpenAuth={() => openAuth('signup')} />
      </main>

      <Footer />
      <AuthModal isOpen={isAuthOpen} initialMode={authMode} onClose={closeAuth} />
    </div>
  );
}

export default App;