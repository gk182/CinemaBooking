import { Check } from 'lucide-react';

interface PaymentMethodOption {
  id: string;
  name: string;
  logo: string;
  description: string;
}

interface PaymentMethodProps {
  selectedMethod: string;
  onMethodChange: (methodId: string) => void;
}

const PaymentMethod = ({ selectedMethod, onMethodChange }: PaymentMethodProps) => {
  const methods: PaymentMethodOption[] = [
    {
      id: 'VNPAY',
      name: 'VNPay',
      logo: 'https://vinadesign.vn/uploads/thumbnails/800/2023/05/vnpay-logo-vinadesign-25-12-59-16.jpg',
      description: 'Pay with VNPay e-wallet or bank cards'
    },
    {
      id: 'MOMO',
      name: 'Momo',
      logo: 'https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png?20201011055544',
      description: 'Pay with Momo e-wallet'
    },
    {
      id: 'CASH',
      name: 'Pay at Counter',
      logo: '💵',
      description: 'Pay at cinema counter (hold for 30 minutes)'
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Select Payment Method
      </h3>
      
      {methods.map((method) => (
        <button
          key={method.id}
          onClick={() => onMethodChange(method.id)}
          className={`
            w-full p-4 rounded-lg border-2 transition-all text-left
            ${selectedMethod === method.id
              ? 'border-red-600 bg-red-50 dark:bg-red-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {method.id === 'CASH' ? (
                <div className="text-4xl">{method.logo}</div>
              ) : (
                <img 
                  src={method.logo} 
                  alt={method.name}
                  className="h-10 object-contain"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {method.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {method.description}
                </p>
              </div>
            </div>
            
            {selectedMethod === method.id && (
              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default PaymentMethod;