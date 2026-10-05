export type TransportMode = 'ocean' | 'air' | 'road' | 'multimodal';

export interface Milestone {
  id: string;
  stage: string;
  location: string;
  timestamp: string;
  status: 'completed' | 'in-progress' | 'scheduled';
  description: string;
  facilityOrVessel?: string;
}

export interface Shipment {
  trackingNumber: string;
  referenceNumber: string;
  mode: TransportMode;
  status: 'In Transit' | 'Customs Clearance' | 'Out for Delivery' | 'Delivered' | 'Consolidation';
  origin: {
    city: string;
    country: string;
    portCode: string;
    terminal: string;
  };
  destination: {
    city: string;
    country: string;
    portCode: string;
    terminal: string;
  };
  carrier: string;
  vesselOrFlight: string;
  voyageOrFlightNumber: string;
  etd: string;
  eta: string;
  cargoType: string;
  containerOrPalletType: string;
  weightKg: number;
  volumeCbm: number;
  temperatureCelsius?: number;
  humidityPercentage?: number;
  progressPercent: number;
  milestones: Milestone[];
}

export interface PortHub {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  region: 'Asia-Pacific' | 'Europe & Middle East' | 'Americas' | 'Africa & Indian Ocean';
  type: 'Sea Port' | 'Air Hub' | 'Intermodal Terminal';
  coordinates: { x: number; y: number }; // percentage on map
  annualCapacity: string;
  bondedWarehouseSqFt: string;
  directLanesCount: number;
}

export interface QuoteRequest {
  origin: string;
  destination: string;
  mode: TransportMode;
  cargoType: string;
  containerSize?: string;
  weightKg: number;
  volumeCbm: number;
  isTempControlled: boolean;
  requiresBondedStorage: boolean;
  requiresCustomsClearance: boolean;
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  specialInstructions?: string;
}
