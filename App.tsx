import React, { useEffect, useState, useRef } from 'react';
import { BusinessCard } from './components/BusinessCard';
import { Portfolio } from './components/Portfolio';
import { ChevronDown, Lock, Radio, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [sessionTime, setSessionTime] = useState('00:00:00');
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Track Mouse for Spotlight Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Live Session Timer
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Date.now() - start;
      const date = new Date(diff);
      setSessionTime(date.toISOString().substr(11, 8));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll & Authorization Logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / 500, 1);
      setScrollProgress(progress);
      
      // Trigger "Authorized" state when card is fully inserted/swiped
      if (progress > 0.8 && !isAuthorized) setIsAuthorized(true);
      if (progress < 0.5 && isAuthorized) setIsAuthorized(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAuthorized]);

  // Card Physics Calculations
  const cardScale = 1 - scrollProgress * 0.1;
  const cardTranslateY = -scrollProgress * 70; // Move up out of view
  const cardRotateX = scrollProgress * 60; // Tilt into the "terminal"
  const cardOpacity = 1 - Math.max(0, scrollProgress - 0.7) * 3;

  // Scanner Beam Position
  const scannerOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.1) * 3)) * (1 - scrollProgress);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-gray-300 font-sans selection:bg-[#cbb577]/30 overflow-x-hidden cursor-crosshair">
      
      {/* --- IMMERSIVE BACKGROUND --- */}
      
      {/* 1. Dynamic Spotlight (Flashlight) - Brighter center to highlight metal */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 800px at ${cursorPos.x}% ${cursorPos.y}%, rgba(30, 35, 45, 1), transparent 100%)`
        }}
      />

      {/* 2. Grain Texture (Visible only in spotlight) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.06] z-0 mix-blend-overlay"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* 3. Floating Particles (Static representation for performance) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/20 rounded-full blur-[1px]" />
        <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-white/10 rounded-full blur-[1px]" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white/10 rounded-full blur-[1px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        
        {/* --- LIVE SESSION HEADER --- */}
        <div className="fixed top-6 left-6 md:left-12 flex flex-col gap-1 z-50 mix-blend-difference">
           <div className="flex items-center gap-2">
             <div className={`w-2 h-2 rounded-full ${isAuthorized ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-amber-500 animate-pulse'}`} />
             <span className="font-mono text-[0.6rem] tracking-[0.2em] text-gray-400 uppercase">
               {isAuthorized ? 'AUTHORIZED' : 'LIVE SESSION'}
             </span>
           </div>
           <span className="font-mono text-[0.5rem] tracking-widest text-gray-600">
             ID: 8X99-{Math.floor(Date.now() / 10000).toString().slice(-4)} • {sessionTime}
           </span>
        </div>

        {/* --- STICKY CARD TERMINAL --- */}
        <div className="h-[100vh] flex flex-col items-center justify-center sticky top-0 perspective-1000">
          
          {/* Main Title - Fades out */}
          <div 
            className="text-center space-y-6 mb-12 transition-all duration-500 ease-out will-change-transform"
            style={{ 
              opacity: 1 - scrollProgress * 2,
              transform: `translateY(${-scrollProgress * 100}px) scale(${1 - scrollProgress * 0.2})`
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
               <Lock className="w-3 h-3 text-[#cbb577]" />
               <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#cbb577]/50 to-transparent" />
               <span className="text-[0.5rem] font-mono tracking-[0.4em] text-[#cbb577] uppercase">
                 Encrypted Connection
               </span>
               <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#cbb577]/50 to-transparent" />
            </div>
            
            <h1 className="text-4xl md:text-7xl font-display font-bold tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 drop-shadow-2xl">
              DEBJIT DEY
            </h1>
            
            <p className="text-[0.6rem] md:text-xs font-serif italic tracking-[0.2em] text-gray-500">
              Premium Engineering Solutions • Est. 2020
            </p>
          </div>

          {/* Card Container with Laser Scan Effect */}
          <div className="relative group">
            
            {/* The Scanner Laser Beam */}
            <div 
              className="absolute left-[-20%] right-[-20%] h-[2px] bg-cyan-400 blur-[2px] z-50 pointer-events-none shadow-[0_0_15px_rgba(34,211,238,0.8)]"
              style={{
                top: '50%',
                opacity: scannerOpacity,
                transform: `scaleX(${scrollProgress * 1.5})`
              }}
            />
            
            {/* The Card */}
            <div 
              className="relative z-20 transition-transform duration-75 ease-linear will-change-transform"
              style={{
                transform: `
                  translateY(${cardTranslateY}vh) 
                  scale(${cardScale}) 
                  rotateX(${cardRotateX}deg)
                `,
                opacity: cardOpacity,
              }}
            >
               <BusinessCard />
            </div>

            {/* Reflection / Floor Shadow */}
            <div 
               className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-black/50 blur-xl rounded-[100%] transition-all duration-300"
               style={{ 
                 opacity: (1 - scrollProgress) * 0.5,
                 transform: `scale(${1 - scrollProgress * 0.5})`
               }}
            />
          </div>

          {/* Scroll Prompt */}
          <div 
            className="absolute bottom-12 flex flex-col items-center gap-4 text-gray-600 transition-all duration-500"
            style={{ 
              opacity: 1 - scrollProgress * 4,
              transform: `translateY(${scrollProgress * 50}px)`
            }}
          >
             <div className="flex flex-col items-center gap-1 animate-pulse">
                <span className="text-[0.5rem] font-mono tracking-[0.3em] uppercase opacity-60 text-cyan-500/80">Insert Card</span>
                <div className="w-px h-8 bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0" />
             </div>
          </div>
        </div>

        {/* --- PORTFOLIO STATEMENT --- */}
        <div className="relative z-30 pb-32 mt-[-15vh]">
          {/* Only show portfolio content when user has started scrolling to save performace/focus */}
          <div style={{ opacity: Math.max(0, (scrollProgress - 0.3) * 1.5) }}>
             <Portfolio />
          </div>
        </div>

        {/* --- FOOTER --- */}
        <footer className="w-full border-t border-white/[0.04] py-12 text-center relative z-30">
          <div className="flex justify-center items-center gap-6 mb-8 opacity-40">
            <Radio className="w-4 h-4" />
            <Zap className="w-4 h-4" />
            <Lock className="w-4 h-4" />
          </div>
          <p className="text-[0.5rem] font-serif text-gray-600 tracking-[0.25em] uppercase">
            Transacted Securely on The Developer Network
          </p>
          <p className="text-[0.4rem] font-mono text-gray-700 mt-2 tracking-widest">
            NODE_REF: US-EAST-1A // LATENCY: 12ms
          </p>
        </footer>

      </div>
    </div>
  );
};

export default App;