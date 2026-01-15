import React from 'react';

const BackgroundGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020617]">
      {/* Deep Atmospheric Base - Simulating the rich depth of the reference */}
      <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-[#0B1121] rounded-full blur-[120px] opacity-90"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-[#020617] rounded-full blur-[120px] opacity-90"></div>

      {/* Large Colorful Nebulas - Brand Palette version of the reference rich glow */}
      <div className="absolute top-[0%] left-[10%] w-[60vw] h-[60vw] bg-brand-cyber/10 rounded-full blur-[180px] animate-pulse-slow"></div>
      <div className="absolute bottom-[0%] right-[0%] w-[50vw] h-[50vw] bg-brand-accent/5 rounded-full blur-[200px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-[40%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-brand-purple/10 rounded-full blur-[150px] animate-float"></div>

      {/* Grid Overlay - Preserved as requested */}
      <div 
        className="absolute inset-0 opacity-[0.06]" 
        style={{
          backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>
      
      {/* Subtle Vignette to keep focus center */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/80"></div>
    </div>
  );
};

export default BackgroundGrid;