import { useEffect, useRef } from 'react';

interface QRCodeDisplayProps {
  data: string;
  size?: number;
  bookingId?: string;
}

const QRCodeDisplay = ({ data, size = 200, bookingId }: QRCodeDisplayProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // In production, use a QR code library like 'qrcode' or 'qrcode.react'
    // For demo purposes, we'll show a placeholder
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        // Draw placeholder QR code pattern
        ctx.fillStyle = '#000000';
        const cellSize = size / 20;
        for (let i = 0; i < 20; i++) {
          for (let j = 0; j < 20; j++) {
            if (Math.random() > 0.5) {
              ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
          }
        }
      }
    }
  }, [data, size]);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
        <canvas 
          ref={canvasRef}
          width={size}
          height={size}
          className="block"
        />
      </div>
      {bookingId && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Booking ID: <span className="font-mono font-semibold">{bookingId}</span>
        </p>
      )}
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Scan this code at the cinema entrance
      </p>
    </div>
  );
};

export default QRCodeDisplay;