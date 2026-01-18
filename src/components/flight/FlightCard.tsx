'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import type { FlightOffersResponse } from '@/redux/features/flight/flight.type';
import { format } from 'date-fns';
import { ChevronRight, Clock, Plane, Tag } from 'lucide-react';

const formatDuration = (isoDuration: string): string => {
  const hours = isoDuration.match(/(\d+)H/);
  const minutes = isoDuration.match(/(\d+)M/);
  const h = hours ? hours[1] : '0';
  const m = minutes ? minutes[1] : '0';
  return `${h}h ${m}m`;
};

const formatTime = (iso: string): string => format(new Date(iso), 'HH:mm');

const getStopsLabel = (stops: number): string => {
  if (stops === 0) return 'Nonstop';
  if (stops === 1) return '1 stop';
  return `${stops} stops`;
};
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

const getAirlineName = (code: string): string => {
  return AIRLINE_NAMES[code] || `${code} Airline`;
};

interface FlightCardListProps {
  data?: FlightOffersResponse;
}

export default function FlightCardList({ data }: FlightCardListProps) {
  if (!data?.data || data.data.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {data.data.map((flight, index) => {
        const itinerary = flight.itineraries[0];
        const departure = itinerary.segments[0].departure;
        const arrival =
          itinerary.segments[itinerary.segments.length - 1].arrival;
        const stops = itinerary.segments.length - 1;
        const carrierCode = itinerary.segments[0].carrierCode;

        const isBestValue = index === 0;
        const isCheapest = index === 1;

        return (
          <div
            key={flight.id}
            className={cn(
              'bg-white rounded-2xl border transition hover:shadow',
              (isBestValue || isCheapest) && 'border-gray-200',
            )}
          >
            {(isBestValue || isCheapest) && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border-b border-b-gray-200 rounded-t-2xl">
                <Tag className="h-3.5 w-3.5 text-green-600" />
                <span className="text-xs font-semibold text-green-700">
                  {isBestValue ? 'Best Value' : 'Lowest Price'}
                </span>
              </div>
            )}

            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Airline */}
                <div className="flex items-center gap-3 lg:w-40">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm bg-indigo-600',
                    )}
                  >
                    {carrierCode}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      {getAirlineName(carrierCode)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {itinerary.segments[0].number}
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        {formatTime(departure.at)}
                      </p>
                      <p className="text-sm text-slate-600">
                        {departure.iataCode}
                      </p>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="flex-1 h-[2px] bg-slate-200" />
                        <Plane className="h-4 w-4 mx-2 text-indigo-500 -rotate-45" />
                        <div className="flex-1 h-[2px] bg-slate-200" />
                      </div>
                      <div className="mt-2 flex justify-center text-xs gap-2 text-slate-500">
                        <Clock className="h-3 w-3" />
                        {formatDuration(itinerary.duration)} •{' '}
                        {getStopsLabel(stops)}
                      </div>
                    </div>

                    <div>
                      <p className="text-2xl font-bold">
                        {formatTime(arrival.at)}
                      </p>
                      <p className="text-sm text-slate-600">
                        {arrival.iataCode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 lg:w-48 justify-between lg:justify-end">
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      {flight.price.currency}{' '}
                      {parseFloat(flight.price.total).toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500">per person</p>
                  </div>
                  <Button variant="primary" className="rounded-lg px-5 h-10">
                    Select <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
