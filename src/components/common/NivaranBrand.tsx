import React from 'react';
export const NivaranBrand: React.FC<{ compact?: boolean }> = ({ compact = false }) => (
  <div className="flex items-center gap-2.5">
    <div className={`${compact ? 'w-9 h-9' : 'w-11 h-11'} rounded-full bg-white flex items-center justify-center shadow-sm border-2 border-[#D89B2B] relative`}>
      <div className="absolute inset-1 rounded-full border border-[#163E73]" />
      <span className={`${compact ? 'text-[7px]' : 'text-[8px]'} font-bold tracking-tight text-[#163E73] z-10`}>AICTE</span>
    </div>
    <div className="leading-tight">
      <div className={`${compact ? 'text-base' : 'text-lg'} font-bold tracking-tight text-current font-serif`}>Nivaran</div>
      {!compact && <div className="text-[10px] uppercase tracking-[0.14em] text-current/60">AICTE reference workflow</div>}
    </div>
  </div>
);
