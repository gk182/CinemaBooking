import { useState, useEffect } from 'react';

export const useCountdown = (initialSeconds: number, onExpire?: () => void) => {
  const [countdown, setCountdown] = useState(initialSeconds);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0 && !isExpired) {
      setIsExpired(true);
      onExpire?.();
    }
  }, [countdown, isExpired, onExpire]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const reset = (newSeconds: number = initialSeconds) => {
    setCountdown(newSeconds);
    setIsExpired(false);
  };

  return {
    countdown,
    isExpired,
    formatTime: () => formatTime(countdown),
    reset
  };
};