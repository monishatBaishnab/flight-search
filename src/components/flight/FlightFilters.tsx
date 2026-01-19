import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/cn';
import { resetFilters, setFilters } from '@/redux/features/flight/flight.slice';
import type { FlightOffer } from '@/redux/features/flight/flight.type';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  Clock,
  DollarSign,
  Moon,
  Plane,
  RotateCcw,
  Sun,
  Sunrise,
  Sunset,
} from 'lucide-react';

interface FlightFiltersProps {
  flights: FlightOffer[];
}

const AIRLINE_NAMES: Record<string, string> = {
  EK: 'Emirates',
  QR: 'Qatar Airways',
  SQ: 'Singapore Airlines',
  LH: 'Lufthansa',
  BA: 'British Airways',
  AF: 'Air France',
  EY: 'Etihad Airways',
  TK: 'Turkish Airlines',
  AI: 'Air India',
  UK: 'Vistara',
  AA: 'American Airlines',
  DL: 'Delta Air Lines',
  UA: 'United Airlines',
  CX: 'Cathay Pacific',
};

const TIME_PERIODS = [
  { value: 'morning', label: 'Morning', icon: Sunrise, range: '6AM - 12PM' },
  { value: 'afternoon', label: 'Afternoon', icon: Sun, range: '12PM - 6PM' },
  { value: 'evening', label: 'Evening', icon: Sunset, range: '6PM - 9PM' },
  { value: 'night', label: 'Night', icon: Moon, range: '9PM - 6AM' },
];

const parseDuration = (isoDuration: string): number => {
  const hours = isoDuration.match(/(\d+)H/);
  const minutes = isoDuration.match(/(\d+)M/);
  const h = hours ? parseInt(hours[1]) : 0;
  const m = minutes ? parseInt(minutes[1]) : 0;
  return h * 60 + m;
};

