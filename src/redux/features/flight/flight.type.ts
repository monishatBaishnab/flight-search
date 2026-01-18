export interface Location {
  id: string;
  name: string;
  type: 'location';
  detailedName: string;
  subType: 'CITY' | 'AIRPORT';
  self: {
    href: string;
    methods: Array<'GET' | 'POST' | 'PUT' | 'DELETE'>;
  };
  iataCode?: string;
  timeZoneOffset: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  address: {
    cityName: string;
    cityCode: string;
    countryName: string;
    countryCode: string;
    stateCode?: string;
    regionCode: string;
  };
}

export interface FlightParams {
  max?: number;
  adults?: number;
  returnDate?: string;
  departureDate?: string;
  originLocationCode?: string;
  destinationLocationCode?: string;
  travelClass?: 'ECONOMY' | 'BUSINESS' | 'FIRST';
  tripType?: 'one-way' | 'round-trip';
}

// types/flight-offer.ts

export interface FlightOffer {
  type: 'flight-offer';
  id: string;
  source: 'GDS' | 'NDC';
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  isUpsellOffer: boolean;
  lastTicketingDate: string;
  lastTicketingDateTime: string;
  numberOfBookableSeats: number;
  itineraries: Itinerary[];
  price: Price;
  pricingOptions: PricingOptions;
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
}

interface Itinerary {
  duration: string; // ISO 8601 (PT11H30M)
  segments: Segment[];
}

interface Segment {
  id: string;
  departure: LocationTime;
  arrival: LocationTime;
  carrierCode: string;
  number: string;
  aircraft: {
    code: string;
  };
  operating: {
    carrierCode: string;
  };
  duration: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}

interface LocationTime {
  iataCode: string;
  at: string; // ISO datetime
}

interface Price {
  currency: string;
  total: string;
  base: string;
  fees?: PriceFee[];
  grandTotal: string;
}

interface PriceFee {
  amount: string;
  type: 'SUPPLIER' | 'TICKETING' | string;
}

interface PricingOptions {
  fareType: Array<'PUBLISHED' | 'NEGOTIATED' | string>;
  includedCheckedBagsOnly: boolean;
}

interface TravelerPricing {
  travelerId: string;
  fareOption: 'STANDARD' | 'FLEXIBLE' | string;
  travelerType: 'ADULT' | 'CHILD' | 'INFANT';
  price: {
    currency: string;
    total: string;
    base: string;
  };
  fareDetailsBySegment: FareDetailsBySegment[];
}

interface FareDetailsBySegment {
  segmentId: string;
  cabin: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
  fareBasis: string;
  class: string;
}

export interface FlightOffersResponse {
  data: FlightOffer[];
}
