export interface FlightFilters {
  priceRange: {
    min: number;
    max: number;
  };
  stops: number[]; // 0 = nonstop, 1 = 1 stop, 2+ = 2+ stops
  airlines: string[];
  departureTime: string[]; // 'morning', 'afternoon', 'evening', 'night'
  arrivalTime: string[];
  duration: {
    min: number; // in minutes
    max: number;
  };
}

export const DEFAULT_FILTERS: FlightFilters = {
  priceRange: { min: 0, max: 10000 },
  stops: [],
  airlines: [],
  departureTime: [],
  arrivalTime: [],
  duration: { min: 0, max: 2000 },
};
