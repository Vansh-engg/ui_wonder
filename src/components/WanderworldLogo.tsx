'use client';

import React from 'react';

interface WanderworldLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function WanderworldLogo({
  className = '',
  size = 'md',
}: WanderworldLogoProps) {
  const sizeClasses = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-12',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* High Contrast Crisp Mountain Logo Badge */}
      <div className="relative flex items-center justify-center shrink-0 p-1 bg-black/10 rounded-xl">
        <svg
          viewBox="0 0 100 60"
          className={`${sizeClasses} w-auto`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Dark Mountain Peak */}
          <path
            d="M 10,50 L 35,28 L 48,36 L 68,12 L 88,50 Z"
            fill="#0F172A"
          />
          {/* Accent Gold Peak Overlay */}
          <path
            d="M 68,12 L 88,50 L 76,50 L 62,30 Z"
            fill="#B45309"
          />
          <path
            d="M 35,28 L 48,36 L 42,50 L 25,50 Z"
            fill="#D97706"
          />
        </svg>
      </div>

      {/* Typography: WANDERWORLD HOLIDAYS */}
      <div className="flex flex-col text-left leading-tight font-sans">
        <span className="font-black text-sm tracking-wider uppercase text-[#0F172A] flex items-center">
          WANDERW<span className="text-[#B45309] font-serif font-black mx-0.5">O</span>RLD
        </span>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="h-[1px] bg-[#0F172A]/30 flex-1"></span>
          <span className="text-[9px] font-black tracking-widest uppercase text-[#78350F]">
            HOLIDAYS
          </span>
          <span className="h-[1px] bg-[#0F172A]/30 flex-1"></span>
        </div>
      </div>
    </div>
  );
}
