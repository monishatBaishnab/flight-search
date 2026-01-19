import { useDebouncedValue } from '@/hooks/useDebounce';
import { useGetOriginLocationsQuery } from '@/redux/features/flight/flight.api';
import {
  resetParams,
  setSearchParams,
} from '@/redux/features/flight/flight.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { capitalize } from '@/utils/capitalize';
import { Loader2, PlaneLanding, PlaneTakeoff, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Autocomplete } from './AutoComplete';
import DatePicker from './DatePicker';

interface SearchFormProps {
  onSearch: () => void;
  isLoading: boolean;
}

const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  const dispatch = useAppDispatch();
  const params = useAppSelector((state) => state.flight.params);

  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');

  const debouncedFromSearch = useDebouncedValue(fromSearch, 500);
  const debouncedToSearch = useDebouncedValue(toSearch, 500);

  const { data: originLocations, isFetching: isOriginLoading } =
    useGetOriginLocationsQuery(
      { keyword: debouncedFromSearch },
      { skip: !((debouncedFromSearch?.length || 0) > 2) },
    );

  const { data: destinationLocations, isFetching: isDestinationLoading } =
    useGetOriginLocationsQuery(
      { keyword: debouncedToSearch },
      { skip: !((debouncedToSearch?.length || 0) > 2) },
    );

  const originOptions = useMemo(() => {
    if (!originLocations?.data) return [];
    const seen = new Set();
    return originLocations.data
      .filter((item) => {
        if (!item.iataCode || seen.has(item.iataCode)) return false;
        seen.add(item.iataCode);
        return true;
      })
      .map((item) => ({
        label: capitalize(item.name) as string,
        value: item.iataCode as string,
      }));
  }, [originLocations]);

  const destinationOptions = useMemo(() => {
    if (!destinationLocations?.data) return [];
    const seen = new Set();
    return destinationLocations.data
      .filter((item) => {
        if (!item.iataCode || seen.has(item.iataCode)) return false;
        seen.add(item.iataCode);
        return true;
      })
      .map((item) => ({
        label: capitalize(item.name) as string,
        value: item.iataCode as string,
      }));
  }, [destinationLocations]);

  if (!params) return null;

  const handleParamChange = (newParams: Partial<typeof params>) => {
    dispatch(setSearchParams(newParams));
  };

  const handleDateChange = (
    key: 'departureDate' | 'returnDate',
    date?: Date,
  ) => {
    handleParamChange({ [key]: date ? date.toISOString().split('T')[0] : '' });
  };

  return (
    <div className="space-y-4 mx-auto p-5 lg:p-10 rounded-xl shadow border border-slate-200 bg-white">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            className="h-7.5 text-sm rounded-full"
            variant={params.tripType === 'round-trip' ? 'default' : 'light'}
            onClick={() => handleParamChange({ tripType: 'round-trip' })}
          >
            Round trip
          </Button>
          <Button
            type="button"
            className="h-7.5 text-sm rounded-full"
            variant={params.tripType === 'one-way' ? 'default' : 'light'}
            onClick={() => handleParamChange({ tripType: 'one-way' })}
          >
            One way
          </Button>
        </div>

        <RadioGroup
          value={params.travelClass}
          onValueChange={(val) =>
            handleParamChange({
              travelClass: val as 'ECONOMY' | 'BUSINESS' | 'FIRST',
            })
          }
          className="flex items-center gap-3 md:ml-4"
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value="ECONOMY" id="r1" />
            <Label htmlFor="r1" className="capitalize cursor-pointer">
              Economy
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="BUSINESS" id="r2" />
            <Label htmlFor="r2" className="capitalize cursor-pointer">
              Business
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="FIRST" id="r3" />
            <Label htmlFor="r3" className="capitalize cursor-pointer">
              First Class
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label>From</Label>
          <Autocomplete
            options={originOptions}
            icon={PlaneTakeoff}
            placeholder="Where from?"
            searchPlaceholder="Search location..."
            emptyMessage="No location found."
            value={params.originLocationCode}
            onValueChange={(val) =>
              handleParamChange({ originLocationCode: val })
            }
            onSearch={setFromSearch}
            isLoading={isOriginLoading}
          />
        </div>
        <div className="space-y-2">
          <Label>To</Label>
          <Autocomplete
            options={destinationOptions}
            icon={PlaneLanding}
            placeholder="Where to?"
            searchPlaceholder="Search location..."
            emptyMessage="No location found."
            value={params.destinationLocationCode}
            onValueChange={(val) =>
              handleParamChange({ destinationLocationCode: val })
            }
            onSearch={setToSearch}
            isLoading={isDestinationLoading}
          />
        </div>
        <div className="space-y-2">
          <Label>Departure</Label>
          <DatePicker
            value={
              params.departureDate ? new Date(params.departureDate) : undefined
            }
            onChange={(date) => handleDateChange('departureDate', date)}
            placeholder="Departure"
          />
        </div>
        {params.tripType === 'round-trip' && (
          <div className="space-y-2">
            <Label>Return</Label>
            <DatePicker
              value={
                params.returnDate ? new Date(params.returnDate) : undefined
              }
              onChange={(date) => handleDateChange('returnDate', date)}
              placeholder="Return date"
            />
          </div>
        )}
        <div className="space-y-2">
          <Label>Travelers</Label>
          <Select
            value={params.adults?.toString()}
            onValueChange={(val) =>
              handleParamChange({ adults: parseInt(val) })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? 'Traveler' : "Traveler's"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          size="lg"
          variant="light"
          className="min-w-[120px]"
          onClick={() => dispatch(resetParams())}
        >
          <X />
          Clear
        </Button>
        <Button
          size="lg"
          variant="primary"
          onClick={onSearch}
          className="min-w-[120px]"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <Search />}
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
