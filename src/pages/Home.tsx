import { Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[500px] flex items-center">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">
                Find the best flight deals
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
              Where will you fly
              <span className="text-indigo-600"> next?</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Search hundreds of flights from major airlines to find your
              perfect trip at the best price.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
