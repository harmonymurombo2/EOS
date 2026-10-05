import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Ship, Plane, Truck, Warehouse, ShieldCheck } from 'lucide-react';
import { CAPABILITIES_DATA } from '../data/logisticsData';

interface CapabilitiesProps {
  onSelectService: (serviceName: string) => void;
}

export const Capabilities: React.FC<CapabilitiesProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'ocean' | 'air' | 'road' | 'warehouse'>('all');

  const getIconForIndex = (index: string) => {
    switch (index) {
      case '01':
        return <Ship className="w-5 h-5 text-cyan-400" />;
      case '02':
        return <Plane className="w-5 h-5 text-cyan-400" />;
      case '03':
        return <Truck className="w-5 h-5 text-cyan-400" />;
      default:
        return <Warehouse className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="capabilities" className="py-24 bg-slate-900 border-t border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
            <span>Corporate Operational Capabilities</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Integrated 4PL Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight mb-4">
            Industrial-Grade Freight Forwarding & Supply Chain Engineering
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            EOS (PRIVATE) LIMITED operates specialized multi-modal infrastructure connecting deepwater maritime routes, air cargo charters, cross-border haulage corridors, and customs-bonded logistics hubs under unified digital control.
          </p>
        </div>

        {/* Capabilities Grid: Asymmetric Layout with High-Fidelity Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CAPABILITIES_DATA.map((item) => (
            <div
              key={item.index}
              className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-colors group"
            >
              {/* Media Slot with Fallback Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                  <span className="font-mono text-cyan-400 font-bold">{item.index}</span>
                  <span className="bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded text-slate-300 border border-slate-800">
                    {item.subtitle}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    {getIconForIndex(item.index)}
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                      {item.index}. {item.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Quantitative Proof Strip */}
                  <div className="grid grid-cols-3 gap-2 py-4 mb-6 border-y border-slate-850 bg-slate-900/50 rounded-md px-3">
                    {item.metrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="text-xs text-slate-400 font-medium">{metric.label}</div>
                        <div className="text-sm sm:text-base font-bold text-white tabular-nums">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2 mb-6">
                    {item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-slate-850 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    Service Spec SLA: Grade A
                  </span>
                  <button
                    onClick={() => onSelectService(item.title)}
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group-hover:translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
                  >
                    <span>Request Service Schedule</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Specialized Secondary Capabilities Ribbon */}
        <div className="mt-12 bg-slate-950 border border-slate-800 rounded-lg p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
                Customs & Tariff Compliance
              </div>
              <h4 className="text-base font-bold text-white mb-2">Licensed Brokerage & Duty Management</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Direct integration with national customs clearance systems, automated tariff classification, transit T1 bonds, and duty deferment accounts.
              </p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
                Cold Chain Biopharma
              </div>
              <h4 className="text-base font-bold text-white mb-2">Validated GDP Temperature Compliance</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Active Envirotainer fleets, ultra-low -80°C cryogenic nitrogen shipping, continuous IoT calibrated data-loggers with zero-excursion protocol.
              </p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
                Dangerous Goods & Project Cargo
              </div>
              <h4 className="text-base font-bold text-white mb-2">IMO / ADR / IATA Hazmat Certified</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Certified safety advisors handling Class 1 through Class 9 hazmat, heavy breakbulk charters, and multi-axle hydraulic transport engineering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
