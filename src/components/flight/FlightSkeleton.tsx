export default function FlightCardSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-slate-100 p-6 animate-pulse"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Airline Skeleton */}
            <div className="flex items-center gap-3 lg:w-40">
              <div className="w-10 h-10 rounded-xl bg-slate-100" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-slate-100 rounded" />
                <div className="h-3 w-16 bg-slate-50 rounded" />
              </div>
            </div>

            {/* Timeline Skeleton */}
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <div className="space-y-2">
                  <div className="h-8 w-16 bg-slate-100 rounded" />
                  <div className="h-4 w-12 bg-slate-50 rounded" />
                </div>

                <div className="flex-1 space-y-4">
                  <div className="h-[2px] bg-slate-100 w-full" />
                  <div className="h-3 w-24 bg-slate-50 rounded mx-auto" />
                </div>

                <div className="space-y-2 text-right">
                  <div className="h-8 w-16 bg-slate-100 rounded" />
                  <div className="h-4 w-12 bg-slate-50 rounded" />
                </div>
              </div>
            </div>

            {/* Price Skeleton */}
            <div className="flex items-center gap-4 lg:w-48 justify-between lg:justify-end">
              <div className="space-y-2 text-right">
                <div className="h-8 w-20 bg-slate-100 rounded" />
                <div className="h-3 w-12 bg-slate-50 rounded ml-auto" />
              </div>
              <div className="h-10 w-24 bg-slate-100 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
