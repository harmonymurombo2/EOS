import React, { useState } from 'react';
import { Globe, Anchor, Plane, Building2, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { GLOBAL_HUBS } from '../data/logisticsData';
import { PortHub } from '../types/logistics';

interface GlobalNetworkProps {
  onSelectHubForQuote: (hubName: string) => void;
}

export const GlobalNetwork: React.FC<GlobalNetworkProps> = ({ onSelectHubForQuote }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [activeHub, setActiveHub] = useState<PortHub>(GLOBAL_HUBS[0]);

  const regions = ['All', 'Asia-Pacific', 'Europe & Middle East', 'Americas', 'Africa & Indian Ocean'];

  const filteredHubs = selectedRegion === 'All'
    ? GLOBAL_HUBS
    : GLOBAL_HUBS.filter((h) => h.region === selectedRegion);

  return (
    <section id="network" className="py-24 bg-slate-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
            <span>Intercontinental Infrastructure</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">42+ Gateways</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight mb-4">
            Global Trade Lanes & Strategic Hub Network
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Direct carrier agreements and operated customs-bonded consolidation terminals across pivotal maritime straits, international cargo aerotropolises, and overland rail junctions.
          </p>
        </div>

        {/* Region Filter Segmented Control */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-lg max-w-2xl overflow-x-auto mb-8">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                selectedRegion === reg
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Interactive Hub Grid + Detail Pane */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Hub Selection Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredHubs.map((hub) => {
              const isSelected = activeHub.id === hub.id;
              return (
                <div
                  key={hub.id}
                  onClick={() => setActiveHub(hub)}
                  className={`cursor-pointer p-5 rounded-lg border transition-all text-left ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400 shadow-md ring-1 ring-cyan-400/20'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-cyan-400 font-bold">{hub.code}</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      {hub.type === 'Sea Port' ? (
                        <Anchor className="w-3.5 h-3.5 text-slate-400" />
                      ) : hub.type === 'Air Hub' ? (
                        <Plane className="w-3.5 h-3.5 text-slate-400" />
                      ) : (
                        <Compass className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span>{hub.type}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">{hub.name}</h3>
                  <div className="text-xs text-slate-400 mb-3">
                    {hub.city}, {hub.country}
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                    <span>{hub.directLanesCount} Direct Trade Lanes</span>
                    <span className="text-cyan-400 font-medium">Inspect Hub →</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Hub Detailed Specifications Pane */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-lg p-6 sm:p-8 space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Compass className="w-4 h-4" />
                <span>Strategic Terminal Profile</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">{activeHub.region}</span>
            </div>

            <div>
              <div className="text-xs font-mono text-slate-400">{activeHub.code}</div>
              <h3 className="text-2xl font-display font-bold text-white mt-1">
                {activeHub.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Operated in direct partnership with national port authorities & licensed customs authorities.
              </p>
            </div>

            <div className="space-y-3 py-2">
              <div className="bg-slate-950 p-3.5 rounded border border-slate-850">
                <div className="text-xs text-slate-400 mb-0.5">Annual Throughput Capacity</div>
                <div className="text-base font-bold text-white font-mono">
                  {activeHub.annualCapacity}
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded border border-slate-850">
                <div className="text-xs text-slate-400 mb-0.5">Bonded Warehousing Footprint</div>
                <div className="text-base font-bold text-cyan-400 font-mono">
                  {activeHub.bondedWarehouseSqFt}
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded border border-slate-850">
                <div className="text-xs text-slate-400 mb-0.5">Regular Trade Connections</div>
                <div className="text-base font-bold text-white font-mono">
                  {activeHub.directLanesCount} Active Verified Trade Corridors
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onSelectHubForQuote(activeHub.name)}
                className="w-full py-3 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-md transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <span>Request Allocation at {activeHub.city}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Marquee Global Corridors */}
        <div className="mt-16 pt-12 border-t border-slate-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-6">
            Marquee Commercial Shipping Corridors
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-md">
              <div className="text-xs text-cyan-400 font-mono font-semibold">Corridor 01</div>
              <div className="text-sm font-bold text-white mt-1">Trans-Pacific Direct</div>
              <div className="text-xs text-slate-400 mt-1">Shanghai / Singapore ⇄ Los Angeles</div>
              <div className="text-xs text-slate-500 mt-2 font-mono">Transit: 14–17 Days</div>
            </div>
            <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-md">
              <div className="text-xs text-cyan-400 font-mono font-semibold">Corridor 02</div>
              <div className="text-sm font-bold text-white mt-1">Asia – North Europe Express</div>
              <div className="text-xs text-slate-400 mt-1">Singapore / Colombo ⇄ Rotterdam / Antwerp</div>
              <div className="text-xs text-slate-500 mt-2 font-mono">Transit: 21–25 Days</div>
            </div>
            <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-md">
              <div className="text-xs text-cyan-400 font-mono font-semibold">Corridor 03</div>
              <div className="text-sm font-bold text-white mt-1">Transatlantic Intermodal</div>
              <div className="text-xs text-slate-400 mt-1">Rotterdam / Frankfurt ⇄ Houston / Chicago</div>
              <div className="text-xs text-slate-500 mt-2 font-mono">Transit: 10–12 Days</div>
            </div>
            <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-md">
              <div className="text-xs text-cyan-400 font-mono font-semibold">Corridor 04</div>
              <div className="text-sm font-bold text-white mt-1">Middle East Cross-Trade</div>
              <div className="text-xs text-slate-400 mt-1">Jebel Ali Dubai ⇄ East Africa / Indian Ports</div>
              <div className="text-xs text-slate-500 mt-2 font-mono">Transit: 4–7 Days</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
