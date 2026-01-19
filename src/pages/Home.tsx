import FlightCardList from '@/components/flight/FlightCard';
import FlightFiltersPanel from '@/components/flight/FlightFilters';
import FlightSkeleton from '@/components/flight/FlightSkeleton';
import PriceChart from '@/components/flight/PriceChart';
import SearchForm from '@/components/flight/SearchForm';
import SortingTabs from '@/components/flight/SortingTabs';
import { useLazyGetFlightsQuery } from '@/redux/features/flight/flight.api';
import { useAppSelector } from '@/redux/store';
import { Globe, Plane, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

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

const Home = () => {
  const { params, filters } = useAppSelector((state) => state.flight);
  const [getFlights, { data, isLoading, isFetching }] =
    useLazyGetFlightsQuery();

  const isSearching = isLoading || isFetching;
  const [sortBy, setSortBy] = useState<'best' | 'cheapest' | 'fastest'>('best');

  // Apply filters and sorting to flight data
  const filteredAndSortedFlights = useMemo(() => {
    if (!data?.data) return [];

    // Filter flights
    const filtered = data.data.filter((flight) => {
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

    // Sort flights
    const sorted = [...filtered].sort((a, b) => {
      const priceA = parseFloat(a.price.total);
      const priceB = parseFloat(b.price.total);
      const durationA = parseDuration(a.itineraries[0].duration);
      const durationB = parseDuration(b.itineraries[0].duration);

      switch (sortBy) {
        case 'cheapest':
          return priceA - priceB;
        case 'fastest':
          return durationA - durationB;
        case 'best':
        default: {
          // Best value: combination of price and duration
          // Normalize both to 0-1 scale and combine
          const prices = filtered.map((f) => parseFloat(f.price.total));
          const durations = filtered.map((f) =>
            parseDuration(f.itineraries[0].duration),
          );
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          const minDuration = Math.min(...durations);
          const maxDuration = Math.max(...durations);

          const normalizedPriceA =
            maxPrice > minPrice
              ? (priceA - minPrice) / (maxPrice - minPrice)
              : 0;
          const normalizedPriceB =
            maxPrice > minPrice
              ? (priceB - minPrice) / (maxPrice - minPrice)
              : 0;
          const normalizedDurationA =
            maxDuration > minDuration
              ? (durationA - minDuration) / (maxDuration - minDuration)
              : 0;
          const normalizedDurationB =
            maxDuration > minDuration
              ? (durationB - minDuration) / (maxDuration - minDuration)
              : 0;

          // Best value score (lower is better)
          const scoreA = normalizedPriceA * 0.6 + normalizedDurationA * 0.4;
          const scoreB = normalizedPriceB * 0.6 + normalizedDurationB * 0.4;

          return scoreA - scoreB;
        }
      }
    });

    return sorted;
  }, [data, filters, sortBy]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-cornflower-blue-50/30 font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-12 lg:pt-20 pb-12 lg:pb-24 flex items-center">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-cornflower-blue-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-cornflower-blue-50 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="relative max-w-7xl w-full mx-auto px-4">
          <div className="text-center mb-10 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cornflower-blue-50 border border-cornflower-blue-100 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-cornflower-blue-500" />
              <span className="text-xs font-bold text-cornflower-blue-600 uppercase tracking-widest">
                Discover Your Global Journey
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
              Fly Anywhere,{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cornflower-blue-600 to-cornflower-blue-500">
                Anytime
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Find and compare deals from 400+ airlines across 200,000+ routes
              to find the perfect flight for your next adventure.
            </p>
          </div>
          <SearchForm
            isLoading={isSearching}
            onSearch={() => getFlights(params || {})}
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {data?.data && data.data.length > 0 && (
            <FlightFiltersPanel flights={data.data} />
          )}

          {/* Main Results area */}
          <div className="flex-1 space-y-6">
            {data?.data || isSearching ? (
              <>
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-black rounded uppercase tracking-tighter">
                        Live Deals
                      </div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                        {params?.originLocationCode || 'Source'} →{' '}
                        {params?.destinationLocationCode || 'Destination'}
                      </h2>
                    </div>
                    <p className="text-slate-500 font-medium">
                      {isSearching
                        ? 'Fetching the latest offers...'
                        : `Showing ${filteredAndSortedFlights.length} of ${data?.data?.length || 0} flights`}
                    </p>
                  </div>
                  <SortingTabs
                    value={sortBy}
                    onChange={setSortBy}
                    flights={[]}
                  />
                </div>

                {isSearching ? (
                  <FlightSkeleton />
                ) : filteredAndSortedFlights.length > 0 ? (
                  <div className="space-y-8">
                    <FlightCardList data={{ data: filteredAndSortedFlights }} />
                    <PriceChart flights={filteredAndSortedFlights} />
                  </div>
                ) : (
                  <div className="py-24 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100">
                    <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner shadow-orange-100/50">
                      <Plane className="h-10 w-10 text-orange-400 -rotate-45" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">
                      No flights match your filters
                    </h3>
                    <p className="text-slate-500 max-w-md mx-auto font-medium">
                      Try adjusting your filters to see more results.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="py-24 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100">
                <div className="w-20 h-20 bg-cornflower-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner shadow-cornflower-blue-100/50">
                  <Plane className="h-10 w-10 text-cornflower-blue-400 -rotate-45" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">
                  Ready for takeoff?
                </h3>
                <p className="text-slate-500 max-w-md mx-auto font-medium">
                  Enter your destination above and we'll scan the skies for the
                  best deals available right now.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 pt-20 pb-12 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-cornflower-blue-600 rounded-2xl shadow-lg shadow-cornflower-blue-500/20">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">
                Flight <span className="text-cornflower-blue-500">Search</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-500 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
              <Globe className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Search in real-time
              </span>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-sm">
              © 2026 Flight Search. High-performance flight booking for the
              modern traveler.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
