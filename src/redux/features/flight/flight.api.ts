import { appService } from '@/redux/services/appService';
import type {
  FlightOffersResponse,
  FlightParams,
  Location,
} from './flight.type';

export const flightApi = appService.injectEndpoints({
  endpoints: (builder) => ({
    // Get Flights
    getFlights: builder.query<FlightOffersResponse, FlightParams>({
      query: (params) => {
        const queryParams: Record<string, string | number> = {max:10};
        Object.entries(params).forEach(([key, value]) => {
          if (
            value !== undefined &&
            value !== null &&
            value !== '' &&
            key !== 'tripType'
          ) {
            queryParams[key] = value;
          }
        });

        return {
          url: '/v2/shopping/flight-offers',
          method: 'GET',
          params: queryParams,
        };
      },
    }),

    // Get Origin Locations
    getOriginLocations: builder.query<
      { data: Location[] },
      { keyword?: string }
    >({
      query: ({ keyword }) => {
        return {
          url: '/v1/reference-data/locations',
          method: 'GET',
          params: {
            subType: 'CITY,AIRPORT',
            keyword: keyword,
            'page[limit]': 5,
          },
        };
      },
    }),

    // Get Destination Locations
    getDestinationLocations: builder.query<
      { data: Location[] },
      { keyword?: string }
    >({
      query: ({ keyword }) => {
        return {
          url: '/v1/reference-data/locations',
          method: 'GET',
          params: {
            subType: 'CITY,AIRPORT',
            keyword: keyword,
            'page[limit]': 5,
          },
        };
      },
    }),
  }),
});

export const {
  useGetFlightsQuery,
  useLazyGetFlightsQuery,
  useGetOriginLocationsQuery,
  useGetDestinationLocationsQuery,
} = flightApi;
