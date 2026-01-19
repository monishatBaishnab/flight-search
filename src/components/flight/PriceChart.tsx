import type { FlightOffer } from '@/redux/features/flight/flight.type';
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface PriceChartProps {
  flights: FlightOffer[];
}

export default function PriceChart({ flights }: PriceChartProps) {
  if (!flights || flights.length === 0) return null;

  // Prepare data: Count flights in price buckets or just show individual prices
  // Let's show individual prices as bars for now, labelled by index or airline
  const data = flights.map((f, index) => ({
    name: `F${index + 1}`,
    price: parseFloat(f.price.total),
    airline: f.itineraries[0].segments[0].carrierCode,
  }));

  const minPrice = Math.min(...data.map((d) => d.price));

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 tracking-tight">
          Price Comparison
        </h3>
        <p className="text-sm text-slate-500 font-medium">
          Starting from{' '}
          <span className="text-cornflower-blue-600 font-bold">
            ${minPrice}
          </span>
        </p>
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <XAxis dataKey="name" hide />
            <YAxis
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
              stroke="#94a3b8"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs font-bold border border-slate-800">
                      <p className="mb-1 text-slate-400 uppercase tracking-tighter">
                        Flight {payload[0].payload.name}
                      </p>
                      <p className="text-lg">${payload[0].value}</p>
                      <p className="text-cornflower-blue-400">
                        {payload[0].payload.airline} Airline
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="price" radius={[6, 6, 0, 0]} animationDuration={1500}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.price === minPrice ? '#3578fc' : '#e2e8f0'}
                  className="hover:fill-cornflower-blue-400 transition-colors duration-300"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
