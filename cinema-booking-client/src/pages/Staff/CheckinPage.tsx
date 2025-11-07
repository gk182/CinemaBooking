import { useState } from 'react';
import { History, CheckCircle } from 'lucide-react';
import CheckinScanner from '../../components/staff/CheckinScanner';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

interface CheckinRecord {
  id: string;
  bookingId: string;
  movieTitle: string;
  customerName: string;
  time: string;
}

const CheckinPage = () => {
  const [recentCheckins, setRecentCheckins] = useState<CheckinRecord[]>([]);

  const handleScan = async (bookingId: string) => {
    try {
      // TODO: Replace with actual API call
      // const result = await checkinApi.checkIn(bookingId);
      
      // Mock check-in
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate validation
      if (bookingId.startsWith('BK')) {
        // Add to recent checkins
        const newCheckin: CheckinRecord = {
          id: Date.now().toString(),
          bookingId,
          movieTitle: 'Inception',
          customerName: 'John Doe',
          time: new Date().toLocaleTimeString()
        };
        setRecentCheckins(prev => [newCheckin, ...prev].slice(0, 10));
        
        return {
          success: true,
          message: `Check-in successful for ${bookingId}`
        };
      } else {
        return {
          success: false,
          message: 'Invalid booking ID format'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Check-in failed. Please try again.'
      };
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Customer Check-in
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Scan customer QR code or enter booking ID manually
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scanner */}
        <div className="lg:col-span-2">
          <CheckinScanner onScan={handleScan} />
        </div>

        {/* Recent Check-ins */}
        <div className="lg:col-span-1">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <History className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Check-ins
              </h3>
            </div>

            {recentCheckins.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">
                  No check-ins yet
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {recentCheckins.map((checkin) => (
                  <div
                    key={checkin.id}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                        {checkin.bookingId}
                      </p>
                      <Badge variant="success" size="sm">Checked In</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {checkin.movieTitle}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {checkin.customerName} • {checkin.time}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckinPage;