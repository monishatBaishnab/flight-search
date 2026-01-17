'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { format } from 'date-fns';
import { ChevronRight, Clock, Plane, Tag } from 'lucide-react';

type AirlineCode = 'QR' | 'EK' | 'default';

interface Airline {
  code: AirlineCode;
  name: string;
}

interface AirportTime {
  airport: string;
  time: string;
}

interface FlightSegment {
  from: string;
  to: string;
  layoverAirport?: string;
  duration: number;
}

interface Flight {
  id: string;
  airline: Airline;
  flightNumber: string;
  departure: AirportTime;
  arrival: AirportTime;
  duration: number;
  stops: number;
  price: number;
  segments?: FlightSegment[];
}

const AIRLINE_STYLES: Record<
  AirlineCode,
  { name: string; color: string; textColor: string }
> = {
  EK: {
    name: 'Emirates',
    color: 'bg-red-600',
    textColor: 'text-red-600',
  },
  QR: {
    name: 'Qatar Airways',
    color: 'bg-purple-700',
    textColor: 'text-purple-700',
  },
  default: {
    name: 'Airline',
    color: 'bg-slate-500',
    textColor: 'text-slate-600',
  },
};

const formatDuration = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

const formatTime = (iso: string): string => format(new Date(iso), 'HH:mm');

const getStopsLabel = (stops: number): string => {
  if (stops === 0) return 'Nonstop';
  if (stops === 1) return '1 stop';
  return `${stops} stops`;
};

const DUMMY_FLIGHTS: Flight[] = [
  {
    id: '1',
    airline: { code: 'EK', name: 'Emirates' },
    flightNumber: 'EK 585',
    departure: { airport: 'DAC', time: '2026-02-10T09:30:00Z' },
    arrival: { airport: 'DXB', time: '2026-02-10T13:45:00Z' },
    duration: 375,
    stops: 0,
    price: 780,
  },
  {
    id: '2',
    airline: { code: 'QR', name: 'Qatar Airways' },
    flightNumber: 'QR 641',
    departure: { airport: 'DAC', time: '2026-02-10T03:20:00Z' },
    arrival: { airport: 'LHR', time: '2026-02-10T15:40:00Z' },
    duration: 820,
    stops: 1,
    price: 690,
    segments: [
      { from: 'DAC', to: 'DOH', layoverAirport: 'DOH', duration: 300 },
      { from: 'DOH', to: 'LHR', duration: 520 },
    ],
  },
];

export default function FlightCardList() {
  return (
    <div className="space-y-6">
      {DUMMY_FLIGHTS.map((flight, index) => {
        const airlineStyle =
          AIRLINE_STYLES[flight.airline.code] ?? AIRLINE_STYLES.default;

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
                      'w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm',
                      airlineStyle.color,
                    )}
                  >
                    {flight.airline.code}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      {flight.airline.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {flight.flightNumber}
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        {formatTime(flight.departure.time)}
                      </p>
                      <p className="text-sm text-slate-600">
                        {flight.departure.airport}
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
                        {formatDuration(flight.duration)} •{' '}
                        {getStopsLabel(flight.stops)}
                      </div>
                    </div>

                    <div>
                      <p className="text-2xl font-bold">
                        {formatTime(flight.arrival.time)}
                      </p>
                      <p className="text-sm text-slate-600">
                        {flight.arrival.airport}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 lg:w-48 justify-between lg:justify-end">
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      ${flight.price.toLocaleString()}
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
