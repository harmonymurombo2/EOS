import React, { useState } from 'react';
import { ArrowRight, Search, ShieldCheck, Ship, Globe, Anchor } from 'lucide-react';
import { ASSETS, CORPORATE_STATS } from '../data/logisticsData';

interface HeroProps {
  onOpenQuote: () => void;
  onTrackShipment: (trackingNumber: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onTrackShipment }) => {
  const [quickSearchCode, setQuickSearchCode] = useState('');
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearchCode.trim()) {
      onTrackShipment(quickSearchCode.trim());
    } else {
      onTrackShipment('EOS-94820-SEA');
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-950">
      {/* Background Hero Image with Measured Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.heroPort}
          alt="EOS deepwater container terminal with gantry cranes loading vessel at dawn"
          referrerPolicy="no-referrer"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
            imgLoaded ? 'opacity-35 scale-100' : 'opacity-0 scale-105'
          }`}
        />
        {/* Fallback pattern in case image fails or loads slowly */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950/40 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Quiet Editorial Kicker */}
        <div className="flex items-center gap-3 text-xs tracking-wider uppercase text-cyan-400 font-semibold mb-4">
          <span className="flex items-center gap-1.5">
            <Anchor className="w-3.5 h-3.5" /> Global Supply Chain Architecture
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">EOS (PRIVATE) LIMITED</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">Est. Corporate Network</span>
        </div>

        {/* Main Headline */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Global Multi-Modal Freight, Bonded Warehousing & Supply Chain Precision.
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-3xl">
            EOS (PRIVATE) LIMITED delivers enterprise-scale ocean freight, chartered air cargo, secured inland haulage, and customs-bonded distribution. We orchestrate critical trade corridors across 42+ global gateways with verified end-to-end accountability.
          </p>
        </div>

        {/* Dual Actions: Quick Tracking Input + Primary RFQ */}
        <div className="max-w-2xl bg-slate-900/90 border border-slate-800 rounded-lg p-3 sm:p-4 backdrop-blur-md shadow-2xl mb-12">
          <form onSubmit={handleQuickTrack} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Container, B/L, or AWB (e.g. EOS-94820-SEA)"
                value={quickSearchCode}
                onChange={(e) => setQuickSearchCode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-md pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-sm font-semibold rounded-md transition-colors whitespace-nowrap inline-flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <span>Track Cargo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onOpenQuote}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm font-semibold rounded-md transition-colors whitespace-nowrap border border-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                Instant RFQ
              </button>
            </div>
          </form>

          {/* Sample quick tags with clean text presentation */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
            <span className="text-slate-500 font-medium">Quick Consignment Lookups:</span>
            <button
              type="button"
              onClick={() => onTrackShipment('EOS-94820-SEA')}
              className="text-cyan-400 hover:text-cyan-300 hover:underline font-mono"
            >
              EOS-94820-SEA (Ocean FCL)
            </button>
            <span className="text-slate-600">·</span>
            <button
              type="button"
              onClick={() => onTrackShipment('EOS-77312-AIR')}
              className="text-cyan-400 hover:text-cyan-300 hover:underline font-mono"
            >
              EOS-77312-AIR (Air Cold Chain)
            </button>
            <span className="text-slate-600">·</span>
            <button
              type="button"
              onClick={() => onTrackShipment('EOS-10492-ROAD')}
              className="text-cyan-400 hover:text-cyan-300 hover:underline font-mono"
            >
              EOS-10492-ROAD (Overland Haulage)
            </button>
          </div>
        </div>

        {/* Claim-to-Proof Quantitative Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-800/80">
          {CORPORATE_STATS.map((stat) => (
            <div key={stat.unit} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                {stat.unit}
              </div>
              <p className="text-xs text-slate-400 leading-normal">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
