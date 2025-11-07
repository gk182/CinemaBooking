import { Users, Sofa, CheckCircle2, XCircle } from 'lucide-react';

const SeatLegend = () => {
  const legends = [
    {
      icon: Users,
      label: 'Standard',
      price: '₫80,000',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      borderColor: 'border-green-500',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      icon: Users,
      label: 'VIP',
      price: '₫150,000',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      borderColor: 'border-purple-500',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: Sofa,
      label: 'Couple',
      price: '₫200,000',
      bgColor: 'bg-pink-100 dark:bg-pink-900/30',
      borderColor: 'border-pink-500',
      iconColor: 'text-pink-600 dark:text-pink-400'
    },
    {
      icon: CheckCircle2,
      label: 'Selected',
      price: null,
      bgColor: 'bg-red-600',
      borderColor: '',
      iconColor: 'text-white'
    },
    {
      icon: XCircle,
      label: 'Sold',
      price: null,
      bgColor: 'bg-gray-300 dark:bg-gray-600',
      borderColor: '',
      iconColor: 'text-gray-500'
    }
  ];

  return (
    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-3 sm:gap-6">
        {legends.map((legend) => {
          const Icon = legend.icon;
          return (
            <div key={legend.label} className="flex items-center gap-2">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 ${legend.bgColor} ${legend.borderColor ? `border-2 ${legend.borderColor}` : ''} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${legend.iconColor}`} />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                  {legend.label}
                </p>
                {legend.price && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">{legend.price}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeatLegend;