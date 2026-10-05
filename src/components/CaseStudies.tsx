import React from 'react';
import { ArrowUpRight, TrendingUp, ShieldCheck, Factory, Cpu, Pill, Quote } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  const cases = [
    {
      sector: 'Electric Vehicle & Automotive Manufacturing',
      client: 'Tier-1 Continental EV Powertrain Consortium',
      headline: 'Restructuring Just-in-Time Trans-Pacific Battery Supply Line',
      metric: '+38% On-Time Line Feeding',
      secondaryMetric: '$4.2M Demurrage Fees Avoided',
      description:
        'EOS re-engineered the multimodal flow of sensitive lithium battery sub-assemblies from East Asian manufacturing nodes to European assembly plants. By introducing dedicated bonded block trains from Rotterdam directly to factory sidings, we eliminated port congestion bottlenecks and reduced inland buffer stock by 22 days.',
      quote:
        'EOS transformed our critical battery pipeline. Their bonded inland rail bypass prevented line-down stoppages during peak maritime congestion.',
      author: 'Marcus Vance',
      role: 'Global Supply Chain Director',
      company: 'AeroVolt Powertrain Technologies',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
    },
    {
      sector: 'Pharmaceutical & Biotherapeutics',
      client: 'International Oncology Biologics Producer',
      headline: 'End-to-End Transatlantic Cold Chain with Zero Temperature Excursion',
      metric: '0.00% Temperature Deviation',
      secondaryMetric: '14,200 High-Value Vials Delivered',
      description:
        'Managed door-to-door temperature-validated transport (+2°C to +8°C) from Frankfurt biotech manufacturing suites to 18 regional cancer research centers across North America. Real-time calibrated IoT loggers transmitted telemetry every 60 seconds with emergency tarmac intervention protocols in place at Chicago O’Hare.',
      quote:
        'The continuous telematics transparency and GDP compliance protocols implemented by EOS are the most rigorous in commercial logistics.',
      author: 'Dr. Evelyn Chen',
      role: 'VP of Quality Assurance & Logistics',
      company: 'Vanguard Biopharma AG',
      icon: <Pill className="w-5 h-5 text-cyan-400" />,
    },
    {
      sector: 'Renewable Infrastructure & Heavy Breakbulk',
      client: 'Offshore Wind Generation EPC Contractor',
      headline: 'Out-of-Gauge Maritime Charter & Multi-Axle Inland Delivery',
      metric: '180 Heavy Turbine Components',
      secondaryMetric: '100% Zero-Incident Safety Record',
      description:
        'Executed specialized heavy-lift vessel charters and hydraulic multi-axle modular trailers for 78-meter turbine blades and 140-ton generator nacelles. Complete civil route surveys, bridge reinforcements, and police-escorted nocturnal convoys delivered on schedule ahead of winter maritime weather windows.',
      quote:
        'Moving 140-ton nacelles across constricted coastal roads requires exceptional engineering. EOS executed the entire operation without a single hour of delay.',
      author: 'Søren Lindqvist',
      role: 'Project Logistics Director',
      company: 'Nordic Offshore Energy Solutions',
      icon: <Factory className="w-5 h-5 text-cyan-400" />,
    },
  ];

  return (
    <section id="case-studies" className="py-24 bg-slate-900 border-t border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
            <span>Verified Operational Outcomes</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Enterprise Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight mb-4">
            Proven Performance Across Mission-Critical Supply Chains
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            How EOS (PRIVATE) LIMITED solves systemic freight bottlenecks, ensures regulatory compliance, and unlocks quantifiable working capital for multinational enterprises.
          </p>
        </div>

        {/* Case Studies Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((cs, idx) => (
            <div
              key={idx}
              className="bg-slate-950 border border-slate-800 rounded-lg p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-slate-900 rounded-md border border-slate-800">
                    {cs.icon}
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Project {idx + 1}</span>
                </div>

                <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                  {cs.sector}
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-4 leading-snug">
                  {cs.headline}
                </h3>

                {/* Quantitative Impact Box */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-md p-4 mb-6">
                  <div className="text-2xl font-display font-extrabold text-white tabular-nums tracking-tight">
                    {cs.metric}
                  </div>
                  <div className="text-xs text-emerald-400 font-medium mt-0.5">
                    {cs.secondaryMetric}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {cs.description}
                </p>
              </div>

              {/* Attributable Testimonial Quote */}
              <div className="pt-6 border-t border-slate-850">
                <p className="text-xs italic text-slate-300 mb-4 leading-relaxed">
                  "{cs.quote}"
                </p>
                <div>
                  <div className="text-xs font-bold text-white">{cs.author}</div>
                  <div className="text-xs text-slate-400">
                    {cs.role} · <span className="text-slate-300">{cs.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
