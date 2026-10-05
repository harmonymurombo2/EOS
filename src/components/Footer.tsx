import React from 'react';
import { Mail, Phone, MapPin, Globe, Shield, Anchor } from 'lucide-react';
import { CORPORATE_GOVERNANCE } from '../data/logisticsData';

interface FooterProps {
  onOpenQuote: () => void;
  onOpenTracking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote, onOpenTracking }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Corporate Standing */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center font-bold text-white text-base">
                E
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">
                {CORPORATE_GOVERNANCE.companyName}
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Integrated multi-modal supply chain architecture, deepwater maritime forwarding, chartered air cargo, and customs-bonded warehousing operations across 42+ global trade gateways.
            </p>

            <div className="pt-2 text-slate-400 space-y-1">
              <div>{CORPORATE_GOVERNANCE.incorporationDetails}</div>
              <div>Audited ISO 9001:2015 · ISO 14001 · C-TPAT Tier 2 Accredited</div>
            </div>
          </div>

          {/* Core Multi-Modal Capabilities */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Capabilities
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#capabilities" className="hover:text-cyan-400 transition-colors">
                  Ocean Freight (FCL/LCL)
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-cyan-400 transition-colors">
                  Air Cargo Express & Charter
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-cyan-400 transition-colors">
                  Inland Haulage & Rail
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-cyan-400 transition-colors">
                  Bonded 4PL Warehousing
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-cyan-400 transition-colors">
                  Customs & Trade Brokerage
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-cyan-400 transition-colors">
                  Pharma Cold Chain GDP
                </a>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Tools & Network
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={onOpenTracking}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Live Consignment Tracker
                </button>
              </li>
              <li>
                <a href="#calculator" className="hover:text-cyan-400 transition-colors">
                  Freight Rate Estimator
                </a>
              </li>
              <li>
                <a href="#network" className="hover:text-cyan-400 transition-colors">
                  Global Hub Directory
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-cyan-400 transition-colors">
                  Verified Case Studies
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Request Official RFQ
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Operations Contact */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Operations Center
            </div>
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{CORPORATE_GOVERNANCE.headquarters}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-mono text-slate-300">+44 (0) 20 7946 0880 (24/7 Desk)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-300">commercial@eoslogistics-holdings.com</span>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-850 text-cyan-400 border border-slate-800 rounded font-semibold text-xs transition-colors"
                >
                  Client Support Portal
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Legal Bar */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <div>
            © {new Date().getFullYear()} EOS (PRIVATE) LIMITED. All international maritime & logistics rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Trading Subject to FIATA Model Rules</span>
            <span>·</span>
            <span>Standard Trading Conditions (STC)</span>
            <span>·</span>
            <span>Security & Privacy Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
