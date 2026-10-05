/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Capabilities } from './components/Capabilities';
import { GlobalNetwork } from './components/GlobalNetwork';
import { LiveTracking } from './components/LiveTracking';
import { RateCalculator } from './components/RateCalculator';
import { CaseStudies } from './components/CaseStudies';
import { AboutGovernance } from './components/AboutGovernance';
import { QuoteModal } from './components/QuoteModal';
import { Footer } from './components/Footer';
import { QuoteRequest } from './types/logistics';

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [preFilledQuoteData, setPreFilledQuoteData] = useState<Partial<QuoteRequest> | undefined>(undefined);
  const [activeTrackingCode, setActiveTrackingCode] = useState('EOS-94820-SEA');
  const [activeSection, setActiveSection] = useState('capabilities');

  // Track active section on scroll for navbar indication
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['capabilities', 'network', 'tracking', 'calculator', 'case-studies', 'governance'];
      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenQuote = (customData?: Partial<QuoteRequest>) => {
    if (customData) {
      setPreFilledQuoteData(customData);
    }
    setIsQuoteModalOpen(true);
  };

  const handleTrackShipment = (code: string) => {
    setActiveTrackingCode(code);
    const trackingEl = document.getElementById('tracking');
    if (trackingEl) {
      trackingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromCapabilities = (serviceName: string) => {
    handleOpenQuote({
      specialInstructions: `Inquiry specifically regarding: ${serviceName}`,
    });
  };

  const handleSelectHubForQuote = (hubName: string) => {
    handleOpenQuote({
      origin: hubName,
      specialInstructions: `Direct terminal booking allocation requested at ${hubName}`,
    });
  };

  const handlePreFillFromCalculator = (details: {
    origin: string;
    destination: string;
    mode: any;
    weightKg: number;
    volumeCbm: number;
    cargoType: string;
  }) => {
    handleOpenQuote({
      origin: details.origin,
      destination: details.destination,
      mode: details.mode,
      weightKg: details.weightKg,
      volumeCbm: details.volumeCbm,
      cargoType: details.cargoType,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenQuote={() => handleOpenQuote()}
        onOpenTracking={() => handleTrackShipment('EOS-94820-SEA')}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenQuote={() => handleOpenQuote()}
          onTrackShipment={handleTrackShipment}
        />

        {/* 01-04 Capabilities Section */}
        <Capabilities
          onSelectService={handleSelectServiceFromCapabilities}
        />

        {/* Global Hubs & Maritime Corridors */}
        <GlobalNetwork
          onSelectHubForQuote={handleSelectHubForQuote}
        />

        {/* Live Tracking Engine */}
        <LiveTracking
          initialTrackingCode={activeTrackingCode}
          onOpenQuote={() => handleOpenQuote()}
        />

        {/* Instant Rate & Carbon Estimator */}
        <RateCalculator
          onPreFillQuote={handlePreFillFromCalculator}
        />

        {/* Quantified Real Case Studies */}
        <CaseStudies />

        {/* Corporate Governance & Certifications */}
        <AboutGovernance />
      </main>

      {/* Official RFQ Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        preFilledData={preFilledQuoteData}
      />

      {/* Corporate Quiet Footer */}
      <Footer
        onOpenQuote={() => handleOpenQuote()}
        onOpenTracking={() => handleTrackShipment('EOS-94820-SEA')}
      />
    </div>
  );
}
