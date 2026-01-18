import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_FILTERS, type FlightFilters } from './flight-filters.type';
import type { FlightParams } from './flight.type';

interface FlightState {
  params: FlightParams;
  filters: FlightFilters;
}

const initialState: FlightState = {
  params: {
    adults: 1,
    departureDate: '',
    originLocationCode: '',
    destinationLocationCode: '',
    travelClass: 'ECONOMY',
    tripType: 'round-trip',
  },
  filters: DEFAULT_FILTERS,
};

const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<Partial<FlightParams>>) => {
      state.params = state.params
        ? { ...state.params, ...action.payload }
        : (action.payload as FlightParams);
    },
    resetParams: (state) => {
      state.params = {
        adults: 1,
        departureDate: '',
        originLocationCode: '',
        destinationLocationCode: '',
        travelClass: 'ECONOMY',
        tripType: 'round-trip',
      };
    },
    setFilters: (state, action: PayloadAction<Partial<FlightFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = DEFAULT_FILTERS;
    },
  },
});

export const { setSearchParams, setFilters, resetFilters, resetParams } =
  flightSlice.actions;
export const flightReducer = flightSlice.reducer;
