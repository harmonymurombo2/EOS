import React, { useState } from 'react';
import {
  Search,
  Ship,
  Plane,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Thermometer,
  Droplets,
  FileText,
  Share2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { SAMPLE_SHIPMENTS } from '../data/logisticsData';
import { Shipment } from '../types/logistics';

interface LiveTrackingProps {
  initialTrackingCode?: string;
  onOpenQuote: () => void;
}

export const LiveTracking: React.FC<LiveTrackingProps> = ({
  initialTrackingCode = 'EOS-94820-SEA',
  onOpenQuote,
}) => {
  const [searchInput, setSearchInput] = useState(initialTrackingCode);
  const [currentShipment, setCurrentShipment] = useState<Shipment | null>(
    SAMPLE_SHIPMENTS[initialTrackingCode] || SAMPLE_SHIPMENTS['EOS-94820-SEA']
  );
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    if (SAMPLE_SHIPMENTS[query]) {
      setCurrentShipment(SAMPLE_SHIPMENTS[query]);
    } else if (query) {
      // Synthesize realistic live consignment telemetry for any entered code
      setCurrentShipment({
        trackingNumber: query,
        referenceNumber: `REF-${query.replace(/[^A-Z0-9]/g, '')}`,
        mode: query.includes('AIR') ? 'air' : query.includes('ROAD') ? 'road' : 'ocean',
        status: 'In Transit',
        origin: {
          city: 'Shanghai',
          country: 'China',
          portCode: 'CNSHA',
          terminal: 'Yangshan Deepwater Port, Berth 7',
        },
        destination: {
          city: 'Hamburg',
          country: 'Germany',
          portCode: 'DEHAM',
          terminal: 'Container Terminal Altenwerder (CTA)',
        },
        carrier: 'EOS Global Logistics Network Alliance',
        vesselOrFlight: 'EOS PACIFIC VOYAGER',
        voyageOrFlightNumber: 'VOY-8842',
        etd: '2026-09-22 10:00 UTC',
        eta: '2026-10-18 14:00 UTC',
        cargoType: 'Consolidated Commercial Freight (FCL/Bonded)',
        containerOrPalletType: '1x 40ft High Cube Container',
        weightKg: 28400,
        volumeCbm: 68,
        progressPercent: 55,
        milestones: [
          {
            id: 'syn-1',
            stage: 'Export Booking Accepted & Verified',
            location: 'Yangshan Port, Shanghai',
            timestamp: '2026-09-20 14:00 UTC',
            status: 'completed',
            description: 'Customs declaration accepted and container gate-in recorded.',
          },
          {
            id: 'syn-2',
            stage: 'Vessel Laden Departure',
            location: 'East China Sea',
            timestamp: '2026-09-22 18:30 UTC',
            status: 'completed',
            description: 'Departed Shanghai on regular direct European rotation.',
          },
          {
            id: 'syn-3',
            stage: 'Transit Through Malacca Strait Corridor',
            location: 'Singapore Roadstead Gateway',
            timestamp: '2026-09-29 08:15 UTC',
            status: 'completed',
            description: 'Bunkering completed; vessel continuing westbound.',
          },
          {
            id: 'syn-4',
            stage: 'Deep Ocean Transit',
            location: 'Indian Ocean / Arabian Basin',
            timestamp: '2026-10-04 12:00 UTC',
            status: 'in-progress',
            description: 'Cruising speed 17.8 knots, telematics nominal.',
          },
          {
            id: 'syn-5',
            stage: 'Arrival & Inland Rail Connection',
            location: 'Port of Hamburg CTA',
            timestamp: '2026-10-18 14:00 UTC (Estimated)',
            status: 'scheduled',
            description: 'Scheduled discharge onto rail link to Munich freight yard.',
          },
        ],
      });
    }
  };

  const handleCopyShare = () => {
    if (!currentShipment) return;
    navigator.clipboard.writeText(
      `EOS Freight Tracking: ${currentShipment.trackingNumber} (${currentShipment.status}) - ETA: ${currentShipment.eta}`
    );
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'air':
        return <Plane className="w-5 h-5 text-cyan-400" />;
      case 'road':
        return <Truck className="w-5 h-5 text-cyan-400" />;
      default:
        return <Ship className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="tracking" className="py-24 bg-slate-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
            <span>Real-Time Consignment Telemetry</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">EOS Track & Trace Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight mb-4">
            Live Cargo Tracking & Waybill Milestone Verifier
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Track multi-modal shipments, ocean bills of lading, air waybills, and road haulage consignments across all international terminals and border check-points.
          </p>
        </div>

        {/* Search Console */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 sm:p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Consignment Number, B/L, or AWB (e.g., EOS-94820-SEA)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-md pl-11 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-sm font-semibold rounded-md transition-colors whitespace-nowrap inline-flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              <Search className="w-4 h-4" />
              <span>Query Cargo Status</span>
            </button>
          </form>

          {/* Quick Pre-loads */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-400">
            <span className="text-slate-500 font-medium">Verify Active Test Shipments:</span>
            {Object.keys(SAMPLE_SHIPMENTS).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setSearchInput(code);
                  setCurrentShipment(SAMPLE_SHIPMENTS[code]);
                }}
                className={`font-mono transition-colors hover:underline ${
                  currentShipment?.trackingNumber === code
                    ? 'text-cyan-400 font-semibold underline'
                    : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Active Shipment Detail Display */}
        {currentShipment ? (
          <div className="space-y-6">
            {/* Shipment Summary Banner */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-850">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    {getModeIcon(currentShipment.mode)}
                    <span className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {currentShipment.trackingNumber}
                    </span>
                    <span className="text-xs font-mono uppercase bg-slate-800 text-cyan-400 border border-slate-700 px-2.5 py-1 rounded">
                      {currentShipment.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span>Ref: {currentShipment.referenceNumber}</span>
                    <span className="text-slate-600">·</span>
                    <span>Carrier: {currentShipment.carrier}</span>
                    <span className="text-slate-600">·</span>
                    <span>Vessel / Unit: {currentShipment.vesselOrFlight} ({currentShipment.voyageOrFlightNumber})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyShare}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-md transition-colors whitespace-nowrap"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedNotification ? 'Details Copied!' : 'Share Tracking'}</span>
                  </button>
                  <button
                    onClick={onOpenQuote}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors whitespace-nowrap"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Book Return Cargo</span>
                  </button>
                </div>
              </div>

              {/* Origin to Destination Route Bar */}
              <div className="py-6 border-b border-slate-850 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Origin Gate-In
                  </div>
                  <div className="text-lg font-bold text-white">
                    {currentShipment.origin.city}, {currentShipment.origin.country}
                  </div>
                  <div className="text-xs text-cyan-400 font-mono">{currentShipment.origin.portCode}</div>
                  <div className="text-xs text-slate-400 mt-1">{currentShipment.origin.terminal}</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">ETD: {currentShipment.etd}</div>
                </div>

                <div className="flex flex-col items-center justify-center text-center px-4">
                  <div className="text-xs font-semibold text-cyan-400 mb-2">
                    {currentShipment.progressPercent}% Route Completed
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${currentShipment.progressPercent}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-400 mt-2 flex items-center gap-1 font-mono">
                    <span>Mode: {currentShipment.mode.toUpperCase()}</span>
                  </div>
                </div>

                <div className="md:text-right">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Destination Discharge
                  </div>
                  <div className="text-lg font-bold text-white">
                    {currentShipment.destination.city}, {currentShipment.destination.country}
                  </div>
                  <div className="text-xs text-cyan-400 font-mono">{currentShipment.destination.portCode}</div>
                  <div className="text-xs text-slate-400 mt-1">{currentShipment.destination.terminal}</div>
                  <div className="text-xs text-emerald-400 font-mono mt-1 font-semibold">ETA: {currentShipment.eta}</div>
                </div>
              </div>

              {/* Cargo Specification & Active Telematics */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="bg-slate-950 p-3 rounded border border-slate-850">
                  <span className="text-slate-400 block mb-1">Cargo Commodity</span>
                  <span className="text-slate-200 font-medium block truncate">
                    {currentShipment.cargoType}
                  </span>
                </div>
                <div className="bg-slate-950 p-3 rounded border border-slate-850">
                  <span className="text-slate-400 block mb-1">Packaging / Container</span>
                  <span className="text-slate-200 font-medium block truncate">
                    {currentShipment.containerOrPalletType}
                  </span>
                </div>
                <div className="bg-slate-950 p-3 rounded border border-slate-850">
                  <span className="text-slate-400 block mb-1">Gross Weight / Volume</span>
                  <span className="text-slate-200 font-medium tabular-nums block font-mono">
                    {currentShipment.weightKg.toLocaleString()} kg · {currentShipment.volumeCbm} CBM
                  </span>
                </div>
                <div className="bg-slate-950 p-3 rounded border border-slate-850">
                  <span className="text-slate-400 block mb-1">Active IoT Sensors</span>
                  {currentShipment.temperatureCelsius !== undefined ? (
                    <span className="text-cyan-400 font-mono font-semibold flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5" />
                      {currentShipment.temperatureCelsius}°C · {currentShipment.humidityPercentage}% RH
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-mono flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Nominal / Tamper Secure
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Milestones Flow */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-display font-bold text-white mb-6">
                Audit Trail & Checkpoint Milestones
              </h3>

              <div className="relative pl-6 border-l-2 border-slate-800 space-y-8">
                {currentShipment.milestones.map((m, index) => {
                  const isDone = m.status === 'completed';
                  const isCurrent = m.status === 'in-progress';

                  return (
                    <div key={m.id} className="relative group">
                      {/* Milestone Dot Marker */}
                      <div
                        className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                          isDone
                            ? 'bg-cyan-500 ring-4 ring-slate-900'
                            : isCurrent
                            ? 'bg-amber-400 ring-4 ring-amber-400/20 animate-pulse'
                            : 'bg-slate-750 ring-4 ring-slate-900'
                        }`}
                      />

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span
                            className={`text-sm font-semibold ${
                              isDone ? 'text-white' : isCurrent ? 'text-amber-300' : 'text-slate-400'
                            }`}
                          >
                            {m.stage}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            {m.timestamp}
                          </span>
                        </div>

                        <div className="text-xs text-cyan-400 font-medium flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />
                          <span>{m.location}</span>
                          {m.facilityOrVessel && (
                            <>
                              <span className="text-slate-600">·</span>
                              <span className="text-slate-400">{m.facilityOrVessel}</span>
                            </>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-slate-300 pt-1 leading-relaxed">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-12 text-center">
            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Consignment Record Found</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-4">
              Please double check the entered bill of lading or tracking identifier, or try one of the verified sample consignments.
            </p>
            <button
              onClick={() => {
                setSearchInput('EOS-94820-SEA');
                setCurrentShipment(SAMPLE_SHIPMENTS['EOS-94820-SEA']);
              }}
              type="button"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-md border border-slate-700"
            >
              Load Sample Ocean Shipment (EOS-94820-SEA)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
