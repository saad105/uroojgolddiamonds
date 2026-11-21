import React from 'react';
import { CalculatorIcon, ShieldIcon, SparklesIcon, TrendingUpIcon } from 'lucide-react';
import { CONFIG } from '../data/store.js';
import { formatINR } from '../lib/format.js';

const LiveRateBar = ({ onOpenCalculator, onOpenPromises, rates }) => {
  const l = rates || CONFIG.liveGoldRate;
  return (
    <div className="bg-[#051714] text-[#F7F3EA] border-b border-[#C6A15B]/25 py-2 px-3 sm:px-4 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center flex-wrap justify-center md:justify-start gap-2 sm:gap-4 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 bg-[#09231E] px-2.5 py-1 rounded-md border border-[#C6A15B]/40 shadow-xs">
            <span className="text-[#DFCA8F] font-sans font-bold tracking-[0.14em] uppercase text-[10.5px]">HYD LIVE:</span>
            <span className="font-sans font-semibold text-white tracking-[0.03em] tabular-nums text-xs sm:text-[12.5px]">
              {'22K: '}
              {formatINR(l.karat22)}/g
            </span>
            <span className="text-[#C6A15B] font-bold text-xs leading-none">•</span>
            <span className="font-sans font-semibold text-white tracking-[0.03em] tabular-nums text-xs sm:text-[12.5px]">
              {'24K: '}
              {formatINR(l.karat24)}/g
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-1 text-[#DFCA8F] font-mono text-[11px]">
            <TrendingUpIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>+{formatINR(l.change22)}/g today</span>
          </div>
          <span className="hidden xl:inline text-[#EDE5D7]/50">•</span>
          <span className="hidden xl:inline text-[#EDE5D7]/75 font-light text-[11px]">
            {l.city}
            {' (Updated '}
            {l.lastUpdated})
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-[11px]">
          <button
            onClick={onOpenCalculator}
            className="flex items-center gap-1.5 bg-[#0C2C26] hover:bg-[#113D36] text-[#DFCA8F] hover:text-white px-2.5 py-1 rounded-md border border-[#C6A15B]/40 transition-colors cursor-pointer font-medium shadow-xs"
          >
            <CalculatorIcon className="w-3.5 h-3.5" />
            <span>Gold Rate Calculator</span>
          </button>
          {onOpenPromises && (
            <button
              onClick={onOpenPromises}
              className="hidden sm:flex items-center gap-1 text-[#DFCA8F] hover:text-white transition-colors cursor-pointer underline underline-offset-4"
            >
              <ShieldIcon className="w-3 h-3 text-[#C6A15B]" />
              <span>The 10 Urooj Promises</span>
            </button>
          )}
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-[#EDE5D7]/80 bg-[#09231E]/80 border border-[#C6A15B]/30 px-2 py-0.5 rounded">
            <SparklesIcon className="w-3 h-3 text-[#C6A15B]" />
            <span>0% Deduction Old Gold</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveRateBar;
