import { cn } from '@/lib/cn';
import { Banknote, Clock, Sparkles, type LucideIcon } from 'lucide-react';

type SortValue = 'best' | 'cheapest' | 'fastest';

interface Flight {
  price: number;
  duration: number; // minutes
}

interface SortOption {
  value: SortValue;
  label: string;
  icon: LucideIcon;
  description: string;
}

interface SortingTabsProps {
  value: SortValue;
  onChange: (value: SortValue) => void;
  flights?: Flight[];
}

const SORT_OPTIONS: readonly SortOption[] = [
  {
    value: 'best',
    label: 'Best',
    icon: Sparkles,
    description: 'Price + duration',
  },
  {
    value: 'cheapest',
    label: 'Cheapest',
    icon: Banknote,
    description: 'Lowest price',
  },
  {
    value: 'fastest',
    label: 'Fastest',
    icon: Clock,
    description: 'Shortest flight',
  },
];

const formatDuration = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

export default function SortingTabs({
  value,
  onChange,
  flights = [],
}: SortingTabsProps) {
  const getBestValue = (sortType: SortValue): string | null => {
    if (!flights.length) return null;

    switch (sortType) {
      case 'cheapest': {
        const minPrice = Math.min(...flights.map((f) => f.price));
        return `$${minPrice.toLocaleString()}`;
      }

      case 'fastest': {
        const minDuration = Math.min(...flights.map((f) => f.duration));
        return formatDuration(minDuration);
      }

      case 'best':
        return 'Recommended';

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl overflow-x-auto">
      {SORT_OPTIONS.map((option) => {
        const Icon = option.icon;
        const isActive = value === option.value;
        const bestValue = getBestValue(option.value);

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'cursor-pointer flex-1 min-w-[120px] flex flex-col items-center gap-1 px-4 py-3 rounded-lg transition-all',
              isActive ? 'bg-white' : 'hover:bg-slate-50',
            )}
          >
            <div className="flex items-center gap-2">
              <Icon
                className={cn(
                  'h-4 w-4',
                  isActive ? 'text-indigo-600' : 'text-slate-400',
                )}
              />
              <span
                className={cn(
                  'text-sm font-semibold',
                  isActive ? 'text-slate-900' : 'text-slate-600',
                )}
              >
                {option.label}
              </span>
            </div>

            {bestValue && (
              <span
                className={cn(
                  'text-xs',
                  isActive ? 'text-indigo-600' : 'text-slate-400',
                )}
              >
                {bestValue}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