export default function FlightFiltersPanel({ flights }: FlightFiltersProps) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.flight.filters);

  // Extract unique airlines from flights
  const availableAirlines = Array.from(
    new Set(
      flights.flatMap((flight) =>
        flight.itineraries.flatMap((itinerary) =>
          itinerary.segments.map((segment) => segment.carrierCode),
        ),
      ),
    ),
  ).sort();

  // Calculate price range from flights
  const prices = flights.map((f) => parseFloat(f.price.total));
  const minPrice = Math.floor(Math.min(...prices, 0));
  const maxPrice = Math.ceil(Math.max(...prices, 10000));

  // Calculate duration range
  const durations = flights.map((f) =>
    parseDuration(f.itineraries[0].duration),
  );
  const minDuration = Math.floor(Math.min(...durations, 0));
  const maxDuration = Math.ceil(Math.max(...durations, 2000));

  const handlePriceChange = (value: number[]) => {
    dispatch(
      setFilters({
        priceRange: { min: value[0], max: value[1] },
      }),
    );
  };

  const handleDurationChange = (value: number[]) => {
    dispatch(
      setFilters({
        duration: { min: value[0], max: value[1] },
      }),
    );
  };

  const handleStopsToggle = (stops: number) => {
    const newStops = filters.stops.includes(stops)
      ? filters.stops.filter((s) => s !== stops)
      : [...filters.stops, stops];
    dispatch(setFilters({ stops: newStops }));
  };

  const handleAirlineToggle = (airline: string) => {
    const newAirlines = filters.airlines.includes(airline)
      ? filters.airlines.filter((a) => a !== airline)
      : [...filters.airlines, airline];
    dispatch(setFilters({ airlines: newAirlines }));
  };

  const handleTimeToggle = (
    type: 'departureTime' | 'arrivalTime',
    time: string,
  ) => {
    const currentTimes = filters[type];
    const newTimes = currentTimes.includes(time)
      ? currentTimes.filter((t) => t !== time)
      : [...currentTimes, time];
    dispatch(setFilters({ [type]: newTimes }));
  };

  const formatDuration = (minutes: number): string => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  return (
    <div className="w-full lg:w-[300px] shrink-0 space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm sticky top-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-cornflower-blue-500" />
            Filters
          </h3>
          <Button
            variant="ghost"
            size="default"
            onClick={() => dispatch(resetFilters())}
            className="h-7 text-xs"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset
          </Button>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-700">
            Price Range
          </Label>
          <div className="px-2">
            <Slider
              min={minPrice}
              max={maxPrice}
              step={10}
              value={[filters.priceRange.min, filters.priceRange.max]}
              onValueChange={handlePriceChange}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-slate-900">
              ${filters.priceRange.min}
            </span>
            <span className="text-slate-400">to</span>
            <span className="font-semibold text-slate-900">
              ${filters.priceRange.max}
            </span>
          </div>
        </div>

        {/* Stops */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Plane className="h-3.5 w-3.5" />
            Stops
          </Label>
          <div className="space-y-2">
            {[
              { value: 0, label: 'Nonstop' },
              { value: 1, label: '1 Stop' },
              { value: 2, label: '2+ Stops' },
            ].map((stop) => (
              <div key={stop.value} className="flex items-center gap-2">
                <Checkbox
                  id={`stop-${stop.value}`}
                  checked={filters.stops.includes(stop.value)}
                  onCheckedChange={() => handleStopsToggle(stop.value)}
                />
                <Label
                  htmlFor={`stop-${stop.value}`}
                  className="text-sm font-medium text-slate-600 cursor-pointer"
                >
                  {stop.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Airlines */}
        {availableAirlines.length > 0 && (
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700">
              Airlines
            </Label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableAirlines.map((airline) => (
                <div key={airline} className="flex items-center gap-2">
                  <Checkbox
                    id={`airline-${airline}`}
                    checked={filters.airlines.includes(airline)}
                    onCheckedChange={() => handleAirlineToggle(airline)}
                  />
                  <Label
                    htmlFor={`airline-${airline}`}
                    className="text-sm font-medium text-slate-600 cursor-pointer"
                  >
                    {AIRLINE_NAMES[airline] || airline}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Duration */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            Flight Duration
          </Label>
          <div className="px-2">
            <Slider
              min={minDuration}
              max={maxDuration}
              step={30}
              value={[filters.duration.min, filters.duration.max]}
              onValueChange={handleDurationChange}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-slate-900">
              {formatDuration(filters.duration.min)}
            </span>
            <span className="text-slate-400">to</span>
            <span className="font-semibold text-slate-900">
              {formatDuration(filters.duration.max)}
            </span>
          </div>
        </div>

        {/* Departure Time */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-700">
            Departure Time
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {TIME_PERIODS.map((period) => {
              const Icon = period.icon;
              const isSelected = filters.departureTime.includes(period.value);
              return (
                <button
                  key={period.value}
                  type="button"
                  onClick={() =>
                    handleTimeToggle('departureTime', period.value)
                  }
                  className={cn(
                    'cursor-pointer flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all',
                    isSelected
                      ? 'border-cornflower-blue-500 bg-cornflower-blue-50'
                      : 'border-slate-100 hover:border-slate-200',
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4',
                      isSelected
                        ? 'text-cornflower-blue-600'
                        : 'text-slate-400',
                    )}
                  />
                  <span
                    className={cn(
                      'text-xs font-medium',
                      isSelected
                        ? 'text-cornflower-blue-700'
                        : 'text-slate-600',
                    )}
                  >
                    {period.label}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {period.range}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Arrival Time */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-700">
            Arrival Time
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {TIME_PERIODS.map((period) => {
              const Icon = period.icon;
              const isSelected = filters.arrivalTime.includes(period.value);
              return (
                <button
                  key={period.value}
                  type="button"
                  onClick={() => handleTimeToggle('arrivalTime', period.value)}
                  className={cn(
                    'cursor-pointer flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all',
                    isSelected
                      ? 'border-cornflower-blue-500 bg-cornflower-blue-50'
                      : 'border-slate-100 hover:border-slate-200',
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4',
                      isSelected
                        ? 'text-cornflower-blue-600'
                        : 'text-slate-400',
                    )}
                  />
                  <span
                    className={cn(
                      'text-xs font-medium',
                      isSelected
                        ? 'text-cornflower-blue-700'
                        : 'text-slate-600',
                    )}
                  >
                    {period.label}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {period.range}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
