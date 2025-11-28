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

    // Calculate rotation (max 12 degrees for substantial weight feel)
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 });
  const handleClick = () => setIsFlipped(!isFlipped);

  return (
    <div
      className="perspective-1000 select-none cursor-pointer group"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div
        className="w-[340px] h-[215px] md:w-[440px] md:h-[280px] relative transform-style-3d transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
      >
        <div
          className="w-full h-full relative transform-style-3d transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          style={{ transform: `rotateY(${isFlipped ? 180 : 0}deg)` }}
        >
          {/* =======================
              FRONT FACE 
             ======================= */}
          <div className="absolute w-full h-full rounded-[16px] backface-hidden overflow-hidden shadow-2xl bg-[#080808]">

            {/* --- MATERIAL LAYERS --- */}

            {/* 1. Base: Deep Matte Black */}
            <div className="absolute inset-0 bg-[#0a0a0a]" />

            {/* 2. Texture: Subtle Vertical Brushed Metal (No Noise) */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent 1px, #fff 1px, transparent 3px)`
              }}
            />

            {/* 3. Micro-Pattern: Extremely Faint Geometric Lattice */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }}
            />

            {/* 4. Lighting: Soft White Sheen (No Color) */}
            <div
              className="absolute inset-0 z-10 pointer-events-none mix-blend-soft-light transition-opacity duration-100"
              style={{
                background: `linear-gradient(${115 + rotation.y}deg, transparent 30%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.0) 60%)`
              }}
            />

            {/* 5. Edge: Metallic Chamfer (Silver/Gold mix) */}
            <div className="absolute inset-0 z-20 rounded-[16px] border border-white/10" />
            <div className="absolute inset-[1px] z-20 rounded-[15px] border border-white/5" />

            {/* --- CONTENT --- */}
            <div className="relative h-full w-full p-8 flex flex-col justify-between z-30">

              {/* HEADER: Chip & Contactless */}
              <div className="flex justify-between items-start">
                {/* Realistic Gold Chip */}
                <div className="w-12 h-9 md:w-14 md:h-11 relative rounded-[4px] overflow-hidden shadow-md bg-gradient-to-br from-[#d4af37] via-[#f9e5a1] to-[#aa8c2c]">
                  <div className="absolute inset-0 border-[0.5px] border-black/20" />
                  {/* Chip Lines */}
                  <div className="absolute left-[30%] top-0 bottom-0 w-[0.5px] bg-black/20" />
                  <div className="absolute right-[30%] top-0 bottom-0 w-[0.5px] bg-black/20" />
                  <div className="absolute top-[40%] left-0 right-0 h-[0.5px] bg-black/20" />
                  <div className="absolute top-[40%] left-[30%] right-[30%] h-[20%] border border-black/20 rounded-[2px]" />
                </div>

                <Wifi className="w-6 h-6 text-white/30 rotate-90" strokeWidth={1.5} />
              </div>

              {/* CENTER: Binary Card Number (Silver Embossed) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex gap-4 md:gap-6 w-full justify-center">
                  <span className="font-mono text-lg md:text-2xl tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" style={{ textShadow: '0px 1px 0px rgba(0,0,0,1)' }}>
                    0101
                  </span>
                  <span className="font-mono text-lg md:text-2xl tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" style={{ textShadow: '0px 1px 0px rgba(0,0,0,1)' }}>
                    0010
                  </span>
                  <span className="font-mono text-lg md:text-2xl tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" style={{ textShadow: '0px 1px 0px rgba(0,0,0,1)' }}>
                    1010
                  </span>
                  <span className="font-mono text-lg md:text-2xl tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" style={{ textShadow: '0px 1px 0px rgba(0,0,0,1)' }}>
                    1100
                  </span>
                </div>
              </div>

              {/* FOOTER: Name, Title, Validity, Status */}
              <div className="flex justify-between items-end mt-auto pt-16">

                {/* Left: Name & Title */}
                <div className="flex flex-col">
                  <div className="text-[0.4rem] md:text-[0.5rem] font-sans tracking-[0.2em] text-white/50 uppercase mb-2">
                    Member Since 2024
                  </div>
                  <h1 className="font-display font-bold text-lg md:text-xl tracking-[0.15em] text-gray-200 uppercase drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                    Debjit Dey
                  </h1>
                  <span className="text-[0.5rem] md:text-[0.6rem] font-sans tracking-[0.15em] text-white/60 uppercase mt-0.5">
                    Software Engineer
                  </span>
                </div>

                {/* Right: Badge Status */}
                <div className="text-right">
                  <div className="flex flex-col items-end">
                    <span className="block text-[0.4rem] md:text-[0.5rem] tracking-[0.25em] font-serif text-[#cbb577] uppercase mb-1">
                      Full Stack Developer
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                      <div className="w-4 h-4 text-white/80">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.8l6.7 11.2H5.3L12 5.8z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* =======================
              BACK FACE 
             ======================= */}
          <div className="absolute w-full h-full rounded-[16px] backface-hidden overflow-hidden bg-[#0a0a0a] shadow-2xl rotate-y-180 border border-[#222]">

            {/* Texture: Plain Matte */}
            <div className="absolute inset-0 bg-[#0a0a0a]" />

            {/* Magstripe: Glossy Piano Black (No Rainbow) */}
            <div className="absolute top-8 w-full h-12 bg-black relative border-y border-[#1a1a1a]">
              <div className="absolute inset-0 bg-gradient-to-b from-black via-[#111] to-black" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            </div>

            {/* Signature & CVV */}
            <div className="absolute top-24 left-6 md:left-8 w-[65%] h-10 bg-[#1a1a1a] flex items-center px-4 relative overflow-hidden rounded-[2px] border border-white/10">
              <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,#fff,#fff_1px,transparent_1px,transparent_4px)]" />
              <span className="font-handwriting text-white/60 italic text-lg z-10" style={{ fontFamily: 'cursive' }}>Debjit.Dey</span>
            </div>

            <div className="absolute top-24 left-[calc(65%+32px)] md:left-[calc(65%+48px)] h-10 flex items-center">
              <span className="font-mono text-sm text-white/80 font-bold tracking-widest italic">999</span>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <div className="text-[0.45rem] md:text-[0.5rem] text-gray-600 font-sans leading-relaxed tracking-wider w-2/3 uppercase">
                <p>Authorized Signature Only.</p>
                <p className="mt-2 text-gray-500">
                  For collaboration:<br />
                  <span className="text-white/70">debjit.dey@engineer.com</span>
                </p>
              </div>

              {/* QR Code */}
              <a href="mailto:debjit.dey@engineer.com" className="bg-white p-1 rounded-[2px]" onClick={(e) => e.stopPropagation()}>
                <QrCode className="w-10 h-10 text-black" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
