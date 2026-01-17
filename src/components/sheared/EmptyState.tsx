import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import {
  AlertTriangle,
  Filter,
  Plane,
  RefreshCw,
  Search,
  type LucideIcon,
} from 'lucide-react';

/* ---------------------------------- Types --------------------------------- */

type EmptyStateType = 'initial' | 'no-results' | 'filtered-out' | 'error';

interface SearchQuery {
  origin?: {
    city?: string;
  };
  destination?: {
    city?: string;
  };
}

interface EmptyStateProps {
  type?: EmptyStateType;
  onRetry?: () => void;
  onResetFilters?: () => void;
  searchQuery?: SearchQuery;
}

interface EmptyStateConfig {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}

/* ------------------------------ Component ---------------------------------- */

export default function EmptyState({
  type = 'initial',
  onRetry,
  onResetFilters,
  searchQuery,
}: EmptyStateProps) {
  const configs: Record<EmptyStateType, EmptyStateConfig> = {
    initial: {
      icon: Plane,
      iconBg: 'bg-cornflower-blue-50',
      iconColor: 'text-cornflower-blue-500',
      title: 'Find your next adventure',
      description:
        'Enter your travel details above to search for the best flight deals.',
    },

    'no-results': {
      icon: Search,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
      title: 'No flights found',
      description: searchQuery
        ? `We couldn't find any flights from ${
            searchQuery.origin?.city ?? 'your origin'
          } to ${
            searchQuery.destination?.city ?? 'your destination'
          } on the selected dates.`
        : 'Try adjusting your search criteria or selecting different dates.',
      action: onRetry && (
        <Button onClick={onRetry} variant={'primary'}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Search again
        </Button>
      ),
    },

    'filtered-out': {
      icon: Filter,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500',
      title: 'No matching flights',
      description:
        'Your filters are too restrictive. Try adjusting them to see more options.',
      action: onResetFilters && (
        <Button variant="light" onClick={onResetFilters}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset filters
        </Button>
      ),
    },

    error: {
      icon: AlertTriangle,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-500',
      title: 'Something went wrong',
      description:
        'We encountered an error while searching for flights. Please try again.',
      action: onRetry && (
        <Button onClick={onRetry} variant={'primary'}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try again
        </Button>
      ),
    },
  };

  const {
    icon: Icon,
    iconBg,
    iconColor,
    title,
    description,
    action,
  } = configs[type];

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <div
        className={cn(
          'mb-6 flex h-20 w-20 items-center justify-center rounded-3xl',
          iconBg,
        )}
      >
        <Icon className={cn('h-10 w-10', iconColor)} />
      </div>

      <h3 className="mb-2 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mb-6 max-w-md text-slate-500">{description}</p>

      {action}
    </div>
  );
}
