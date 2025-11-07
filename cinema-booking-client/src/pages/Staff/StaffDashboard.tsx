import { Calendar, Users, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../../components/admin/StatsCard';
import Card from '../../components/common/Card';

const StaffDashboard = () => {
  const navigate = useNavigate();

  const stats = {
    todayShowtimes: 24,
    checkedIn: 156,
    pending: 42,
    upcomingShowtime: '14:30'
  };

  const quickActions = [
    { title: 'Today Showtimes', icon: Calendar, path: '/staff/showtimes', color: 'blue' },
    { title: 'Check-in', icon: CheckCircle, path: '/staff/checkin', color: 'green' },
    { title: 'Search Orders', icon: Users, path: '/staff/orders', color: 'purple' }
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Staff Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Today's Showtimes" value={stats.todayShowtimes} icon={Calendar} />
        <StatsCard title="Checked In" value={stats.checkedIn} icon={CheckCircle} />
        <StatsCard title="Pending" value={stats.pending} icon={Clock} />
        <StatsCard title="Next Showtime" value={stats.upcomingShowtime} icon={Calendar} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Card
              key={action.path}
              hover
              className="cursor-pointer"
            //   onClick={() => navigate(action.path)}
            >
              <div className="text-center py-6">
                <div className={`w-16 h-16 bg-${action.color}-100 dark:bg-${action.color}-900/30 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-8 h-8 text-${action.color}-600 dark:text-${action.color}-400`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {action.title}
                </h3>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StaffDashboard;