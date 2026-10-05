import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Ship, Plane, Truck, Clock, DollarSign, Leaf, Shield, CheckCircle } from 'lucide-react';
import { TransportMode } from '../types/logistics';

interface RateCalculatorProps {
  onPreFillQuote: (details: {
    origin: string;
    destination: string;
    mode: TransportMode;
    weightKg: number;
    volumeCbm: number;
    cargoType: string;
  }) => void;
}

const HUBS = [
  { code: 'SGSIN', name: 'Singapore (SGSIN)' },
  { code: 'CNSHA', name: 'Shanghai, China (CNSHA)' },
  { code: 'NLRTM', name: 'Rotterdam, Netherlands (NLRTM)' },
  { code: 'AEDXB', name: 'Dubai, UAE (AEDXB)' },
  { code: 'USLAX', name: 'Los Angeles, USA (USLAX)' },
  { code: 'DEFRA', name: 'Frankfurt, Germany (DEFRA)' },
  { code: 'LKCMB', name: 'Colombo, Sri Lanka (LKCMB)' },
  { code: 'USHOU', name: 'Houston, USA (USHOU)' },
  { code: 'BEANR', name: 'Antwerp, Belgium (BEANR)' },
];

export const RateCalculator: React.FC<RateCalculatorProps> = ({ onPreFillQuote }) => {
  const [origin, setOrigin] = useState('SGSIN');
  const [destination, setDestination] = useState('NLRTM');
  const [mode, setMode] = useState<TransportMode>('ocean');
  const [containerType, setContainerType] = useState('40hc');
  const [weightKg, setWeightKg] = useState<number>(14500);
  const [volumeCbm, setVolumeCbm] = useState<number>(45);
  const [cargoType, setCargoType] = useState('General Commercial Cargo');

  // Realistic logistics calculations based on origin, destination, mode, and weight
  const calculation = useMemo(() => {
    let baseTransitDays = 22;
    let baseRateUsd = 2850;
    let co2Kg = 1200;

    if (mode === 'ocean') {
      if (containerType === '20gp') {
        baseTransitDays = 22;
        baseRateUsd = 2100;
        co2Kg = Math.round(weightKg * 0.04);
      } else if (containerType === '40hc') {
        baseTransitDays = 22;
        baseRateUsd = 3450;
        co2Kg = Math.round(weightKg * 0.045);
      } else if (containerType === '40rf') {
        baseTransitDays = 22;
        baseRateUsd = 5200;
        co2Kg = Math.round(weightKg * 0.06);
      } else {
        // LCL
        baseTransitDays = 26;
        baseRateUsd = Math.max(850, volumeCbm * 115);
        co2Kg = Math.round(weightKg * 0.05);
      }
    } else if (mode === 'air') {
      baseTransitDays = 3;
      // Air cargo standard volumetric vs actual weight
      const chargeableWeight = Math.max(weightKg, volumeCbm * 167);
      baseRateUsd = Math.round(chargeableWeight * 4.2);
      co2Kg = Math.round(chargeableWeight * 0.65);
    } else {
      // Road / Overland
      baseTransitDays = 5;
      baseRateUsd = Math.round(1800 + (weightKg / 1000) * 85);
      co2Kg = Math.round(weightKg * 0.12);
    }

    // Origin to destination variance adjustment
    if (origin === destination) {
      baseRateUsd = 650;
      baseTransitDays = 2;
    }

    const minRate = Math.round(baseRateUsd * 0.95);
    const maxRate = Math.round(baseRateUsd * 1.15);

    return {
      transitMin: Math.max(1, baseTransitDays - 2),
      transitMax: baseTransitDays + 3,
      minRate,
      maxRate,
      co2MetricTons: (co2Kg / 1000).toFixed(2),
    };
  }, [origin, destination, mode, containerType, weightKg, volumeCbm]);

  const handleApplyToRfq = () => {
    const originLabel = HUBS.find((h) => h.code === origin)?.name || origin;
    const destLabel = HUBS.find((h) => h.code === destination)?.name || destination;
    onPreFillQuote({
      origin: originLabel,
      destination: destLabel,
      mode,
      weightKg,
      volumeCbm,
      cargoType,
    });
  };

  return (
    <section id="calculator" className="py-24 bg-slate-900 border-t border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
            <span>Instant Route & Rate Intelligence</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">EOS Tariff Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight mb-4">
            Freight Rate, Transit Time & Carbon Footprint Estimator
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Simulate shipping corridors, compare multi-modal container configurations, calculate expected transit schedules, and generate formal quotations immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Input Form */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-lg p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-cyan-400" />
              <span>Consignment Parameters</span>
            </h3>

            {/* Mode Selector Tabs */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Transport Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMode('ocean')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-md text-xs sm:text-sm font-semibold border transition-all ${
                    mode === 'ocean'
                      ? 'bg-cyan-500/10 border-cyan-400 text-cyan-300 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Ship className="w-4 h-4" />
                  <span>Ocean Freight</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('air')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-md text-xs sm:text-sm font-semibold border transition-all ${
                    mode === 'air'
                      ? 'bg-cyan-500/10 border-cyan-400 text-cyan-300 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Plane className="w-4 h-4" />
                  <span>Air Express</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('road')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-md text-xs sm:text-sm font-semibold border transition-all ${
                    mode === 'road'
                      ? 'bg-cyan-500/10 border-cyan-400 text-cyan-300 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Overland Haul</span>
                </button>
              </div>
            </div>

            {/* Origin & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Origin Gateway
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-750 text-white rounded-md p-2.5 text-sm focus:border-cyan-400 focus:outline-none"
                >
                  {HUBS.map((h) => (
                    <option key={`orig-${h.code}`} value={h.code}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Destination Discharge
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-750 text-white rounded-md p-2.5 text-sm focus:border-cyan-400 focus:outline-none"
                >
                  {HUBS.map((h) => (
                    <option key={`dest-${h.code}`} value={h.code}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Container Type if Ocean */}
            {mode === 'ocean' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Ocean Container Specification
                </label>
                <select
                  value={containerType}
                  onChange={(e) => setContainerType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-750 text-white rounded-md p-2.5 text-sm focus:border-cyan-400 focus:outline-none"
                >
                  <option value="40hc">40ft High Cube Container (FCL - 76 CBM Capacity)</option>
                  <option value="20gp">20ft Standard General Purpose (FCL - 33 CBM Capacity)</option>
                  <option value="40rf">40ft Temperature-Controlled Reefer (-25°C to +25°C)</option>
                  <option value="lcl">LCL Consolidated Groupage (Pay per CBM / Metric Ton)</option>
                </select>
              </div>
            )}

            {/* Weight and Volume Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Gross Cargo Weight (kg)
                </label>
                <input
                  type="number"
                  min="50"
                  step="50"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-slate-900 border border-slate-750 text-white rounded-md p-2.5 text-sm font-mono tabular-nums focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Total Volume (CBM)
                </label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={volumeCbm}
                  onChange={(e) => setVolumeCbm(Math.max(0.1, Number(e.target.value)))}
                  className="w-full bg-slate-900 border border-slate-750 text-white rounded-md p-2.5 text-sm font-mono tabular-nums focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Cargo Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Commodity Classification
              </label>
              <select
                value={cargoType}
                onChange={(e) => setCargoType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-750 text-white rounded-md p-2.5 text-sm focus:border-cyan-400 focus:outline-none"
              >
                <option value="General Commercial Cargo">General Commercial & Consumer Goods</option>
                <option value="Automotive & Industrial Components">Automotive & Heavy Industrial Components</option>
                <option value="Temperature-Sensitive Biopharmaceuticals">Temperature-Sensitive Biopharmaceuticals (Cold Chain)</option>
                <option value="High-Density Electronics & EV Sub-Assemblies">High-Density Electronics & EV Batteries</option>
                <option value="Chemicals & Regulated IMO Hazmat">Chemicals & Regulated IMO / ADR Hazmat</option>
              </select>
            </div>
          </div>

          {/* Real-time Calculation Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 border border-cyan-500/30 rounded-lg p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                EOS Indicative Quotation
              </span>
              <span className="text-xs text-slate-400">Valid 14 Days</span>
            </div>

            {/* Main Price Output */}
            <div>
              <div className="text-xs text-slate-400 mb-1">Estimated Freight Band (Port-to-Port)</div>
              <div className="text-3xl sm:text-4xl font-display font-extrabold text-white tabular-nums tracking-tight">
                ${calculation.minRate.toLocaleString()} – ${calculation.maxRate.toLocaleString()}
                <span className="text-xs font-sans font-normal text-slate-400 ml-2">USD</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Subject to carrier bunker adjustments (BAF/CAF) and final customs duties.
              </p>
            </div>

            {/* Metric Strip */}
            <div className="grid grid-cols-2 gap-3 py-4 border-y border-slate-800">
              <div className="bg-slate-900/80 p-3 rounded border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Transit Duration</span>
                </div>
                <div className="text-base font-bold text-white tabular-nums">
                  {calculation.transitMin}–{calculation.transitMax} Days
                </div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CO₂e Footprint</span>
                </div>
                <div className="text-base font-bold text-white tabular-nums">
                  ~{calculation.co2MetricTons} MT CO₂e
                </div>
              </div>
            </div>

            {/* Included Service Invariants */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Standard Inclusions
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Master Bill of Lading (e-B/L) / Air Waybill issuance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Export customs export declaration & port terminal security</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>24/7 EOS Control Tower milestone monitoring</span>
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleApplyToRfq}
                className="w-full py-3.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm rounded-md transition-colors shadow-lg flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <span>Convert to Official Corporate RFQ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-center mt-2">
                <span className="text-xs text-slate-400">
                  Pre-fills rate parameters into formal RFP contract form
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
