import { PlaneLanding, PlaneTakeoff, SearchIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import DatePicker from './DatePicker';
const SearchForm = () => {
  return (
    <div className="space-y-4 mx-auto p-5 lg:p-10 rounded-xl shadow border border-slate-200 bg-white">
      <div className="flex items-center gap-2 flex-wrap">
        <Button className="h-7.5 text-sm rounded-full" variant="default">
          One way
        </Button>
        <Button className="h-7.5 text-sm rounded-full" variant="light">
          Round trip
        </Button>

        <RadioGroup
          defaultValue="comfortable"
          className="flex items-center gap-3 md:ml-4"
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1" className="capitalize">
              Economy
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2" className="capitalize">
              Business
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3" className="capitalize">
              First Class
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label>From</Label>
          <Input
            startContent={<PlaneTakeoff className="size-4 text-gray-400" />}
            placeholder="Whore from?"
          />
        </div>
        <div className="space-y-2">
          <Label>To</Label>
          <Input
            startContent={<PlaneLanding className="size-4 text-gray-400" />}
            placeholder="Whore to?"
          />
        </div>
        <div className="space-y-2">
          <Label>Departure</Label>
          <DatePicker />
        </div>
        <div className="space-y-2">
          <Label>Return</Label>
          <DatePicker />
        </div>
        <div className="space-y-2">
          <Label>Travelers</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Traveler</SelectItem>
              <SelectItem value="2">2 Traveler's</SelectItem>
              <SelectItem value="3">3 Traveler's</SelectItem>
              <SelectItem value="4">4 Traveler's</SelectItem>
              <SelectItem value="5">5 Traveler's</SelectItem>
              <SelectItem value="6">6 Traveler's</SelectItem>
              <SelectItem value="7">7 Traveler's</SelectItem>
              <SelectItem value="8">8 Traveler's</SelectItem>
              <SelectItem value="9">9 Traveler's</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end">
        <Button size="lg" variant="primary" className="min-w-[200px]">
          <SearchIcon />
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
