import { useState } from 'react';
import { Camera, Check, X, Loader2 } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

interface CheckinScannerProps {
  onScan: (bookingId: string) => Promise<{ success: boolean; message: string }>;
}

const CheckinScanner = ({ onScan }: CheckinScannerProps) => {
  const [manualCode, setManualCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleManualScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;

    setLoading(true);
    setResult(null);
    
    try {
      const response = await onScan(manualCode);
      setResult(response);
      if (response.success) {
        setManualCode('');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        {/* QR Scanner Placeholder */}
        <div className="mb-6">
          <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">Camera feed would appear here</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Use manual input below for now
              </p>
            </div>
          </div>
        </div>

        {/* Manual Input */}
        <form onSubmit={handleManualScan} className="space-y-4">
          <Input
            label="Enter Booking ID or Scan QR Code"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            placeholder="BK001234"
            disabled={loading}
          />
          
          <Button 
            type="submit" 
            className="w-full"
            loading={loading}
            disabled={!manualCode.trim()}
          >
            Check In
          </Button>
        </form>

        {/* Result Message */}
        {result && (
          <div className={`mt-6 p-4 rounded-lg flex items-start gap-3 ${
            result.success 
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900'
          }`}>
            {result.success ? (
              <Check className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
            ) : (
              <X className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
            )}
            <div>
              <p className={`font-semibold ${
                result.success 
                  ? 'text-green-800 dark:text-green-300' 
                  : 'text-red-800 dark:text-red-300'
              }`}>
                {result.success ? 'Check-in Successful!' : 'Check-in Failed'}
              </p>
              <p className={`text-sm ${
                result.success 
                  ? 'text-green-700 dark:text-green-400' 
                  : 'text-red-700 dark:text-red-400'
              }`}>
                {result.message}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckinScanner;