import FlightCardList from '@/components/sheared/FlightCard';
import SearchForm from '@/components/sheared/SearchForm';
import SortingTabs from '@/components/sheared/SortingTabs';
import { Globe, Plane, Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-cornflower-blue-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[500px] flex items-center">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-cornflower-blue-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-cornflower-blue-100 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="relative max-w-7xl mx-auto pt-12 pb-8 px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cornflower-blue-50 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-cornflower-blue-500" />
              <span className="text-sm font-medium text-cornflower-blue-600">
                Find the best flight deals
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
              Where will you fly
              <span className="text-cornflower-blue-500"> next?</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Search hundreds of flights from major airlines to find your
              perfect trip at the best price.
            </p>
          </div>
          <SearchForm />
        </div>
      </div>
      {/* <EmptyState
        type="initial"
        onRetry={() => {}}
        onResetFilters={() => {}}
        searchQuery={{}}
      /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8 flex-col md:flex-row">
        <div className="w-[300px] shrink-0"></div>
        <div className="w-full grow">
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  New Delhi → New York
                </h2>
                <p className="text-sm text-slate-500">10 flights found</p>
              </div>
            </div>

            <SortingTabs value={'best'} onChange={() => {}} flights={[]} />
          </div>

          <FlightCardList />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-cornflower-blue-100 rounded-xl">
                <Plane className="h-5 w-5 text-cornflower-blue-600" />
              </div>
              <span className="font-bold text-slate-900">FlightSearch</span>
            </div>
            <p className="text-sm text-slate-500">
              Find the best flight deals from hundreds of airlines worldwide
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Globe className="h-4 w-4" />
              <span>Search in real-time</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
