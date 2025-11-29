import React, { useState, useRef } from 'react';
import { Wifi, QrCode } from 'lucide-react';

export const BusinessCard: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Reduced sensitivity (was 12, now 8) to make the card feel heavier
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 });
  const handleClick = () => setIsFlipped(!isFlipped);

  return (
    <div className="flex items-center justify-center p-4">
      <div
        className="perspective-1000 select-none cursor-pointer group"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div
          className="w-[340px] h-[215px] md:w-[440px] md:h-[280px] relative transform-style-3d transition-transform duration-200 ease-out will-change-transform"
          style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
        >
          <div
            className="w-full h-full relative transform-style-3d transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            style={{ transform: `rotateY(${isFlipped ? 180 : 0}deg)` }}
          >
            {/* FRONT */}
            <div className="absolute w-full h-full rounded-[12px] backface-hidden overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] bg-[#0d0d0d]">
              {/* Base */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#080808] via-[#040404] to-[#000000]" />

              {/* Brushed metal */}
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, 
                    transparent 0px, 
                    rgba(255,255,255,0.06) 0.5px, 
                    transparent 1px, 
                    transparent 2px)`
                }}
              />

              {/* Carbon pattern */}
              <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(45deg, transparent 0, transparent 2px, rgba(255,255,255,0.1) 2px, transparent 4px),
                    repeating-linear-gradient(-45deg, transparent 0, transparent 2px, rgba(255,255,255,0.1) 2px, transparent 4px)`,
                  backgroundSize: '8px 8px'
                }}
              />

              {/* Gold reflection */}
              <div
                className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay transition-opacity duration-150"
                style={{
                  background: `radial-gradient(
                    circle at ${48 + rotation.y * 1.5}% ${50 + rotation.x * 1.5}%,
                    rgba(212, 175, 55, 0.16) 0%,
                    transparent 55%
                  )`
                }}
              />

              {/* Metallic sheen */}
              <div
                className="absolute inset-0 z-10 pointer-events-none mix-blend-soft-light transition-all duration-150"
                style={{
                  background: `linear-gradient(
                    ${110 + rotation.y * 1.2}deg, 
                    transparent 20%, 
                    rgba(212, 175, 55, 0.16) 40%, 
                    rgba(255, 255, 255, 0.09) 52%, 
                    transparent 72%
                  )`
                }}
              />

              {/* Edge */}
              <div
                className="absolute inset-0 z-20 rounded-[12px] border-2 border-transparent bg-gradient-to-br from-[#d4af37]/18 via-transparent to-[#8b7355]/18 bg-clip-border"
                style={{ WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}
              />
              <div className="absolute inset-[1px] z-20 rounded-[11px] border border-black/70" />

              {/* Content */}
              <div className="relative h-full w-full px-6 py-6 md:px-8 md:py-7 flex flex-col justify-between z-30">
                {/* Header */}
                <div className="flex justify-between items-start">
                  {/* Chip */}
                  <div className="w-11 h-9 md:w-[52px] md:h-[42px] relative rounded-[3px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.3)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f9e5a1] via-[#d4af37] to-[#c9a961]" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#fff5cc]/40 to-transparent" />
                    <div className="absolute inset-0 rounded-[3px] border-[1px] border-black/25 shadow-inner" />
                    <div className="absolute inset-[6px] grid grid-cols-3 gap-[1px]">
                      {[...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-br from-[#8b7355] to-[#6b5839] rounded-[0.5px] shadow-inner"
                        />
                      ))}
                    </div>
                    <div className="absolute left-[28%] top-0 bottom-0 w-[0.5px] bg-black/30" />
                    <div className="absolute right-[28%] top-0 bottom-0 w-[0.5px] bg-black/30" />
                    <div className="absolute top-[35%] left-0 right-0 h-[0.5px] bg-black/30" />
                    <div className="absolute bottom-[35%] left-0 right-0 h-[0.5px] bg-black/30" />
                  </div>

                  {/* Contactless */}
                  <div className="relative flex flex-col items-end gap-1">
                    <Wifi className="w-5 h-5 md:w-6 md:h-6 text-[#d4af37] rotate-90 opacity-70" strokeWidth={1.8} />
                    <span className="text-[0.45rem] uppercase tracking-[0.18em] text-[#b8b8b8]">
                      tap to connect
                    </span>
                  </div>
                </div>

                {/* Center number */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                  <div className="flex gap-3 md:gap-5">
                    {['0101', '0010', '1010', '1100'].map((num, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-base md:text-xl tracking-[0.2em] font-light"
                        style={{
                          color: '#e0e0e0',
                          textShadow: `
                            0 0 1px rgba(212, 175, 55, 0.35),
                            0 1px 2px rgba(0, 0, 0, 0.9),
                            0 -0.5px 0 rgba(255, 255, 255, 0.12)
                          `
                        }}
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end mt-auto">
                  {/* Left */}
                  <div className="flex flex-col space-y-2">
                    <div
                      className="text-[0.5rem] md:text-[0.55rem] font-light tracking-[0.25em] uppercase"
                      style={{
                        color: '#d4af37',
                        textShadow:
                          '0 0 8px rgba(212, 175, 55, 0.4), 0 1px 2px rgba(0, 0, 0, 0.8)'
                      }}
                    >
                      Member Since 2024
                    </div>

                    <h1
                      className="font-serif text-xl md:text-2xl tracking-[0.12em] uppercase font-normal"
                      style={{
                        color: '#f4f4f4',
                        textShadow: `
                          0 1px 0 rgba(255, 255, 255, 0.18),
                          0 2px 4px rgba(0, 0, 0, 0.95),
                          0 0 1px rgba(212, 175, 55, 0.25)
                        `
                      }}
                    >
                      Debjit Dey
                    </h1>

                    <span
                      className="text-[0.6rem] md:text-[0.65rem] font-light tracking-[0.2em] uppercase"
                      style={{
                        color: '#b4b4b4',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.7)'
                      }}
                    >
                      Software Engineer
                    </span>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-end space-y-1.5">
                    <span
                      className="text-[0.5rem] md:text-[0.55rem] tracking-[0.25em] uppercase font-light text-right"
                      style={{
                        color: '#d4af37',
                        textShadow:
                          '0 0 6px rgba(212, 175, 55, 0.3), 0 1px 2px rgba(0, 0, 0, 0.8)'
                      }}
                    >
                      Full Stack
                    </span>

                    <div className="relative w-10 h-10 md:w-12 md:h-12">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d4af37] via-[#f9e5a1] to-[#b8941e] shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)]" />
                      <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-[#050505] to-[#000000] border border-[#d4af37]/35" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-5 h-5 md:w-6 md:h-6 text-[#d4af37] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                          fill="currentColor"
                        >
                          <path d="M12 2L1 21h22L12 2zm0 4.8L17.5 18h-11L12 6.8z" />
                        </svg>
                      </div>
                    </div>

                    <span className="text-[0.4rem] tracking-[0.18em] uppercase text-[#8c8c8c]">
                      precision • craft • reliability
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BACK */}
            <div className="absolute w-full h-full rounded-[12px] backface-hidden overflow-hidden bg-[#050505] shadow-[0_20px_60px_rgba(0,0,0,0.9)] rotate-y-180">
              {/* Base */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#080808] via-[#020202] to-[#000000]" />

              {/* Brushed texture */}
              <div
                className="absolute inset-0 opacity-[0.11]"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, rgba(255,255,255,0.05) 0.5px, transparent 1px, transparent 2px)`
                }}
              />

              {/* Soft pattern lights */}
              <div
                className="absolute inset-0 opacity-[0.05] mix-blend-soft-light"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 35%, rgba(255,255,255,0.18) 0, transparent 55%),
                    radial-gradient(circle at 80% 70%, rgba(255,255,255,0.14) 0, transparent 50%)
                  `
                }}
              />

              {/* Sheen */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-soft-light transition-all duration-150 opacity-80"
                style={{
                  background: `linear-gradient(
                    70deg,
                    transparent 18%,
                    rgba(212,175,55,0.18) 40%,
                    transparent 65%
                  )`
                }}
              />

              {/* Border */}
              <div className="absolute inset-0 z-10 rounded-[12px] border-2 border-transparent bg-gradient-to-br from-[#d4af37]/14 via-transparent to-[#8b7355]/14 bg-clip-border" />
              <div className="absolute inset-[1px] z-10 rounded-[11px] border border-black/70" />

              {/* Stripe */}
              <div className="absolute top-7 md:top-8 w-full h-11 md:h-12 relative overflow-hidden">
                <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1b1b1b] via-black to-[#050505]">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/7" />
                </div>
                <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60" />
              </div>

              {/* Content column */}
              <div className="absolute left-6 md:left-8 right-6 md:right-8 top-[96px] md:top-[104px] bottom-6 md:bottom-7 z-20 flex flex-col justify-between">
                {/* Signature + CVV */}
                <div className="flex items-center gap-3 md:gap-4 mb-2">
                  <div className="relative flex-1 h-9 md:h-10 overflow-hidden rounded-[2px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5f5] to-[#e9e9e9]" />
                    <div
                      className="absolute inset-0 opacity-[0.09]"
                      style={{
                        backgroundImage: `repeating-linear-gradient(45deg, #000 0px, #000 1px, transparent 1px, transparent 3px)`
                      }}
                    />
                    <div className="absolute inset-0 border border-[#d4af37]/40 rounded-[2px]" />
                    <div className="absolute inset-0 flex items-center px-3 md:px-4 justify-between">
                      <span
                        className="font-serif italic text-base md:text-lg z-10"
                        style={{
                          color: '#181818',
                          fontFamily: 'Georgia, serif',
                          textShadow: '0 0.5px 0 rgba(0,0,0,0.12)'
                        }}
                      >
                        Debjit Dey
                      </span>
                      <span className="text-[0.45rem] uppercase tracking-[0.16em] text-[#8c8c8c]">
                        authorized signature
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-0.5">
                    <div className="px-3 py-1.5 bg-black/55 rounded-[3px] border border-[#d4af37]/45 shadow-[0_0_7px_rgba(212,175,55,0.55)]">
                      <span
                        className="font-mono text-xs md:text-sm font-bold tracking-[0.3em]"
                        style={{
                          color: '#ffd973',
                          textShadow:
                            '0 0 9px rgba(212, 175, 55, 0.6), 0 1px 2px rgba(0, 0, 0, 0.9)'
                        }}
                      >
                        999
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom info */}
                <div className="flex items-end justify-between gap-4">
                  <div className="flex-1 space-y-1.5">
                    <p className="text-[0.5rem] md:text-[0.55rem] text-gray-400 font-light leading-relaxed tracking-[0.14em] uppercase">
                      professional identity card not valid for monetary transactions
                    </p>
                    <p className="text-[0.45rem] md:text-[0.5rem] text-gray-500 tracking-[0.14em] uppercase mt-1">
                      professional inquiries
                    </p>
                    <p
                      className="text-[0.5rem] md:text-[0.55rem] normal-case tracking-normal"
                      style={{ color: '#d4af37' }}
                    >
                      d.dey2002@yahoo.com
                    </p>
                    <p className="text-[0.45rem] md:text-[0.5rem] text-gray-500 mt-1">
                      Support: +91 •••• •• 2211   •  debjit.dev/portfolio
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <a
                      href="mailto:debjit.dey@engineer.com"
                      className="relative p-[2px] rounded-[4px] bg-gradient-to-br from-[#d4af37] via-[#f9e5a1] to-[#b8941e] shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="bg-white p-1.5 md:p-2 rounded-[3px] border border-black/5">
                        <QrCode className="w-9 h-9 md:w-10 md:h-10 text-black" strokeWidth={1.5} />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};