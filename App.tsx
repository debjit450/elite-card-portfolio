import React, { useEffect, useState } from 'react';
import { BusinessCard } from './components/BusinessCard';
import { Portfolio } from './components/Portfolio';
import { ChevronDown, Lock, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [scrollTarget, setScrollTarget] = useState(0);
  const [scrollCurrent, setScrollCurrent] = useState(0);

  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [sessionTime, setSessionTime] = useState('00:00:00');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [triggerShake, setTriggerShake] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const SCROLL_HEIGHT = 5000;
  const TRIGGER_POINT = 0.3;
  const UNLOCK_POINT = 0.4;

  // Initial loader
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2300);
    return () => clearTimeout(timer);
  }, []);

  // Physics loop
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setScrollCurrent((prev) => {
        const diff = scrollTarget - prev;
        if (Math.abs(diff) < 0.0001) return scrollTarget;
        const next = prev + diff * 0.05;
        return Math.min(Math.max(next, 0), 1.05);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollTarget]);

  // Scroll + mouse handlers
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollTarget(0);
        return;
      }
      const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);
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

  // Logic & timer
  useEffect(() => {
    if (scrollCurrent > UNLOCK_POINT && !isAuthorized) {
      setIsAuthorized(true);
      setTriggerShake(true);
      setTimeout(() => setTriggerShake(false), 400);
    }
    if (scrollCurrent < TRIGGER_POINT && isAuthorized) {
      setIsAuthorized(false);
    }

    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Date.now() - start;
      const date = new Date(diff);
      setSessionTime(date.toISOString().substr(11, 8));
    }, 1000);
    return () => clearInterval(interval);
  }, [scrollCurrent, isAuthorized]);

  // Animation calculations
  const insertProgress = Math.min(scrollCurrent / TRIGGER_POINT, 1);

  const baseCardTranslateY = 0 - insertProgress * 35;
  const postUnlockProgress = Math.max(0, (scrollCurrent - UNLOCK_POINT) / 0.3);
  const extraLift = Math.min(postUnlockProgress, 1) * 80;
  const cardTranslateY = baseCardTranslateY - extraLift;

  const cardRotateX = insertProgress * 15;
  const cardScale = 1 - insertProgress * 0.1;
  const cardBrightness = 1 - insertProgress * 0.3;

  const scanPhase = (scrollCurrent - TRIGGER_POINT) / (UNLOCK_POINT - TRIGGER_POINT);
  const rawPortfolioOpacity = (scrollCurrent - UNLOCK_POINT) * 2.5;
  const portfolioOpacity = Math.min(Math.max(rawPortfolioOpacity, 0), 1);
  const portfolioTranslate = Math.max(0, (scrollCurrent - UNLOCK_POINT) * 50);

  const titleOpacity = Math.max(0, 1 - insertProgress * 2);
  const titleScale = 1 + insertProgress * 0.1;

  const mainLayerOpacity = 1 - portfolioOpacity;
  const cardOpacity = Math.max(0, 1 - (scrollCurrent - UNLOCK_POINT) * 4);
  const isCardCompletelyGone = portfolioOpacity >= 0.95;

  const isScanningBase = scrollCurrent > TRIGGER_POINT && scrollCurrent < UNLOCK_POINT;

  // Old-money visual tuning: warm gold, no neon
  const visualAuthorized = isAuthorized && portfolioOpacity < 0.4;
  const visualScanning = isScanningBase && portfolioOpacity < 0.4;
  const scannerIntensity = visualScanning ? Math.max(0, Math.sin(scanPhase * Math.PI * 4)) : 0;

  // Portfolio entry: subtle scale, no blur
  const portfolioScale = 0.96 + portfolioOpacity * 0.04;

  const curtainOpacity = 1 - Math.min(Math.max((portfolioOpacity - 0.4) * 2.5, 0), 1);
  const crestOpacity = Math.min(portfolioOpacity * 2, 1) * curtainOpacity;
  const crestScale = 1 + (1 - portfolioOpacity) * 0.06;

  // Side-rail visibility
  const railOpacity = Math.min(Math.max((portfolioOpacity - 0.25) * 2, 0), 0.9);

  return (
    <div
      className={`w-full bg-[#020202] text-gray-300 font-sans selection:bg-[#cbb577]/30 cursor-crosshair ${triggerShake ? 'animate-shake' : ''
        }`}
      style={{ height: `${SCROLL_HEIGHT}px` }}
    >
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both; }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes loader-bar {
          0% { transform: scaleX(0); transform-origin: left; opacity: 0.3; }
          40% { transform: scaleX(0.9); opacity: 1; }
          100% { transform: scaleX(1); opacity: 0.9; }
        }
      `}</style>

      <div className="fixed inset-0 overflow-hidden perspective-1000">
        {/* Background */}
        <div
          className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(
              circle 1100px at ${cursorPos.x}% ${cursorPos.y}%,
              ${visualAuthorized
                ? 'rgba(120, 96, 52, 0.55)'
                : 'rgba(18, 18, 20, 0.9)'
              },
              #000000 100%
            )`
          }}
        />

        {/* Noise Grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06] z-0 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />

        {/* MAIN CONTENT WRAPPER (fades in after loader) */}
        <div
          className="relative z-10 w-full h-full flex flex-col items-center justify-center transition-opacity duration-700"
          style={{
            opacity: isLoading ? 0 : 1,
            pointerEvents: isLoading ? 'none' : 'auto'
          }}
        >
          {/* HUD */}
          <div className="absolute top-6 left-6 md:left-12 flex flex-col gap-1 z-50 mix-blend-difference pointer-events-none">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-700 ${isAuthorized
                  ? 'bg-[#e6c36a] shadow-[0_0_20px_rgba(230,195,106,0.9)]'
                  : 'bg-orange-500/50'
                  }`}
              />
              <span
                className={`font-mono text-[0.6rem] tracking-[0.2em] uppercase transition-colors duration-500 ${isAuthorized ? 'text-[#e6c36a]' : 'text-gray-500'
                  }`}
              >
                {isAuthorized ? 'ACCESS_GRANTED' : 'IDLE'}
              </span>
            </div>
            <span className="font-mono text-[0.5rem] tracking-widest text-gray-700">
              SESSION: {sessionTime}
            </span>
          </div>

          {/* MAIN INTERFACE (CARD + READER) */}
          {!isCardCompletelyGone && (
            <div
              className="relative w-full h-full flex flex-col items-center justify-center transition-all duration-700 ease-out"
              style={{
                opacity: mainLayerOpacity,
                pointerEvents: portfolioOpacity > 0.2 ? 'none' : 'auto'
              }}
            >


              {/* Title */}
              <div
                className="absolute top-[20%] text-center space-y-4 z-0"
                style={{
                  opacity: titleOpacity,
                  transform: `scale(${titleScale}) translateY(${-insertProgress * 100}px)`
                }}
              >
                <div className="flex items-center justify-center gap-3 mb-2 opacity-60">
                  <Lock className="w-3 h-3 text-[#cbb577]" />
                  <span className="text-[0.5rem] font-mono tracking-[0.4em] text-[#cbb577] uppercase">
                    Private Dossier
                  </span>
                </div>
                <h1 className="text-4xl md:text-7xl font-display font-bold tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-600 drop-shadow-2xl">
                  DEBJIT DEY
                </h1>
              </div>

              {/* Card Container */}
              <div className="relative group perspective-1000 z-20 mt-32 md:mt-16">
                {/* Golden Success Glow behind card */}
                <div
                  className={`absolute inset-[-50%] bg-gradient-to-b from-[#e6c36a]/25 via-[#b89b56]/35 to-transparent blur-[120px] rounded-full transition-all duration-700 ${visualAuthorized ? 'opacity-100 scale-125' : 'opacity-0 scale-75'
                    }`}
                />

                {/* Card */}
                <div
                  className="relative transition-transform duration-100 ease-out will-change-transform"
                  style={{
                    transform: `
                      translateY(${cardTranslateY}vh) 
                      scale(${cardScale}) 
                      rotateX(${cardRotateX}deg)
                    `,
                    filter: `brightness(${cardBrightness})`,
                    opacity: cardOpacity
                  }}
                >
                  <BusinessCard />

                  {/* Laser Scan – warm gold */}
                  <div
                    className="absolute left-[-10%] right-[-10%] h-[2px] bg-[#f5e3a5] z-50 pointer-events-none shadow-[0_0_15px_rgba(230,195,106,0.9)] mix-blend-screen"
                    style={{
                      top: `${Math.sin(Date.now() / 200) * 50 + 50}%`,
                      opacity: scannerIntensity,
                      display: visualScanning ? 'block' : 'none'
                    }}
                  />
                </div>

                {/* Floor Shadow */}
                <div
                  className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[60%] h-8 bg-black blur-2xl rounded-[100%] transition-all duration-300"
                  style={{
                    opacity: (1 - insertProgress) * 0.6 * (1 - portfolioOpacity),
                    transform: `scale(${(1 - insertProgress) * (1 - portfolioOpacity)})`
                  }}
                />
              </div>

              {/* Identity Verified Badge */}
              <div
                className="absolute top-[45%] z-50 flex flex-col items-center gap-3 transition-all duration-700"
                style={{
                  opacity: visualAuthorized ? mainLayerOpacity : 0,
                  transform: `translateY(${visualAuthorized ? 0 : 40}px) scale(${visualAuthorized ? 1 : 0.8
                    })`
                }}
              >
                <div className="p-3 rounded-full bg-black/85 border border-[#e6c36a]/50 backdrop-blur-md shadow-[0_0_30px_rgba(230,195,106,0.4)]">
                  <CheckCircle2 className="w-8 h-8 text-[#e6c36a]" />
                </div>
                <div className="px-4 py-1 rounded-full bg-black/70 border border-[#e6c36a]/40">
                  <span className="font-mono text-[0.6rem] tracking-[0.3em] text-[#e6c36a] uppercase">
                    Identity Verified
                  </span>
                </div>
              </div>

              {/* Scroll Indicator */}
              <div
                className="absolute bottom-12 flex flex-col items-center gap-4 text-gray-500 transition-all duration-500 pointer-events-none"
                style={{ opacity: Math.max(0, 1 - insertProgress * 5) * mainLayerOpacity }}
              >
                <div className="flex flex-col items-center gap-3 animate-pulse">
                  <span className="text-[0.5rem] font-mono tracking-[0.3em] uppercase opacity-60">
                    Scroll to Insert
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-500/50" />
                </div>
              </div>
            </div>
          )}

          {/* PORTFOLIO LAYER */}
          <div
            className="absolute inset-0 z-40 flex flex-col items-center justify-start"
            style={{
              opacity: portfolioOpacity,
              pointerEvents: portfolioOpacity > 0.5 ? 'auto' : 'none'
            }}
          >
            {/* Side rails / frame */}
            <div
              className="pointer-events-none absolute inset-y-10 left-6 md:left-16 w-px bg-gradient-to-b from-transparent via-[#cbb577]/40 to-transparent"
              style={{ opacity: railOpacity }}
            />
            <div
              className="pointer-events-none absolute inset-y-10 right-6 md:right-16 w-px bg-gradient-to-b from-transparent via-[#cbb577]/40 to-transparent"
              style={{ opacity: railOpacity }}
            />

            {/* Bottom folio tag */}
            <div
              className="pointer-events-none absolute left-8 md:left-16 bottom-10 flex items-center gap-3"
              style={{ opacity: railOpacity }}
            >
              <span className="h-px w-10 bg-[#cbb577]/40" />
              <span className="text-[0.55rem] font-mono tracking-[0.3em] uppercase text-gray-500">
                Folio No. 01
              </span>
            </div>

            {/* Actual portfolio content */}
            <div
              className="w-full h-full overflow-y-auto hide-scrollbar pt-[15vh] pb-[10vh] px-4"
              style={{
                transform: `translateY(${-portfolioTranslate}px) scale(${portfolioScale})`,
                transition: 'transform 0.5s ease-out'
              }}
            >
              <div className="max-w-5xl mx-auto min-h-screen">
                <Portfolio />
              </div>
            </div>
          </div>
        </div>

        {/* FULLSCREEN LOADER */}
        <div
          className="absolute inset-0 z-[60] flex items-center justify-center bg-[#050505]"
          style={{
            opacity: isLoading ? 1 : 0,
            pointerEvents: isLoading ? 'auto' : 'none',
            transition: 'opacity 0.6s ease-out'
          }}
        >
          <div className="max-w-sm w-full px-8">
            <div className="flex flex-col items-center gap-6">
              {/* Crest */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full border border-[#cbb577]/40 bg-gradient-to-b from-[#111111] via-[#050505] to-black flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.9)]">
                  <span className="font-serif text-lg tracking-[0.25em] text-[#e6c36a]">
                    DD
                  </span>
                </div>
                <div className="absolute inset-[-8px] rounded-full border border-[#cbb577]/20 opacity-60" />
              </div>

              {/* Text */}
              <div className="text-center space-y-2">
                <p className="text-[0.6rem] font-mono tracking-[0.35em] uppercase text-[#8d835c]">
                  Establishing Secure Session
                </p>
                <p className="text-sm md:text-base font-serif text-gray-200 tracking-[0.18em] uppercase">
                  Debjit Dey — Developer Portfolio
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full mt-2">
                <div className="w-full h-[1px] bg-white/5 mb-1" />
                <div className="w-full h-[3px] bg-black/70 border border-[#cbb577]/25 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#a4853b] via-[#e6c36a] to-[#a4853b]"
                    style={{
                      transform: 'scaleX(1)',
                      transformOrigin: 'left',
                      animation: 'loader-bar 2.1s ease-out forwards'
                    }}
                  />
                </div>
                <p className="mt-3 text-[0.55rem] font-mono tracking-[0.22em] text-gray-600 text-center uppercase">
                  Please wait
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* END LOADER */}
      </div>
    </div>
  );
};

export default App;
