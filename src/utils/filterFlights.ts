import type { FlightFilters } from '@/redux/features/flight/flight-filters.type';
import type { FlightOffer } from '@/redux/features/flight/flight.type';

const parseDuration = (isoDuration: string): number => {
  const hours = isoDuration.match(/(\d+)H/);
  const minutes = isoDuration.match(/(\d+)M/);
  const h = hours ? parseInt(hours[1]) : 0;
  const m = minutes ? parseInt(minutes[1]) : 0;
  return h * 60 + m;
};

const getTimeOfDay = (isoDateTime: string): string => {
  const hour = new Date(isoDateTime).getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 21) return 'evening';
  return 'night';
};

export const filterFlights = (
  flights: FlightOffer[],
  filters: FlightFilters,
): FlightOffer[] => {
  return flights.filter((flight) => {
    const price = parseFloat(flight.price.total);
    const itinerary = flight.itineraries[0];
    const duration = parseDuration(itinerary.duration);
    const stops = itinerary.segments.length - 1;
    const departureTime = getTimeOfDay(itinerary.segments[0].departure.at);
    const arrivalTime = getTimeOfDay(
      itinerary.segments[itinerary.segments.length - 1].arrival.at,
    );
    const airlines = itinerary.segments.map((seg) => seg.carrierCode);

    // Price filter
    if (price < filters.priceRange.min || price > filters.priceRange.max) {
      return false;
    }

    // Duration filter
    if (duration < filters.duration.min || duration > filters.duration.max) {
      return false;
    }

    // Stops filter
    if (filters.stops.length > 0) {
      const normalizedStops = stops >= 2 ? 2 : stops;
      if (!filters.stops.includes(normalizedStops)) {
        return false;
      }
    }

    // Airlines filter
    if (filters.airlines.length > 0) {
      if (!airlines.some((airline) => filters.airlines.includes(airline))) {
        return false;
      }
    }

    // Departure time filter
    if (
      filters.departureTime.length > 0 &&
      !filters.departureTime.includes(departureTime)
    ) {
      return false;
    }

    // Arrival time filter
    if (
      filters.arrivalTime.length > 0 &&
      !filters.arrivalTime.includes(arrivalTime)
    ) {
      return false;
    }

    return true;
  });
};
