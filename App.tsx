import React, { useEffect, useState, useRef } from 'react';
import { BusinessCard } from './components/BusinessCard';
import { Portfolio } from './components/Portfolio';
import { ChevronDown, Lock, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  // Target is the actual scroll position, Current is the smoothed visual position
  const [scrollTarget, setScrollTarget] = useState(0);
  const [scrollCurrent, setScrollCurrent] = useState(0);

  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [sessionTime, setSessionTime] = useState('00:00:00');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [triggerShake, setTriggerShake] = useState(false);

  // --- 1. HEAVY PHYSICS LOOP ---
  // This creates the "weight" of the card.
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setScrollCurrent((prev) => {
        // We calculate the distance between where we want to be (target) and where we are (prev)
        const diff = scrollTarget - prev;

        // STOP CONDITION: If we are very close, snap to target to save CPU
        if (Math.abs(diff) < 0.0005) return scrollTarget;

        // PHYSICS CALCULATION:
        // 0.04 is the "Tension". Lower number = Heavier/Slower lag.
        // This makes the card feel like it weighs 5kg instead of 5g.
        return prev + diff * 0.04;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollTarget]);

  // --- 2. INPUT HANDLERS ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // INCREASED DIVISOR: 1500px instead of 600px.
      // This means you have to scroll more to move the card, allowing for "slow motion" control.
      const progress = Math.min(scrollY / 1500, 1.2);
      setScrollTarget(progress);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // --- 3. LOGIC & TRIGGER EFFECTS ---
  useEffect(() => {
    // Logic Lock
    if (scrollCurrent > 0.82 && !isAuthorized) {
      setIsAuthorized(true);
      setTriggerShake(true); // Visual "Clunk"
      setTimeout(() => setTriggerShake(false), 400);
    }
    if (scrollCurrent < 0.6 && isAuthorized) {
      setIsAuthorized(false);
    }

    // Timer
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Date.now() - start;
      const date = new Date(diff);
      setSessionTime(date.toISOString().substr(11, 8));
    }, 1000);
    return () => clearInterval(interval);
  }, [scrollCurrent, isAuthorized]);


  // --- 4. CALCULATED TRANSFORMS ---
  // The card moves up, tilts back, and scales down slightly to fit the "slot"
  const cardTranslateY = -scrollCurrent * 75;
  const cardRotateX = scrollCurrent * 35; // Reduced tilt for a tighter slot feeling
  const cardScale = 1 - scrollCurrent * 0.12;

  // Lighting Physics: The card gets much darker as it enters the slot
  const cardBrightness = Math.max(0.3, 1 - scrollCurrent * 1.2);

  // The "Scanner" beam intensity
  const scannerIntensity = isAuthorized ? 0 : Math.max(0, Math.sin(scrollCurrent * Math.PI * 3) * 1.5);

  return (
    <div className={`min-h-[250vh] w-full bg-[#020202] text-gray-300 font-sans selection:bg-[#cbb577]/30 overflow-x-hidden cursor-crosshair ${triggerShake ? 'animate-shake' : ''}`}>

      {/* --- GLOBAL STYLES FOR SHAKE --- */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both; }
      `}</style>

      {/* --- DYNAMIC BACKGROUND --- */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle 1200px at ${cursorPos.x}% ${cursorPos.y}%, ${isAuthorized ? 'rgba(10, 30, 20, 0.4)' : 'rgba(20, 20, 25, 0.6)'}, #000000 100%)`
        }}
      />

      {/* Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">

        {/* --- HUD / STATUS --- */}
        <div className="fixed top-6 left-6 md:left-12 flex flex-col gap-1 z-50 mix-blend-difference">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full transition-all duration-700 ${isAuthorized ? 'bg-emerald-500 shadow-[0_0_20px_#10b981]' : 'bg-orange-500/50'}`} />
            <span className={`font-mono text-[0.6rem] tracking-[0.2em] uppercase transition-colors duration-500 ${isAuthorized ? 'text-emerald-500' : 'text-gray-500'}`}>
              {isAuthorized ? 'AUTHENTICATED' : 'LOCKED'}
            </span>
          </div>
          <span className="font-mono text-[0.5rem] tracking-widest text-gray-700">
            SESSION: {sessionTime}
          </span>
        </div>

        {/* --- THE CARD READER TERMINAL --- */}
        <div className="h-[100vh] flex flex-col items-center justify-center sticky top-0 perspective-1000">

          {/* 1. The Physical "Slot" (Top overlay that hides the card) */}
          <div
            className="absolute top-0 left-0 right-0 h-[48vh] z-40 pointer-events-none flex flex-col justify-end items-center bg-gradient-to-b from-[#020202] via-[#020202] to-transparent"
            style={{ opacity: scrollCurrent > 0.1 ? 1 : 0 }}
          >
            {/* The "Lip" of the reader */}
            <div className="w-[360px] md:w-[460px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative">
              <div className={`absolute inset-0 bg-emerald-500 blur-xl transition-opacity duration-500 ${isAuthorized ? 'opacity-30' : 'opacity-0'}`} />
            </div>
          </div>

          {/* 2. Text / Instructions (Fades out) */}
          <div
            className="text-center space-y-6 mb-24 transition-all duration-500 ease-out will-change-transform"
            style={{
              opacity: 1 - scrollCurrent * 3,
              transform: `translateY(${-scrollCurrent * 100}px) scale(${1 - scrollCurrent * 0.1})`
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Lock className="w-3 h-3 text-[#cbb577]" />
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#cbb577]/50 to-transparent" />
              <span className="text-[0.5rem] font-mono tracking-[0.4em] text-[#cbb577] uppercase">
                Secure Entry
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#cbb577]/50 to-transparent" />
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-bold tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 drop-shadow-2xl">
              DEBJIT DEY
            </h1>
          </div>

          {/* 3. The Card Assembly */}
          <div className="relative group perspective-1000 z-20">

            {/* Authorization Flash (Behind card) */}
            <div
              className={`absolute inset-[-50%] bg-emerald-500/10 blur-[100px] rounded-full transition-opacity duration-1000 ${isAuthorized ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* The Actual Card */}
            <div
              className="relative transition-transform duration-75 ease-linear will-change-transform"
              style={{
                transform: `
                  translateY(${cardTranslateY}vh) 
                  scale(${cardScale}) 
                  rotateX(${cardRotateX}deg)
                `,
                filter: `brightness(${cardBrightness}) grayscale(${isAuthorized ? 0 : 0.4})`,
              }}
            >
              <BusinessCard />

              {/* Scanline Effect (Over card) */}
              {!isAuthorized && (
                <div
                  className="absolute inset-x-0 h-[2px] bg-cyan-400/50 z-50 pointer-events-none shadow-[0_0_20px_rgba(34,211,238,0.6)]"
                  style={{
                    top: `${(scrollCurrent * 100) % 100}%`, // Beam follows the card
                    opacity: scannerIntensity,
                  }}
                />
              )}
            </div>

            {/* Floor Reflection/Shadow */}
            <div
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[60%] h-4 bg-black blur-xl rounded-[100%] transition-all duration-300"
              style={{
                opacity: (1 - scrollCurrent) * 0.8,
                transform: `scale(${1 - scrollCurrent})`
              }}
            />
          </div>

          {/* 4. Success Indicator */}
          <div
            className="absolute z-50 flex flex-col items-center gap-4 transition-all duration-700 delay-100"
            style={{
              opacity: isAuthorized ? 1 : 0,
              transform: `translateY(${isAuthorized ? 0 : 30}px)`
            }}
          >
            <div className="p-4 rounded-full bg-[#020202] border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            </div>
            <span className="font-mono text-[0.6rem] tracking-[0.3em] text-emerald-600 uppercase">
              Access Granted
            </span>
          </div>

          {/* 5. Scroll Prompt */}
          <div
            className="absolute bottom-12 flex flex-col items-center gap-4 text-gray-600 transition-all duration-500"
            style={{ opacity: 1 - scrollCurrent * 4 }}
          >
            <div className="flex flex-col items-center gap-2 animate-pulse">
              <span className="text-[0.5rem] font-mono tracking-[0.3em] uppercase opacity-40 text-gray-400">
                Insert Card to Begin
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500/30" />
            </div>
          </div>
        </div>

        {/* --- PORTFOLIO CONTENT --- */}
        <div className="relative z-30 min-h-screen bg-[#020202] border-t border-white/5 shadow-[0_-100px_150px_rgba(0,0,0,1)]">
          <div style={{ opacity: isAuthorized ? 1 : 0, filter: isAuthorized ? 'none' : 'blur(20px)', transition: 'all 1.5s ease-out' }}>
            <div className="pt-32">
              <Portfolio />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;