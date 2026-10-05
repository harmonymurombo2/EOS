import React from 'react';
import { ShieldCheck, Award, Leaf, Building, FileCheck, CheckCircle2 } from 'lucide-react';
import { CORPORATE_GOVERNANCE } from '../data/logisticsData';

export const AboutGovernance: React.FC = () => {
  return (
    <section id="governance" className="py-24 bg-slate-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
            <span>Corporate Structure & Compliance</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">EOS (PRIVATE) LIMITED</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight mb-4">
            Institutional Governance, Certifications & Sustainability
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Incorporated as a dedicated private limited entity, EOS (PRIVATE) LIMITED operates under strict international customs standards, audited environmental controls, and accredited carrier alliances.
          </p>
        </div>

        {/* Corporate Profile Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 sm:p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs text-slate-400 block mb-1">Legal Corporate Identity</span>
              <span className="text-base font-bold text-white font-mono">{CORPORATE_GOVERNANCE.companyName}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block mb-1">Registration & Entity Status</span>
              <span className="text-sm font-medium text-slate-200">{CORPORATE_GOVERNANCE.incorporationDetails}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block mb-1">Executive Headquarters</span>
              <span className="text-sm font-medium text-slate-200">{CORPORATE_GOVERNANCE.headquarters}</span>
            </div>
          </div>

          <div className="pt-6">
            <h3 className="text-base font-bold text-white mb-2">Our Operating Ethos</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
              At EOS (PRIVATE) LIMITED, we believe global supply chains are the vital arteries of international commerce. We combine rigorous maritime carrier contracts, deep customs brokerage expertise, and continuous telemetry to deliver unwavering reliability, complete risk mitigation, and verified carbon transparency across every corridor we manage.
            </p>
          </div>
        </div>

        {/* Verified Accreditations & Standards Grid */}
        <div className="mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-6">
            Audited International Certifications & Accreditations
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CORPORATE_GOVERNANCE.certifications.map((cert) => (
              <div
                key={cert.title}
                className="bg-slate-900/60 border border-slate-800 p-5 rounded-lg flex items-start gap-4 hover:border-slate-700 transition-colors"
              >
                <div className="p-2 bg-slate-950 rounded border border-slate-800 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-mono">{cert.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{cert.scope}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ESG & Sustainability Pillars */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-6">
            Environmental, Social & Governance (ESG) Framework
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CORPORATE_GOVERNANCE.esgCommitments.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-lg space-y-3"
              >
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                  <Leaf className="w-4 h-4" />
                  <span>Target Initiative</span>
                </div>
                <div className="text-xl font-display font-extrabold text-white tabular-nums">
                  {item.metric}
                </div>
                <div className="text-sm font-bold text-slate-200">{item.initiative}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
