import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Why QEPHIX', href: '#philosophy' },
    { name: 'About', href: '#about' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 200; // Offset to trigger a bit earlier/account for header
      
      let current = '';
      for (const link of navLinks) {
        const sectionId = link.href.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          // Check if scroll position is within the section
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Optional: update URL without page jump
      history.pushState(null, '', href);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-brand-dark/80 backdrop-blur-md border-white/10 py-4' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-brand-cyber to-brand-purple rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_20px_rgba(234,88,12,0.5)] transition-shadow duration-300">
            <span className="font-display font-bold text-white text-lg">Q</span>
          </div>
          <span className="font-display font-bold text-xl tracking-widest text-white">QEPHIX</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-sm font-medium transition-all duration-300 tracking-wide uppercase relative group ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.name}
                {/* Active Indicator Dot */}
                <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-accent transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}></span>
                {/* Text Glow for active */}
                {isActive && <span className="absolute inset-0 blur-md bg-brand-accent/20 -z-10"></span>}
              </a>
            );
          })}
          
          <button 
            onClick={() => onOpenAuth('signin')}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide uppercase"
          >
            Login
          </button>

          <button 
            onClick={() => onOpenAuth('signup')}
            className="px-5 py-2 rounded-full border border-brand-accent/50 text-brand-accent hover:bg-brand-accent hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(234,88,12,0.1)] hover:shadow-[0_0_20px_rgba(234,88,12,0.6)] text-sm font-semibold tracking-wide"
          >
            Start Focusing
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-brand-dark/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col gap-6 shadow-2xl h-screen">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-lg font-medium transition-colors ${
                  isActive ? 'text-brand-accent' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            );
          })}
          
          <div className="h-px bg-white/10 my-2"></div>
          
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenAuth('signin');
            }}
            className="text-lg font-medium text-slate-300 hover:text-white text-left"
          >
            Login
          </button>

          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenAuth('signup');
            }}
            className="w-full py-3 rounded bg-brand-accent text-white font-bold tracking-wide shadow-[0_0_15px_rgba(234,88,12,0.4)]"
          >
            Start Focusing
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;