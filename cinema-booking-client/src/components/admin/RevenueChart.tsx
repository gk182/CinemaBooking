import { useMemo } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface RevenueData {
  date: string;
  revenue: number;
  tickets: number;
}

interface RevenueChartProps {
  data: RevenueData[];
  period?: 'week' | 'month' | 'year';
}

const RevenueChart = ({ data, period = 'week' }: RevenueChartProps) => {
  // Calculate statistics
  const stats = useMemo(() => {
    const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
    const totalTickets = data.reduce((sum, d) => sum + d.tickets, 0);
    const avgRevenue = totalRevenue / data.length;
    
    // Calculate trend (compare first half vs second half)
    const midPoint = Math.floor(data.length / 2);
    const firstHalfAvg = data.slice(0, midPoint).reduce((sum, d) => sum + d.revenue, 0) / midPoint;
    const secondHalfAvg = data.slice(midPoint).reduce((sum, d) => sum + d.revenue, 0) / (data.length - midPoint);
    const trend = ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100;

    return { totalRevenue, totalTickets, avgRevenue, trend };
  }, [data]);

  // Find max revenue for scaling
  const maxRevenue = Math.max(...data.map(d => d.revenue));

  // Format date based on period
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (period === 'week') {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
    if (period === 'month') {
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            Revenue Overview
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {period === 'week' ? 'Last 7 days' : period === 'month' ? 'Last 30 days' : 'Last 12 months'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {stats.trend >= 0 ? (
            <TrendingUp className="w-5 h-5 text-green-500" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-500" />
          )}
          <span className={`text-lg font-semibold ${stats.trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {stats.trend > 0 ? '+' : ''}{stats.trend.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gradient-to-br from-red-50 to-purple-50 dark:from-red-900/20 dark:to-purple-900/20 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Revenue</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            ₫{(stats.totalRevenue / 1000000).toFixed(1)}M
          </p>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Avg per Day</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            ₫{(stats.avgRevenue / 1000).toFixed(0)}K
          </p>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Tickets</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {stats.totalTickets.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="relative h-64">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>₫{(maxRevenue / 1000000).toFixed(1)}M</span>
          <span>₫{(maxRevenue / 2000000).toFixed(1)}M</span>
          <span>₫0</span>
        </div>

        {/* Grid lines */}
        <div className="absolute left-12 right-0 top-0 bottom-8 flex flex-col justify-between">
          <div className="border-t border-gray-200 dark:border-gray-700"></div>
          <div className="border-t border-gray-200 dark:border-gray-700"></div>
          <div className="border-t border-gray-200 dark:border-gray-700"></div>
        </div>

        {/* Bars */}
        <div className="absolute left-12 right-0 top-0 bottom-8 flex items-end justify-around gap-1">
          {data.map((item, index) => {
            const height = (item.revenue / maxRevenue) * 100;
            return (
              <div
                key={index}
                className="relative flex-1 group cursor-pointer"
              >
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                    <p className="font-semibold">₫{item.revenue.toLocaleString()}</p>
                    <p className="text-gray-300 dark:text-gray-400">{item.tickets} tickets</p>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900 dark:bg-gray-700"></div>
                  </div>
                </div>

                {/* Bar */}
                <div
                  className="w-full bg-gradient-to-t from-red-600 to-purple-600 rounded-t-lg transition-all hover:from-red-700 hover:to-purple-700"
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            );
          })}
        </div>

        {/* X-axis labels */}
        <div className="absolute left-12 right-0 bottom-0 flex justify-around text-xs text-gray-500 dark:text-gray-400">
          {data.map((item, index) => (
            <span key={index} className="flex-1 text-center">
              {formatDate(item.date)}
            </span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-600 to-purple-600"></div>
          <span className="text-gray-600 dark:text-gray-400">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-400">Hover for details</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
