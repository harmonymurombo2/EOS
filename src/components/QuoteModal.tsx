import React, { useState, useEffect } from 'react';
import { X, CheckCircle, FileText, ArrowRight, ShieldCheck, Ship, Plane, Truck, Building2 } from 'lucide-react';
import { TransportMode, QuoteRequest } from '../types/logistics';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preFilledData?: Partial<QuoteRequest>;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preFilledData,
}) => {
  const [formData, setFormData] = useState<QuoteRequest>({
    origin: '',
    destination: '',
    mode: 'ocean',
    cargoType: 'General Commercial Cargo',
    containerSize: '40ft High Cube',
    weightKg: 10000,
    volumeCbm: 30,
    isTempControlled: false,
    requiresBondedStorage: false,
    requiresCustomsClearance: true,
    contactName: '',
    companyName: '',
    email: '',
    phone: '',
    specialInstructions: '',
  });

  const [submittedRfq, setSubmittedRfq] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preFilledData) {
      setFormData((prev) => ({
        ...prev,
        ...preFilledData,
      }));
    }
  }, [preFilledData]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.companyName.trim()) errs.companyName = 'Company name is required';
    if (!formData.contactName.trim()) errs.contactName = 'Contact representative is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid corporate email is required';
    }
    if (!formData.phone.trim()) errs.phone = 'Contact phone number is required';
    if (!formData.origin.trim()) errs.origin = 'Origin port/city is required';
    if (!formData.destination.trim()) errs.destination = 'Destination port/city is required';
    if (!formData.weightKg || formData.weightKg <= 0) errs.weightKg = 'Weight must be greater than 0';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate unique RFQ reference
    const rfqToken = `RFQ-EOS-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedRfq(rfqToken);
  };

  const handleReset = () => {
    setSubmittedRfq(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-lg shadow-2xl p-6 sm:p-8 my-8 text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close RFQ Modal"
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedRfq ? (
          /* Submission Confirmation View */
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto border border-cyan-400/40">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
                Official RFQ Transmitted
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                Quotation Request Logged Successfully
              </h3>
              <p className="text-sm text-slate-300 max-w-lg mx-auto mt-2">
                Your consignment specifications have been routed to the Commercial Freight Desk at EOS (PRIVATE) LIMITED. A designated account director will issue the formal binding rate agreement within 4 business hours.
              </p>
            </div>

            {/* Reference Token Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-md p-5 max-w-md mx-auto text-left space-y-2">
              <div className="text-xs text-slate-400">Formal RFQ Reference Number:</div>
              <div className="font-mono text-xl font-bold text-cyan-400">{submittedRfq}</div>
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                Routed to: Commercial Harbor Control Tower · {formData.companyName}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-sm font-semibold rounded-md transition-colors"
              >
                Close & Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* Form Entry View */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
                <span>Formal Commercial Inquiries</span>
                <span className="text-slate-600">/</span>
                <span>EOS (PRIVATE) LIMITED</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                Request an Official Freight & Supply Chain Quotation
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Submit your shipment parameters for tailored container bookings, chartered cargo flights, or bonded warehouse allocations.
              </p>
            </div>

            {/* Corporate Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Apex Industrial Manufacturing Ltd"
                  className={`w-full bg-slate-950 border rounded-md p-2.5 text-sm text-white focus:outline-none ${
                    errors.companyName ? 'border-rose-500' : 'border-slate-750 focus:border-cyan-400'
                  }`}
                />
                {errors.companyName && <span className="text-xs text-rose-400">{errors.companyName}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Authorized Contact Person *
                </label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="e.g. David Sterling (Head of Logistics)"
                  className={`w-full bg-slate-950 border rounded-md p-2.5 text-sm text-white focus:outline-none ${
                    errors.contactName ? 'border-rose-500' : 'border-slate-750 focus:border-cyan-400'
                  }`}
                />
                {errors.contactName && <span className="text-xs text-rose-400">{errors.contactName}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Corporate Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className={`w-full bg-slate-950 border rounded-md p-2.5 text-sm text-white focus:outline-none ${
                    errors.email ? 'border-rose-500' : 'border-slate-750 focus:border-cyan-400'
                  }`}
                />
                {errors.email && <span className="text-xs text-rose-400">{errors.email}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Direct Telephone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+44 20 7946 0912"
                  className={`w-full bg-slate-950 border rounded-md p-2.5 text-sm text-white focus:outline-none ${
                    errors.phone ? 'border-rose-500' : 'border-slate-750 focus:border-cyan-400'
                  }`}
                />
                {errors.phone && <span className="text-xs text-rose-400">{errors.phone}</span>}
              </div>
            </div>

            {/* Logistics Parameters */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Primary Mode
                  </label>
                  <select
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value as TransportMode })}
                    className="w-full bg-slate-950 border border-slate-750 text-white rounded-md p-2.5 text-sm focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="ocean">Ocean Freight (FCL / LCL)</option>
                    <option value="air">Air Cargo Express & Charter</option>
                    <option value="road">Cross-Border Road Haulage</option>
                    <option value="multimodal">End-to-End Intermodal 4PL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Origin Port / Terminal *
                  </label>
                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    placeholder="e.g. Singapore (SGSIN)"
                    className={`w-full bg-slate-950 border rounded-md p-2.5 text-sm text-white focus:outline-none ${
                      errors.origin ? 'border-rose-500' : 'border-slate-750 focus:border-cyan-400'
                    }`}
                  />
                  {errors.origin && <span className="text-xs text-rose-400">{errors.origin}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Destination Port / City *
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. Rotterdam (NLRTM)"
                    className={`w-full bg-slate-950 border rounded-md p-2.5 text-sm text-white focus:outline-none ${
                      errors.destination ? 'border-rose-500' : 'border-slate-750 focus:border-cyan-400'
                    }`}
                  />
                  {errors.destination && <span className="text-xs text-rose-400">{errors.destination}</span>}
                </div>
              </div>

              {/* Weight, Volume, Commodity */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Gross Weight (kg) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.weightKg}
                    onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-750 text-white rounded-md p-2.5 text-sm font-mono tabular-nums focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Volume (CBM)
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={formData.volumeCbm}
                    onChange={(e) => setFormData({ ...formData, volumeCbm: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-750 text-white rounded-md p-2.5 text-sm font-mono tabular-nums focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Commodity Description
                  </label>
                  <input
                    type="text"
                    value={formData.cargoType}
                    onChange={(e) => setFormData({ ...formData, cargoType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-750 text-white rounded-md p-2.5 text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Checkbox Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <label className="flex items-center gap-2 p-3 bg-slate-950 border border-slate-800 rounded-md cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.requiresCustomsClearance}
                    onChange={(e) => setFormData({ ...formData, requiresCustomsClearance: e.target.checked })}
                    className="accent-cyan-400 rounded"
                  />
                  <span>Include Customs Clearance</span>
                </label>

                <label className="flex items-center gap-2 p-3 bg-slate-950 border border-slate-800 rounded-md cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.isTempControlled}
                    onChange={(e) => setFormData({ ...formData, isTempControlled: e.target.checked })}
                    className="accent-cyan-400 rounded"
                  />
                  <span>Reefer / Cold Chain</span>
                </label>

                <label className="flex items-center gap-2 p-3 bg-slate-950 border border-slate-800 rounded-md cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.requiresBondedStorage}
                    onChange={(e) => setFormData({ ...formData, requiresBondedStorage: e.target.checked })}
                    className="accent-cyan-400 rounded"
                  />
                  <span>Bonded Warehousing</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Special Operational Instructions / Cargo Specifications (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                  placeholder="e.g. Hazardous class 9 certification required, crane offloading needed at receiver terminal..."
                  className="w-full bg-slate-950 border border-slate-750 text-white rounded-md p-2.5 text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>NDA & Commercial Confidentiality Guaranteed</span>
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold rounded-md transition-colors inline-flex items-center justify-center gap-2 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <span>Submit Commercial RFQ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
